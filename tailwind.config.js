/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./features/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0D9488",
          tealDark: "#0F766E",
          mint: "#2DD4BF",
          amber: "#F59E0B",
          amberDark: "#D97706",
          yellow: "#FBBF24",
          coral: "#FB7185",
          orange: "#FB923C",
          purple: "#A855F7",
          sky: "#38BDF8",
          cream: "#FFFDF7",
          warmBg: "#FBF9F5",
          pastelYellow: "#FEF3C7",
          pastelBlue: "#E0F2FE",
          pastelGreen: "#DCFCE7",
          pastelPurple: "#F3E8FF",
        },
      },
      boxShadow: {
        toy: "0 4px 0 0 rgba(0, 0, 0, 0.15)",
        toyTeal: "0 4px 0 0 #0F766E",
        toyAmber: "0 4px 0 0 #D97706",
        toyPurple: "0 4px 0 0 #7E22CE",
        toyRose: "0 4px 0 0 #E11D48",
      },
      fontFamily: {
        heading: ["Fredoka", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
