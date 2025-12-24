/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#eef2ff", // indigo-50
          primary: "#4f46e5", // indigo-600
          dark: "#3730a3", // indigo-800
          darker: "#1e1b4b", // indigo-950
        },
        surface: {
          light: "#f1f5f9", // slate-100
          dark: "#020617", // slate-950
        },
        card: {
          light: "#e2e8f0", // slate-200
          medium: "#cbd5e1", // slate-300
          dark: "#1e293b", // slate-800
        },
        error: {
          primary: "#ef4444", // red-500
          dark: "#7f1d1d", // red-900
        },
      },
    },
  },
  plugins: [],
};
