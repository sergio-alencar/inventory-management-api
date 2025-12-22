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
        className="size-6 rotate-180 fill-indigo-950 transition hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronImg />
      </button>

      <span className="select-none font-bold text-indigo-500">
        {current} / {total}
      </span>

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="size-6 fill-indigo-950 transition hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
      >
        <ChevronImg />
      </button>
    </div>
  );
};

export default Pagination;
