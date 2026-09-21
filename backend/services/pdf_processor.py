# Real PDF Processing Engine using PyMuPDF
import os
from typing import List, Dict, Any

try:
    # pyrefly: ignore [missing-import]
    import pymupdf as fitz  # PyMuPDF 1.25+ preferred import
except ImportError:
    # pyrefly: ignore [missing-import]
    import fitz  # Fallback for older versions

def process_pdf_document(file_path: str) -> Dict[str, Any]:
    """
    Parses digital PDFs page-by-page preserving exact page numbers.
    Returns page text chunks and document metadata.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF file not found at {file_path}")

    doc = fitz.open(file_path)
    total_pages = len(doc)
    pages_data: List[Dict[str, Any]] = []
    full_text_list: List[str] = []

    for page_num in range(total_pages):
        page = doc.load_page(page_num)
        text = page.get_text("text") or ""
        text_clean = " ".join(text.split())
        
        pages_data.append({
            "page": page_num + 1,
            "text": text_clean,
            "character_count": len(text_clean)
        })
        full_text_list.append(text_clean)

    doc.close()

    full_text = "\n\n".join(full_text_list)
    return {
        "page_count": total_pages,
        "pages": pages_data,
        "full_text": full_text,
        "ocr_used": False
    }
