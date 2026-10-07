import type { Config } from "tailwindcss";

/** Builds a `{ shade: var(--color-name-shade) }` scale from the CSS variables in globals.css. */
function scale(name: string, shades: readonly (number | string)[]) {
  return Object.fromEntries(
    shades.map((shade) => [
      shade,
      `rgb(var(--${name}-${shade}) / <alpha-value>)`,
    ]),
  );
}

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "1.5rem" },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1248px",
        "2xl": "1248px",
      },
    },
    extend: {
      colors: {
        primary: scale(
          "primary",
          [100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 850, 900],
        ),
        secondary: scale("secondary", [100, 150, 200, 500, 600, 900]),
        neutral: scale(
          "neutral",
          [50, 100, 150, 200, 250, 300, 400, 500, 700, 900],
        ),
        gray: scale("gray", [50, 100, 150, 200, 300, 400, 600, 800, 900]),
        success: scale("success", [100, 500, 600, 700]),
        warning: scale("warning", [100, 150, 500, 600, 700]),
        destructive: scale("destructive", [100, 500, 600]),
        category: {
          purple: "rgb(var(--category-purple) / <alpha-value>)",
          "purple-dark": "rgb(var(--category-purple-dark) / <alpha-value>)",
        },
        decorative: {
          orange: "rgb(var(--decorative-orange) / <alpha-value>)",
        },
        page: "rgb(var(--page-bg) / <alpha-value>)",
      },
      fontFamily: {
        ubuntu: [
          "var(--font-ubuntu)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        inter: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        d4: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
        d5: ["2.25rem", { lineHeight: "2.75rem", fontWeight: "700" }],
        d7: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        h1: ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        h2: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        h4: ["1.375rem", { lineHeight: "1.75rem", fontWeight: "700" }],
        h5: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "700" }],
        h6: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        sh1: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        sh2: ["1rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        sh3: ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        sh4: ["1rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        sh5: ["0.875rem", { lineHeight: "1.125rem", fontWeight: "600" }],
        sh6: ["0.875rem", { lineHeight: "1.125rem", fontWeight: "700" }],
        sh7: ["0.75rem", { lineHeight: "1rem", fontWeight: "600" }],
        b2: ["1rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        b3: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        b4: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "500" }],
        b5: ["0.875rem", { lineHeight: "1.125rem", fontWeight: "400" }],
        b6: ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }],
      },
      borderRadius: {
        "4xl": "1.75rem",
        radius: "var(--radius)",
      },
      boxShadow: {
        soft: "0px 0px 8px 0px rgba(0,0,0,0.05), 0px 0px 16px 1px rgba(0,0,0,0.10)",
        medium:
          "0px 0px 14px 0px rgba(0,0,0,0.12), 0px 0px 16px 1px rgba(0,0,0,0.16)",
        rail: "0 2px 15px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "gaming-hero":
          "linear-gradient(360deg, var(--hero-from) 0%, var(--hero-to) 100%)",
        "review-gradient": "var(--review-gradient)",
      },
      keyframes: {
        "accordion-down": {
          from: { gridTemplateRows: "0fr" },
          to: { gridTemplateRows: "1fr" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "slide-up": {
          from: { transform: "translateY(100px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "sheet-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "sheet-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "sheet-in-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "pop-in": {
          from: { transform: "scale(0.96)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "slide-up": "slide-up 500ms ease-out 400ms both",
        "fade-in": "fade-in 200ms ease-out both",
        "sheet-in-right":
          "sheet-in-right 300ms cubic-bezier(0.32,0.72,0,1) both",
        "sheet-in-left": "sheet-in-left 300ms cubic-bezier(0.32,0.72,0,1) both",
        "sheet-in-bottom":
          "sheet-in-bottom 300ms cubic-bezier(0.32,0.72,0,1) both",
        "pop-in": "pop-in 150ms ease-out both",
      },
    },
  },
};

export default config;
