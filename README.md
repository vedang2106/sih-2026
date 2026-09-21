# GeoMine AI - CMPDI & CIL Full-Stack Intelligence Platform (SIH-26023)

AI-Powered Geological, Mining, and Production Reporting Solution for **Central Mine Planning & Design Institute (CMPDI)** and **Coal India Limited (CIL) Subsidiaries** (ECL, BCCL, CCL, NCL, WCL, SECL, MCL, NEC).

---

## 🏗 Architecture

- **Frontend**: React 19 + Vite + Tailwind CSS (Clean White Enterprise Government Theme).
- **Backend API**: Python 3.13 + FastAPI + PyMuPDF + EasyOCR + Pandas + Scikit-learn + ReportLab.
- **Vector DB & RAG**: ChromaDB persistent vector search + page-preserved chunking + strict evidence citations.
- **Database**: MongoDB (with resilient local file storage fallback).

---

## 🚀 Running the Full-Stack Application

### 1. Start Python FastAPI Backend Server
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
API Documentation will be available at `http://localhost:8000/docs`.

### 2. Start React Frontend Server
```bash
cd frontend
npm install
npm run dev
```
User Interface will be available at `http://localhost:5173/`.

---

## 🎯 Key Features & Modules

1. **Executive Intelligence Dashboard**: Measured database analytics, coal production trends, and geological reserve summaries.
2. **Document Ingestion & Data Validation**: PyMuPDF page-by-page text parsing, OCR for scanned documents, Excel table processing, and cross-document data conflict detection.
3. **Module 1: Report Generator**: ReportLab PDF and python-docx export with official letterhead formatting.
4. **Module 2: Word Cloud & Topic Identification**: TF-IDF N-gram topic extraction and interactive word cloud visualization.
5. **Module 3: AI Assistant & RAG Query Engine**: ChromaDB vector search returning answers with exact source file names and page number citations.
6. **System Health Check**: Live component status monitoring for API, MongoDB, Vector Store, OCR Engine, and Storage.
