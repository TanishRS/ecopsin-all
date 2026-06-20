import { Eyebrow, Section } from '../components/ui'

type Row = readonly [string, string]
type Cat = readonly [string, ReadonlyArray<Row>]

const CATEGORIES: ReadonlyArray<Cat> = [
  ['Dry Cleaning', [
    ['Shirt / T-shirt',        '₹60'],
    ['Trouser / Pant',         '₹70'],
    ['Suit (2 pc)',            '₹150'],
    ['Coat / Blazer',          '₹150'],
    ['Saree (plain)',          '₹100'],
    ['Saree (silk / heavy)',   '₹200'],
    ['Salwar Kameez (2 pc)',   '₹100'],
    ['Lehenga (light)',        '₹300'],
    ['Overcoat',               '₹250'],
  ]],
  ['Wet Cleaning', [
    ['Laundry (per kg)',       '₹80'],
    ['Shirt / T-shirt',        '₹60'],
    ['Trouser',                '₹70'],
    ['Bedsheet (single)',      '₹100'],
    ['Bedsheet (double)',      '₹150'],
    ['Blanket / Quilt',        '₹200'],
    ['Curtain (per panel)',    '₹150'],
  ]],
  ['Steam Ironing', [
    ['Shirt / T-shirt',        '₹25'],
    ['Trouser / Pant',         '₹25'],
    ['Saree',                  '₹50'],
    ['Kurta / Kurti',          '₹30'],
    ['Suit (2 pc)',            '₹60'],
    ['Bedsheet (single)',      '₹50'],
    ['Bedsheet (double)',      '₹70'],
  ]],
  ['Shoe Cleaning', [
    ['Sneakers / Canvas',      '₹350'],
    ['Leather Shoes',          '₹450'],
    ['Suede / Nubuck',         '₹600'],
    ['Heels',                  '₹350'],
    ['Boots',                  '₹500'],
  ]],
  ['Soft Toys', [
    ['Small (under 12")',      '₹200'],
    ['Medium (12–24")',        '₹400'],
    ['Large (24"+)',           '₹700'],
  ]],
]

export default function PriceList() {
  return (
    <Section id="prices">
      <Eyebrow>Price list · 05</Eyebrow>
      <div className="mt-10 flex flex-col justify-between gap-6 border-t border-line pt-12 md:flex-row md:items-end">
        <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(2rem,5vw,4.5rem)]">
          The rate card.
        </h2>
        <p className="reveal mono-label md:pb-2 md:text-right">
          RATE CARD — SUBJECT TO GARMENT CONDITION
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3" data-stagger>
        {CATEGORIES.map(([cat, items], ci) => (
          <div key={cat} className="reveal-item bg-whisper p-8">
            <h3 className="font-mono text-xs uppercase tracking-label text-glow">
              /{String(ci + 1).padStart(2, '0')} · {cat}
            </h3>
            <ul className="mt-6">
              {items.map(([name, price]) => (
                <li
                  key={name}
                  className="flex items-baseline justify-between gap-4 border-t border-line py-3.5"
                >
                  <span className="text-sm text-plum">{name}</span>
                  <span className="font-mono text-xs tracking-label text-muted">{price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
