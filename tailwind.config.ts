import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#FFF5F0",
          100: "#FFE8DC",
          200: "#FFCDB5",
          300: "#FFA883",
          400: "#FF8252",
          500: "#FF5E24",
          600: "#F0450A",
          700: "#C73204",
          800: "#9E2909",
          900: "#7F250E",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        card: "0 8px 30px -4px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        float: "0 20px 40px -10px rgba(0, 0, 0, 0.12)",
        glow: "0 0 25px rgba(255, 107, 74, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
