import React from "react";

export const ReadmeContent: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-3d-inset flex-1 overflow-auto whitespace-pre-line bg-white p-2 font-mono text-xs leading-4">
      ========================================
      <br />
      &nbsp;&nbsp;&nbsp;INVENTORY MANAGEMENT SYSTEM v1.0
      <br />
      ========================================
      <br />
      <br />
      A retro-styled inventory management app built with React, TypeScript, .NET
      8 and styled as Windows 98.
      <br />
      <br />
      GitHub:{" "}
      <a
        href="https://github.com/sergio-alencar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-win98-title underline"
      >
        github.com/sergio-alencar
      </a>
      <br />
      LinkedIn:{" "}
      <a
        href="https://linkedin.com/in/sergio-alencar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-win98-title underline"
      >
        linkedin.com/in/sergio-alencar
      </a>
      <br />
      <br />
      (c) {currentYear} Sérgio de Alencar
      <br />
      All rights reserved.
    </div>
  );
};
