// src/components/ErrorModal.tsx

import React from "react";

interface ErrorModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-surface-light dark:bg-card-dark w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
        <h3 className="text-error-primary mb-2 text-lg font-bold leading-6">
          Erro
        </h3>
        <p className="text-card-dark dark:text-card-light mb-6 text-sm">
          {message}
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-card-dark bg-card-light dark:text-card-light dark:bg-brand-primary rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:scale-105"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
