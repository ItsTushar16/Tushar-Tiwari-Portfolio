import { SERVICES } from '../data/content'

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="wrap">
        <div className="eyebrow"><span>04 — Services</span><i /></div>
        <h2 className="h2 reveal">What I Can <em>Build</em></h2>
        <div className="gridlines process-grid reveal">
          {SERVICES.map(s => (
            <div className="card" key={s.n}>
              <div className="pnum">{s.n}</div>
              <div className="ptitle">{s.t}</div>
              <div className="pdesc">{s.d}</div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ marginTop: 'clamp(28px,4vw,44px)' }}>
          <button className="btn solid" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}><span>Discuss a Project</span></button>
        </div>
      </div>
    </section>
  )
}
