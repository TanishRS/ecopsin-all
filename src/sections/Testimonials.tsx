import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'

const QUOTES = [
  {
    quote:
      'Ecospin laundry services are very good and have quality work. They returned my Banarasi like new.',
    name: 'Koyna',
    role: 'RESIDENT, THANE WEST',
  },
  {
    quote:
      'Their pickup is always on time and the packaging feels like a luxury hotel. Worth every rupee.',
    name: 'Arjun M.',
    role: 'ARCHITECT, POWAI',
  },
  {
    quote:
      "I trust them with my husband's suits and my own sarees. That is the highest compliment I can give.",
    name: 'Priya S.',
    role: 'DOCTOR, KHARGHAR',
  },
]

const arrowBtn =
  'inline-flex h-12 w-12 shrink-0 items-center justify-center border border-plum text-plum transition-colors duration-200 hover:border-glow hover:text-glow'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  // +1 = came from "next" (sweep in from the right), -1 = from "prev"
  const [dir, setDir] = useState<1 | -1>(1)
  const q = QUOTES[index]

  const prev = () => {
    setDir(-1)
    setIndex((i) => (i - 1 + QUOTES.length) % QUOTES.length)
  }
  const next = () => {
    setDir(1)
    setIndex((i) => (i + 1) % QUOTES.length)
  }

  return (
    <Section id="testimonials">
      {/* PHOTO PLACEHOLDER: faint background texture of pressed fabric / shop counter
          goes here (absolutely-positioned, low-opacity) once real photos are provided. */}
      <Eyebrow>{'// 06 · TESTIMONIALS'}</Eyebrow>
      <div className="reveal mt-10 border-t border-line pt-12">
        {/* mobile: quote full-width, arrows centered below; md+: arrows flank the quote */}
        <div className="flex flex-wrap items-center justify-center gap-5 md:flex-nowrap md:gap-10">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className={`${arrowBtn} order-2 md:order-none`}
          >
            <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
          </button>

          {/* key re-mounts on change so the wiper sweep replays; overflow-hidden clips it */}
          <div className="order-1 w-full overflow-hidden md:order-none md:w-auto md:flex-1">
            <blockquote
              key={index}
              aria-live="polite"
              className={`min-h-[11rem] text-center md:min-h-[9rem] ${
                dir === 1 ? 'motion-safe:animate-wipe-l' : 'motion-safe:animate-wipe-r'
              }`}
            >
              <p className="mx-auto max-w-3xl text-xl italic leading-relaxed text-plum md:text-2xl">
                “{q.quote}”
              </p>
              <footer className="mt-6 font-mono text-xs tracking-label">
                <cite className="not-italic text-plum">— {q.name}</cite>
                <span className="mx-2 text-line" aria-hidden="true">·</span>
                <span className="uppercase text-glow">{q.role}</span>
              </footer>
            </blockquote>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className={`${arrowBtn} order-3 md:order-none`}
          >
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-label text-muted">
          {String(index + 1).padStart(2, '0')} / {String(QUOTES.length).padStart(2, '0')}
        </p>
      </div>
    </Section>
  )
}
