import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Eyebrow, Section } from '../components/ui'

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

export default function BookPickup() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: wire to WhatsApp deep-link / n8n webhook — POST the FormData here.
    setSubmitted(true)
  }

  return (
    <Section id="pickup">
      <Eyebrow>{'// 07 · BOOK A PICKUP'}</Eyebrow>
      <div className="mt-10 grid grid-cols-1 gap-14 border-t border-line pt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(2.75rem,5vw,4.5rem)]">
            Book a pickup.
            <br />
            <em className="italic text-glow">Avail a discount.</em>
          </h2>
          <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-muted">
            Free pickup and delivery across Thane, Navi Mumbai and Mumbai. We confirm your slot
            within an hour.
          </p>
          <div className="reveal mt-10 space-y-3 font-mono text-sm">
            <p>
              <span className="mono-label mr-4">PHONE</span>
              <a href="tel:+919004337979" className="text-plum hover:text-glow">+91 9004337979</a>
              <span className="mx-2 text-line">·</span>
              <a href="tel:+918452808888" className="text-plum hover:text-glow">+91 8452808888</a>
            </p>
            <p>
              <span className="mono-label mr-4">EMAIL</span>
              <a href="mailto:info@eurospin.in" className="text-plum hover:text-glow">
                info@eurospin.in
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
              <h3 className="mt-8 font-display text-4xl uppercase text-plum">Order received.</h3>
              <p className="mt-4 font-mono text-xs uppercase tracking-label text-muted">
                Our team will call within the hour to confirm your slot.
              </p>
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
                  <option>Stain Removal</option>
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
