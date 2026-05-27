import type { Product } from "../domain/Product";

export interface AddProductButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export interface ProductFormProps {
  productToEdit: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

export interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAddClick: () => void;
  showForm: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  handleSortChange?: (column: string) => void;
}
