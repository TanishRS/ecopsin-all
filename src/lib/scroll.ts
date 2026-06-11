import type Lenis from 'lenis'

let lenis: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  lenis = l
}

export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const scrollToHash = (hash: string) => {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
