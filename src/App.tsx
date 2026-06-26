import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Cursor from './components/Cursor'
import Nav from './components/Nav'
import WhatsAppFloat from './components/WhatsAppFloat'
import ScrollHanger from './components/ScrollHanger'
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

// Module-level guard so React StrictMode's double-mount in dev doesn't run
// the handoff twice and leave the navbar logo stuck in its hidden initial state.
let loaderHandoffRan = false

/**
 * Splash loader: pops the logo in, spins it once in place, fades the whole
 * overlay out to reveal the site, then pops the real navbar logo into its
 * resting position. Body scroll is locked while the animation runs.
 */
function runLoaderHandoff() {
  if (loaderHandoffRan) return
  loaderHandoffRan = true
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

  // Hide the navbar logo synchronously so it can't paint before the pop-in
  if (navImg) gsap.set(navImg, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' })

  const cleanup = () => {
    loader.remove()
    html.style.overflow = prevHtmlOverflow
    body.style.overflow = prevBodyOverflow
  }

  const popNav = (duration = 0.55) => {
    if (!navImg) return
    gsap.to(navImg, {
      opacity: 1,
      scale: 1,
      duration,
      ease: 'back.out(2.2)',
    })
  }

  if (!loaderImg) {
    popNav(0.3)
    cleanup()
    return
  }

  const reduced = prefersReducedMotion()
  let started = false

  const begin = () => {
    if (started) return
    started = true

    if (reduced) {
      gsap.to(loader, {
        autoAlpha: 0,
        duration: 0.35,
        onComplete: () => {
          popNav(0.3)
          cleanup()
        },
      })
      return
    }

    // Run loader-only animation in a timeline, then trigger nav pop + cleanup
    // separately so neither depends on the other's completion callback.
    const loaderTl = gsap.timeline({
      onComplete: () => {
        cleanup()
        popNav()
      },
    })
    loaderTl
      // 1) POP IN — scale 0.6 → 1.2, fade in, bouncy
      .to(loaderImg, { scale: 1.2, opacity: 1, duration: 0.35, ease: 'back.out(2)' })
      // 2) SPIN once in place — full 360° rotation, no translation, settle to scale 1
      .to(loaderImg, { rotation: 360, scale: 1, duration: 0.55, ease: 'power2.inOut' })
      // 3) FADE OUT the entire loader overlay (logo + background) to reveal the site
      .to(loader, { autoAlpha: 0, duration: 0.4, ease: 'power2.inOut' }, '+=0.05')
  }

  // Wait for the loader image to be measurable before starting
  const ready = (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
  const waitFor = (img: HTMLImageElement) =>
    ready(img)
      ? Promise.resolve()
      : new Promise<void>((res) => {
          img.addEventListener('load', () => res(), { once: true })
          img.addEventListener('error', () => res(), { once: true })
        })

  waitFor(loaderImg).then(begin)
  // Safety: if the image stalls, kick off anyway after 1s
  setTimeout(begin, 1000)
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
      <ScrollHanger />
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
