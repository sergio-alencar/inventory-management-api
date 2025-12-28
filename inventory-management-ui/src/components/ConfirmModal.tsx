// inventory-management-ui/src/components/ConfirmModal.tsx

import React, { useEffect } from "react";
import { DeleteImg } from "./images/DeleteImg";
import { CancelImg } from "./images/CancelImg";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="dark:bg-blue-darker w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-center align-middle shadow-xl transition-all md:text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-blue-darker dark:text-gray-light mb-2 text-lg font-bold leading-6">
          {title}
        </h3>
        <p className="text-blue-darker dark:text-gray-dark mb-6 text-sm">
          {message}
        </p>

        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="flex min-w-full items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 transition hover:scale-105 md:min-w-fit"
          >
            <CancelImg className="size-6 fill-slate-500" />
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-primary text-gray-light flex min-w-full items-center justify-center gap-1 text-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition hover:scale-105 md:min-w-fit"
          >
            <DeleteImg className="fill-gray-light size-6" />
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
