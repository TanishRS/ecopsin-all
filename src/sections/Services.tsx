import { Droplets, Shirt, Sparkles, Wind } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'

type Service = {
  n: string
  title: string
  body: string
  icon: LucideIcon
  dark?: boolean
}

const SERVICES: Service[] = [
  {
    n: '01',
    title: 'Dry Cleaning',
    icon: Shirt,
    body: 'German solvents, European machines, trained hands. DLI-USA member.',
  },
  {
    n: '02',
    title: 'Wet Cleaning',
    icon: Droplets,
    body: 'American washers, treated water, gentle chemistry. Safe for delicates.',
  },
  {
    n: '03',
    title: 'Steam Ironing',
    icon: Wind,
    dark: true,
    body: 'Pure steam through every fiber. No marks — just a royal finish.',
  },
  {
    n: '04',
    title: 'Stain Removal',
    icon: Sparkles,
    body: 'Wine, ink, oil, curry. Chemistry beats the stain, never the fabric.',
  },
]

export default function Services() {
  return (
    <Section id="services">
      <Eyebrow>{'// 02 · SERVICES'}</Eyebrow>
      <div className="mt-10 flex flex-col justify-between gap-6 border-t border-line pt-12 md:flex-row md:items-end">
        <h2 className="reveal max-w-2xl font-display uppercase leading-[0.95] text-plum [font-size:clamp(2.75rem,5.5vw,5rem)]">
          Four disciplines.
          <br />
          One studio.
        </h2>
        <p className="reveal mono-label max-w-[220px] md:pb-2 md:text-right">
          Four protocols. No corners cut.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 border border-line md:grid-cols-2" data-stagger>
        {SERVICES.map((s, i) => {
          const Icon = s.icon
          return (
            <article
              key={s.n}
              className={`reveal-item group relative flex min-h-[300px] flex-col justify-between p-8 transition-colors duration-300 ease-out md:p-12 ${
                s.dark
                  ? 'bg-plum text-whisper hover:bg-[#3B2D57]'
                  : 'bg-whisper text-plum hover:bg-petal'
              } ${i % 2 === 1 ? 'md:border-l md:border-line' : ''} ${
                i > 0 ? 'border-t border-line md:border-t-0' : ''
              } ${i > 1 ? 'md:border-t md:border-line' : ''}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`font-mono text-xs tracking-label transition-colors duration-300 group-hover:text-glow ${
                    s.dark ? 'text-whisper/60' : 'text-muted'
                  }`}
                >
                  /{s.n}
                </span>
                <Icon
                  size={26}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={`ease-pixel transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                    s.dark ? 'text-glow' : 'text-plum'
                  }`}
                />
              </div>
              <div>
                <h3 className="font-display text-3xl uppercase md:text-4xl">{s.title}</h3>
                <p
                  className={`mt-4 max-w-sm text-sm leading-relaxed ${
                    s.dark ? 'text-whisper/70' : 'text-muted'
                  }`}
                >
                  {s.body}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
