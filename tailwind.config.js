import forms from "@tailwindcss/forms"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.tsx",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        theme: {
          "50": "#ededee",
          "100": "#dbdcdc",
          "200": "#b7b9ba",
          "300": "#949597",
          "400": "#707275",
          "500": "#4c4f52",
          "600": "#3d3f42",
          "700": "#2e2f31",
          "800": "#1e2021",
          "850": "#1a1b1c",
          "900": "#121314",
          "950": "#090a0a",
         },
         themewhite: {
          "50": "#141414",
          "100": "#333333",
          "200": "#3a3c3d",
          "300": "#474849",
          "400": "#607275",
          "500": "#858c93",
          "600": "#a4abb5",
          "700": "#d6d7d8",
          "800": "#e5e5e5",
          "850": "#efefef",
          "900": "#fcfcfc",
          "950": "#f2f2f2",
         },
        royalblue: {
            '50': '#f4f3ff',
            '100': '#eae9fe',
            '200': '#d8d6fe',
            '300': '#bbb5fd',
            '400': '#9a8cf9',
            '500': '#785df5',
            '600': '#5e30eb',
            '700': '#5829d8',
            '800': '#4922b5',
            '900': '#3e1e94',
            '950': '#241065',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [forms, require("tailwindcss-animate")],
}
