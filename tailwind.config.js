/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Velvet palette — named tokens
        'velvet-darkest': '#49225B',  // dark sections, footer
        velvet:           '#6E3482',  // primary brand — buttons, links, accents
        'velvet-mid':     '#A56ABD',  // secondary accents, hovers, icons
        'velvet-light':   '#E7DBEF',  // reference value; use petal/line below
        'velvet-bg':      '#F5EBFA',  // page background
        // Semantic aliases (all existing class names continue to work)
        plum:    '#49225B',  // display type, dark sections
        whisper: '#F5EBFA',  // page background
        orchid:  '#A56ABD',  // secondary accent
        line:    '#D8CCDF',  // hairline borders (slightly darker for visibility)
        muted:   '#6F6580',  // body / secondary text — kept dark for readability
        petal:   '#EDE4F5',  // card / panel backgrounds
        glow:    '#6E3482',  // primary accent (was pink, now velvet)
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
      keyframes: {
        // testimonial "wiper" sweeps — slide in with a slight rotation, like a wiper stroke
        'wipe-l': {
          from: { opacity: '0', transform: 'translateX(64px) rotate(1.25deg)' },
          to: { opacity: '1', transform: 'none' },
        },
        'wipe-r': {
          from: { opacity: '0', transform: 'translateX(-64px) rotate(-1.25deg)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'wipe-l': 'wipe-l 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'wipe-r': 'wipe-r 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
