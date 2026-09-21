from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from database.models import ReportGenerateRequest
from services.report_service import generate_reportlab_pdf, REPORTS_DIR
import os
import time

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.post("/generate")
def generate_report(req: ReportGenerateRequest):
    report_id = f"REP-{int(time.time())}"
    pdf_path = generate_reportlab_pdf(
        report_id=report_id,
        title=req.title,
        subsidiary=req.subsidiary,
        summary=req.summary_text,
        table_data=req.table_data
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
