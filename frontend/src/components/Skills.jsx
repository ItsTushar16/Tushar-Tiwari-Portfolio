import { SKILLS } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="wrap">
        <div className="eyebrow"><span>02 — Skills</span><i /></div>
        <h2 className="h2 reveal">What I Build <em>With</em></h2>
        <div className="gridlines skills-grid reveal">
          {SKILLS.map(s => (
            <div className="card" key={s.n}>
              <div className="num">{s.n}</div>
              <div className="skill-name">{s.name}</div>
              <ul className="skill-list">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
