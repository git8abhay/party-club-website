/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#68268e",
          secondary: "#ed2891",
          textHead: "#1c1c1c",
          textMuted: "#4f4f4f",
          border: "#e8e8e8",
          bgLight: "#f8f8f8",
          blush: "#fff0f4",
          lilac: "#f3ebfb",
        },
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(28, 28, 28, 0.08)",
        lift: "0 8px 20px rgba(28, 28, 28, 0.12)",
        glow: "0 10px 40px rgba(237, 40, 145, 0.25)",
        card: "0 4px 18px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
}
