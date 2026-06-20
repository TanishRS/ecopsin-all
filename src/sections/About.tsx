import { Eyebrow, Section, SquareDot } from '../components/ui'
import { ArrowDoodle } from '../components/Doodles'

export default function About() {
  return (
    <Section id="about">
      {/* PHOTO PLACEHOLDER: subtle background texture of the processing unit / team at work
          goes here (absolutely-positioned, low-opacity) once real photos are provided. */}
      <Eyebrow>About · 01</Eyebrow>
      <div className="mt-10 grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-20">
        <h2 className="reveal font-display uppercase leading-[0.95] text-plum [font-size:clamp(2rem,5.5vw,5rem)]">
          dry-cleaner
          <SquareDot />
          <span className="sr-only">.</span>
        </h2>
        <div className="reveal max-w-xl text-[15px] leading-relaxed text-muted lg:justify-self-end lg:pt-2">
          <p>
            One processing unit in Thane-West. A team trained in five-star hotel laundries — in
            India and abroad. Every garment{' '}
            <span className="serif-it text-plum">tracked</span> from pickup to delivery.
          </p>
          <div className="mt-6 flex items-end gap-2 text-plum/80">
            <span className="hand text-2xl text-glow">drop it off →</span>
            <ArrowDoodle className="h-10 w-16 -rotate-3 text-velvet-mid opacity-80" />
          </div>
        </div>
      </div>
    </Section>
  )
}
