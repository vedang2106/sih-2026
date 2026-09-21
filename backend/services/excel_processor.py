# Excel & Spreadsheet Processor Engine using Pandas & OpenPyXL
import pandas as pd
import os
from typing import Dict, Any, List

COLUMN_MAPPING = {
    "mine": ["mine_name", "mine", "block", "colliery", "unit_name"],
    "subsidiary": ["subsidiary", "company", "cbs", "division"],
    "year": ["financial_year", "fy", "year", "period"],
    "production": ["production", "prod", "coal_prod", "achievement", "target"],
    "overburden": ["overburden", "obr", "stripping", "ob_removal"],
    "grade": ["coal_grade", "gcv", "grade", "quality"]
}

def process_excel_document(file_path: str) -> Dict[str, Any]:
    """
    Parses Excel (.xlsx, .xls, .csv) sheets into structured tables and text representations.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Excel file not found at {file_path}")

    ext = os.path.splitext(file_path)[1].lower()
    tables: List[Dict[str, Any]] = []
    text_chunks: List[str] = []

    if ext in ['.csv']:
        df = pd.read_csv(file_path)
        tables.append({"sheet_name": "CSV", "rows": df.to_dict(orient="records"), "columns": list(df.columns)})
        text_chunks.append(df.to_string())
    else:
        excel_file = pd.ExcelFile(file_path)
        for sheet in excel_file.sheet_names:
            df = pd.read_excel(excel_file, sheet_name=sheet)
            tables.append({
                "sheet_name": sheet,
                "rows": df.to_dict(orient="records"),
                "columns": list(df.columns)
            })
            text_chunks.append(f"--- Sheet: {sheet} ---\n" + df.to_string())

    full_text = "\n\n".join(text_chunks)
    return {
        "page_count": len(tables),
        "tables": tables,
        "full_text": full_text,
        "pages": [{"page": idx + 1, "text": t} for idx, t in enumerate(text_chunks)]
    }
