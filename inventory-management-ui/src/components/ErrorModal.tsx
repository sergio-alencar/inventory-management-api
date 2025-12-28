// inventory-management-ui/src/components/ErrorModal.tsx

import React from "react";

interface ErrorModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="dark:bg-blue-darker w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
        <h3 className="text-red-primary mb-2 text-lg font-bold leading-6">
          Erro
        </h3>
        <p className="text-blue-darker dark:text-gray-light mb-6 text-sm">
          {message}
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-blue-light text-gray-light rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:scale-105"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
