import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mulish: ["var(--font-mulish)"],
      },
      animation: {
        scale: "scale 0.2s ease-in-out",
      },
      keyframes: {
        scale: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.2)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
