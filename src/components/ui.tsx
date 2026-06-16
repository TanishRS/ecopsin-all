import type { ReactNode } from 'react'

/**
 * Editorial section tag, e.g. "About · 01". The leading 10px rule is drawn
 * by the .section-tag pseudo-element. Pass `legacy` to render the older
 * `// 01 · ABOUT` mono marker instead.
 */
export function Eyebrow({
  children,
  className = '',
  legacy = false,
}: {
  children: ReactNode
  className?: string
  legacy?: boolean
}) {
  if (legacy) return <p className={`eyebrow reveal ${className}`}>{children}</p>
  return <p className={`section-tag reveal ${className}`}>{children}</p>
}

/** The brand's recurring punctuation — a solid orange square instead of a period. */
export function SquareDot({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[0.13em] w-[0.13em] translate-y-[-0.04em] bg-glow ${className}`}
    />
  )
}

/** Faint full-height vertical column guides behind the whole page. */
export function GuideLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden md:block">
      <div className="mx-auto grid h-full max-w-page grid-cols-6 px-6 md:px-10 xl:px-16">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-l border-orchid/25" />
        ))}
        <div className="absolute bottom-0 right-6 top-0 border-l border-orchid/25 md:right-10 xl:right-16" />
      </div>
    </div>
  )
}

export function Section({
  id,
  children,
  className = '',
  dark = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={`relative z-10 ${dark ? 'bg-plum text-whisper' : ''} ${className}`}
    >
      <div className="mx-auto max-w-page px-6 py-12 md:px-10 md:py-[5.5rem] xl:px-16">{children}</div>
    </section>
  )
}
