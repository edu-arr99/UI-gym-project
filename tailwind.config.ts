import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // Add this line to enable automatic dark mode detection
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Add custom colors for the gym membership app
        'gym-red': {
          DEFAULT: '#EF4444', // Tailwind's red-500
          dark: '#F87171',    // Tailwind's red-400 for dark mode
        },
        'gym-orange': {
          DEFAULT: '#F97316', // Tailwind's orange-500
          dark: '#FB923C',    // Tailwind's orange-400 for dark mode
        },
        'gym-bg': {
          light: '#FFF7ED',   // Tailwind's orange-50 for light mode background
          dark: '#111827',    // Tailwind's gray-900 for dark mode background
        },
      },
    },
  },
  plugins: [],
};

export default config;