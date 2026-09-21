import os
import sys
# pyrefly: ignore [missing-import]
from fastapi import APIRouter
from typing import Optional

# Ensure parent directory is in sys.path for IDE & module resolution
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from database.mongodb import db_manager
    from services.topic_service import extract_topics_from_corpus
except ImportError:
    from backend.database.mongodb import db_manager
    from backend.services.topic_service import extract_topics_from_corpus

router = APIRouter(prefix="/api/topics", tags=["Topics"])

@router.get("")
def get_topics(subsidiary: Optional[str] = "ALL", category: Optional[str] = "ALL"):
    docs = db_manager.get_documents(subsidiary)
    corpus = [d.get("name", "") for d in docs]
    topics = extract_topics_from_corpus(corpus)
    return {"topics": topics}
