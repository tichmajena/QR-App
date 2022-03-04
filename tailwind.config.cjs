const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],
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
