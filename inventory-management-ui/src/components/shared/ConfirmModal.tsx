import React, { useEffect } from "react";
import type { ConfirmModalProps } from "@/types/components/shared";

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md border-2 border-solid border-b-win98-shadow border-l-win98-highlight border-r-win98-shadow border-t-win98-highlight bg-win98-bg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="window-title">
          <span>{title}</span>
          <button className="retro-btn px-2 py-0 text-xs" onClick={onCancel}>
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="mb-6 text-sm">{message}</p>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onCancel} className="retro-btn">
              Cancel
            </button>

            <button type="button" onClick={onConfirm} className="retro-btn">
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
