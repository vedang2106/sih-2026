# ReportLab PDF & DOCX Generation Engine
import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from typing import Dict, Any, List

REPORTS_DIR = os.path.join(os.path.dirname(__file__), "..", "generated_reports")

def generate_reportlab_pdf(report_id: str, title: str, subsidiary: str, summary: str, table_data: List[Dict[str, Any]]) -> str:
    """
    Generates an official formatted PDF document using ReportLab.
    """
    os.makedirs(REPORTS_DIR, exist_ok=True)
    pdf_filename = f"{report_id}.pdf"
    pdf_path = os.path.join(REPORTS_DIR, pdf_filename)

    doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()

    story = []

    # Title & Header
    title_style = ParagraphStyle(
        'GovTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        textColor=colors.HexColor('#0f172a'),
        alignment=1,
        spaceAfter=4
    )
    sub_style = ParagraphStyle(
        'GovSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        textColor=colors.HexColor('#475569'),
        alignment=1,
        spaceAfter=12
    )

    story.append(Paragraph("CENTRAL MINE PLANNING & DESIGN INSTITUTE (CMPDI)", title_style))
    story.append(Paragraph("A Subsidiary of Coal India Limited | Ministry of Coal, Govt. of India", sub_style))
    story.append(Spacer(1, 10))

    # Document Section Header
    doc_header = ParagraphStyle(
        'DocHead',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6
    )
    story.append(Paragraph(title, doc_header))
    story.append(Paragraph(f"<b>Subsidiary:</b> {subsidiary} | <b>Ref No:</b> {report_id}", styles['Normal']))
    story.append(Spacer(1, 12))

    # Executive Summary Paragraph
    story.append(Paragraph("<b>1. Executive Summary & AI Findings</b>", styles['Heading3']))
    story.append(Paragraph(summary or "Official report generated via GeoMine AI Platform.", styles['BodyText']))
    story.append(Spacer(1, 14))

    # Table Section
    if table_data:
        story.append(Paragraph("<b>2. Verified Production & Exploration Figures</b>", styles['Heading3']))
        headers = list(table_data[0].keys())
        data_matrix = [[Paragraph(f"<b>{h}</b>", styles['Normal']) for h in headers]]
        
        for row in table_data:
            data_matrix.append([Paragraph(str(row.get(h, '')), styles['Normal']) for h in headers])

        t = Table(data_matrix)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f1f5f9')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(t)

    doc.build(story)
    return pdf_path
