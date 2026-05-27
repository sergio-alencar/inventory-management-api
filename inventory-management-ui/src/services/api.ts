import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import type { Product, ProductFormData, PagedResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5155/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApiError {
  status: number;
  message: string;
  details?: string;
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    let normalizedError: ApiError = {
      status: 0,
      message: "An unexpected error occurred. Please try again.",
    };

    if (error.response) {
      const status = error.response.status;
      normalizedError.status = status;

      const data = error.response.data;
      if (data && typeof data === "object" && "message" in data) {
        normalizedError.message = data.message;
      } else if (typeof data === "string") {
        normalizedError.message = data;
      } else {
        switch (status) {
          case 400:
            normalizedError.message =
              "Invalid request. Please check your data.";
            break;
          case 401:
            normalizedError.message = "Session expired. Please log in again.";
            // window.location.href = '/login';
            break;
          case 403:
            normalizedError.message =
              "You do not have permission to perform this action.";
            break;
          case 404:
            normalizedError.message = "The requested resource was not found.";
            break;
          case 409:
            normalizedError.message =
              "A conflict occurred. The resource may already exist.";
            break;
          case 422:
            normalizedError.message =
              "Validation error. Please review the fields.";
            break;
          case 500:
            normalizedError.message =
              "Internal server error. Please try again later.";
            break;
          default:
            normalizedError.message = `Request failed with status ${status}.`;
        }
      }

      if (data?.errors) {
        normalizedError.details = JSON.stringify(data.errors);
      }
    } else if (error.request) {
      normalizedError.status = 0;
      normalizedError.message = "Network error. Please check your connection.";
    } else {
      normalizedError.status = -1;
      normalizedError.message = error.message || "Request configuration error.";
    }

    console.error(
      `[API Error] ${normalizedError.status}: ${normalizedError.message}`,
    );
    return Promise.reject(normalizedError);
  },
);

export const fetchProducts = (
  page: number,
  pageSize: number,
  sortBy?: string,
  sortDirection?: string,
): Promise<AxiosResponse<PagedResponse<Product>>> => {
  return api.get<PagedResponse<Product>>("/products", {
    params: {
      pageNumber: page,
      pageSize,
      sortBy,
      sortDirection,
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
