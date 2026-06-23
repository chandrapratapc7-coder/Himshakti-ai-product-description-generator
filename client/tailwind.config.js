// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Dark mode toggle — controlled by a class on <html> element
  darkMode: "class",
  theme: {
    extend: {
      // HimShakti brand colours
      colors: {
        primary: {
          DEFAULT: "#2d6a4f",
          dark:    "#1b4d38",
          light:   "#edf7f1",
        },
        accent: {
          DEFAULT: "#f4a261",
          dark:    "#e08a45",
        },
        mountain: "#457b9d",
        himgreen: {
          50:  "#f0faf4",
          100: "#e0f2e9",
          200: "#c8dfc8",
          300: "#b5d9c5",
          400: "#7dcca0",
          500: "#4a9b6f",
          600: "#2d6a4f",
          700: "#1b4d38",
          800: "#1a3a2a",
          900: "#0f2419",
        },
      },
      // Font family
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
      },
      // Border radius tokens
      borderRadius: {
        card: "14px",
        btn:  "9px",
      },
      // Box shadow tokens
      boxShadow: {
        card:  "0 2px 12px rgba(45,106,79,0.07)",
        hover: "0 8px 24px rgba(45,106,79,0.12)",
        cta:   "0 4px 16px rgba(45,106,79,0.3)",
      },
    },
  },
  plugins: [],
};
