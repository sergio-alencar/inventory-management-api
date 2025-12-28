// inventory-management-ui/src/components/Pagination.tsx

import React from "react";
import { ChevronImg } from "./images/ChevronImg";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="transition hover:scale-125 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronImg className="fill-blue-darker dark:fill-gray-light size-6 rotate-180" />
      </button>

      <span className="dark:text-gray-light select-none font-bold">
        {current} / {total}
      </span>

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="transition hover:scale-125 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronImg className="fill-blue-darker dark:fill-gray-dark size-6" />
      </button>
    </div>
  );
};
