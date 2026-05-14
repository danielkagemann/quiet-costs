/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        secondary: "#64748B",
        accent: "#6366F1",
        border: "#E2E8F0",
        background: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
