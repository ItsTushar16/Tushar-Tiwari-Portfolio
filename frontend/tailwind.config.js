/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Outfit'", "sans-serif"],
      },
      animation: {
        blink: "blink 2s infinite",
        tick: "tickanim 26s linear infinite",
        "rotate-words": "rotW 10.4s cubic-bezier(.4,0,.2,1) infinite",
        "slide-line": "scl 2.4s ease-in-out infinite",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.3 } },
        tickanim: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        // 4 words, 22px line-height each: hold ~2s on each, glide between
        rotW: {
          "0%":   { transform: "translateY(0)" },
          "17%":  { transform: "translateY(0)" },
          "25%":  { transform: "translateY(-22px)" },
          "42%":  { transform: "translateY(-22px)" },
          "50%":  { transform: "translateY(-44px)" },
          "67%":  { transform: "translateY(-44px)" },
          "75%":  { transform: "translateY(-66px)" },
          "92%":  { transform: "translateY(-66px)" },
          "100%": { transform: "translateY(-88px)" },
        },
        scl: { "0%": { left: "-100%" }, "100%": { left: "100%" } },
      },
    },
  },
  plugins: [],
}
