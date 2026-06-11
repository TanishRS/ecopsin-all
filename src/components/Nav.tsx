import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { scrollToHash, startScroll, stopScroll } from '../lib/scroll'

const LINKS: ReadonlyArray<readonly [string, string]> = [
  ['HOME', '#home'],
  ['ABOUT', '#about'],
  ['SERVICES', '#services'],
  ['WHY EUROSPIN', '#why'],
  ['GALLERY', '#gallery'],
  ['PRICE LIST', '#prices'],
  ['JOURNAL', '#footer'],
  ['CAREERS', '#footer'],
  ['CONTACT', '#contact'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) stopScroll()
    else startScroll()
  }, [open])

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setOpen(false)
    // let the menu close before scrolling so Lenis is running again
    requestAnimationFrame(() => scrollToHash(href))
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b bg-whisper transition-colors duration-300 ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-page items-center justify-between px-6 md:px-10 xl:px-16">
        <a href="#home" onClick={(e) => go(e, '#home')} className="flex items-baseline gap-3">
          <span className="font-body text-xl font-bold lowercase tracking-tight text-plum">
            eurospin
          </span>
          <span className="font-mono text-[9px] uppercase tracking-eyebrow text-glow">
            EST. INDIA
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-6">
            {LINKS.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => go(e, href)}
                  className="font-mono text-[10px] uppercase tracking-label text-muted transition-colors duration-200 hover:text-glow"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#pickup" onClick={(e) => go(e, '#pickup')} className="btn-solid hidden !px-5 !py-3 sm:inline-flex">
            BOOK PICKUP <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-plum lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* mobile menu overlay */}
      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-[110] flex flex-col bg-plum text-whisper lg:hidden">
          <div className="flex h-[72px] items-center justify-between px-6">
            <span className="font-body text-xl font-bold lowercase text-whisper">eurospin</span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-whisper/30 text-whisper"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pb-10 pt-6">
            <ul className="space-y-1 border-t border-whisper/15">
              {LINKS.map(([label, href], i) => (
                <li key={label} className="border-b border-whisper/15">
                  <a
                    href={href}
                    onClick={(e) => go(e, href)}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="font-display text-3xl uppercase">{label}</span>
                    <span className="font-mono text-[10px] tracking-label text-glow">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a href="#pickup" onClick={(e) => go(e, '#pickup')} className="btn-solid mt-8 w-full justify-center !bg-glow">
              BOOK PICKUP <ArrowRight size={13} aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
