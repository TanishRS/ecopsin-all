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
