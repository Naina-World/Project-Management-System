/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#161A22",
          soft: "#232936",
          muted: "#4A5163",
        },
        paper: "#F6F4EF",
        surface: "#FFFFFF",
        line: "#E4E0D6",
        accent: {
          DEFAULT: "#C97A2B",
          soft: "#F2E3CE",
          ink: "#7A4B14",
        },
        status: {
          pending: "#8A6D3B",
          pendingBg: "#F3E9D6",
          progress: "#2D5D8A",
          progressBg: "#E4EDF5",
          done: "#3F7A52",
          doneBg: "#E4F0E7",
        },
        danger: {
          DEFAULT: "#B24A38",
          bg: "#F8E7E2",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(22, 26, 34, 0.06), 0 1px 1px rgba(22, 26, 34, 0.04)",
      },
    },
  },
  plugins: [],
};
