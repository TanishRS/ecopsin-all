import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Cursor from './components/Cursor'
import Nav from './components/Nav'
import WhatsAppFloat from './components/WhatsAppFloat'
import { GuideLines } from './components/ui'
import Hero from './sections/Hero'
import StatsBar from './sections/StatsBar'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Services from './sections/Services'
import Why from './sections/Why'
import Process from './sections/Process'
import Gallery from './sections/Gallery'
import PriceList from './sections/PriceList'
import Testimonials from './sections/Testimonials'
import BookPickup from './sections/BookPickup'
import LocateUs from './sections/LocateUs'
import Footer from './sections/Footer'
import { prefersReducedMotion, setLenis } from './lib/scroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * Splash loader: pops the logo in, spins it once, flies it to the nav-bar
 * logo's exact spot, then fades to reveal the real nav image underneath.
 * Body scroll is locked while the animation runs.
 */
function runLoaderHandoff() {
  const loader = document.getElementById('ecospin-loader')
  if (!loader) return
  const loaderImg = loader.querySelector<HTMLImageElement>('img')
  const navImg = document.querySelector<HTMLImageElement>('header a[href="#home"] img')
  const html = document.documentElement
  const body = document.body

  // Lock scroll while the loader is up
  const prevHtmlOverflow = html.style.overflow
  const prevBodyOverflow = body.style.overflow
  html.style.overflow = 'hidden'
  body.style.overflow = 'hidden'
  loader.style.pointerEvents = 'none'

  const cleanup = () => {
    loader.remove()
    html.style.overflow = prevHtmlOverflow
    body.style.overflow = prevBodyOverflow
  }

  if (!loaderImg || !navImg) {
    cleanup()
    return
  }

  const reduced = prefersReducedMotion()
  let started = false

  const begin = () => {
    if (started) return
    started = true

    const loaderRect = loaderImg.getBoundingClientRect()
    const navRect = navImg.getBoundingClientRect()

    // Degenerate cases — just fade out so we don't divide by zero or fly nowhere useful
    if (!loaderRect.height || !navRect.width || !navRect.height) {
      gsap.to(loader, { autoAlpha: 0, duration: 0.4, onComplete: cleanup })
      return
    }

    if (reduced) {
      gsap.to(loader, { autoAlpha: 0, duration: 0.35, onComplete: cleanup })
      return
    }

    // Match the nav logo's rendered height so ECOSPIN reads at the same scale on landing
    const targetScale = navRect.height / loaderRect.height
    const dx = navRect.left + navRect.width / 2 - (loaderRect.left + loaderRect.width / 2)
    const dy = navRect.top + navRect.height / 2 - (loaderRect.top + loaderRect.height / 2)

    const tl = gsap.timeline({ onComplete: cleanup })
    tl
      // 1) POP IN — scale 0.6 → 1.3, fade in, bouncy
      .to(loaderImg, { scale: 1.3, opacity: 1, duration: 0.5, ease: 'back.out(2)' })
      // 2) SPIN once + SETTLE — one full 360° rotation while scaling back to 1
      .to(loaderImg, { rotation: 360, scale: 1, duration: 0.7, ease: 'power2.inOut' })
      // 3) FLY TO NAVBAR — translate + shrink to nav-logo size; backdrop fades in parallel
      .to(
        loaderImg,
        { x: dx, y: dy, scale: targetScale, duration: 0.6, ease: 'power3.inOut' },
        '+=0.05',
      )
      .to(
        loader,
        { backgroundColor: 'rgba(245, 235, 250, 0)', duration: 0.5, ease: 'power2.out' },
        '<',
      )
      // 4) HANDOFF — fade loader image to reveal the real nav logo underneath
      .to(loaderImg, { opacity: 0, duration: 0.18, ease: 'power1.out' })
  }

  // Wait for both images to be measurable before starting (so we land accurately)
  const ready = (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
  const waitFor = (img: HTMLImageElement) =>
    ready(img)
      ? Promise.resolve()
      : new Promise<void>((res) => {
          img.addEventListener('load', () => res(), { once: true })
          img.addEventListener('error', () => res(), { once: true })
        })

  Promise.all([waitFor(loaderImg), waitFor(navImg)]).then(begin)
  // Safety: if either image stalls, kick off anyway after 1.5s
  setTimeout(begin, 1500)
}

export default function App() {
  useEffect(() => {
    runLoaderHandoff()
  }, [])

  useEffect(() => {
    const reduced = prefersReducedMotion()

    // Lenis momentum scroll — disabled under reduced motion
    let lenis: Lenis | null = null
    let raf = 0
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.11 })
      setLenis(lenis)
      const loop = (t: number) => {
        lenis!.raf(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      lenis.on('scroll', ScrollTrigger.update)
    }

    // Global scroll reveals. Elements stay visible without JS/under reduced motion
    // because gsap (not CSS) applies the hidden initial state.
    let ctx: gsap.Context | undefined
    if (!reduced) {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })
        gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
          const items = group.querySelectorAll('.reveal-item')
          if (!items.length) return
          gsap.fromTo(
            items,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: { trigger: group, start: 'top 82%', once: true },
            },
          )
        })
      })
      ScrollTrigger.refresh()
    }

    return () => {
      ctx?.revert()
      cancelAnimationFrame(raf)
      lenis?.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <>
      <Cursor />
      <GuideLines />
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Marquee />
        <About />
        <Services />
        <Why />
        <Process />
        <Gallery />
        <PriceList />
        <Testimonials />
        <BookPickup />
        <LocateUs />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
