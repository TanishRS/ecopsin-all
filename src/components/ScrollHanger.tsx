import { useEffect, useRef, useState } from 'react'

/**
 * Vertical thread on the right edge with a tiny coat-hanger that descends
 * as the page scrolls. Replaces the native scrollbar (hidden in index.css).
 * Hidden on small screens and under prefers-reduced-motion.
 */
export default function ScrollHanger() {
  const [progress, setProgress] = useState(0)
  const lastY = useRef(0)
  const [swinging, setSwinging] = useState(false)

  useEffect(() => {
    let raf = 0
    let stopT: number | undefined
    const update = () => {
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1
      const p = Math.min(1, Math.max(0, window.scrollY / max))
      setProgress(p)
      const dy = window.scrollY - lastY.current
      if (Math.abs(dy) > 0.5) setSwinging(true)
      lastY.current = window.scrollY
      if (stopT) window.clearTimeout(stopT)
      stopT = window.setTimeout(() => setSwinging(false), 140)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(raf)
      if (stopT) window.clearTimeout(stopT)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-20 bottom-20 z-30 hidden md:block xl:right-5"
    >
      <div className="relative w-6 h-full">
        {/* Dashed velvet thread */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, #49225B 0 6px, transparent 6px 14px)',
          }}
        />
        {/* Rail caps */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-[3px] w-3 bg-plum" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] w-3 bg-plum" />

        {/* Hanger glyph — descends with scroll */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-[top] duration-150 ease-out"
          style={{ top: `calc(${progress * 100}% - 12px)` }}
        >
          <div
            className="origin-top text-velvet"
            style={{
              transform: swinging ? 'rotate(4deg)' : 'rotate(0deg)',
              transition: 'transform 0.18s ease-out',
            }}
          >
            <svg width="22" height="18" viewBox="0 0 36 28" fill="none" aria-hidden="true">
              <path
                d="M18 4c-2 0-3.4 1.6-3 3.6.3 1.5 1.6 2 3 2.2L4 21h28L21 9.8c1.6-.2 2.8-1 3-2.5C24.4 5.4 22 3.4 18 4Z"
                stroke="#6E3482"
                strokeWidth="1.8"
                strokeLinejoin="round"
                fill="#F5EBFA"
              />
              <line x1="4" y1="21" x2="32" y2="21" stroke="#6E3482" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Percent label */}
        <div
          className="absolute right-full mr-3 whitespace-nowrap font-mono text-[10px] tracking-widest text-muted"
          style={{ top: `calc(${progress * 100}% - 5px)` }}
        >
          {String(Math.round(progress * 100)).padStart(2, '0')}%
        </div>
      </div>
    </div>
  )
}
