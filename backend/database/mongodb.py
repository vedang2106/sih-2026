# MongoDB Connection Manager with Resilient Local Persistence Fallback
import os
import json
from typing import Dict, Any, List, Optional
try:
    # pyrefly: ignore [missing-import]
    import pymongo
    HAS_PYMONGO = True
except ImportError:
    HAS_PYMONGO = False

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DATABASE_NAME", "cmpdi_ai")
FALLBACK_FILE = os.path.join(os.path.dirname(__file__), "..", "vector_db", "db_fallback.json")

class DatabaseManager:
    def __init__(self):
        self.client = None
        self.db = None
        self.connected = False
        self.fallback_data: Dict[str, List[Dict[str, Any]]] = {
            "documents": [],
            "extracted_data": [],
            "validation_errors": [],
            "reports": [],
            "chat_history": []
        }
        self._init_db()

    def _init_db(self):
        # Create directory for fallback if needed
        os.makedirs(os.path.dirname(FALLBACK_FILE), exist_ok=True)
        if os.path.exists(FALLBACK_FILE):
            try:
                with open(FALLBACK_FILE, "r", encoding="utf-8") as f:
                    self.fallback_data = json.load(f)
            except Exception:
                pass

        if HAS_PYMONGO:
            try:
                self.client = pymongo.MongoClient(MONGODB_URI, serverSelectionTimeoutMS=1500)
                self.client.admin.command('ping')
                self.db = self.client[DB_NAME]
                self.connected = True
                print(f"[Database] Successfully connected to MongoDB at {MONGODB_URI}")
            except Exception as e:
                print(f"[Database] MongoDB offline or unavailable. Using resilient local file storage fallback. ({e})")
                self.connected = False

    def _save_fallback(self):
        try:
            with open(FALLBACK_FILE, "w", encoding="utf-8") as f:
                json.dump(self.fallback_data, f, indent=2, default=str)
        except Exception as e:
            print(f"[Database] Error saving fallback store: {e}")

    def insert_document(self, doc_data: Dict[str, Any]):
        if self.connected and self.db is not None:
            self.db.documents.insert_one(doc_data)
        else:
            self.fallback_data["documents"].insert(0, doc_data)
            self._save_fallback()

    def get_documents(self, subsidiary: Optional[str] = None) -> List[Dict[str, Any]]:
        if self.connected and self.db is not None:
            query = {} if not subsidiary or subsidiary == 'ALL' else {"subsidiary": subsidiary}
            cursor = self.db.documents.find(query, {"_id": 0}).sort("upload_timestamp", -1)
            return list(cursor)
        else:
            docs = self.fallback_data["documents"]
            if subsidiary and subsidiary != 'ALL':
                docs = [d for d in docs if d.get("subsidiary") == subsidiary or d.get("subsidiary") == 'CMPDI']
            return docs

    def get_document_by_id(self, doc_id: str) -> Optional[Dict[str, Any]]:
        if self.connected and self.db is not None:
            return self.db.documents.find_one({"id": doc_id}, {"_id": 0})
        else:
            for d in self.fallback_data["documents"]:
                if d.get("id") == doc_id:
                    return d
            return None

    def insert_extracted_fields(self, fields_data: Dict[str, Any]):
        if self.connected and self.db is not None:
            self.db.extracted_data.insert_one(fields_data)
        else:
            self.fallback_data["extracted_data"].insert(0, fields_data)
            self._save_fallback()

    def get_extracted_fields(self, doc_id: Optional[str] = None) -> List[Dict[str, Any]]:
        if self.connected and self.db is not None:
            query = {"document_id": doc_id} if doc_id else {}
            return list(self.db.extracted_data.find(query, {"_id": 0}))
        else:
            if doc_id:
                return [f for f in self.fallback_data["extracted_data"] if f.get("document_id") == doc_id]
            return self.fallback_data["extracted_data"]

db_manager = DatabaseManager()
