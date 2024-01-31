import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  // daisyui: {
  //   themes: false,
  // },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "rgb(249,250,251)",
          secondary: "teal",
          accent: "white",
          "background-color": "White",
          "text-color": "black",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          accent: "black",
          primary: "rgb(71, 85, 105)",
          secondary: "teal",
          "background-color": "black",
          "text-color": "rgb(0,0,0)",
        },
      },
      {
        mytheme: {
          primary: "#a991f7",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
export default config;
