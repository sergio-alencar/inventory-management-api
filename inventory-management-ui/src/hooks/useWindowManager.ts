import { useState } from "react";

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
}

export function useWindowManager() {
  const [windows, setWindows] = useState<
    Record<"inventory" | "readme", WindowState>
  >({
    inventory: { isOpen: true, isMinimized: false },
    readme: { isOpen: false, isMinimized: false },
  });

  const [activeWindow, setActiveWindow] = useState<
    "inventory" | "readme" | null
  >("inventory");
  const [isMaximized, setIsMaximized] = useState(false);

  const open = (id: "inventory" | "readme") => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false },
    }));
    setActiveWindow(id);
  };

  const close = (id: "inventory" | "readme") => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false },
    }));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimize = (id: "inventory" | "readme") => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeWindow === id) setActiveWindow(null);
  };

  const restore = (id: "inventory" | "readme") => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: false },
    }));
    setActiveWindow(id);
  };

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const handleTaskbarClick = (id: "inventory" | "readme") => {
    const win = windows[id];

    if (activeWindow === id && !win.isMinimized) {
      minimize(id);
    } else {
      if (!win.isOpen) {
        open(id);
      } else {
        restore(id);
      }
    }
  };

  const activate = (id: "inventory" | "readme") => {
    setActiveWindow(id);
  };

  return {
    windows,
    activeWindow,
    isMaximized,
    open,
    close,
    minimize,
    restore,
    toggleMaximize,
    handleTaskbarClick,
    activate,
  };
}
