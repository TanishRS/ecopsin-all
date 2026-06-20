type SVGProps = { className?: string }

/** Loose hand-drawn arrow, curling slightly. Inherits currentColor. */
export function ArrowDoodle({ className = 'w-20 h-12' }: SVGProps) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="none" aria-hidden="true">
      <path
        d="M5 60 C 40 5, 100 20, 145 45"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M133 32 L 150 47 L 132 56"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

/** A flat squiggle — good for under-headings or as a divider accent. */
export function Squiggle({ className = 'w-32 h-3' }: SVGProps) {
  return (
    <svg viewBox="0 0 320 12" className={className} preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M2 6 Q 20 0 40 6 T 80 6 T 120 6 T 160 6 T 200 6 T 240 6 T 280 6 T 318 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Wonky pen circle — overlay on something you want to call out. */
export function CircleMark({ className = 'w-44 h-14' }: SVGProps) {
  return (
    <svg viewBox="0 0 240 80" className={className} fill="none" aria-hidden="true">
      <path
        d="M120 8 C 60 8, 12 20, 12 40 C 12 64, 80 74, 140 72 C 200 70, 230 56, 226 36 C 222 20, 180 12, 120 12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/** 8-ray sparkle — for "fresh" / "clean" moments. */
export function SparkleBurst({ className = 'w-10 h-10' }: SVGProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        const x1 = 20 + Math.cos(a) * 6
        const y1 = 20 + Math.sin(a) * 6
        const x2 = 20 + Math.cos(a) * 18
        const y2 = 20 + Math.sin(a) * 18
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  )
}

/** Short speed-lines — three stacked strokes. */
export function SpeedLines({ className = 'w-24 h-12' }: SVGProps) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" aria-hidden="true">
      <line x1="0"  y1="14" x2="60"  y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="5"  y1="46" x2="70"  y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** A small coat-hanger glyph — used for stamps and the scroll indicator. */
export function HangerGlyph({ className = 'w-6 h-6' }: SVGProps) {
  return (
    <svg viewBox="0 0 36 28" className={className} fill="none" aria-hidden="true">
      <path
        d="M18 4c-2 0-3.4 1.6-3 3.6.3 1.5 1.6 2 3 2.2L4 21h28L21 9.8c1.6-.2 2.8-1 3-2.5C24.4 5.4 22 3.4 18 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="4" y1="21" x2="32" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** Friendly front-loading washing machine with a spinning drum (rotate via parent). */
export function WashingMachine({ className = 'w-16 h-16' }: SVGProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
      <rect x="8" y="6" width="64" height="68" rx="6" stroke="currentColor" strokeWidth="2.6" />
      <line x1="8" y1="22" x2="72" y2="22" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="18" cy="14" r="2" fill="currentColor" />
      <circle cx="28" cy="14" r="2" fill="currentColor" />
      <rect x="56" y="11" width="12" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="40" cy="48" r="18" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="40" cy="48" r="11" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="40" cy="48" r="2.4" fill="currentColor" />
      <path d="M30 48 a10 10 0 0 1 20 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

/** Cute teddy bear face — round head, two ears, tiny features. */
export function TeddyBear({ className = 'w-14 h-14' }: SVGProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="48" cy="16" r="7" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <circle cx="48" cy="16" r="2.5" fill="currentColor" />
      <circle cx="32" cy="36" r="20" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="24" cy="32" r="2.4" fill="currentColor" />
      <circle cx="40" cy="32" r="2.4" fill="currentColor" />
      <ellipse cx="32" cy="40" rx="4" ry="3" fill="currentColor" />
      <path d="M26 46 Q 32 50 38 46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

/** Side view of a friendly pickup van with two wheels (animate wheels independently). */
export function PickupVan({ className = 'w-24 h-14' }: SVGProps) {
  return (
    <svg viewBox="0 0 120 64" className={className} fill="none" aria-hidden="true">
      <path d="M6 46 L 6 28 L 60 28 L 70 18 L 100 18 L 108 28 L 114 28 L 114 46 Z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
      <line x1="60" y1="28" x2="60" y2="46" stroke="currentColor" strokeWidth="2.2" />
      <rect x="74" y="22" width="22" height="6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="28" cy="50" r="8" stroke="currentColor" strokeWidth="2.4" fill="white" />
      <circle cx="92" cy="50" r="8" stroke="currentColor" strokeWidth="2.4" fill="white" />
      <circle cx="28" cy="50" r="2" fill="currentColor" />
      <circle cx="92" cy="50" r="2" fill="currentColor" />
      <path d="M14 38 L 50 38" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

/** Sneaker side profile — sole and laces. */
export function Sneaker({ className = 'w-16 h-10' }: SVGProps) {
  return (
    <svg viewBox="0 0 80 50" className={className} fill="none" aria-hidden="true">
      <path d="M6 36 C 12 22, 28 18, 38 22 L 50 18 C 60 20, 72 24, 74 32 L 74 38 C 74 42, 70 44, 66 44 L 12 44 C 8 44, 6 42, 6 38 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <line x1="6" y1="40" x2="74" y2="40" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <line x1="34" y1="22" x2="40" y2="30" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="42" y1="20" x2="48" y2="28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="50" y1="20" x2="56" y2="28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** Iron with a steam puff. */
export function IronDoodle({ className = 'w-14 h-10' }: SVGProps) {
  return (
    <svg viewBox="0 0 70 50" className={className} fill="none" aria-hidden="true">
      <path d="M8 36 L 60 36 L 56 22 C 54 18, 50 16, 44 16 L 22 16 C 14 16, 10 22, 8 30 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <line x1="6" y1="40" x2="62" y2="40" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 12 C 22 8, 26 8, 28 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M30 8  C 32 4, 36 4, 38 8"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** Simple soap bubble — circle + highlight. */
export function Bubble({ className = 'w-6 h-6' }: SVGProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.18" />
      <circle cx="11" cy="11" r="3" fill="currentColor" fillOpacity="0.7" />
    </svg>
  )
}

/** A simple 5-pointed star — hand-drawn feel. */
export function StarDoodle({ className = 'w-6 h-6' }: SVGProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 4 L 24 16 L 36 16 L 26 24 L 30 36 L 20 28 L 10 36 L 14 24 L 4 16 L 16 16 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.18"
      />
    </svg>
  )
}

/** Inward spiral — fun motion-ish accent. */
export function Spiral({ className = 'w-10 h-10' }: SVGProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 20 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0 M20 20 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M20 20 m-12 0 a12 12 0 1 0 24 0"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Tiny droplet. */
export function Droplet({ className = 'w-5 h-5' }: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 3 C 9 9, 5 13, 5 16 a7 7 0 0 0 14 0 c 0 -3 -4 -7 -7 -13 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  )
}
