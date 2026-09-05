import colors from 'tailwindcss/colors.js';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Map slate to zinc to ensure dark mode uses pure neutral/dark gray & light gray (no blue hue)
        slate: colors.zinc,
        brand: {
          green: '#10b981',       // Emerald Light Green
          greenHover: '#059669',
          lightGreen: '#dcfce7',  // Soft Light Green
          yellow: '#eab308',      // Bright Yellow
          yellowHover: '#ca8a04',
          lightYellow: '#fef9c3', // Soft Light Yellow
          amber: '#f59e0b',       // Warm Amber
          teal: '#0d9488',        // Teal
          violet: '#7c3aed',      // Vibrant Violet
          coral: '#f43f5e',       // Bright Coral/Rose
          cyan: '#06b6d4',
          bgLight: '#f0fdf4',     // Light Green Tint Background
          bgDark: '#09090b',      // Dark Gray 950
          cardDark: '#18181b',    // Dark Gray 900
          borderDark: '#27272a',  // Dark Gray 800 Border
          grayLight: '#f4f4f5',   // Light Gray Accent 100
          grayText: '#a1a1aa'     // Light Gray Text 400
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}


