import { ArrowDown, ArrowRight } from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'

type Step = { n: number; label: string }

const STEPS: Step[] = [
  { n: 1,  label: 'View · Pickup / Receive' },
  { n: 2,  label: 'First QC Check' },
  { n: 3,  label: 'System Entry' },
  { n: 4,  label: 'Tagging' },
  { n: 5,  label: 'Classification' },
  { n: 6,  label: 'Stain Removal & Prewash' },
  { n: 7,  label: 'Automatic Machine Cleaning' },
  { n: 8,  label: 'Second QC Check' },
  { n: 9,  label: 'Finishing & Steam Pressing' },
  { n: 10, label: 'Final QC Check' },
  { n: 11, label: 'Packaging' },
  { n: 12, label: 'Delivery / Collect' },
]

const TRUST = [
  'European Quality',
  'Special Care for Designer Wear',
  'Satisfaction Guaranteed',
  'Eco-friendly Solutions',
  'Delivery on Time',
]

const ROWS = [STEPS.slice(0, 4), STEPS.slice(4, 8), STEPS.slice(8, 12)]

function Card({ step, badge }: { step: Step; badge?: string }) {
  const isQC = step.label.includes('QC')
  // mobile: compact horizontal pill (number left, label right); lg+: tall station card
  return (
    <div
      className={`relative flex w-72 max-w-full items-center gap-4 rounded-2xl border-[1.5px] px-5 py-3.5 shadow-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl lg:min-h-[180px] lg:w-48 lg:flex-col lg:justify-start lg:gap-0 lg:px-4 lg:py-6 lg:text-center ${
        isQC
          ? 'border-velvet-darkest bg-velvet'
          : 'border-velvet-mid bg-velvet-light'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-600 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
          {badge}
        </span>
      )}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full lg:h-11 lg:w-11 ${
          isQC ? 'bg-white' : 'bg-velvet'
        }`}
      >
        <span className={`font-display text-base lg:text-lg ${isQC ? 'text-velvet' : 'text-white'}`}>
          {step.n}
        </span>
      </div>
      <p
        className={`text-base font-semibold leading-snug lg:mt-3 lg:text-lg ${
          isQC ? 'text-white' : 'text-velvet-darkest'
        }`}
      >
        {step.label}
      </p>
    </div>
  )
}

export default function Process() {
  return (
    <Section id="process">
      <Eyebrow>{'// 04 · THE PROCESS · 12 STEPS'}</Eyebrow>
      <div className="mt-10 border-t border-line pt-12">
        <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(1.875rem,5vw,4.5rem)]">
          The process.
          <br />
          <span className="text-glow">Twelve stations. Cleaner than new.</span>
        </h2>
        <p className="reveal mono-label mt-4">1ST DAY → 5TH DAY</p>
      </div>

      {/* ── Desktop: 4 cards per row with inline arrows ── */}
      <div className="mt-14 hidden lg:flex lg:flex-col lg:items-center lg:gap-0">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex flex-col items-center gap-0">
            {/* ↓ between rows */}
            {ri > 0 && (
              <div className="py-1">
                <ArrowDown size={24} strokeWidth={3} className="text-velvet" />
              </div>
            )}
            {/* Row of 4 cards + → between them */}
            <div className="flex items-center gap-0">
              {row.map((step, si) => (
                <div key={step.n} className="flex items-center gap-0">
                  <Card
                    step={step}
                    badge={step.n === 1 ? '1st Day' : step.n === 12 ? '5th Day' : undefined}
                  />
                  {si < row.length - 1 && (
                    <div className="px-2.5">
                      <ArrowRight size={22} strokeWidth={3} className="text-velvet" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile: single column with ↓ between cards ── */}
      <div className="mt-10 flex flex-col items-center lg:hidden">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex flex-col items-center">
            <Card
              step={step}
              badge={step.n === 1 ? '1st Day' : step.n === 12 ? '5th Day' : undefined}
            />
            {i < STEPS.length - 1 && (
              <div className="py-1.5">
                <ArrowDown size={22} strokeWidth={3} className="text-velvet" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Trust badges ── */}
      <div className="mt-14 border-t border-line pt-10">
        <p className="text-center font-mono text-[10px] uppercase leading-relaxed tracking-label text-velvet">
          {TRUST.join(' · ')}
        </p>
      </div>
    </Section>
  )
}
