// inventory-management-ui/src/components/ThemeToggle.tsx

import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { LightModeImg } from "./images/LightModeImg";
import { DarkModeImg } from "./images/DarkModeImg";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-7 w-14 select-none items-center rounded-full outline-none transition-colors duration-500 focus:outline-none ${isDark ? "bg-brand-primary" : "bg-card-medium"}`}
      title="Alternar Tema"
    >
      <span className="sr-only">Alternar modo escuro</span>
      <span
        className={`flex size-5 transform items-center justify-center rounded-full shadow-lg ring-0 transition duration-300 ease-in-out ${
          isDark ? "translate-x-8 bg-indigo-500" : "translate-x-1 bg-slate-50"
        }`}
      >
        {!isDark && (
          <div className="fill-brand-darker w-3">
            <LightModeImg />
          </div>
        )}
        {isDark && (
          <div className="fill-brand-light w-3">
            <DarkModeImg />
          </div>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
