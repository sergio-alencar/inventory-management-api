// src/components/ConfirmModal.tsx

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

const ConfirmModal: React.FC<ConfirmModalProps> = ({
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
        className="bg-surface-light dark:bg-card-dark w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-center align-middle shadow-xl transition-all md:text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-surface-dark dark:text-surface-light mb-2 text-lg font-bold leading-6">
          {title}
        </h3>
        <p className="dark:text-card-light text-card-dark mb-6 text-sm">
          {message}
        </p>

        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="flex min-w-full items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 transition hover:scale-105 md:min-w-fit dark:text-slate-400"
          >
            <div className="dark:fill-slate4200 size-6 fill-slate-400">
              <CancelImg />
            </div>
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="text-surface-light flex min-w-full items-center justify-center gap-1 text-nowrap rounded-lg bg-red-800 px-3 py-2 text-sm font-semibold shadow shadow-red-200 transition hover:scale-105 md:min-w-fit dark:shadow-red-950"
          >
            <div className="fill-surface-light size-6">
              <DeleteImg />
            </div>
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
