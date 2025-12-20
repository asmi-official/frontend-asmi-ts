/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C2D3E', // main
          light: '#965765', // light
          dark: '#632432', // dark
        },
        secondary: {
          DEFAULT: '#FBBF24',
          light: '#FCCC50',
          dark: '#C9991D',
        },
        success: {
          DEFAULT: '#22C55E',
          light: '#4ED17E',
          dark: '#1B9E4B',
        },
        danger: {
          DEFAULT: '#FF0808',
          light: '#FF3939',
          dark: '#CC0606',
        },
        grey: {
          DEFAULT: '#BDBDBD',
          light: '#CACACA',
          dark: '#979797',
        },
        warning: {
          DEFAULT: '#FBBF24',
          light: '#FCCC50',
          dark: '#C9991D',
        },
        background: {
          DEFAULT: '#FFFFFF',
          paper: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
  important: '#root',
};
