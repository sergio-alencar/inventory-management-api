// inventory-management-ui/src/api.ts

import axios from "axios";
import type { Product } from "./types/Product";

const api = axios.create({
  baseURL: "http://localhost:5155/api",
});

export const fetchProducts = (page: number = 1, size: number = 5) =>
  api.get(`/Products?pageNumber=${page}&pageSize=${size}`);

export const createProduct = (product: Omit<Product, "id" | "createdDate">) =>
  api.post<Product>("/Products", product);

export const updateProduct = (
  id: number,
  product: Omit<Product, "createdDate">,
) => api.put(`/Products/${id}`, product);

export const deleteProduct = (id: number) => api.delete(`/Products/${id}`);

export default api;
