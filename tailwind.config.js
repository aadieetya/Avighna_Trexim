/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "ui-sans-serif", "system-ui"],
        philosopher: ["Philosopher", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#e6f3ff",
          100: "#cce7ff",
          200: "#99cfff",
          300: "#66b7ff",
          400: "#339fff",
          500: "#1a75b6", // Your secondary blue
          600: "#0f5795", // Your primary blue
          700: "#0b4170",
          800: "#082c4b",
          900: "#041626",
        },
        primary: {
          DEFAULT: "#0f5795",
          light: "#1a75b6",
        },
        secondary: "#e6e7e8",
        white: "#ffffff",
        night: "#0a1443",
        mist: "#f5fbff",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(10, 20, 67, .08)",
      },
      backgroundImage: {
        'hero-clouds':
          "radial-gradient(1200px 600px at 80% -20%, rgba(15,87,149,.20), transparent 60%),\n radial-gradient(800px 400px at 10% 10%, rgba(26,117,182,.18), transparent 60%)",
      },
    },
  },
  plugins: [],
}