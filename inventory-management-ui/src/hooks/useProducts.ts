import { useCallback, useEffect, useState } from "react";
import type { Product } from "../types";
import { deleteProduct, fetchProducts, type ApiError } from "../services/api";

const PAGE_SIZE = 5;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const loadData = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const response = await fetchProducts(
          page,
          PAGE_SIZE,
          sortBy,
          sortDirection,
        );

        if (response.data) {
          setProducts(response.data.items);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.pageNumber);
        }

        setError(null);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || "Failed to fetch products.");
        console.error(apiError);
      } finally {
        setLoading(false);
      }
    },
    [sortBy, sortDirection],
  );

  useEffect(() => {
    setCurrentPage(1);
    loadData(1);
  }, [sortBy, sortDirection]);

  useEffect(() => {
    loadData(currentPage);
  }, [loadData, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (id: number): Promise<string | null> => {
    try {
      await deleteProduct(id);
      loadData(currentPage);
      return null;
    } catch (err) {
      const apiError = err as ApiError;
      return apiError.message || "Error occurred while deleting product.";
    }
  };

  const refresh = () => loadData(1);

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    handleDelete,
    refresh,
    setPage: setCurrentPage,
    sortBy,
    sortDirection,
    handleSortChange,
  };
}
