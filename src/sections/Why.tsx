import { Eyebrow, Section } from '../components/ui'
import { Squiggle } from '../components/Doodles'

const REASONS = [
  ['01', 'DLI-USA member', "Continuous training & technology from the world's leading dry-cleaning institute."],
  ['02', 'Treated water', 'Specially conditioned, so the chemistry hits exactly right.'],
  ['03', 'Eco-friendly', 'Biodegradable detergents, softeners and brighteners. No harsh shortcuts.'],
  ['04', 'Free pickup', 'Across Thane, Navi Mumbai and Mumbai. We come to you.'],
] as const

export default function Why() {
  return (
    <Section id="why">
      <Eyebrow>Why Ecospin · 03</Eyebrow>
      <div className="mt-10 grid grid-cols-1 gap-14 border-t border-line pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="reveal">
          <h2 className="font-display uppercase leading-[0.95] text-plum [font-size:clamp(2rem,4.5vw,4.25rem)]">
            Four reasons owners{' '}
            <span className="underline-scribble serif-it text-glow">trust</span> us with their wardrobe.
          </h2>
          <Squiggle className="mt-6 h-3 w-32 text-velvet-mid opacity-70" />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2" data-stagger>
          {REASONS.map(([n, title, body]) => (
            <li key={n} className="reveal-item border-t border-line px-1 py-8 sm:odd:pr-10 sm:even:pl-10">
              <span className="font-mono text-xs tracking-label text-glow">/{n}</span>
              <h3 className="mt-3 text-lg font-bold text-plum">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
