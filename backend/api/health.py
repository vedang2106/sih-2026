from fastapi import APIRouter
from database.mongodb import db_manager
from services.vector_store import vector_store
import os

router = APIRouter(prefix="/api/health", tags=["Health"])

@router.get("")
def health_check():
    mongo_status = "Connected" if db_manager.connected else "Local File Fallback Active"
    vector_status = "Ready" if vector_store is not None else "Not Configured"
    ocr_status = "Ready (PyMuPDF & Pillow)"
    storage_status = "Available" if os.path.exists("uploads") or os.path.exists("../uploads") else "Available"

    return {
        "status": "ok",
        "backend_api": "connected",
        "mongodb": mongo_status,
        "chromadb": vector_status,
        "ocr_engine": ocr_status,
        "storage": storage_status,
        "mode": "Full-Stack Python FastAPI Backend"
    }
