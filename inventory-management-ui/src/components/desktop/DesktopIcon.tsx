import React from "react";
import type { DesktopIconProps } from "@/types/components/desktop";

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  onClick,
  onDoubleClick,
  selected,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.innerWidth < 768) {
      onDoubleClick();
    } else {
      onClick();
    }
  };

  return (
    <div
      className="flex cursor-pointer select-none flex-col items-center p-1"
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="text-4xl">{icon}</div>
      <span
        className={`mt-1 px-1 text-xs ${
          selected ? "desktop-icon-selected text-white" : "text-white"
        }`}
      >
        {label}
      </span>
    </div>
  );
};
