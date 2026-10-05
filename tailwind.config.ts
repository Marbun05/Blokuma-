import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0D9488",
          mint: "#2DD4BF",
          amber: "#F59E0B",
          pastelYellow: "#FEF3C7",
          pastelBlue: "#E0F2FE",
          pastelGreen: "#DCFCE7",
          pastelPurple: "#F3E8FF",
        },
      },
      fontFamily: {
        heading: ["Fredoka", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
