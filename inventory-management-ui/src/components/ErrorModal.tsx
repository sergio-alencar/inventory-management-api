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
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <h3 className="mb-2 text-lg font-bold leading-6 text-red-600">Erro</h3>
        <p className="mb-6 text-sm text-gray-500">{message}</p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
