import React from "react";
import type { AddProductButtonProps } from "@/types/components/inventory";

export const AddProductButton: React.FC<AddProductButtonProps> = ({
  onClick,
  isLoading,
}) => {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className="retro-btn w-full self-center md:w-auto md:self-end"
    >
      {isLoading ? "Loading..." : "Add Product"}
    </button>
  );
};
