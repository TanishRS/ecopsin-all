import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'

const STORES = [
  {
    n: '01',
    name: 'Thane (CPU)',
    address:
      'Unit No. 23, Kothari Compound 9 Acre, Manpada, Behind Happy Valley, Thane (W) 400610',
    phones: ['+91 8452808888'],
  },
  {
    n: '02',
    name: 'Thane Store',
    address:
      'Shastri Nagar Naka, Pokran Road No.1, Beside Sanskriti Family Restaurant & Bar, Thane (W) 400606',
    phones: ['+91 9004337979', '+91 9004588555'],
  },
  {
    n: '03',
    name: 'Kharghar Store',
    address: 'Shop No.19, Green Heritage CHS, Plot No.79/80, Sector 20, Kharghar 410210',
    phones: ['+91 86574 22155', '+91 86574 22355'],
  },
]

export default function LocateUs() {
  return (
    <Section id="locations">
      <Eyebrow>{'// 08 · LOCATE US'}</Eyebrow>
      <h2 className="reveal mt-10 border-t border-line pt-12 font-display uppercase leading-[0.95] text-plum [font-size:clamp(2rem,5vw,4.5rem)]">
        Three doors. <span className="text-glow">One promise.</span>
      </h2>

      {/* PHOTO PLACEHOLDER: each store card below gets a storefront photo strip at the top
          once real photos are provided. */}
      <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3" data-stagger>
        {STORES.map((s) => (
          <article key={s.n} className="reveal-item group bg-whisper p-8 transition-colors duration-300 ease-out hover:bg-petal md:p-10">
            <p className="font-mono text-xs tracking-label text-glow">STORE / {s.n}</p>
            <h3 className="mt-4 font-display text-2xl uppercase text-plum">{s.name}</h3>
            <p className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted">
              <MapPin size={16} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-plum" />
              {s.address}
            </p>
            <p className="mt-4 flex items-start gap-3 text-sm text-muted">
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-plum" />
              <span>
                {s.phones.map((p, i) => (
                  <span key={p}>
                    {i > 0 && <span className="mx-1.5 text-line">·</span>}
                    <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-glow">
                      {p}
                    </a>
                  </span>
                ))}
              </span>
            </p>
          </article>
        ))}
      </div>

      {/* mini contact block */}
      <div id="contact" className="mt-24 grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-2">
        <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(1.875rem,4vw,3.75rem)]">
          Get in touch<span className="text-glow">.</span>
        </h2>
        <form
          className="reveal grid grid-cols-1 gap-6 sm:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault()
            // TODO: wire to the same webhook as the pickup form.
            const btn = e.currentTarget.querySelector('button')
            if (btn) btn.textContent = 'SENT ✓'
          }}
        >
          <div>
            <label htmlFor="ct-name" className="mono-label mb-2 block text-plum">NAME</label>
            <input id="ct-name" type="text" required autoComplete="name" className="input-sharp" />
          </div>
          <div>
            <label htmlFor="ct-email" className="mono-label mb-2 block text-plum">EMAIL</label>
            <input id="ct-email" type="email" required autoComplete="email" className="input-sharp" />
          </div>
          <div>
            <label htmlFor="ct-phone" className="mono-label mb-2 block text-plum">PHONE</label>
            <input id="ct-phone" type="tel" required autoComplete="tel" className="input-sharp" />
          </div>
          <button type="submit" className="btn-solid justify-center sm:col-span-3">
            SEND <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </form>
      </div>
    </Section>
  )
}
