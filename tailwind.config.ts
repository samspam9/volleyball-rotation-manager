import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'bounce-custom': 'bounce 1s infinite',
        'rotate': 'rotate 2s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 20%, 53%, 80%, 100%': {
            transform: 'translate3d(0,0,0)',
          },
          '40%, 43%': {
            transform: 'translate3d(0,-30px,0)',
          },
          '70%': {
            transform: 'translate3d(0,-15px,0)',
          },
          '90%': {
            transform: 'translate3d(0,-4px,0)',
          },
        },
        rotate: {
          'from': {
            transform: 'rotate(0deg)',
          },
          'to': {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
