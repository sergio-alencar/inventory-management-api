import React from "react";

export interface WindowButton {
  id: string;
  label: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface FooterProps {
  onOpenInventory: () => void;
  onOpenReadMe: () => void;
  windows: WindowButton[];
}

export interface StartMenuProps {
  onOpenInventory: () => void;
  onOpenReadMe: () => void;
}
