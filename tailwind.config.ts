import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wellora: {
          50: "#f3f0ff",
          100: "#e6e0ff",
          200: "#c8baff",
          300: "#a994ff",
          400: "#8b6bff",
          500: "#6f3dff",
          600: "#5a23ee",
          700: "#4818c4",
          800: "#3a14a0",
          900: "#2a0e76",
          950: "#150538",
        },
        accent: {
          cyan: "#22d3ee",
          violet: "#8b5cf6",
          magenta: "#ec4899",
          lime: "#a3e635",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
