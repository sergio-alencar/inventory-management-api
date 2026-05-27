import React from "react";
import { Window } from "./Window";
import { ProductList } from "../inventory/ProductList";
import type { InventoryWindowProps } from "@/types/components/windows";

export const InventoryWindow: React.FC<InventoryWindowProps> = ({
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  products,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onAddClick,
  showForm,
  isActive,
  onActivate,
  zIndex,
  isMinimized,
  sortBy,
  sortDirection,
  handleSortChange,
}) => (
  <Window
    title="Inventory"
    isOpen={isOpen}
    onClose={onClose}
    onMinimize={onMinimize}
    onMaximize={onMaximize}
    isMaximized={isMaximized}
    defaultPosition={{ x: 100, y: 50 }}
    isActive={isActive}
    onActivate={onActivate}
    zIndex={zIndex}
    isMinimized={isMinimized}
  >
    <ProductList
      products={products}
      loading={loading}
      error={error}
      onEdit={onEdit}
      onDelete={onDelete}
      showForm={showForm}
      onAddClick={onAddClick}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      sortBy={sortBy}
      sortDirection={sortDirection}
      handleSortChange={handleSortChange}
    />
  </Window>
);
