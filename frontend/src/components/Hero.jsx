import Terminal from './Terminal'
import { ROLES } from '../data/content'

const goTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  return (
    <section id="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="avail reveal"><span className="dot animate-blink" /><span>Available for opportunities</span></div>
          <h1 className="name reveal">Tushar<br /><span className="stroke">Tiwari</span></h1>
          <div className="role reveal">
            <span>I am a</span>
            <div className="rolewrap">
              <div className="roletrack animate-rotate-words">
                {ROLES.map((r, i) => <div className="roleitem" key={i}>{r}</div>)}
              </div>
            </div>
          </div>
          <p className="hero-desc reveal">Crafting digital experiences that balance clean architecture with human-centred design — from the first line of code to cloud deployment.</p>
          <div className="hero-btns reveal">
            <button className="btn solid" onClick={() => goTo('projects')}><span>Explore Work</span></button>
            <button className="btn" onClick={() => goTo('about')}><span>About Me</span></button>
          </div>
          <div className="cue reveal"><div className="cueline" /><span>Scroll to discover</span></div>
        </div>
        <div className="reveal"><Terminal /></div>
      </div>
    </section>
  )
}
