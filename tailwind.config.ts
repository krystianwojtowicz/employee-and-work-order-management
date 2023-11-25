// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [],
// }
// export default config
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#de0000",
        white: "#ffffff",
        black: "#000000",
        ivory: "#fafafa",
        greyLight: "#f1f1f1",
        greyLighter: "#eaeaea",
        greyDark: "#aaaaaa",
        grey: "#999999",
        greenDark: "#0c3b2e",
        greenLight: "#6d9773",
        orange: "#ffba00",
        orangeLight: "#ffefc5",
        buttonDisabledBorder: "#c9c9c9",
        buttonDisabledBackground: "#ededed",
        transparentGreen: "rgba(12, 59, 46, 0)",
      },
      fontSize: {
        medium: "14px",
        small: "12px",
        big: "24px",
      },
      screens: {
        mobile: "320px",
        tablet: "768px",
        desktop: "1024px",
        desktopLarge: "1440px",
        desktop4k: "2560px",
      },
      boxShadow: {
        buttonBoxShadow: "0px 10px 20px 0px rgba(126, 126, 126, 0.1)",
        taskCardShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      width: {
        90: "356px",
      },
    },
  },
  plugins: [],
};
