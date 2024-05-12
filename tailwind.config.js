/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        utama: "#2D81FF",
        utama_active: "#0095e8",
        utama_inverse: "#ffffff",
        utama_light: "#F1FAFF",

        secondary: "#F1F1F4",
        secondary_active: "#C4CADA",
        secondary_inverse: "#252F4A",
        secondary_light: "#F9F9F9",

        success: "#50cd89",
        success_active: "#47be7d",
        success_inverse: "#FFFFFF",
        success_light: "#e8fff3",

        info: "#7239ea",
        info_active: "#5014d0",
        info_inverse: "#ffffff",
        info_light: "#f8f5ff",

        warning: "#ffc700",
        warning_active: "#f1bc00",
        warning_inverse: "#ffffff",
        warning_light: "#fff8dd",

        danger: "#f1416c",
        danger_active: "#d9214e",
        danger_inverse: "#ffffff",
        danger_light: "#fff5f8",

        dark: "#1E2129",
        dark_active: "#111318",
        dark_inverse: "#ffffff",
        dark_light: "#F9F9F9",

        light: "#F9F9F9",
        light_active: "#F1F1F4",
        light_inverse: "#252F4A",
        light_light: "#ffffff",

        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
        facebook: "#E5FAFF",
        google: "#FEF2F2",
        utama: "#2D81FF",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
