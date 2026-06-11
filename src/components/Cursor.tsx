import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/scroll'

const RING_SIZE = 36
const DOT_SIZE = 5
const RING_LERP = 0.12 // floaty
const DOT_LERP = 0.38 // snappy — the gap between the two gives the elastic feel

/**
 * Two-part circle cursor: a snappy dot and a floaty ring trailing it.
 * The ring squashes along its direction of travel based on velocity,
 * grows over interactive elements and squeezes on click.
 * Hidden on touch devices; lerp & stretch disabled under reduced motion.
 */
export default function Cursor() {
  const ringWrap = useRef<HTMLDivElement>(null)
  const dotWrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringWrap.current
    const dot = dotWrap.current
    if (!ring || !dot || window.matchMedia('(pointer: coarse)').matches) return
    const reduced = prefersReducedMotion()

    let tx = -100
    let ty = -100
    let rx = tx
    let ry = ty
    let dx = tx
    let dy = ty
    let raf = 0

    const place = () => {
      const vx = tx - rx
      const vy = ty - ry
      // directional squash: faster travel = flatter ellipse along the motion axis
      const speed = Math.min(Math.hypot(vx, vy) / 90, 1)
      const stretch = reduced ? 0 : speed * 0.35
      const angle = Math.atan2(vy, vx)
      ring.style.transform =
        `translate3d(${rx - RING_SIZE / 2}px, ${ry - RING_SIZE / 2}px, 0) ` +
        `rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.55})`
      dot.style.transform = `translate3d(${dx - DOT_SIZE / 2}px, ${dy - DOT_SIZE / 2}px, 0)`
    }

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      ring.style.opacity = '1'
      dot.style.opacity = '1'
      if (reduced) {
        rx = dx = tx
        ry = dy = ty
        place()
      }
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const active = !!t.closest('a, button, input, select, textarea, label, [data-cursor]')
      ring.classList.toggle('cursor-active', active)
    }
    const onDown = () => ring.classList.add('cursor-down')
    const onUp = () => ring.classList.remove('cursor-down')
    const loop = () => {
      rx += (tx - rx) * RING_LERP
      ry += (ty - ry) * RING_LERP
      dx += (tx - dx) * DOT_LERP
      dy += (ty - dy) * DOT_LERP
      place()
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })
    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={ringWrap}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[120] hidden opacity-0 lg:block"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      >
        <span className="cursor-dot block h-full w-full border-[1.5px] border-plum/60 transition-[transform,border-color,background-color] duration-300 ease-out" />
      </div>
      <div
        ref={dotWrap}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden bg-glow opacity-0 lg:block"
        style={{ width: DOT_SIZE, height: DOT_SIZE, borderRadius: '50%' }}
      />
    </>
  )
}
