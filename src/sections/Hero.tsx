import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { HangerRack } from '../components/Placeholders'
import { SquareDot } from '../components/ui'
import { prefersReducedMotion, scrollToHash } from '../lib/scroll'

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.14, delay: 0.15 },
      )
      gsap.fromTo(
        '.hero-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.65 },
      )
      gsap.fromTo(
        '.hero-img',
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out', delay: 0.35 },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    scrollToHash(href)
  }

  return (
    <section id="home" ref={root} className="relative z-10">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-12 px-6 pb-20 pt-32 md:px-10 lg:grid-cols-[auto_1fr_minmax(320px,420px)] lg:gap-16 lg:pt-44 xl:px-16">
        {/* vertical rail */}
        <div className="hidden lg:block">
          <p
            className="font-mono text-[10px] uppercase tracking-eyebrow text-muted"
            style={{ writingMode: 'vertical-rl' }}
          >
            ISSUE · 2026 / VOL. 1
          </p>
        </div>

        {/* headline column */}
        <div>
          <p className="hero-fade eyebrow mb-8">
            {'// LAUNDRY STUDIO · THANE · NAVI MUMBAI · MUMBAI'}
          </p>
          <h1 className="font-display uppercase leading-[0.88] tracking-[-0.005em] text-plum [font-size:clamp(4rem,11.5vw,11rem)]">
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="hero-line block">The art</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line block">
                <em className="italic">of</em> <span className="text-glow">clean</span>
                <SquareDot className="ml-[0.05em]" />
              </span>
            </span>
            <span className="sr-only">.</span>
          </h1>

          <p className="hero-fade mt-10 max-w-md text-[15px] leading-relaxed text-muted">
            DLI-USA certified laundry &amp; dry-cleaning. European chemistry. American machines.
            Careful hands.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap gap-4">
            <a href="#pickup" onClick={(e) => go(e, '#pickup')} className="btn-solid">
              BOOK A PICKUP <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
            </a>
            <a href="#services" onClick={(e) => go(e, '#services')} className="btn-outline">
              SEE SERVICES
            </a>
          </div>
        </div>

        {/* portrait image */}
        <div className="hero-img">
          <div className="border border-line bg-petal">
            <HangerRack className="block aspect-[3/4] w-full" />
          </div>
          <div className="dither mt-2 opacity-15" aria-hidden="true" />
          <p className="mt-4 inline-flex items-center gap-3 bg-plum px-4 py-2.5 font-mono text-[10px] uppercase tracking-label text-whisper">
            <span className="h-2 w-2 bg-glow motion-safe:animate-pulse" aria-hidden="true" />
            LIVE · PICKUP OPEN
          </p>
        </div>
      </div>
    </section>
  )
}
