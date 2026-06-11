/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Orchid Whisper — structure
        plum: '#2F2440', // deep plum, all display type & dark sections
        whisper: '#F3EEFA', // page background
        orchid: '#8B6FC0', // secondary accent, used sparingly
        line: '#DCD2E8', // hairline rules & grid borders
        muted: '#6F6580', // body/secondary text
        // Petal Glow — warmth
        petal: '#FBEAF1', // cards / lighter panels
        glow: '#D8417C', // THE accent — markers, highlights, CTA hovers
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
        label: '0.14em',
      },
      maxWidth: {
        page: '1440px',
      },
    },
  },
  plugins: [],
}
