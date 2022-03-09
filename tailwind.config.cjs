const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        akriblue: {
          200: "#74bff7",
          300: "#4c9ae0",
          400: "#3f7aba",
          500: "#305c97",
          600: "#204875",
          700: "#0d3159",
        },
      },
    },
  },

  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
  daisyui: {
    themes: [
      "forest",
      "haloween", // first one will be the default theme
      "dark",
      "synthwave",
    ],
  },
};

module.exports = config;
