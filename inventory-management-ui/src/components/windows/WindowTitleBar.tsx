import React from "react";
import { FolderIcon } from "@/components/icons/FolderIcon";
import type { WindowTitleBarProps } from "@/types/components/windows";

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  title,
  icon,
  isActive,
  isMobile,
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
  onMouseDown,
}) => {
  return (
    <div
      className={`flex select-none items-center justify-between px-1 py-[2px] text-sm font-bold text-white ${
        isMobile ? "" : "cursor-default"
      }`}
      style={{
        background: isActive
          ? "linear-gradient(90deg, #000080, #1084d0)"
          : "linear-gradient(90deg, #808080, #a0a0a0)",
      }}
      onMouseDown={onMouseDown}
    >
      <span className="flex items-center gap-1">
        {icon ? icon : <FolderIcon className="h-4 w-4" />}
        <span>{title}</span>
      </span>

      <div className="flex gap-1">
        <button className="retro-btn px-2 py-0 text-xs" onClick={onMinimize}>
          _
        </button>

        {/* maximize button -> only on desktop */}
        {!isMobile && (
          <button className="retro-btn px-2 py-0 text-xs" onClick={onMaximize}>
            {isMaximized ? "❐" : "□"}
          </button>
        )}

        <button className="retro-btn px-2 py-0 text-xs" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};
