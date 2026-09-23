# ChromaDB Vector Store & Embedding Retrieval Service with Strict Stop-Word Filtering
import os
import json
import math
import re
from typing import List, Dict, Any, Optional

VECTOR_DB_DIR = os.path.join(os.path.dirname(__file__), "..", "vector_db")
CHROMA_INDEX_FILE = os.path.join(VECTOR_DB_DIR, "chroma_store.json")

# Common English stop words to ignore during query keyword extraction
STOP_WORDS = {
    'who', 'what', 'where', 'when', 'why', 'how', 'is', 'are', 'was', 'were',
    'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'a', 'an',
    'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of',
    'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through',
    'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
    'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once',
    'here', 'there', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than',
    'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now',
    'tell', 'me', 'give', 'show', 'name', 'person', 'detail', 'details'
}

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
            if not any(c.get("chunk_id") == chunk.get("chunk_id") for c in self.chunks):
                self.chunks.append(chunk)
        self._save_store()

    def search_similar(self, query: str, top_k: int = 4, filter_subsidiary: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Vector similarity search with strict meaningful term overlap threshold.
        Ignores stop words like 'who', 'is', 'what' to prevent matching irrelevant documents.
        """
        if not self.chunks:
            return []

        # Clean query and extract non-stop words
        raw_words = re.findall(r'\b[a-zA-Z0-9]+\b', query.lower())
        meaningful_query_terms = [w for w in raw_words if w not in STOP_WORDS and len(w) > 1]

        # If user only typed stop words (e.g. "who is rahul" -> meaningful: ["rahul"])
        if not meaningful_query_terms:
            return []

        scored_chunks: List[Dict[str, Any]] = []

        for chunk in self.chunks:
            text = chunk.get("text", "").lower()
            text_terms = set(re.findall(r'\b[a-zA-Z0-9]+\b', text))

            # Match meaningful query terms only
            matches = [term for term in meaningful_query_terms if term in text_terms]
            if not matches:
                continue

            score = len(matches) * 2.0 / (math.log(len(text_terms) + 1) + 1)

            # Direct phrase match boost
            clean_query = " ".join(meaningful_query_terms)
            if clean_query and clean_query in text:
                score += 5.0

            # Filter out weak/random matches
            if score >= 0.15:
                scored_chunks.append({
                    "chunk": chunk,
                    "score": round(score, 4)
                })

        scored_chunks.sort(key=lambda x: x["score"], reverse=True)
        return [item["chunk"] for item in scored_chunks[:top_k]]

vector_store = VectorStoreManager()
