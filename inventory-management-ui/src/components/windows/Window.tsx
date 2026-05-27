import React, { useState, useCallback, useRef, useEffect } from "react";
import type { WindowProps } from "@/types/components/windows";
import { WindowTitleBar } from "./WindowTitleBar";

export const Window: React.FC<WindowProps> = ({
  title,
  icon,
  isOpen,
  onClose,
  onMaximize,
  isMaximized: externalMaximized,
  defaultPosition = { x: 50, y: 50 },
  children,
  isActive,
  onActivate,
  zIndex = 10,
  onMinimize = () => {},
  isMinimized,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const maximized = isMobile ? true : externalMaximized;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (maximized || isMobile) {
        return;
      }

      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();

      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [maximized, isMobile],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen || isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onActivate?.()}
      className={`flex flex-col border-2 border-solid border-b-win98-shadow border-l-win98-highlight border-r-win98-shadow border-t-win98-highlight bg-win98-bg ${
        maximized ? "absolute inset-0 z-10" : "absolute"
      }`}
      style={
        maximized
          ? { zIndex }
          : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: "90%",
              maxWidth: "800px",
              height: "auto",
              maxHeight: "80vh",
              zIndex,
            }
      }
    >
      <WindowTitleBar
        title={title}
        icon={icon}
        isActive={isActive}
        isMobile={isMobile}
        isMaximized={externalMaximized}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        onMouseDown={handleMouseDown}
      />

      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
};
