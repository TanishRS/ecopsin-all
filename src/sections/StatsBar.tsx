import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/scroll'

const STATS = [
  { value: 15, suffix: '+', label: 'YEARS OF CRAFT' },
  { value: 50, suffix: 'K+', label: 'GARMENTS CARED' },
  { value: 10, suffix: '', label: 'STEP CPU FLOW' },
  { value: 3, suffix: '', label: 'CITIES SERVED' },
]

export default function StatsBar() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const nums = el.querySelectorAll<HTMLElement>('[data-count]')
    if (prefersReducedMotion()) {
      nums.forEach((n) => (n.textContent = n.dataset.count! + (n.dataset.suffix ?? '')))
      return
    }
    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const end = Number(n.dataset.count)
        const state = { v: 0 }
        gsap.to(state, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: n, start: 'top 88%', once: true },
          onUpdate: () => {
            n.textContent = Math.round(state.v) + (n.dataset.suffix ?? '')
          },
        })
      })
    }, el)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative z-10 mx-auto max-w-page px-6 md:px-10 xl:px-16">
      <dl className="grid grid-cols-2 border border-line bg-petal lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-10 md:px-10 ${i % 2 === 1 ? 'border-l border-line' : ''} ${
              i > 1 ? 'border-t border-line lg:border-t-0' : ''
            } ${i > 0 ? 'lg:border-l lg:border-line' : ''}`}
          >
            <dd
              className="font-display text-5xl text-plum md:text-6xl"
              data-count={s.value}
              data-suffix={s.suffix}
            >
              {s.value}
              {s.suffix}
            </dd>
            <dt className="mono-label mt-3">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}
