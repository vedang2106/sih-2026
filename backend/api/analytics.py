import os
import sys
from fastapi import APIRouter
from typing import Optional

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from services.analytics_service import get_measured_analytics, get_dynamic_production_data
except ImportError:
    from backend.services.analytics_service import get_measured_analytics, get_dynamic_production_data

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/documents")
def get_analytics(subsidiary: Optional[str] = "ALL"):
    return get_measured_analytics(subsidiary)

@router.get("/production")
def get_production_analytics(subsidiary: Optional[str] = "ALL"):
    return {"production_trend": get_dynamic_production_data(subsidiary)}
