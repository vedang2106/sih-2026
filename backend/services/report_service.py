# ReportLab PDF Generation Engine for GeoMine AI Document Reports
import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from typing import Dict, Any, List, Optional

REPORTS_DIR = os.path.join(os.path.dirname(__file__), "..", "generated_reports")

def generate_reportlab_pdf(
    report_id: str,
    title: str,
    subsidiary: str,
    summary: str,
    table_data: List[Dict[str, Any]],
    key_findings: Optional[List[str]] = None,
    recommendations: Optional[List[str]] = None,
    source_documents: Optional[List[str]] = None,
    report_type: str = "Official Brief"
) -> str:
    """
    Generates an official formatted PDF document using ReportLab based on uploaded documents.
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
        fontSize=15,
        textColor=colors.HexColor('#0f172a'),
        alignment=1,
        spaceAfter=3
    )
    sub_style = ParagraphStyle(
        'GovSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        textColor=colors.HexColor('#475569'),
        alignment=1,
        spaceAfter=10
    )

    story.append(Paragraph("CENTRAL MINE PLANNING & DESIGN INSTITUTE (CMPDI)", title_style))
    story.append(Paragraph("A Subsidiary of Coal India Limited | Ministry of Coal, Govt. of India", sub_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=12))

    # Document Section Header
    doc_header = ParagraphStyle(
        'DocHead',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6
    )

    story.append(Paragraph(title, doc_header))
    if source_documents:
        sources_str = ", ".join(source_documents)
        story.append(Paragraph(f"<b>Source Documents:</b> {sources_str}", styles['Italic']))
    story.append(Spacer(1, 8))

    # Executive Summary Paragraph
    story.append(Paragraph("<b>1. Executive Summary & Synthesis</b>", styles['Heading3']))
    story.append(Paragraph(summary or "Official document report synthesized from uploaded brief.", styles['BodyText']))
    story.append(Spacer(1, 10))

    # Key Findings Bullet Points
    if key_findings:
        story.append(Paragraph("<b>2. Key Analytical Highlights & Findings</b>", styles['Heading3']))
        for finding in key_findings:
            bullet_p = Paragraph(f"• &nbsp; {finding}", styles['BodyText'])
            story.append(bullet_p)
            story.append(Spacer(1, 3))
        story.append(Spacer(1, 10))

    # Table Section
    if table_data:
        story.append(Paragraph("<b>3. Extracted Verified Data Table</b>", styles['Heading3']))
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
        story.append(Spacer(1, 12))

    # Strategic Recommendations
    if recommendations:
        story.append(Paragraph("<b>4. Strategic Recommendations</b>", styles['Heading3']))
        for rec in recommendations:
            bullet_p = Paragraph(f"• &nbsp; {rec}", styles['BodyText'])
            story.append(bullet_p)
            story.append(Spacer(1, 3))

    doc.build(story)
    return pdf_path
