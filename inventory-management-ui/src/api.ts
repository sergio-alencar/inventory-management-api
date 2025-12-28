// inventory-management-ui/src/api.ts

import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Product, ProductFormData, PagedResponse } from "./types";

const API_URL = "http://localhost:5155/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = (
  page: number,
  pageSize: number,
): Promise<AxiosResponse<PagedResponse<Product>>> => {
  return api.get<PagedResponse<Product>>("/products", {
    params: {
      pageNumber: page,
      pageSize: pageSize,
    },
  });
};

export const fetchProductById = (
  id: number,
): Promise<AxiosResponse<Product>> => {
  return api.get<Product>(`/products/${id}`);
};

export const createProduct = (
  product: ProductFormData,
): Promise<AxiosResponse<Product>> => {
  return api.post<Product>("/products", product);
};

export const updateProduct = (
  id: number,
  product: Product,
): Promise<AxiosResponse<Product>> => {
  return api.put<Product>(`/products/${id}`, product);
};

export const deleteProduct = (id: number): Promise<AxiosResponse<void>> => {
  return api.delete<void>(`/products/${id}`);
};
