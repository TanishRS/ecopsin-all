import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'
import FloatingDecor from '../components/FloatingDecor'

const PREVIEW_COUNT = 7

type DualRow = readonly [name: string, dc: string, steam: string]
type SingleRow = readonly [name: string, price: string]

type DualCat = {
  name: string
  kind: 'dual'
  items: ReadonlyArray<DualRow>
}
type SingleCat = {
  name: string
  kind: 'single'
  items: ReadonlyArray<SingleRow>
}
type Cat = DualCat | SingleCat

const GENTLEMEN: DualCat = {
  name: 'Gentlemen',
  kind: 'dual',
  items: [
    ['Shirt / T-shirt',            '140', '45'],
    ['Payjama / Trouser / Shorts', '170', '60'],
    ['Kurta',                      '190', '60'],
    ['Jeans / Track Pant / Capri', '190', '60'],
    ['Coat / Blazer',              '390', '160'],
    ['Jacket',                     '390', '160'],
    ['Leather Jacket',             '—',   '—'],
    ['Rider Jacket',               '110', '300'],
    ['Tie',                        '100', '45'],
    ['Overcoat',                   '560', '200'],
    ['Long Coat',                  '750', '270'],
    ['Waist Coat',                 '290', '110'],
    ['Sherwani (Designer)',        '650', '220'],
    ['Sherwani Ornamental',        '850', '350'],
    ['Dhoti',                      '290', '60'],
    ['Pullover',                   '360', '110'],
    ['Sweater',                    '360', '110'],
  ],
}

const LADIES: DualCat = {
  name: 'Ladies',
  kind: 'dual',
  items: [
    ['Shirt / T-shirt / Top / Blouse / Scarf', '140',  '45'],
    ['Short Kameez',                           '140',  '45'],
    ['Saree',                                  '370',  '125'],
    ['Silk Saree',                             '400',  '150'],
    ['Salwar / Slacks / Short Skirts',         '140',  '45'],
    ['Palazzo',                                '280',  '60'],
    ['Long Kameez',                            '280',  '60'],
    ['Ornamental Kameez',                      '320',  '90'],
    ['Long Skirt',                             '280',  '60'],
    ['Heavy Long Skirt',                       '420',  '100'],
    ['Lehanga Light',                          '380',  '100'],
    ['Ornamental Lehanga',                     '550',  '150'],
    ['Dress / Frock — Normal',                 '350',  '150'],
    ['Ornamental Scarf',                       '180',  '60'],
    ['Saree Ornamental',                       '490',  '175'],
    ['Wedding Dress — Medium',                 '850',  '200'],
    ['Cardigan',                               '400',  '150'],
    ['Party Wear',                             '1200', '150'],
    ['Shawl',                                  '200',  '60'],
  ],
}

const HOUSEHOLD: SingleCat = {
  name: 'Household',
  kind: 'single',
  items: [
    ['Sheer Curtain Panel (3×6ft max)',  '180'],
    ['Heavy Curtain Panel (3×6ft max)',  '260'],
    ['Bed Sheet — Single',               '200'],
    ['Bed Sheet — Double',               '280'],
    ['Pillow Cover',                     '90'],
    ['Handkerchief',                     '50'],
    ['Hand Towel',                       '50'],
    ['Bath Towel',                       '140'],
    ['Blanket — Single',                 '330'],
    ['Blanket — Double',                 '460'],
    ['Quilt / Duvet — Single',           '460'],
    ['Quilt / Duvet — Double',           '550'],
    ['Bed Spread — Single',              '360'],
    ['Bed Spread — Double',              '460'],
    ['Table Cloth — Medium',             '220'],
    ['Table Cloth — Large',              '320'],
    ['Soft Toy — Small',                 '210'],
    ['Soft Toy — Medium',                '410'],
    ['Hat',                              '140'],
    ['Cap',                              '90'],
    ['Socks (pair)',                     '90'],
    ['Car Seat Cover — Single Seat',     '310'],
    ['Sofa Cushion Cover — Single Seat', '310'],
    ['1 Seater Sofa @home (min ₹800)',   '700'],
    ['2 Seater Sofa @home (min ₹1000)',  '1200'],
    ['3 Seater Sofa @home',              '2800'],
    ['Cotton Carpet (single)',           '360'],
    ['Carpet (per sq ft)',               '48'],
    ['Foot Mat',                         '140'],
    ['Load — Medium',                    '280'],
    ['Bag — Medium (2 cu. ft.)',         '360'],
    ['Hand Gloves (pair)',               '160'],
    ['Muffler',                          '180'],
  ],
}

const CATEGORIES: ReadonlyArray<Cat> = [GENTLEMEN, LADIES, HOUSEHOLD]

export default function PriceList() {
  const [expanded, setExpanded] = useState(false)
  const totalCount = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)
  const hiddenCount = CATEGORIES.reduce(
    (sum, c) => sum + Math.max(0, c.items.length - PREVIEW_COUNT),
    0,
  )

  return (
    <Section id="prices">
      <FloatingDecor variant="prices" />
      <Eyebrow>Price list · 05</Eyebrow>
      <div className="mt-10 flex flex-col justify-between gap-6 border-t border-line pt-12 md:flex-row md:items-end">
        <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(2rem,5vw,4.5rem)]">
          The rate card.
        </h2>
        <p className="reveal mono-label md:pb-2 md:text-right">
          RATE CARD — SUBJECT TO GARMENT CONDITION
        </p>
      </div>
      <div
        className="mt-14 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3"
        data-stagger
      >
        {CATEGORIES.map((cat, ci) => {
          const visibleItems = expanded ? cat.items : cat.items.slice(0, PREVIEW_COUNT)
          const hiddenInCol = cat.items.length - visibleItems.length
          return (
            <div key={cat.name} className="reveal-item bg-whisper p-8">
              <h3 className="font-mono text-xs uppercase tracking-label text-glow">
                /{String(ci + 1).padStart(2, '0')} · {cat.name}
              </h3>

              {cat.kind === 'dual' ? (
                <>
                  <div className="mt-6 grid grid-cols-[1fr_auto_auto] items-baseline gap-x-5 border-t border-line py-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-label text-muted">Item</span>
                    <span className="text-right font-mono text-[10px] uppercase tracking-label text-muted">D.C. ₹</span>
                    <span className="text-right font-mono text-[10px] uppercase tracking-label text-muted">Steam ₹</span>
                  </div>
                  <ul>
                    {(visibleItems as ReadonlyArray<readonly [string, string, string]>).map(([name, dc, steam]) => (
                      <li
                        key={name}
                        className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-5 border-t border-line py-3"
                      >
                        <span className="text-sm leading-snug text-plum">{name}</span>
                        <span className="text-right font-mono text-xs tracking-label text-muted">{dc}</span>
                        <span className="text-right font-mono text-xs tracking-label text-muted">{steam}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <div className="mt-6 grid grid-cols-[1fr_auto] items-baseline gap-x-5 border-t border-line py-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-label text-muted">Item</span>
                    <span className="text-right font-mono text-[10px] uppercase tracking-label text-muted">Price ₹</span>
                  </div>
                  <ul>
                    {(visibleItems as ReadonlyArray<readonly [string, string]>).map(([name, price]) => (
                      <li
                        key={name}
                        className="grid grid-cols-[1fr_auto] items-baseline gap-x-5 border-t border-line py-3"
                      >
                        <span className="text-sm leading-snug text-plum">{name}</span>
                        <span className="text-right font-mono text-xs tracking-label text-muted">{price}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {!expanded && hiddenInCol > 0 && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-label text-muted/80">
                  + {hiddenInCol} more {hiddenInCol === 1 ? 'item' : 'items'}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="prices"
            className="group inline-flex items-center gap-3 border border-plum bg-whisper px-6 py-3 font-mono text-[11px] uppercase tracking-label text-plum transition-colors duration-200 hover:bg-plum hover:text-whisper"
          >
            <span>
              {expanded
                ? 'Show fewer items'
                : `Show full rate card · ${totalCount} items`}
            </span>
            <ChevronDown
              size={14}
              strokeWidth={2.2}
              aria-hidden="true"
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </Section>
  )
}
