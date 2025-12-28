/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#1d19ac",
          dark: "#000b8d",
          darker: "#00162b",
        },
        gray: {
          light: "#f4ebee",
          dark: "#d9d4ce",
        },
        red: {
          primary: "#e21b4d",
        },
        yellow: {
          primary: "#ffd300",
        },
      },
    },
  },
  plugins: [],
};
