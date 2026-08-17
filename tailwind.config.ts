import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        brand: {
          yellow: "#F4C300",
          orange: "#D85A1A",
          amber: "#f59e0b",
          dark: "#333333",
          gray: "#F7F7F7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(216,90,26,0.18)",
        card: "0 8px 30px -10px rgba(51,51,51,0.15)",
        glow: "0 0 0 1px rgba(244,195,0,0.35), 0 20px 50px -20px rgba(216,90,26,0.35)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #F4C300 0%, #D85A1A 100%)",
        "brand-radial": "radial-gradient(1200px 600px at 80% -10%, rgba(244,195,0,0.18), transparent 60%)",
      },
      keyframes: {
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
