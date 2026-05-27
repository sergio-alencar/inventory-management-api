import React from "react";

export interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  onDoubleClick: () => void;
  selected: boolean;
}
