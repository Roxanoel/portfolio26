import { useEffect, useRef } from 'react'

/**
 * Attaches IntersectionObserver to all [data-reveal] descendants of the
 * given containerRef, adding class "in" when they enter the viewport.
 * Staggered children inside [data-reveal-group] get auto --reveal-delay.
 */
export function useRevealOnScroll(containerRef) {
  useEffect(() => {
    const root = containerRef?.current ?? document

    const els = Array.from(root.querySelectorAll('[data-reveal]'))
    if (els.length === 0) return

    root.querySelectorAll('[data-reveal-group]').forEach((group) => {
      group.querySelectorAll('[data-reveal]').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${(i % 6) * 90}ms`)
      })
    })

    function show(el) { el.classList.add('in') }

    function revealInView() {
      const vh = window.innerHeight
      els.forEach((el) => {
        if (el.classList.contains('in')) return
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.92 && r.bottom > 0) show(el)
      })
    }

    let observer
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { show(e.target); observer.unobserve(e.target) } })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )
      els.forEach((el) => observer.observe(el))
    }

    revealInView()
    requestAnimationFrame(revealInView)
    window.addEventListener('scroll', revealInView, { passive: true })
    window.addEventListener('load', revealInView)

    const safetyNet = setTimeout(() => els.forEach(show), 2600)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', revealInView)
      window.removeEventListener('load', revealInView)
      clearTimeout(safetyNet)
    }
  }, [containerRef])
}
