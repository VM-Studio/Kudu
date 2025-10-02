// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#eef4ff",
          100:"#d9e6ff",
          200:"#b3ccff",
          300:"#8db3ff",
          400:"#6699ff",
          500:"#0B5FFF", // azul de marca
          600:"#0a55e6",
          700:"#0948bf",
          800:"#073a99",
          900:"#062e79",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(2,6,23,.12)",
      },
      // 👇 Familia de fuente para TITULOS leyendo la variable de next/font
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;
