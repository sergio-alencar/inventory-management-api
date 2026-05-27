import React from "react";
import { WindowIcon } from "../icons/WindowIcon";
import type { FooterProps } from "@/types/components/taskbar";
import { TaskbarClock } from "./TaskbarClock";
import { StartMenu } from "./StartMenu";

export const Footer: React.FC<FooterProps> = ({
  onOpenInventory,
  onOpenReadMe,
  windows,
}) => {
  return (
    <footer className="flex select-none items-center border-t-2 border-t-win98-highlight bg-win98-bg px-1 py-0.5 text-xs">
      <StartMenu
        onOpenInventory={onOpenInventory}
        onOpenReadMe={onOpenReadMe}
      />

      <div className="mx-1 h-6 w-px bg-win98-shadow"></div>

      <div className="flex flex-1 items-center gap-1">
        {windows.map((win) =>
          win.isOpen ? (
            <button
              key={win.id}
              onClick={win.onClick}
              className={`retro-btn whitespace-nowrap px-3 py-1 text-xs ${
                win.isActive ? "shadow-none" : ""
              }`}
              style={
                win.isActive
                  ? {
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      background: "#a0a0a0",
                    }
                  : {}
              }
            >
              {win.icon ? (
                win.icon
              ) : (
                <WindowIcon className="mr-1 inline-block h-3 w-3" />
              )}
              {win.label}
            </button>
          ) : null,
        )}
      </div>

      <TaskbarClock />
    </footer>
  );
};
