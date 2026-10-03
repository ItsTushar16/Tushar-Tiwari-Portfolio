import { useEffect } from 'react'

// Fades in every element with class "reveal" once it scrolls into view.
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observers = []
    els.forEach((el, i) => {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('vis'), (i % 6) * 70)
          io.disconnect()
        }
      }, { threshold: 0.12 })
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])
}
