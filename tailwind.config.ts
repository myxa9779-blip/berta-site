import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--color-accent)",
        ink: "var(--color-ink)",
        steel: "var(--color-steel)",
        mist: "var(--color-mist)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(12, 20, 28, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
