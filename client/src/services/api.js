// client/src/services/api.js
// Centralised Axios instance and API functions.

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ── Health ────────────────────────────────────────────────────────────────
export const checkHealth = () => api.get("/health");

// ── Generation ────────────────────────────────────────────────────────────
export const generateDescription = (data) => api.post("/generate", data);

// ── Products ──────────────────────────────────────────────────────────────
// params: { page, limit, platform }
export const getProducts    = (params = {}) => api.get("/products", { params });
export const getProduct     = (id)          => api.get(`/products/${id}`);
export const saveProduct    = (data)        => api.post("/products", data);
export const updateProduct  = (id, data)   => api.put(`/products/${id}`, data);
export const deleteProduct  = (id)         => api.delete(`/products/${id}`);
export const searchProducts = (q)          => api.get("/products/search", { params: { q } });

export default api;