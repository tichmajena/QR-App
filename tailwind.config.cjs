const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "haloween", // first one will be the default theme
      "dark",
      "forest",
      "synthwave",
    ],
  },
};

module.exports = config;
