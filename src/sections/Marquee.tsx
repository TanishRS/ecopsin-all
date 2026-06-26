import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/scroll'

const WORDS = ['WET·CLEAN', 'STEAM·IRON', 'STAIN·REMOVAL', 'DRY·CLEAN']

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span className="px-8 font-display text-4xl uppercase leading-none text-plum md:px-12 md:text-6xl">
            {w}
          </span>
          <span
            className={`h-3 w-3 md:h-4 md:w-4 ${i % 2 ? 'bg-orchid' : 'bg-glow'}`}
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!track.current || prefersReducedMotion()) return
    const tween = gsap.to(track.current, {
      xPercent: -50,
      ease: 'none',
      duration: 26,
      repeat: -1,
    })
    const el = track.current
    const pause = () => tween.pause()
    const play = () => tween.play()
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', play)
    return () => {
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', play)
      tween.kill()
    }
  }, [])

  return (
    <div
      className="relative z-10 my-24 overflow-hidden border-y border-line bg-whisper py-6 md:my-32"
      aria-hidden="true"
    >
      <div ref={track} className="flex w-max">
        <Row />
        <Row />
      </div>
      <div className="dither mt-6 opacity-10" />
    </div>
  )
}
