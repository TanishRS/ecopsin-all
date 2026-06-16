import { Fragment } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  Droplets,
  Laptop,
  LayoutGrid,
  Package,
  Tag,
  Truck,
  WashingMachine,
  Wind,
  type LucideIcon,
} from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'

type Step = { n: number; label: string }

const ICONS: Record<number, LucideIcon> = {
  1: Truck,
  2: ClipboardCheck,
  3: Laptop,
  4: Tag,
  5: LayoutGrid,
  6: Droplets,
  7: WashingMachine,
  8: ClipboardCheck,
  9: Wind,
  10: ClipboardCheck,
  11: Package,
  12: Truck,
}

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

// Boustrophedon path: row 1 LTR, row 2 RTL, row 3 LTR. Cards stay in
// numeric order (5,6,7,8 in row 2 read left→right), but the arrows between
// them point LEFT so the flow direction is 8→7→6→5.
type RowSpec = { steps: Step[]; arrow: 'right' | 'left'; downAfter: 'right' | 'left' | null }
const DESKTOP_ROWS: RowSpec[] = [
  { steps: STEPS.slice(0, 4), arrow: 'right', downAfter: 'right' },
  { steps: STEPS.slice(4, 8), arrow: 'left', downAfter: 'left' },
  { steps: STEPS.slice(8, 12), arrow: 'right', downAfter: null },
]

function Card({ step, badge }: { step: Step; badge?: string }) {
  const isQC = step.label.includes('QC')
  const Icon = ICONS[step.n]
  // mobile: compact horizontal pill (icon · number · label); lg+: tall station card
  return (
    <div
      className={`relative flex w-72 max-w-full items-center gap-4 border-[1.5px] px-5 py-3.5 shadow-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl lg:min-h-[210px] lg:w-48 lg:flex-col lg:justify-start lg:gap-0 lg:px-4 lg:py-6 lg:text-center ${
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
      <Icon
        aria-hidden="true"
        strokeWidth={1.75}
        className={`h-6 w-6 shrink-0 lg:h-8 lg:w-8 ${isQC ? 'text-white' : 'text-velvet'}`}
      />
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full lg:mt-3 lg:h-11 lg:w-11 ${
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

const arrowCls = 'text-velvet'
const ARROW_SIZE = 26
const ARROW_STROKE = 1.75

export default function Process() {
  return (
    <Section id="process">
      <Eyebrow>The Process · 04 · 12 Steps</Eyebrow>
      <div className="mt-10 border-t border-line pt-12">
        <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(1.875rem,5vw,4.5rem)]">
          Twelve stations.
          <br />
          <span className="serif-it text-glow">cleaner</span> than new.
        </h2>
        <p className="reveal mono-label mt-4">1ST DAY → DAY 3</p>
      </div>

      {/* ── Desktop: boustrophedon path — row 1 LTR, row 2 RTL, row 3 LTR ── */}
      <div className="mt-14 hidden lg:flex lg:justify-center">
        <div className="inline-flex flex-col">
          {DESKTOP_ROWS.map((row, ri) => (
            <Fragment key={ri}>
              <div className="flex items-center">
                {row.steps.map((step, si) => (
                  <Fragment key={step.n}>
                    <Card
                      step={step}
                      badge={step.n === 1 ? '1st Day' : step.n === 12 ? 'Day 3' : undefined}
                    />
                    {si < row.steps.length - 1 && (
                      <div className="px-2">
                        {row.arrow === 'right' ? (
                          <ArrowRight
                            size={ARROW_SIZE}
                            strokeWidth={ARROW_STROKE}
                            className={arrowCls}
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowLeft
                            size={ARROW_SIZE}
                            strokeWidth={ARROW_STROKE}
                            className={arrowCls}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
              {row.downAfter && (
                <div className="flex py-2">
                  {/* 192px box matches card width (w-48); ml-auto/mr-auto pins it under the correct column */}
                  <div
                    className={`flex w-48 justify-center ${
                      row.downAfter === 'right' ? 'ml-auto' : 'mr-auto'
                    }`}
                  >
                    <ArrowDown
                      size={ARROW_SIZE}
                      strokeWidth={ARROW_STROKE}
                      className={arrowCls}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* ── Mobile: single column with ↓ between cards ── */}
      <div className="mt-10 flex flex-col items-center lg:hidden">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex flex-col items-center">
            <Card
              step={step}
              badge={step.n === 1 ? '1st Day' : step.n === 12 ? 'Day 3' : undefined}
            />
            {i < STEPS.length - 1 && (
              <div className="py-1.5">
                <ArrowDown
                  size={ARROW_SIZE}
                  strokeWidth={ARROW_STROKE}
                  className={arrowCls}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Delivery options ── */}
      <div className="reveal mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <article className="border-[1.5px] border-velvet-mid bg-velvet-light p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-label text-velvet">
            {'// STANDARD'}
          </p>
          <h3 className="mt-3 font-display text-2xl uppercase text-velvet-darkest md:text-3xl">
            Standard Delivery
          </h3>
          <p className="mt-3 text-base font-semibold text-velvet-darkest">Ready in 3 days</p>
        </article>

        <article className="border-[1.5px] border-velvet-darkest bg-velvet p-6 text-white shadow-lg md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-label text-white/80">
            {'// PREMIUM'}
          </p>
          <h3 className="mt-3 font-display text-2xl uppercase md:text-3xl">
            Same-Day Delivery
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/90 md:text-base">
            Need it today? Same-day service available at 2× standard pricing.
          </p>
        </article>
      </div>

      {/* ── Trust badges ── */}
      <div className="mt-14 border-t border-line pt-10">
        <p className="text-center font-mono text-[10px] uppercase leading-relaxed tracking-label text-velvet">
          {TRUST.join(' · ')}
        </p>
      </div>

      {/* ── Garment-tag stripe divider — full-bleed under the section ── */}
      <div className="divider-tape mt-14 opacity-90" aria-hidden="true" />
    </Section>
  )
}
