import { useEffect, useState } from 'react'
import useTheme from './hooks/useTheme'
import useReveal from './hooks/useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useReveal()

  // scroll progress bar + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (y / h) * 100 : 0)
      setShowTop(y > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="topline" style={{ width: `${progress}%` }} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Ticker />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Process />
      <Contact />
      <Footer />
      <button className={`totop${showTop ? ' show' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </>
  )
}
