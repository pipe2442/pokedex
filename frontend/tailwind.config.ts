import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        pokemon: {
          grass: "#74CB48",
          poison: "#A43E9E",
          fire: "#F57D31",
          water: "#6493EB",
          bug: "#A7B723",
          normal: "#AAA67F",
          electric: "#F9CF30",
          ground: "#E2BF65",
          fairy: "#D685AD",
          fighting: "#C12239",
          psychic: "#FB5584",
          rock: "#B69E31",
          ghost: "#705594",
          ice: "#9AD6DF",
          dragon: "#7037FF",
          dark: "#705746",
          steel: "#B7B9D0",
          flying: "#A891EC",
        },
      },
    },
  },
  plugins: [],
};

export default config;
