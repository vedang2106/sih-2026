// GeoMine AI - Central FastAPI API Service Client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const DEFAULT_TIMEOUT_MS = 5000; // 5s timeout to ensure fast responsiveness & quick fallback

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...fetchOptions,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error(`API Request timed out after ${timeout}ms`);
    }
    throw error;
  }
}

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

    const res = await fetchWithTimeout(`${API_BASE_URL}/api/documents/upload`, {
      method: 'POST',
      body: formData,
      timeout: 30000 // File upload allowed up to 30s
    });
    return handleResponse(res);
  },

  async getDocuments(subsidiary = 'ALL') {
    const url = new URL(`${API_BASE_URL}/api/documents`);
    if (subsidiary !== 'ALL') url.searchParams.append('subsidiary', subsidiary);
    const res = await fetchWithTimeout(url, { timeout: 4000 });
    return handleResponse(res);
  },

  async getDocumentDetail(docId) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/documents/${docId}`, { timeout: 4000 });
    return handleResponse(res);
  },

  async deleteDocument(docId) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/documents/${docId}`, { method: 'DELETE', timeout: 5000 });
    return handleResponse(res);
  },

  // 2. Chatbot & Real RAG API
  async queryRAG(question, subsidiary = 'ALL') {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/chat/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, subsidiary }),
      timeout: 10000
    });
    return handleResponse(res);
  },

  async getChatHistory() {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/chat/history`, { timeout: 4000 });
    return handleResponse(res);
  },

  // 3. Reports API
  async generateReport(reportConfig) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/reports/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportConfig),
      timeout: 15000
    });
    return handleResponse(res);
  },

  async getReports() {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/reports`, { timeout: 4000 });
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
    const res = await fetchWithTimeout(url, { timeout: 4000 });
    return handleResponse(res);
  },

  // 5. Analytics API
  async getAnalytics(subsidiary = 'ALL') {
    const url = new URL(`${API_BASE_URL}/api/analytics/documents`);
    if (subsidiary !== 'ALL') url.searchParams.append('subsidiary', subsidiary);
    const res = await fetchWithTimeout(url, { timeout: 4000 });
    return handleResponse(res);
  },

  async getProductionAnalytics(subsidiary = 'ALL') {
    const url = new URL(`${API_BASE_URL}/api/analytics/production`);
    if (subsidiary !== 'ALL') url.searchParams.append('subsidiary', subsidiary);
    const res = await fetchWithTimeout(url, { timeout: 4000 });
    return handleResponse(res);
  },

  // 6. System Health Check API
  async getHealth() {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/health`, { timeout: 3000 });
    return handleResponse(res);
  }
};

