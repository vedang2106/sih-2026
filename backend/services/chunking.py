# Document Text Chunking Engine preserving Page Numbers & Metadata
from typing import List, Dict, Any

def chunk_document_pages(pages_data: List[Dict[str, Any]], doc_id: str, doc_name: str, chunk_size: int = 500, overlap: int = 50) -> List[Dict[str, Any]]:
    """
    Splits page-by-page text into overlapping semantic chunks tagged with exact page numbers.
    """
    chunks: List[Dict[str, Any]] = []
    chunk_counter = 0

    for page_item in pages_data:
        page_num = page_item.get("page", 1)
        text = page_item.get("text", "")
        if not text:
            continue

        words = text.split()
        if len(words) <= chunk_size:
            chunk_counter += 1
            chunks.append({
                "chunk_id": f"{doc_id}_p{page_num}_c{chunk_counter}",
                "document_id": doc_id,
                "document_name": doc_name,
                "page": page_num,
                "text": text
            })
        else:
            # Overlapping sliding window
            for i in range(0, len(words), chunk_size - overlap):
                chunk_words = words[i:i + chunk_size]
                chunk_text = " ".join(chunk_words)
                chunk_counter += 1
                chunks.append({
                    "chunk_id": f"{doc_id}_p{page_num}_c{chunk_counter}",
                    "document_id": doc_id,
                    "document_name": doc_name,
                    "page": page_num,
                    "text": chunk_text
                })

    return chunks
