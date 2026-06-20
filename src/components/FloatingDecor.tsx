import {
  Bubble,
  Droplet,
  IronDoodle,
  PickupVan,
  Sneaker,
  SparkleBurst,
  Spiral,
  StarDoodle,
  TeddyBear,
  WashingMachine,
} from './Doodles'

type Anim =
  | 'animate-float'
  | 'animate-bob'
  | 'animate-drift'
  | 'animate-spin-slow'
  | 'animate-wobble'
  | 'animate-sway'
  | 'animate-twinkle'

type Pos = {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

type Item = {
  Icon: (props: { className?: string }) => JSX.Element
  pos: Pos
  size: string
  color: string
  anim: Anim
  delay?: string
  opacity?: string
  hideOnMobile?: boolean
}

const VARIANTS: Record<string, Item[]> = {
  hero: [
    { Icon: WashingMachine, pos: { top: '12%', right: '6%' },  size: 'h-20 w-20',  color: 'text-mint',    anim: 'animate-float',     delay: '0s',   opacity: 'opacity-70' },
    { Icon: TeddyBear,      pos: { top: '38%', right: '14%' }, size: 'h-14 w-14',  color: 'text-peach',   anim: 'animate-bob',       delay: '0.4s', opacity: 'opacity-80', hideOnMobile: true },
    { Icon: Bubble,         pos: { top: '20%', right: '24%' }, size: 'h-6 w-6',    color: 'text-sky',     anim: 'animate-twinkle',   delay: '0.8s', opacity: 'opacity-90', hideOnMobile: true },
    { Icon: Bubble,         pos: { top: '50%', right: '4%' },  size: 'h-4 w-4',    color: 'text-mint',    anim: 'animate-twinkle',   delay: '1.2s' },
    { Icon: SparkleBurst,   pos: { top: '8%',  left: '4%' },   size: 'h-8 w-8',    color: 'text-marigold',anim: 'animate-twinkle',   delay: '0.2s' },
    { Icon: Droplet,        pos: { top: '62%', right: '20%' }, size: 'h-5 w-5',    color: 'text-sky',     anim: 'animate-float',     delay: '1s',   hideOnMobile: true },
  ],
  about: [
    { Icon: IronDoodle,   pos: { top: '8%',  left: '4%' },  size: 'h-12 w-16',  color: 'text-marigold',anim: 'animate-sway',      delay: '0.2s', opacity: 'opacity-80' },
    { Icon: Spiral,       pos: { top: '20%', right: '8%' }, size: 'h-12 w-12',  color: 'text-velvet-mid', anim: 'animate-spin-slow', opacity: 'opacity-60' },
    { Icon: StarDoodle,   pos: { bottom: '14%', left: '8%' }, size: 'h-8 w-8',  color: 'text-marigold',anim: 'animate-twinkle',   delay: '0.6s', hideOnMobile: true },
    { Icon: Bubble,       pos: { bottom: '24%', right: '12%' },size: 'h-5 w-5', color: 'text-mint',    anim: 'animate-twinkle',   delay: '0.9s' },
  ],
  services: [
    { Icon: WashingMachine,pos: { top: '4%',  left: '2%' },  size: 'h-14 w-14',  color: 'text-mint',    anim: 'animate-drift',     delay: '0s',   opacity: 'opacity-60' },
    { Icon: Sneaker,       pos: { bottom: '8%', right: '4%' },size: 'h-10 w-16', color: 'text-marigold',anim: 'animate-sway',      delay: '0.5s', opacity: 'opacity-80', hideOnMobile: true },
    { Icon: TeddyBear,     pos: { top: '46%', right: '-2%' },size: 'h-12 w-12',  color: 'text-peach',   anim: 'animate-bob',       delay: '0.3s', opacity: 'opacity-70', hideOnMobile: true },
    { Icon: SparkleBurst,  pos: { top: '20%', right: '10%' },size: 'h-6 w-6',    color: 'text-marigold',anim: 'animate-twinkle',   delay: '0.8s' },
    { Icon: Droplet,       pos: { bottom: '30%', left: '4%' },size: 'h-5 w-5',   color: 'text-sky',     anim: 'animate-float',     delay: '1.1s', hideOnMobile: true },
  ],
  why: [
    { Icon: PickupVan,    pos: { bottom: '6%', left: '2%' }, size: 'h-14 w-24',  color: 'text-sky',     anim: 'animate-sway',      delay: '0.2s', opacity: 'opacity-80' },
    { Icon: Spiral,       pos: { top: '10%', right: '6%' },  size: 'h-10 w-10',  color: 'text-velvet-mid', anim: 'animate-spin-slow', opacity: 'opacity-60' },
    { Icon: StarDoodle,   pos: { top: '38%', left: '4%' },   size: 'h-7 w-7',    color: 'text-marigold',anim: 'animate-twinkle',   delay: '0.4s', hideOnMobile: true },
    { Icon: Bubble,       pos: { top: '64%', right: '14%' }, size: 'h-5 w-5',    color: 'text-mint',    anim: 'animate-twinkle',   delay: '0.8s' },
  ],
  process: [
    { Icon: IronDoodle,   pos: { top: '10%', right: '6%' },  size: 'h-12 w-16',  color: 'text-peach',   anim: 'animate-wobble',    delay: '0.2s', opacity: 'opacity-70' },
    { Icon: WashingMachine,pos: { bottom: '14%', left: '4%' },size: 'h-12 w-12',  color: 'text-mint',    anim: 'animate-float',     delay: '0.5s', opacity: 'opacity-70', hideOnMobile: true },
    { Icon: SparkleBurst, pos: { top: '46%', left: '8%' },   size: 'h-6 w-6',    color: 'text-marigold',anim: 'animate-twinkle',   delay: '0.9s' },
  ],
  prices: [
    { Icon: Sneaker,      pos: { top: '6%',  left: '4%' },   size: 'h-10 w-16',  color: 'text-marigold',anim: 'animate-sway',      delay: '0.2s', opacity: 'opacity-80' },
    { Icon: TeddyBear,    pos: { bottom: '10%', right: '4%' },size: 'h-12 w-12',  color: 'text-peach',   anim: 'animate-bob',       delay: '0.5s', opacity: 'opacity-80', hideOnMobile: true },
    { Icon: Spiral,       pos: { top: '40%', right: '6%' },  size: 'h-10 w-10',  color: 'text-velvet-mid', anim: 'animate-spin-slow', opacity: 'opacity-60' },
  ],
  contact: [
    { Icon: PickupVan,    pos: { top: '8%',  right: '4%' },  size: 'h-14 w-24',  color: 'text-sky',     anim: 'animate-sway',      delay: '0.2s', opacity: 'opacity-80' },
    { Icon: Droplet,      pos: { bottom: '20%', left: '6%' },size: 'h-5 w-5',    color: 'text-sky',     anim: 'animate-float',     delay: '0.7s' },
    { Icon: StarDoodle,   pos: { top: '50%', left: '4%' },   size: 'h-7 w-7',    color: 'text-marigold',anim: 'animate-twinkle',   delay: '0.9s', hideOnMobile: true },
  ],
}

type Props = { variant: keyof typeof VARIANTS }

export default function FloatingDecor({ variant }: Props) {
  const items = VARIANTS[variant] ?? []
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((it, i) => {
        const style: React.CSSProperties = {
          ...it.pos,
          animationDelay: it.delay,
        }
        const Icon = it.Icon
        return (
          <span
            key={i}
            className={`absolute ${it.size} ${it.color} ${it.opacity ?? 'opacity-80'} ${it.anim} ${it.hideOnMobile ? 'hidden md:block' : ''}`}
            style={style}
          >
            <Icon className="h-full w-full" />
          </span>
        )
      })}
    </div>
  )
}
