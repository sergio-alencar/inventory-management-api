// inventory-management-ui/src/components/images/ChevronImg.tsx

import React from "react";

interface IconProps {
  className?: string;
  title?: string;
}

export const ChevronImg: React.FC<IconProps> = ({ className = "", title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
      aria-hidden={title ? "false" : "true"}
    >
      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
  );
};
