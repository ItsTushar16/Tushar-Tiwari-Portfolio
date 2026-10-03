import { useEffect, useRef, useState } from 'react'
import { EDUCATION, SEMS, OVERALL_CGPA } from '../data/content'

export default function About() {
  const semRef = useRef(null)
  const [go, setGo] = useState(false)

  // animate the semester bars once they scroll into view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect() } }, { threshold: 0.2 })
    if (semRef.current) io.observe(semRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="eyebrow"><span>01 — About</span><i /></div>
        <h2 className="h2 reveal">Who I <em>Am</em></h2>
        <div className="about-grid">
          <div className="reveal">
            <p>I'm a <strong>Computer Science student</strong> at SGT University with a deep fascination for turning ideas into working products.</p>
            <p>My craft lives at the intersection of <strong>robust backend systems</strong> and <strong>thoughtful user interfaces</strong>.</p>
            <p>I believe <strong>curiosity is the best skill</strong> a developer can have — and I bring plenty of it to everything I build.</p>
            <div className="edu">
              {EDUCATION.map(e => (
                <div className="edu-row" key={e.school}>
                  <div><h4>{e.school}</h4><div className="sub">{e.sub}</div></div>
                  <div className="edu-r"><div className="yr">{e.years}</div><span className="badge">{e.badge}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 18 }}><span>Semester Timeline</span><i /></div>
            <div ref={semRef}>
              {SEMS.map((s, i) => (
                <div className={`sem-row${s.status === 'upcoming' ? ' up' : ''}`} key={s.id}>
                  <div className="sem-id">{s.id}</div>
                  <div>
                    <div className="sem-label">{s.label}</div>
                    <div className="sem-track"><div className="sem-fill" style={{ width: go ? `${s.pct}%` : 0, transitionDelay: `${i * 180}ms` }} /></div>
                  </div>
                  <div className="sem-sgpa">
                    {s.sgpa ?? (s.status === 'current'
                      ? <span style={{ fontSize: '.65rem', color: 'var(--gold)' }}>In Progress</span>
                      : <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>TBD</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="cgpa-box">
              <div><div className="lbl">Overall CGPA</div><div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: 3 }}>B.Tech · CS</div></div>
              <div className="num">{OVERALL_CGPA}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
