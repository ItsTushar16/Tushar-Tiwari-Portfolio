import { useEffect, useState } from 'react'
import { CONFIG, NAV } from '../data/content'
import { LinkedIn, GitHub, X, Moon, Sun } from './Icons'

const label = id => id.charAt(0).toUpperCase() + id.slice(1)

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  // header background once you scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scrollspy: highlight the section currently in the middle of the viewport
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // lock background scroll + Escape to close while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className={scrolled ? 'up' : ''}>
        <div className="wrap">
          <a href="#hero" className="brand">Tushar<b>.</b></a>
          <nav className="links">
            {NAV.map(id => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label(id)}</a>)}
          </nav>
          <div className="hd-right">
            <div className="socialrow">
              <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
              <a href={CONFIG.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHub /></a>
              <a href={CONFIG.x} target="_blank" rel="noopener noreferrer" aria-label="X"><X /></a>
            </div>
            <button className="theme-toggle" onClick={onToggleTheme} aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
            <button className={`burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close menu' : 'Menu'} aria-expanded={menuOpen}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* tapping the empty space, a link, the X, or pressing Escape all close it */}
      <div className={`mobmenu${menuOpen ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false) }}>
        {NAV.map(id => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label(id)}</a>
        ))}
      </div>
    </>
  )
}
