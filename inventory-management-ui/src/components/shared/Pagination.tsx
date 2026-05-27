import React from "react";
import type { PaginationProps } from "@/types/components/shared";

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="retro-btn"
      >
        « Prev
      </button>

      <span className="mx-2 text-sm">
        Page {current} of {total}
      </span>

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="retro-btn"
      >
        Next »
      </button>
    </div>
  );
};
