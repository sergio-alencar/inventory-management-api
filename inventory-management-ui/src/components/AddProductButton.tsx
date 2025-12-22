// inventory-management-ui/src/components/AddProductButton.tsx

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
      className="max-w-max self-end rounded-lg bg-indigo-950 px-4 py-2 text-xs font-semibold uppercase text-slate-50 shadow transition-colors hover:bg-indigo-900"
    >
      Adicionar Produto
    </button>
  );
};

export default AddProductButton;
