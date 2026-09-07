// Design tokens per FRONTEND_SPEC.md §8.1 — sourced from Figma file
// `foaJFuv0vRX8nD43o0ylgB`, node `740:4541` ("Homepage v2"). Every color /
// radius / shadow token below carries a source comment tying it back to the
// Figma node it was read off. Do not "clean up" a value toward a rounder
// number — these are bespoke, per-node values, not a generic type scale.
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}',
    './controllers/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary CTA red — every "Talk to Experts"/"Get Started" pill (node 740:4641 and ~15 repeats)
        brand: {
          50: '#fdecec',
          100: '#f9d0d0',
          200: '#f0a3a3',
          400: '#dd4f4f',
          600: '#cc1f1f',
          700: '#a81919',
          900: '#5c0e0e',
        },
        // Maroon -> red diagonal gradient — footer + full-bleed CTA banners (740:4785/740:4786)
        gradient: { from: '#6c2a4a', to: '#be2c28' },
        // Layered near-black tones from dark sections (740:4752, 740:4588/740:4589)
        ink: { 950: '#010913', 900: '#02101d', 800: '#04111d', 700: '#0b0c0e', DEFAULT: '#0b042a' },
        // FAQ heading text / border (740:4545)
        faq: { text: '#280c27', border: '#ebe5ea' },
        // Every section heading's real text color (740:4609, 740:4608, 740:4561, 740:4563)
        heading: '#02060e',
        // Stats band divider + numeral color (740:4833)
        stat: { divider: '#f0edea', number: '#70707a' },
        card: { border: '#eee' },
        // Blog card title navy (740:4782)
        ink2: '#04264e',
        // Footer bottom bar + social icon circle (740:4785)
        footer: { bar: '#51223d', social: '#a3282a' },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        nav: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['var(--font-quicksand)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Substitution: real Figma typeface is "Mango Grotesque" (commercial,
        // no next/font/google entry). Anton is the closest free,
        // license-clean match for the ultra-bold condensed stat-numeral
        // weight class — same visual weight class, not a hex-exact font swap.
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        // Intentionally not extended beyond 4xl: every heading size above
        // this is a bespoke, per-node Figma value (60px/-3px hero, 50px/-3px
        // section, 48px/-1px service-band) — Figma specifies tracking in
        // absolute px, not em, so these are hardcoded as literal
        // text-[Npx]/tracking-[Npx] pairs directly in views/ui/Heading.tsx (Phase F3).
      },
      spacing: { 18: '4.5rem', 22: '5.5rem' },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        btn: '4px', // pill buttons, 740:4641
        faq: '14px', // 740:4545
        blog: '24px', // 740:4782
        industry: '30px', // 740:4745
        video: '34px',
        'video-lg': '40px', // 740:4588/740:4589
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        faq: '0px 8px 14px 0px rgba(235,235,241,0.7)',
        blog: '6px 6px 54px 0px rgba(0,0,0,0.08)',
      },
      backdropBlur: { glass: '12px' }, // dark services band, 740:4752
      backgroundColor: {
        glass: 'rgba(255,255,255,0.07)',
        'glass-icon': 'rgba(255,255,255,0.04)',
      },
      // 1600px — measured off the Figma canvas's own content spans on a
      // 1900px artboard with ~150px side gutters, not the "1280px SaaS
      // default" it started as.
      maxWidth: { container: '100rem' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Plain CSS fallback for the (rare) no-JS render path; Framer Motion
      // drives the real animation everywhere else via views/ui/Reveal.tsx (Phase F3).
      animation: { 'fade-up': 'fade-up 0.6s ease-out both' },
    },
    // Fully redeclared (not merged via extend) — Tailwind's stock
    // breakpoints, explicit rather than implicit.
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
  },
  plugins: [],
};

export default config;
