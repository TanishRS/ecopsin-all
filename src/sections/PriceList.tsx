import { Eyebrow, Section } from '../components/ui'

// TODO(client): replace "From ₹—" with the real rate card before launch.
const CATEGORIES: ReadonlyArray<readonly [string, ReadonlyArray<string>]> = [
  ['Dry Cleaning', ['Shirt / T-shirt', 'Trouser', 'Suit (2 pc)', 'Saree (plain)', 'Saree (heavy work)', 'Coat / Blazer']],
  ['Wet Cleaning', ['Laundry (per kg)', 'Bedsheet (double)', 'Curtain (per panel)', 'Blanket / Quilt', 'Soft toys']],
  ['Steam Ironing', ['Shirt / T-shirt', 'Trouser', 'Saree', 'Kurta / Dress']],
]

export default function PriceList() {
  return (
    <Section id="prices">
      <Eyebrow>{'// 05 · PRICE LIST'}</Eyebrow>
      <div className="mt-10 flex flex-col justify-between gap-6 border-t border-line pt-12 md:flex-row md:items-end">
        <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(2.75rem,5vw,4.5rem)]">
          The rate card.
        </h2>
        <p className="reveal mono-label md:pb-2 md:text-right">
          INDICATIVE RATES — FINAL CARD CONFIRMED AT PICKUP
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3" data-stagger>
        {CATEGORIES.map(([cat, items], ci) => (
          <div key={cat} className="reveal-item bg-whisper p-8">
            <h3 className="font-mono text-xs uppercase tracking-label text-glow">
              /{String(ci + 1).padStart(2, '0')} · {cat}
            </h3>
            <ul className="mt-6">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline justify-between gap-4 border-t border-line py-3.5"
                >
                  <span className="text-sm text-plum">{item}</span>
                  <span className="font-mono text-xs tracking-label text-muted">FROM ₹—</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
