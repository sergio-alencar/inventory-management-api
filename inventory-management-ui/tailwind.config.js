/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        win98: {
          bg: "#c0c0c0",
          title: "#000080",
          titleEnd: "#1084d0",
          text: "#000000",
          button: "#c0c0c0",
          highlight: "#ffffff",
          shadow: "#808080",
          dark: "#404040",
          desktop: "#008080",
          error: "#ff0000",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".border-3d": {
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: `${theme("colors.win98.highlight")} ${theme("colors.win98.shadow")} ${theme("colors.win98.shadow")} ${theme("colors.win98.highlight")}`,
        },
        ".border-3d-inset": {
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: `${theme("colors.win98.shadow")} ${theme("colors.win98.highlight")} ${theme("colors.win98.highlight")} ${theme("colors.win98.shadow")}`,
        },
      });
    }),
  ],
};
