import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eyebrow, Section } from '../components/ui'
import { prefersReducedMotion } from '../lib/scroll'

const STEPS = [
  ['01', 'Pickup', 'Collected, weighed, tagged.'],
  ['02', 'Inspection', 'Stains, damage, care label.'],
  ['03', 'Pre-treatment', 'Stains treated first.'],
  ['04', 'Sorting', 'By fiber, color, program.'],
  ['05', 'Cleaning', 'Dry or wet — the fabric decides.'],
  ['06', 'Conditioning', 'Softeners and brighteners.'],
  ['07', 'Drying', 'Shape-safe, humidity-controlled.'],
  ['08', 'Steam Iron', 'Wrinkle-free, no marks.'],
  ['09', 'QC', 'Checked, folded, packed.'],
  ['10', 'Delivery', 'Back at your door.'],
] as const

const R = 26
const CIRC = 2 * Math.PI * R

/** "Wash cycle" ring — fills as the user scrolls through the 10 stations. */
function CycleRing({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement> }) {
  const circle = useRef<SVGCircleElement>(null)
  const pct = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const c = circle.current
    const label = pct.current
    if (!c || !label || !sectionRef.current) return
    if (prefersReducedMotion()) {
      c.style.strokeDashoffset = '0'
      label.textContent = '100%'
      return
    }
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      end: 'bottom 70%',
      scrub: 0.4,
      onUpdate: (self) => {
        c.style.strokeDashoffset = String(CIRC * (1 - self.progress))
        label.textContent = `${Math.round(self.progress * 100)}%`
      },
    })
    return () => st.kill()
  }, [sectionRef])

  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={R} fill="none" stroke="#C9B8E2" strokeWidth="2" strokeDasharray="3 3" />
        <circle
          ref={circle}
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke="#D8417C"
          strokeWidth="2"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC}
        />
      </svg>
      <span className="font-mono text-xs tracking-label text-muted">
        CYCLE <span ref={pct} className="text-glow">0%</span>
      </span>
    </div>
  )
}

export default function Process() {
  const grid = useRef<HTMLDivElement>(null)
  return (
    <Section id="process">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <Eyebrow>{'// 04 · CPU PROCESS · 10 STEPS'}</Eyebrow>
        <CycleRing sectionRef={grid} />
      </div>
      <h2 className="reveal mt-10 max-w-5xl border-t border-line pt-12 font-display uppercase leading-[0.95] text-plum [font-size:clamp(2.5rem,5vw,4.5rem)]">
        Ten stations.
        <br />
        <span className="text-glow">Cleaner than new.</span>
      </h2>

      <div ref={grid} className="mt-14 grid grid-cols-1 border border-line sm:grid-cols-2 lg:grid-cols-5" data-stagger>
        {STEPS.map(([n, title, body], i) => (
          <article
            key={n}
            className={`reveal-item group min-h-[210px] bg-whisper p-6 transition-colors duration-300 ease-out hover:bg-petal ${
              i > 0 ? 'border-t border-line' : ''
            } sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-line lg:[&:nth-child(-n+5)]:border-t-0 lg:[&:nth-child(n+6)]:border-t lg:[&:nth-child(n+6)]:border-line lg:[&:not(:nth-child(5n+1))]:border-l lg:[&:not(:nth-child(5n+1))]:border-line`}
          >
            <span className="font-mono text-xs tracking-label text-glow">/{n}</span>
            <h3 className="mt-6 font-display text-xl uppercase text-plum">{title}</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
