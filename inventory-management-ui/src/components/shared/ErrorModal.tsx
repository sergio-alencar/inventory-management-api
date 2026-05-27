import React from "react";
import type { ErrorModalProps } from "@/types/components/shared";

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border-2 border-solid border-b-win98-shadow border-l-win98-highlight border-r-win98-shadow border-t-win98-highlight bg-win98-bg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="window-title">
          <span>Error</span>
          <button className="retro-btn px-2 py-0 text-xs" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="mb-6 text-sm">{message}</p>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="retro-btn">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
