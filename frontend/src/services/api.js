// GeoMine AI - Central FastAPI API Service Client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function handleResponse(res) {
  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    throw new Error(`API Error (${res.status}): ${errorText}`);
  }
  return res.json();
}

export const api = {
  // 1. Documents API
  async uploadDocument(file, subsidiary = 'CMPDI') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subsidiary', subsidiary);

    const res = await fetch(`${API_BASE_URL}/api/documents/upload`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(res);
  },

  async getDocuments(subsidiary = 'ALL') {
    const url = new URL(`${API_BASE_URL}/api/documents`);
    if (subsidiary !== 'ALL') url.searchParams.append('subsidiary', subsidiary);
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getDocumentDetail(docId) {
    const res = await fetch(`${API_BASE_URL}/api/documents/${docId}`);
    return handleResponse(res);
  },

  async deleteDocument(docId) {
    const res = await fetch(`${API_BASE_URL}/api/documents/${docId}`, { method: 'DELETE' });
    return handleResponse(res);
  },

  // 2. Chatbot & Real RAG API
  async queryRAG(question, subsidiary = 'ALL') {
    const res = await fetch(`${API_BASE_URL}/api/chat/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, subsidiary }),
    });
    return handleResponse(res);
  },

  async getChatHistory() {
    const res = await fetch(`${API_BASE_URL}/api/chat/history`);
    return handleResponse(res);
  },

  // 3. Reports API
  async generateReport(reportConfig) {
    const res = await fetch(`${API_BASE_URL}/api/reports/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportConfig),
    });
    return handleResponse(res);
  },

  async getReports() {
    const res = await fetch(`${API_BASE_URL}/api/reports`);
    return handleResponse(res);
  },

  getReportDownloadUrl(reportId, format = 'pdf') {
    return `${API_BASE_URL}/api/reports/${reportId}/download?format=${format}`;
  },

  // 4. Topics & Word Cloud API
  async getTopics(subsidiary = 'ALL', category = 'ALL') {
    const url = new URL(`${API_BASE_URL}/api/topics`);
    if (subsidiary !== 'ALL') url.searchParams.append('subsidiary', subsidiary);
    if (category !== 'ALL') url.searchParams.append('category', category);
    const res = await fetch(url);
    return handleResponse(res);
  },

  // 5. Analytics API
  async getAnalytics(subsidiary = 'ALL') {
    const url = new URL(`${API_BASE_URL}/api/analytics/documents`);
    if (subsidiary !== 'ALL') url.searchParams.append('subsidiary', subsidiary);
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getProductionAnalytics(subsidiary = 'ALL') {
    const url = new URL(`${API_BASE_URL}/api/analytics/production`);
    if (subsidiary !== 'ALL') url.searchParams.append('subsidiary', subsidiary);
    const res = await fetch(url);
    return handleResponse(res);
  },

  // 6. System Health Check API
  async getHealth() {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    return handleResponse(res);
  }
};
