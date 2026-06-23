// client/src/services/api.js
// Centralised Axios instance and API call functions for the
// HimShakti backend (Express server on localhost:5000).

import axios from "axios";

// Base URL — set VITE_API_URL in client/.env to override
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Health Check ──────────────────────────────────────────────────────────
export const checkHealth = () => api.get("/health");

// ── Generation ───────────────────────────────────────────────────────────
// data: { productName, ingredients, weight, category, features, platform, tone, keywords }
export const generateDescription = (data) => api.post("/generate", data);

// ── Products (Saved Listings) ───────────────────────────────────────────
export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);
export const saveProduct = (data) => api.post("/products", data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;
