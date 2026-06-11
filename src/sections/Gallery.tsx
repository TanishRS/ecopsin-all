import { Plate } from '../components/Placeholders'
import { Eyebrow, Section } from '../components/ui'

const TILES = [
  { variant: 'hanger', span: 'col-span-2 row-span-2' },
  { variant: 'steam', span: '' },
  { variant: 'fold', span: '' },
  { variant: 'tag', span: 'row-span-2' },
  { variant: 'drum', span: '' },
  { variant: 'fiber', span: '' },
] as const

export default function Gallery() {
  return (
    <Section id="gallery">
      <Eyebrow>{'// GALLERY · FIELD NOTES'}</Eyebrow>
      <div
        className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-px border border-line bg-line md:auto-rows-[220px] md:grid-cols-4"
        data-stagger
      >
        {TILES.map((t, i) => (
          <figure key={i} className={`reveal-item group overflow-hidden bg-whisper ${t.span}`}>
            <Plate
              variant={t.variant}
              className="block h-full w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </Section>
  )
}
