/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          background: 'var(--color-accent-background)',
          foreground: 'var(--color-accent-foreground)',
        },
        danger: {
          background: 'var(--color-danger-background)',
          foreground: 'var(--color-danger-foreground)',
        },
        warning: {
          background: 'var(--color-warning-background)',
          foreground: 'var(--color-warning-foreground)',
        },
        success: {
          background: 'var(--color-success-background)',
          foreground: 'var(--color-success-foreground)',
        },
        info: {
          background: 'var(--color-info-background)',
          foreground: 'var(--color-info-foreground)',
        },
      },
    },
  },
  plugins: [],
}