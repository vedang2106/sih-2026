# pyrefly: ignore [missing-import]
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import os
import shutil
import time
from typing import Optional
from database.mongodb import db_manager
from services.pdf_processor import process_pdf_document
from services.ocr_service import process_scanned_ocr
from services.excel_processor import process_excel_document
from services.docx_processor import process_docx_document
from services.chunking import chunk_document_pages
from services.vector_store import vector_store
from services.extraction_service import extract_structured_mining_fields

router = APIRouter(prefix="/api/documents", tags=["Documents"])
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_document(file: UploadFile = File(...), subsidiary: str = Form("CMPDI")):
    doc_id = f"DOC-{str(int(time.time()))[-5:]}"
    file_path = os.path.join(UPLOAD_DIR, f"{doc_id}_{file.filename}")

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    ext = os.path.splitext(file.filename)[1].lower()
    
    try:
        if ext == '.pdf':
            parsed = process_pdf_document(file_path)
            if len(parsed.get("full_text", "").strip()) < 50:
                parsed = process_scanned_ocr(file_path)
        elif ext in ['.xlsx', '.xls', '.csv']:
            parsed = process_excel_document(file_path)
        elif ext in ['.docx', '.doc']:
            parsed = process_docx_document(file_path)
        else:
            parsed = process_scanned_ocr(file_path)

        pages = parsed.get("pages", [])
        full_text = parsed.get("full_text", "")

        # 1. Chunk and index into ChromaDB Vector Store
        chunks = chunk_document_pages(pages, doc_id, file.filename)
        vector_store.add_chunks(chunks)

        # 2. Extract dynamic structured fields from actual file text
        extracted = extract_structured_mining_fields(full_text, file.filename, pages)
        extracted["document_id"] = doc_id
        db_manager.insert_extracted_fields(extracted)

        # 3. Create document database record
        doc_record = {
            "id": doc_id,
            "name": file.filename,
            "type": ext.replace('.', '').upper(),
            "size": f"{os.path.getsize(file_path) / (1024*1024):.1f} MB",
            "pages": parsed.get("page_count", len(pages)),
            "uploadDate": time.strftime("%Y-%m-%d"),
            "subsidiary": extracted.get("subsidiary", subsidiary),
            "category": "Mining & Exploration",
            "ocrStatus": "Completed (100%)" if parsed.get("ocr_used") else "Parsed (Direct Text)",
            "extractedTables": len(pages),
            "confidence": extracted.get("confidence", 95.0),
            "extracted_rows": extracted.get("extracted_rows", []),
            "anomaliesFound": 0,
            "tags": ["Uploaded", subsidiary]
        }
        db_manager.insert_document(doc_record)

        return {"status": "success", "document": doc_record}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Document processing failed: {str(e)}")

@router.get("")
def list_documents(subsidiary: Optional[str] = None):
    docs = db_manager.get_documents(subsidiary)
    return {"documents": docs}

@router.get("/{doc_id}")
def get_document(doc_id: str):
    doc = db_manager.get_document_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Attach extracted fields if available
    extracted_list = db_manager.get_extracted_fields(doc_id)
    if extracted_list:
        doc["extracted_fields_detail"] = extracted_list[0]
    return doc
