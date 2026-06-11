import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Cursor from './components/Cursor'
import Nav from './components/Nav'
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

export default function App() {
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
    </>
  )
}
