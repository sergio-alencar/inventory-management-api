// src/components/AddProductButton.tsx

import React from "react";

interface AddProductButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const AddProductButton: React.FC<AddProductButtonProps> = ({
  onClick,
  isLoading,
}) => {
  if (isLoading) return null;

  return (
    <button
      onClick={onClick}
      className="mx-6 mb-6 max-w-max self-end rounded-lg bg-blue-950 px-4 py-2 text-right text-sm font-semibold uppercase text-white shadow transition duration-150 hover:bg-blue-900"
    >
      Adicionar Produto
    </button>
  );
};

export default AddProductButton;
