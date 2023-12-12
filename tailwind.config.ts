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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        ceruleanOld: {
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
        cerulean: {
          100: "#CDE3F8", // 5% more purple
          200: "#97CAEB", // 5% more purple
          300: "#65B0DD", // 5% more purple
          400: "#4D97C3", // 5% more purple
          500: "#357DAA", // 5% more purple
          600: "#2F648E", // 5% more purple
          700: "#2A4A72", // 5% more purple
          800: "#001F3F", // 5% more purple
          900: "#000E1E", // 5% more purple
          950: "#000915", // 5% more purple
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
      screens: {
        xs: "480px",
        // => @media (min-width: 480px) { ... }
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;
