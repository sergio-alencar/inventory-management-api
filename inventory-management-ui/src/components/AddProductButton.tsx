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
      className="bg-brand-dark text-surface-light dark:bg-brand-primary min-w-full self-center whitespace-normal rounded-lg px-3 py-2 text-xs font-semibold uppercase shadow transition-all duration-150 hover:scale-105 md:min-w-fit md:max-w-max md:self-end md:text-sm"
    >
      Adicionar Produto
    </button>
  );
};

export default AddProductButton;
