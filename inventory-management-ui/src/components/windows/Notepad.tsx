import React, { useState } from "react";
import { Window } from "./Window";
import notepadIcon from "@/assets/images/notepad-icon.png";
import type { NotepadProps } from "@/types/components/windows";
import { ReadmeContent } from "./ReadmeContent";

export const Notepad: React.FC<NotepadProps> = ({
  isOpen,
  onClose,
  isActive,
  onActivate,
  zIndex,
  onMinimize,
  isMinimized,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <Window
      title="README"
      icon={<img src={notepadIcon} alt="" className="h-4 w-4" />}
      isOpen={isOpen}
      onClose={onClose}
      onMaximize={() => setIsMaximized(!isMaximized)}
      isMaximized={isMaximized}
      defaultPosition={{ x: 150, y: 100 }}
      isActive={isActive}
      onActivate={onActivate}
      zIndex={zIndex}
      onMinimize={onMinimize}
      isMinimized={isMinimized}
    >
      <div className="flex h-full flex-col">
        <div className="mb-2 flex gap-2 px-1 text-xs">
          <span className="select-none">File</span>
          <span className="select-none">Edit</span>
          <span className="select-none">Search</span>
          <span className="select-none">Help</span>
        </div>

        <ReadmeContent />

        <div className="mt-2 select-none border-t-2 border-t-win98-shadow pt-1 text-xs text-win98-dark">
          Line 1, Col 1
        </div>
      </div>
    </Window>
  );
};
