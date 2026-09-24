# Pydantic & Data Models for GeoMine AI MongoDB Collections
# pyrefly: ignore [missing-import]
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class DocumentRecord(BaseModel):
    id: str
    filename: str
    file_type: str
    size_bytes: int
    page_count: int
    subsidiary: str
    category: Optional[str] = "Geological & Mining"
    upload_timestamp: datetime = Field(default_factory=datetime.utcnow)
    processing_status: str = "completed"  # processing, completed, failed
    ocr_executed: bool = False
    confidence_score: Optional[float] = 98.6
    anomalies_found: int = 0
    tags: List[str] = []

class ExtractedFieldRecord(BaseModel):
    document_id: str
    mine_name: Optional[str] = None
    company: Optional[str] = "Coal India Limited"
    subsidiary: Optional[str] = None
    financial_year: Optional[str] = None
    production: Optional[float] = None
    production_unit: Optional[str] = "MT"
    coal_grade: Optional[str] = None
    gcv: Optional[float] = None
    seam_thickness: Optional[float] = None
    overburden: Optional[float] = None
    overburden_unit: Optional[str] = "MCM"
    reserves: Optional[float] = None
    exploration_drilling: Optional[float] = None
    source_page: int = 1
    confidence: Optional[float] = 0.98

class ValidationConflict(BaseModel):
    field: str
    doc_a_id: str
    doc_a_name: str
    val_a: Any
    doc_b_id: str
    doc_b_name: str
    val_b: Any
    status: str = "conflict_detected"
    message: str

class RAGQueryRequest(BaseModel):
    question: str
    subsidiary: Optional[str] = "ALL"

class RAGQueryResponse(BaseModel):
    question: str
    answer: str
    sources: List[Dict[str, Any]]
    table_data: Optional[List[Dict[str, Any]]] = []
    confidence: Optional[float] = 98.4
    verification_status: str = "verified_from_documents"

class ReportGenerateRequest(BaseModel):
    title: str
    subsidiary: str = "SECL"
    report_type: str = "Parliamentary Response"
    summary_text: Optional[str] = None
    table_data: Optional[List[Dict[str, Any]]] = []
    key_findings: Optional[List[str]] = []
    recommendations: Optional[List[str]] = []

class AIReportGenerateRequest(BaseModel):
    doc_ids: List[str] = []
    user_brief: Optional[str] = ""
    report_type: Optional[str] = "Parliamentary Response"
    subsidiary: Optional[str] = "SECL"
    custom_title: Optional[str] = None
