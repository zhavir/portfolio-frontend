/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    colors: {
      primary: colors.green,
      secondary: colors.green,
      primaryText: colors.white,
      secondaryText: '#ADB7BE',
      primaryBorder: '#33353F',
      primaryBackgrund: 'rgb(18,18,18)',
      secondaryBackgroud: '#18191E',
      primaryPlaceholder: '#9CA2A9',
    },
  },
};
export const plugins = [];
