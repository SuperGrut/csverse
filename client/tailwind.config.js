/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        csdark: "#121826", // Dark background color
        csblue: "#3b82f6", // Blue accent color
        cspurple: "#8b5cf6", // Purple accent color
        csgreen: "#10b981", // Green accent color
        foreground: "#f9fafb", // Light text color
      },
    },
  },
  plugins: [],
};
