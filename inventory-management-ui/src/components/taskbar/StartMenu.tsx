import React, { useRef, useEffect, useState } from "react";
import { WindowIcon } from "../icons/WindowIcon";
import { FolderIcon } from "../icons/FolderIcon";
import windowIcon from "@/assets/images/windows-98-icon.png";
import notepadIcon from "@/assets/images/notepad-icon.png";
import type { StartMenuProps } from "@/types/components/taskbar";

export const StartMenu: React.FC<StartMenuProps> = ({
  onOpenInventory,
  onOpenReadMe,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const handleMenuItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="retro-btn px-4 py-1 font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={windowIcon}
          alt="Window"
          className="mr-1 inline-block h-4 pb-1"
        />
        Start
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-full left-0 z-50 mb-1 border-2 border-solid border-b-win98-shadow border-l-win98-highlight border-r-win98-shadow border-t-win98-highlight bg-win98-bg"
          style={{ minWidth: "160px" }}
        >
          <div className="py-1">
            <button
              className="flex w-full items-center px-4 py-2 text-left text-xs hover:bg-win98-title hover:text-white"
              onClick={() => handleMenuItemClick(onOpenInventory)}
            >
              <FolderIcon className="mr-2 h-4 w-4" />
              Inventory
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-left text-xs hover:bg-win98-title hover:text-white"
              onClick={() => handleMenuItemClick(onOpenReadMe)}
            >
              <img src={notepadIcon} alt="Notepad" className="mr-2 h-4 w-4" />
              README
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
