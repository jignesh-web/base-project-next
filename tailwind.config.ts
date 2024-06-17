/** @type {import('tailwindcss').Config} */

const colorPalette = {
  pink: {
    // 50: "#0",
    100: "#FFF1F3",
    200: "#FFE4E6",
    300: "#FFC1C7",
    400: "#FF98A2",
    500: "#FF7582",
    600: "#FF5263",
    700: "#CC424F",
    800: "#98313B",
    900: "#7A272F",
    A100: "#5C1E24",
  },
  black: {
    100: "#F3F4F7",
    200: "#E2E4EB",
    300: "#CCD0DC",
    400: "#B3BACB",
    500: "#9BA4BA",
    600: "#828DA9",
    700: "#626E8E",
    800: "#49526A",
    900: "#303646",
    A100: "#2A2F3D",
    A200: "#20242F",
    A300: "#191C23",
    A400: "#15181E",
    A500: "#121419",
  },

  common: {
    white: "#fff",
    black: "#000",
  },
  transparent: { DEFAULT: "#00000000" },
  primary: { DEFAULT: "#FF5263", light: "#FFF1F3", dark: "#CC424F" },
  secondary: { DEFAULT: "#17181B", light: "#17181bcd" },
  success: { DEFAULT: "#40C34D", dark: "#1FDC1B", light: "#0EA32E" },
  error: { DEFAULT: "#DD5757", dark: "#642728", light: "#A04041" },
  accent: { DEFAULT: "#f4f4f5", light: "#FFF5EE" },
  blue: { light: "#50D5FF", DEFAULT: "#1448FF", dark: "#6597BE" },
  green: { DEFAULT: "#4DAC2B", light: "#F1F8EE" },
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colorPalette,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: true },
  important: true,
};
