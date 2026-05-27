import React from "react";
import type { Product } from "../domain/Product";

export interface InventoryWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAddClick: () => void;
  showForm: boolean;
  isActive?: boolean;
  onActivate?: () => void;
  zIndex?: number;
  isMinimized?: boolean;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  handleSortChange?: (column: string) => void;
}

export interface NotepadProps {
  isOpen: boolean;
  onClose: () => void;
  isActive?: boolean;
  onActivate?: () => void;
  zIndex?: number;
  onMinimize?: () => void;
  isMinimized?: boolean;
}

export interface WindowProps {
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  defaultPosition?: { x: number; y: number };
  children: React.ReactNode;
  isActive?: boolean;
  onActivate?: () => void;
  zIndex?: number;
  isMinimized?: boolean;
}

export interface WindowTitleBarProps {
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isMobile: boolean;
  isMaximized: boolean;
  onMinimize?: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}
