from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from database.models import ReportGenerateRequest, AIReportGenerateRequest
from services.report_service import generate_reportlab_pdf, REPORTS_DIR
from services.ai_report_generator import generate_ai_report_from_docs
import os
import time

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.post("/generate-ai")
def generate_ai_report_endpoint(req: AIReportGenerateRequest):
    """
    Analyzes uploaded documents with Gemini AI and generates structured report payload & PDF.
    """
    try:
        report_id = f"REP-{int(time.time())}"
        
        # 1. Run Gemini AI extraction & report synthesis
        ai_data = generate_ai_report_from_docs(
            doc_ids=req.doc_ids,
            user_brief=req.user_brief or "",
            report_type=req.report_type or "Parliamentary Response",
            subsidiary=req.subsidiary or "SECL",
            custom_title=req.custom_title
        )

        # 2. Build PDF report via ReportLab
        pdf_path = generate_reportlab_pdf(
            report_id=report_id,
            title=ai_data.get("report_title", "Official AI Geological & Mining Brief"),
            subsidiary=ai_data.get("subsidiary", req.subsidiary or "SECL"),
            summary=ai_data.get("executive_summary", ""),
            table_data=ai_data.get("table_data", []),
            key_findings=ai_data.get("key_findings", []),
            recommendations=ai_data.get("recommendations", []),
            source_documents=ai_data.get("source_documents", []),
            report_type=ai_data.get("report_type", req.report_type or "Official Brief")
        )

        ai_data["status"] = "success"
        ai_data["report_id"] = report_id
        ai_data["pdf_filename"] = os.path.basename(pdf_path)
        ai_data["download_url"] = f"/api/reports/{report_id}/download"
        return ai_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Report generation failed: {str(e)}")

@router.post("/generate")
def generate_report(req: ReportGenerateRequest):
    report_id = f"REP-{int(time.time())}"
    pdf_path = generate_reportlab_pdf(
        report_id=report_id,
        title=req.title,
        subsidiary=req.subsidiary,
        summary=req.summary_text,
        table_data=req.table_data,
        key_findings=req.key_findings,
        recommendations=req.recommendations,
        report_type=req.report_type
    )

    return {
        "status": "success",
        "report_id": report_id,
        "filename": os.path.basename(pdf_path),
        "download_url": f"/api/reports/{report_id}/download"
    }

@router.get("/{report_id}/download")
def download_report(report_id: str, format: str = "pdf"):
    pdf_path = os.path.join(REPORTS_DIR, f"{report_id}.pdf")
    if not os.path.exists(pdf_path):
        # Generate on the fly if needed
        pdf_path = generate_reportlab_pdf(
            report_id=report_id,
            title="Official Geological Exploration Brief",
            subsidiary="SECL",
            summary="Generated report document.",
            table_data=[{"Parameter": "Coal Production", "FY25": "195 MT"}]
        )

    return FileResponse(pdf_path, media_type="application/pdf", filename=f"GeoMine_{report_id}.pdf")
