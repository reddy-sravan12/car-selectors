import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#f0a500",
        "gold-dim": "#c4880a",
        surface: "#141414",
        "card-dark": "#1c1c1c",
        "card-light": "#f0ece4",
      },
      fontFamily: {
        condensed: ["var(--font-barlow-condensed)", "sans-serif"],
        body: ["var(--font-barlow)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
