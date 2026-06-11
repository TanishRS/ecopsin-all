import { Eyebrow, Section } from '../components/ui'

const QUOTES = [
  {
    quote:
      'Eurospin laundry services are very good and have quality work. They returned my Banarasi like new.',
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

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <Eyebrow>{'// 06 · TESTIMONIALS'}</Eyebrow>
      <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-14 pt-2 md:grid-cols-2" data-stagger>
        {QUOTES.map((q) => (
          <blockquote key={q.name} className="reveal-item border-t border-line pt-8">
            <p className="text-xl italic leading-relaxed text-plum md:text-2xl">“{q.quote}”</p>
            <footer className="mt-6 font-mono text-xs tracking-label">
              <cite className="not-italic text-plum">— {q.name}</cite>
              <span className="mx-2 text-line" aria-hidden="true">·</span>
              <span className="uppercase text-glow">{q.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  )
}
