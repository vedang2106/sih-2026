# GeoMine AI - Python FastAPI Backend Entry Point
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.documents import router as documents_router
from api.chatbot import router as chatbot_router
from api.reports import router as reports_router
from api.analytics import router as analytics_router
from api.topics import router as topics_router
from api.health import router as health_router

app = FastAPI(
    title="CMPDI / CIL AI Intelligence Platform API",
    description="Python FastAPI backend powering real PDF/OCR parsing, ChromaDB RAG, MongoDB storage, ReportLab generators, and TF-IDF topic analytics.",
    version="3.0.0"
)

# Enable CORS for React Vite frontend (port 5173 / localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health_router)
app.include_router(documents_router)
app.include_router(chatbot_router)
app.include_router(reports_router)
app.include_router(analytics_router)
app.include_router(topics_router)

@app.get("/")
def root():
    return {
        "title": "CMPDI / CIL AI Intelligence Platform API",
        "status": "Online",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
