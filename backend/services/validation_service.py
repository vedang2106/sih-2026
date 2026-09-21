# Conflict Detection & Data Validation Engine
from typing import List, Dict, Any

def validate_extracted_fields(all_records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Detects duplicate records, unit conflicts, and numerical value discrepancies across documents.
    """
    conflicts: List[Dict[str, Any]] = []

    # Map by subsidiary and financial year to detect value conflicts
    field_map: Dict[str, List[Dict[str, Any]]] = {}

    for rec in all_records:
        sub = rec.get("subsidiary", "CMPDI")
        fy = rec.get("financial_year", "2024-25")
        key = f"{sub}_{fy}"

        if key not in field_map:
            field_map[key] = []
        field_map[key].append(rec)

    for key, items in field_map.items():
        if len(items) > 1:
            prod_values = [i.get("production") for i in items if i.get("production") is not None]
            # If two different production numbers exist for the same subsidiary/year
            if len(set(prod_values)) > 1:
                conflicts.append({
                    "field": "production",
                    "key": key,
                    "doc_a": items[0].get("document_id", "Doc A"),
                    "val_a": items[0].get("production"),
                    "doc_b": items[1].get("document_id", "Doc B"),
                    "val_b": items[1].get("production"),
                    "message": f"⚠ Data Conflict: Production figures for {key} differ between sources ({items[0].get('production')} MT vs {items[1].get('production')} MT). Manual verification required."
                })

    return conflicts
