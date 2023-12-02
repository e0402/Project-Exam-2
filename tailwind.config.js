/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        13: "3.15rem",
      },
      maxWidth: {
        xxs: "13.5rem",
      },
      backgroundColor: {
        "off-white": "rgb(253, 253, 253)",
      },
    },
  },
  plugins: [],
};
