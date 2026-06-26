import { useState } from 'react'
import {
  ArrowRight,
  Banknote,
  Check,
  Clock,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'

const TRUST_BADGES: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Banknote,    label: 'Cash / UPI / Card accepted' },
  { icon: Truck,       label: 'Free pickup & delivery' },
  { icon: ShieldCheck, label: 'DLI-USA certified' },
  { icon: Clock,       label: 'Same-day available' },
]

function Field({
  label,
  htmlFor,
  children,
  className = '',
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mono-label mb-2 block text-plum">
        {label}
      </label>
      {children}
    </div>
  )
}

const WHATSAPP_NUMBER = '918657422155'

export default function BookPickup() {
  const [waUrl, setWaUrl] = useState<string | null>(null)
  const submitted = waUrl !== null

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (key: string) => String(data.get(key) ?? '').trim()

    const date = get('date')
    const prettyDate = date
      ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : ''

    const payload = {
      customer_name: get('name'),
      phone:         get('phone').replace(/^\+/, ''),
      email:         get('email'),
      city:          get('city'),
      address:       get('address'),
      item:          get('garments'),
      service:       get('service'),
      pickup_date:   date,
      notes:         get('notes'),
      status:        'confirmed',
      timestamp:     new Date().toISOString(),
    }

    try {
      await fetch('https://n8n-service-wvij.onrender.com/webhook/ecospin-order', {
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
      get('email') && `Email: ${get('email')}`,
      `City: ${get('city')}`,
      `Address: ${get('address')}`,
      `Pickup date: ${prettyDate}`,
      `Service: ${get('service')}`,
      get('garments') && `Garments (approx.): ${get('garments')}`,
      get('notes') && `Notes: ${get('notes')}`,
    ].filter(Boolean)
    const message = ['New pickup request — ecospin.co.in', '', ...details].join('\n')

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener')
    setWaUrl(url)
  }

  return (
    <Section id="pickup">
      <Eyebrow>Book a pickup · 07</Eyebrow>

      {/* Trust strip — last reassurance before the form */}
      <ul className="reveal mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border border-velvet-mid bg-velvet-light px-5 py-3 md:gap-x-10">
        {TRUST_BADGES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-velvet-darkest">
            <Icon size={16} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-velvet" />
            <span className="text-[13px] font-semibold leading-none">{label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid grid-cols-1 gap-14 border-t border-line pt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(2rem,5vw,4.5rem)]">
            Book a pickup.
            <br />
            <span className="serif-it text-glow">save</span> on your first wash.
          </h2>
          <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-muted">
            Free pickup and delivery across Thane, Navi Mumbai and Mumbai.{' '}
            <span className="semibold text-plum">We reply on WhatsApp in &lt;15 min.</span>
          </p>
          <div className="reveal mt-4">
            <span className="serif-it text-2xl text-plum">save on your first wash →</span>
          </div>
          <div className="reveal mt-10 space-y-3 font-mono text-sm">
            <p>
              <span className="mono-label mr-4">PHONE</span>
              <a href="tel:+918657422155" className="text-plum hover:text-glow">+91 86574 22155</a>
              <span className="mx-2 text-line">·</span>
              <a href="tel:+918657422355" className="text-plum hover:text-glow">+91 86574 22355</a>
            </p>
            <p>
              <span className="mono-label mr-4">EMAIL</span>
              <a href="mailto:info@ecospin.co.in" className="text-plum hover:text-glow">
                info@ecospin.co.in
              </a>
            </p>
          </div>
        </div>

        <div className="reveal border border-line bg-petal p-8 md:p-10">
          {submitted ? (
            <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
              <span className="inline-flex h-14 w-14 items-center justify-center bg-glow text-whisper">
                <Check size={26} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <h3 className="mt-8 font-display text-4xl uppercase text-plum">Almost there.</h3>
              <p className="mt-4 font-mono text-xs uppercase tracking-label text-muted">
                We&apos;ve opened WhatsApp with your booking — hit send to confirm.
                <br />
                We&apos;ll call within the hour to lock your slot.
              </p>
              <a href={waUrl ?? undefined} target="_blank" rel="noreferrer" className="btn-outline mt-8">
                WHATSAPP DIDN&apos;T OPEN?
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="FULL NAME" htmlFor="bp-name">
                <input id="bp-name" name="name" type="text" required autoComplete="name" className="input-sharp" />
              </Field>
              <Field label="PHONE" htmlFor="bp-phone">
                <input id="bp-phone" name="phone" type="tel" required autoComplete="tel" className="input-sharp" />
              </Field>
              <Field label="EMAIL (OPTIONAL)" htmlFor="bp-email">
                <input id="bp-email" name="email" type="email" autoComplete="email" className="input-sharp" />
              </Field>
              <Field label="CITY" htmlFor="bp-city">
                <select id="bp-city" name="city" required className="input-sharp">
                  <option value="">Select…</option>
                  <option>Thane</option>
                  <option>Navi Mumbai</option>
                  <option>Mumbai</option>
                </select>
              </Field>
              <Field label="PICKUP ADDRESS" htmlFor="bp-address" className="sm:col-span-2">
                <input id="bp-address" name="address" type="text" required autoComplete="street-address" className="input-sharp" />
              </Field>
              <Field label="PICKUP DATE" htmlFor="bp-date">
                <input id="bp-date" name="date" type="date" required className="input-sharp" />
              </Field>
              <Field label="SERVICE" htmlFor="bp-service">
                <select id="bp-service" name="service" required className="input-sharp">
                  <option value="">Select…</option>
                  <option>Dry Cleaning</option>
                  <option>Wet Cleaning</option>
                  <option>Steam Ironing</option>
                  <option>Pre-Wash</option>
                  <option>Shoe Cleaning</option>
                  <option>Soft Toys</option>
                </select>
              </Field>
              <Field label="GARMENTS (APPROX.)" htmlFor="bp-count">
                <input id="bp-count" name="garments" type="number" min="1" className="input-sharp" />
              </Field>
              <Field label="NOTES (OPTIONAL)" htmlFor="bp-notes">
                <input id="bp-notes" name="notes" type="text" className="input-sharp" />
              </Field>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 text-sm text-muted">
                  <input type="checkbox" required className="h-4 w-4 accent-glow" />
                  I agree to the Terms &amp; Conditions
                </label>
              </div>
              <button type="submit" className="btn-solid justify-center sm:col-span-2">
                BOOK AN ORDER <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
