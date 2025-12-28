// inventory-management-ui/src/components/ThemeToggle.tsx

import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { LightModeImg } from "./images/LightModeImg";
import { DarkModeImg } from "./images/DarkModeImg";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={"relative select-none"}
      title="Alternar Modo"
    >
      <span
        className={`flex size-10 items-center justify-center rounded-full shadow-lg transition duration-300 ease-in-out ${isDark ? "bg-gray-light" : "bg-blue-darker"} `}
        title={isDark ? "Modo Escuro" : "Modo Claro"}
      >
        {!isDark && (
          <LightModeImg className="fill-gray-light w-5 ease-in-out" />
        )}
        {isDark && <DarkModeImg className="fill-blue-darker w-5 ease-in-out" />}
      </span>
    </button>
  );
};
