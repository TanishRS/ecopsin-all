import { useState } from 'react'
import { Facebook, Instagram } from 'lucide-react'
import TermsModal from '../components/TermsModal'
import { scrollToHash } from '../lib/scroll'

const MENU = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Price List', '#prices'],
] as const

const SERVICES = [
  'Dry Cleaning',
  'Wet Cleaning',
  'Steam Ironing',
  'Stain Removal',
  'Free Pickup & Delivery',
]

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false)

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    scrollToHash(href)
  }

  return (
    <footer id="footer" className="relative z-10 text-whisper">
      <div className="dither" aria-hidden="true" />
      <div className="bg-plum">
      <div className="mx-auto max-w-page px-6 py-10 md:px-10 md:py-20 xl:px-16">
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-glow">
          {'// SINCE · INDIA'}
        </p>
        <div className="mt-8 flex flex-col justify-between gap-12 border-b border-whisper/15 pb-16 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl font-display uppercase leading-[0.95] [font-size:clamp(2rem,6vw,5.5rem)]">
            Cleaner clothes,
            <br />
            kinder planet<span className="text-glow">.</span>
          </h2>
          <div className="max-w-sm">
            {/* brightness-0 invert renders the purple logo white on the plum footer */}
            <img
              src="/ecospin-logo.png"
              alt="Ecospin Dry Cleaners — Shine Naturally"
              className="mb-6 w-[220px] brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-whisper/70">
              Ecospin is a DLI-USA certified laundry &amp; dry-cleaning studio operating out of
              Thane-West with stores across the Mumbai region.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/ecospin_drycleaners/"
                target="_blank"
                rel="noreferrer"
                aria-label="Ecospin on Instagram"
                className="inline-flex h-11 w-11 items-center justify-center border border-whisper/30 text-whisper transition-colors duration-200 hover:border-glow hover:text-glow"
              >
                <Instagram size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/ecospindrycleaners/"
                target="_blank"
                rel="noreferrer"
                aria-label="Ecospin on Facebook"
                className="inline-flex h-11 w-11 items-center justify-center border border-whisper/30 text-whisper transition-colors duration-200 hover:border-glow hover:text-glow"
              >
                <Facebook size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 py-12 sm:grid-cols-3">
          <nav aria-label="Footer menu">
            <h3 className="font-mono text-[10px] uppercase tracking-label text-whisper/50">MENU</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {MENU.map(([label, href]) => (
                <li key={label}>
                  <a href={href} onClick={(e) => go(e, href)} className="text-whisper/80 transition-colors duration-200 hover:text-glow">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setTermsOpen(true)}
                  className="text-whisper/80 transition-colors duration-200 hover:text-glow"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </nav>
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-label text-whisper/50">SERVICES</h3>
            <ul className="mt-6 space-y-3 text-sm text-whisper/80">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-label text-whisper/50">GET IN TOUCH</h3>
            <ul className="mt-6 space-y-3 text-sm text-whisper/80">
              <li>
                <a href="tel:+918657422155" className="hover:text-glow">+91 86574 22155</a>
                <span className="mx-2 text-whisper/30">·</span>
                <a href="tel:+918657422355" className="hover:text-glow">+91 86574 22355</a>
              </li>
              <li>
                <a href="mailto:info@ecospin.in" className="hover:text-glow">info@ecospin.in</a>
              </li>
              <li>Unit 23 Kothari Compound, Manpada, Thane (W) 400610</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-whisper/15 pt-8 font-mono text-[10px] uppercase tracking-label text-whisper/50 sm:flex-row">
          <p>© 2026 ECOSPIN INDIA. ALL RIGHTS RESERVED.</p>
          <p>CRAFTED IN THANE · DLI-USA MEMBER</p>
        </div>
      </div>
      </div>
      {termsOpen && <TermsModal onClose={() => setTermsOpen(false)} />}
    </footer>
  )
}
