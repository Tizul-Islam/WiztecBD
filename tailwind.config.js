/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];

export const theme = {
  extend: {
    fontFamily: {
      silka: ['Silka', 'sans-serif'],
    },
    animation: {
      marquee: 'marquee 25s linear infinite', // Adjust 25s for speed
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(100%)' },   // start off the right edge
        '100%': { transform: 'translateX(-100%)' }, // end off the left edge
      },
    },
  },
};

export const plugins = [];
