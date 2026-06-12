import { Eyebrow, Section } from '../components/ui'

const REASONS = [
  ['01', 'DLI-USA member', "Continuous training & technology from the world's leading dry-cleaning institute."],
  ['02', 'European equipment', 'German solvents, American washers — calibrated weekly.'],
  ['03', 'Treated water', 'Our water is specially conditioned for optimal chemistry.'],
  ['04', 'Eco-friendly', 'Biodegradable detergents, softeners and brightening agents.'],
  ['05', 'Trained experts', 'Teams with 5-star hotel laundry experience, in India and abroad.'],
  ['06', 'Free pickup', 'We pick up and deliver across Thane, Navi Mumbai and Mumbai.'],
] as const

export default function Why() {
  return (
    <Section id="why">
      <Eyebrow>{'// 03 · WHY ECOSPIN'}</Eyebrow>
      <div className="mt-10 grid grid-cols-1 gap-14 border-t border-line pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(2rem,4.5vw,4.25rem)]">
          Six reasons to <span className="text-glow">trust</span> us with your wardrobe.
        </h2>
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
