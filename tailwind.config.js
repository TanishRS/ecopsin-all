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
        // Playful accents for floating decor + highlight moments
        marigold: '#F5B544',  // sun-yellow — sneakers, sparkles
        mint:     '#7BD0B4',  // soft mint — bubbles, washing machine
        peach:    '#F39B85',  // warm peach — teddy, soft toys
        sky:      '#7FB7E8',  // pale sky — pickup van, water motifs
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Fraunces"', '"Times New Roman"', 'serif'],
        hand: ['"Caveat"', 'cursive'],
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
        // Idle motion for floating decor
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%':      { transform: 'translateY(-10px) rotate(3deg)' },
        },
        drift: {
          '0%':   { transform: 'translate(0, 0) rotate(0deg)' },
          '33%':  { transform: 'translate(12px, -8px) rotate(4deg)' },
          '66%':  { transform: 'translate(-8px, -14px) rotate(-3deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%':      { transform: 'rotate(6deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0) rotate(-2deg)' },
          '50%':      { transform: 'translateX(8px) rotate(2deg)' },
        },
        twinkle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%':      { transform: 'scale(0.6)', opacity: '0.4' },
        },
        'wash-bubble': {
          '0%':   { transform: 'translateY(0) scale(0.6)', opacity: '0' },
          '20%':  { opacity: '0.9' },
          '100%': { transform: 'translateY(-44px) scale(1.1)', opacity: '0' },
        },
        'tire-spin': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'wipe-l': 'wipe-l 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'wipe-r': 'wipe-r 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        float:       'float 5s ease-in-out infinite',
        bob:         'bob 4s ease-in-out infinite',
        drift:       'drift 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        wobble:      'wobble 3.5s ease-in-out infinite',
        sway:        'sway 6s ease-in-out infinite',
        twinkle:     'twinkle 2.4s ease-in-out infinite',
        'wash-bubble': 'wash-bubble 2.6s ease-in-out infinite',
        'tire-spin':   'tire-spin 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
