/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#07090e",
          secondary: "#0c101a",
          card: "rgba(12, 16, 26, 0.85)",
          border: "rgba(212, 175, 55, 0.2)",
          hover: "rgba(212, 175, 55, 0.12)",
        },
        gold: {
          antique: "#d4af37",
          radiant: "#f59e0b",
          champagne: "#e2d5b5",
          muted: "rgba(226, 213, 181, 0.7)",
          glow: "rgba(245, 158, 11, 0.35)",
        },
        saffron: {
          DEFAULT: "#ea580c",
          light: "#fb923c",
          glow: "rgba(234, 88, 12, 0.4)",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        telugu: ["var(--font-telugu)", "Noto Sans Telugu", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'gold-sm': "0 0 12px rgba(212, 175, 55, 0.25)",
        'gold-md': "0 0 24px rgba(212, 175, 55, 0.35)",
        'gold-lg': "0 0 40px rgba(245, 158, 11, 0.3)",
        'inner-gold': "inset 0 0 20px rgba(212, 175, 55, 0.15)",
        'halo': "0 0 50px rgba(245, 158, 11, 0.25)",
      },
      backgroundImage: {
        'gold-gradient': "linear-gradient(135deg, #f59e0b 0%, #d4af37 50%, #b8860b 100%)",
        'dark-gradient': "radial-gradient(ellipse at top, #181e30 0%, #07090e 70%)",
        'card-gradient': "linear-gradient(180deg, rgba(22, 29, 48, 0.8) 0%, rgba(10, 14, 23, 0.95) 100%)",
        'shimmer-gradient': "linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.15) 50%, transparent 100%)",
      },
      animation: {
        'pulse-subtle': "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'glow': "glow 2.5s ease-in-out infinite alternate",
        'float': "float 6s ease-in-out infinite",
        'float-slow': "float 9s ease-in-out infinite",
        'shimmer': "shimmer 3s infinite",
        'fade-in': "fadeIn 0.5s ease-out forwards",
        'slide-up': "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        'spin-slow': "spin 20s linear infinite",
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 12px rgba(212, 175, 55, 0.25)' },
          '100%': { boxShadow: '0 0 32px rgba(245, 158, 11, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};
