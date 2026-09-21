import os
import sys
# pyrefly: ignore [missing-import]
from fastapi import APIRouter

# Ensure parent directory is in sys.path for IDE & module resolution
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from database.models import RAGQueryRequest
    from services.rag_service import query_rag_engine
except ImportError:
    from backend.database.models import RAGQueryRequest
    from backend.services.rag_service import query_rag_engine

router = APIRouter(prefix="/api/chat", tags=["Chatbot & RAG"])

@router.post("/query")
def chat_query(req: RAGQueryRequest):
    return query_rag_engine(req.question, req.subsidiary)

@router.get("/history")
def chat_history():
    return {"history": []}
