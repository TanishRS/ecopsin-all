import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { startScroll, stopScroll } from '../lib/scroll'

const TERMS = [
  'Ecospin does not guarantee stain removal, or damage caused while removing stains. However, we ensure our manpower is highly skilled and understands fabric, and we are well equipped with hi-tech machines and eco-friendly solvents, detergents and chemicals.',
  'Ecospin does not guarantee against colour bleeding of your garments — this is a manufacturing aspect of fabric quality and dyeing. We are skillfully and technically cleaning and serving you.',
  'Any damage because of an old or long-kept (fragile) garment will not be Ecospin’s responsibility.',
  'Examine every garment thoroughly before sending it over. Ecospin will not be responsible for loss or damage of valuables left in the garments.',
  'Normal delivery is within 96 hours from pick-up time. Ecospin accepts no liability for delayed service or delivery for reasons out of its control.',
  'Express delivery is within 24 hours from the time of pick-up, with a 50% extra charge and without any discount. Ecospin accepts no liability for delay for reasons out of our control.',
  'Ecospin will not be held responsible for garments not collected or called for within 7 days from the pickup date.',
  'Unclaimed garments will be safely kept with us for a maximum period of 30 days, after which Ecospin will not be responsible for the same. A safe-keeping charge of ₹5/- per piece per day will be charged after 15 days from the delivery date.',
  'Ecospin reserves the right to refuse services for any garment.',
  'Ecospin is not responsible for loss of or damage to customers’ clothing in case of fire, theft, accidents or other causes beyond our control.',
  'Please check all garments at the time of delivery. Any loss or damage must be brought to notice within 24 hours of receipt of the garment, and must be presented with a copy of the bill.',
  'In case of a misplaced or damaged garment, liability will be 5 to 10 times our billing price of the garment, upon the approval of the laundry manager.',
  'An Ecospin expert will decide whether to dry-clean or wet-clean based on the type of fabric.',
  'Any damage occurring while following the manufacturer’s instruction label is not the responsibility of Ecospin.',
  'Innerwear is cleaned separately and steamed to refresh fibres, but may not be ironed.',
  'These terms & conditions and the price list are subject to change without any prior notice.',
  'For any problem or complaint, please communicate on 8657 422 355 with the bill copy of the garment and our invoice — our concerned team member will do the needful.',
  'Any unresolved conflict is to be legally settled under the jurisdiction.',
]

export default function TermsModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    stopScroll()
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      startScroll()
    }
  }, [onClose])

  // portal escapes the footer's `relative z-10` stacking context (nav is z-[100])
  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-stretch justify-center bg-plum/70 md:items-center md:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full flex-col bg-whisper text-plum md:max-h-[80vh] md:max-w-3xl md:border md:border-line"
      >
        <header className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 md:px-10 md:py-6">
          <div>
            <p className="eyebrow">{'// THE FINE PRINT'}</p>
            <h2 id="terms-title" className="mt-2 font-display text-3xl uppercase leading-none text-plum md:text-4xl">
              Terms &amp; Conditions
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close terms and conditions"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-plum text-plum transition-colors duration-200 hover:border-glow hover:text-glow"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </header>

        {/* data-lenis-prevent lets this panel scroll natively under Lenis */}
        <ol
          data-lenis-prevent
          className="flex-1 list-decimal space-y-4 overflow-y-auto py-6 pl-12 pr-6 text-sm leading-relaxed text-muted marker:font-mono marker:text-xs marker:text-glow md:py-8 md:pl-16 md:pr-10"
        >
          {TERMS.map((t, i) => (
            <li key={i} className="pl-2">
              {t}
            </li>
          ))}
        </ol>
      </div>
    </div>,
    document.body,
  )
}
