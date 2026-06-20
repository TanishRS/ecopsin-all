import { useState } from 'react'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'

const WHATSAPP_NUMBER = '918657422155'
const WEBHOOK_URL = 'https://n8n-service-wvij.onrender.com/webhook/ecospin-order'

type Store = {
  n: string
  name: string
  address?: string
  phones?: string[]
  comingSoon?: boolean
}

const STORES: Store[] = [
  {
    n: '01',
    name: 'Kharghar (CPU)',
    address: 'Shop No.19, Green Heritage CHS, Plot No.79/80, Sector 20, Kharghar 410210',
    phones: ['+91 86574 22155', '+91 86574 22355'],
  },
  {
    n: '02',
    name: 'Thane Store',
    phones: ['+91 9004337979', '+91 9004588555'],
  },
  {
    n: '03',
    name: 'Ulwe Store',
    comingSoon: true,
  },
]

export default function LocateUs() {
  const [waUrl, setWaUrl] = useState<string | null>(null)

  const onContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (key: string) => String(data.get(key) ?? '').trim()

    const payload = {
      customer_name: get('name'),
      email:         get('email'),
      phone:         get('phone').replace(/^\+/, ''),
      type:          'inquiry',
      status:        'new',
      timestamp:     new Date().toISOString(),
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // webhook failure must not block the wa.me redirect
    }

    const details = [
      `Name: ${get('name')}`,
      `Phone: ${get('phone')}`,
      `Email: ${get('email')}`,
    ].filter(Boolean)
    const message = ['New inquiry — ecospin.in', '', ...details].join('\n')

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener')
    setWaUrl(url)
  }

  return (
    <Section id="locations">
      <Eyebrow>Locate us · 08</Eyebrow>
      <h2 className="reveal mt-10 border-t border-line pt-12 font-display uppercase leading-[0.95] text-plum [font-size:clamp(2rem,5vw,4.5rem)]">
        Three doors. <span className="text-glow">One promise.</span>
      </h2>

      {/* PHOTO PLACEHOLDER: each store card below gets a storefront photo strip at the top
          once real photos are provided. */}
      <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3" data-stagger>
        {STORES.map((s) => (
          <article key={s.n} className="reveal-item group bg-whisper p-8 transition-colors duration-300 ease-out hover:bg-petal md:p-10">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs tracking-label text-glow">STORE / {s.n}</p>
              {s.comingSoon && (
                <span className="font-mono text-[10px] uppercase tracking-label text-plum/60 border border-line px-2 py-1">
                  Coming soon
                </span>
              )}
            </div>
            <h3 className="mt-4 font-display text-2xl uppercase text-plum">{s.name}</h3>
            {s.comingSoon ? (
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Opening soon — details to follow.
              </p>
            ) : (
              <>
                <p className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <MapPin size={16} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-plum" />
                  {s.address ?? <span className="italic text-muted/70">Address coming soon</span>}
                </p>
                {s.phones && (
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
                )}
              </>
            )}
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
          onSubmit={onContactSubmit}
        >
          <div>
            <label htmlFor="ct-name" className="mono-label mb-2 block text-plum">NAME</label>
            <input id="ct-name" name="name" type="text" required autoComplete="name" className="input-sharp" />
          </div>
          <div>
            <label htmlFor="ct-email" className="mono-label mb-2 block text-plum">EMAIL</label>
            <input id="ct-email" name="email" type="email" required autoComplete="email" className="input-sharp" />
          </div>
          <div>
            <label htmlFor="ct-phone" className="mono-label mb-2 block text-plum">PHONE</label>
            <input id="ct-phone" name="phone" type="tel" required autoComplete="tel" className="input-sharp" />
          </div>
          <button type="submit" className="btn-solid justify-center sm:col-span-3">
            {waUrl ? 'SENT ✓' : 'SEND'}
            {!waUrl && <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />}
          </button>
          {waUrl && (
            <p className="font-mono text-[11px] uppercase tracking-label text-muted sm:col-span-3">
              We&apos;ve opened WhatsApp with your message — hit send to confirm.{' '}
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="text-glow underline-offset-4 hover:underline"
              >
                Didn&apos;t open?
              </a>
            </p>
          )}
        </form>
      </div>
    </Section>
  )
}
