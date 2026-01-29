// tailwind.config.ts
import { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["var(--font-vazir)", "system-ui", "sans-serif"], // fallback chain
        // Add more fonts here if needed
      },
    },
  },
  plugins: [],
};

export default config;