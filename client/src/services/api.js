// client/src/services/api.js
// Centralised Axios instance and API functions.

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // needed so the httpOnly cookie set by /auth/login is sent
});

// ── Auth token attachment ───────────────────────────────────────────────
// AuthContext calls setAuthToken() whenever the token changes (login,
// logout, OAuth callback, app boot from localStorage). Every request made
// through this shared `api` instance picks it up automatically.
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// ── Health ────────────────────────────────────────────────────────────────
export const checkHealth = () => api.get("/health");

// ── Auth ──────────────────────────────────────────────────────────────────
export const registerUser  = (data) => api.post("/auth/register", data);
export const loginUser     = (data) => api.post("/auth/login", data);
export const getMe         = ()     => api.get("/auth/me");
export const logoutUser    = ()     => api.post("/auth/logout");
export const googleLoginUrl = () => `${BASE_URL}/auth/google`;

// ── Dashboard ─────────────────────────────────────────────────────────────
export const getDashboardStats = () => api.get("/dashboard/stats");

// ── Generation ────────────────────────────────────────────────────────────
export const generateDescription   = (data)     => api.post("/generate", data);
export const regenerateDescription = (id, data) => api.post(`/generate/regenerate/${id}`, data);
export const getSavedDescriptions  = ()         => api.get("/generate");
export const getSavedDescription   = (id)       => api.get(`/generate/${id}`);
export const deleteSavedDescription = (id)      => api.delete(`/generate/${id}`);

// ── Products ──────────────────────────────────────────────────────────────
// params: { page, limit, platform }
export const getProducts    = (params = {}) => api.get("/products", { params });
export const getProduct     = (id)          => api.get(`/products/${id}`);
export const saveProduct    = (data)        => api.post("/products", data);
export const updateProduct  = (id, data)   => api.put(`/products/${id}`, data);
export const deleteProduct  = (id)         => api.delete(`/products/${id}`);
export const searchProducts = (q)          => api.get("/products/search", { params: { q } });

export default api;
