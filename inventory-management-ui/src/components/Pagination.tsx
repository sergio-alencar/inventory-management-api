// inventory-management-ui/src/components/Pagination.tsx

import React from "react";
import ChevronImg from "./images/ChevronImg";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="dark:fill-brand-light fill-brand-dark size-6 rotate-180 transition hover:scale-125 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronImg />
      </button>

      <span className="text-brand-primary select-none font-bold">
        {current} / {total}
      </span>

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="fill-brand-dark dark:fill-brand-light size-6 transition hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronImg />
      </button>
    </div>
  );
};

export default Pagination;
