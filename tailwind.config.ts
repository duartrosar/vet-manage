import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "paw-pattern": "url('../public/pattern.svg')",
      },
      colors: {
        cerulean: {
          100: "#CEE9F7",
          200: "#9CCFEA",
          300: "#6AB4DC",
          400: "#519BC2",
          500: "#3881A8",
          600: "#33678C",
          700: "#2E4D70",
          800: "#00283D",
          900: "#00121C",
          950: "#000D14",
        },
        pink: {
          100: "#FFE0F3",
          200: "#F8A8DA",
          300: "#F575C4",
          400: "#EA38A6",
          500: "#E3008C",
          600: "#B2006E",
          700: "#810050",
          800: "#500032",
          900: "#1F0013",
        },
        "light-blue": "#009FF5",
        "light-pink": "#E3008C",
        danger: "#cd0000",
        success: "#00cd00",
      },
    },
  },
  plugins: [],
};
export default config;
