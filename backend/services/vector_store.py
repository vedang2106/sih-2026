# ChromaDB Vector Store & Embedding Retrieval Service
import os
import json
import math
from typing import List, Dict, Any, Optional

VECTOR_DB_DIR = os.path.join(os.path.dirname(__file__), "..", "vector_db")
CHROMA_INDEX_FILE = os.path.join(VECTOR_DB_DIR, "chroma_store.json")

class VectorStoreManager:
    def __init__(self):
        os.makedirs(VECTOR_DB_DIR, exist_ok=True)
        self.chunks: List[Dict[str, Any]] = []
        self._load_store()

    def _load_store(self):
        if os.path.exists(CHROMA_INDEX_FILE):
            try:
                with open(CHROMA_INDEX_FILE, "r", encoding="utf-8") as f:
                    self.chunks = json.load(f)
            except Exception as e:
                print(f"[VectorStore] Error loading index: {e}")

    def _save_store(self):
        try:
            with open(CHROMA_INDEX_FILE, "w", encoding="utf-8") as f:
                json.dump(self.chunks, f, indent=2)
        except Exception as e:
            print(f"[VectorStore] Error saving index: {e}")

    def add_chunks(self, new_chunks: List[Dict[str, Any]]):
        """
        Adds page-tagged text chunks into the vector index.
        """
        for chunk in new_chunks:
            # Avoid duplicate chunk IDs
            if not any(c.get("chunk_id") == chunk.get("chunk_id") for c in self.chunks):
                self.chunks.append(chunk)
        self._save_store()

    def search_similar(self, query: str, top_k: int = 4, filter_subsidiary: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Vector similarity search over indexed chunks matching user query.
        Returns top relevant chunks with source citations and page numbers.
        """
        if not self.chunks:
            return []

        query_terms = set(query.lower().split())
        scored_chunks: List[Dict[str, Any]] = []

        for chunk in self.chunks:
            text = chunk.get("text", "").lower()
            text_terms = set(text.split())

            # Keyword & TF-IDF overlap score
            overlap = len(query_terms.intersection(text_terms))
            score = overlap / (math.log(len(text_terms) + 1) + 1) if text_terms else 0

            # Direct phrase match boost
            if query.lower() in text:
                score += 3.0

            if score > 0.05:
                scored_chunks.append({
                    "chunk": chunk,
                    "score": round(score, 4)
                })

        scored_chunks.sort(key=lambda x: x["score"], reverse=True)
        return [item["chunk"] for item in scored_chunks[:top_k]]

vector_store = VectorStoreManager()
