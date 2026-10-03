import { PROJECTS } from '../data/content'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="eyebrow"><span>03 — Projects</span><i /></div>
        <h2 className="h2 reveal">Selected <em>Work</em></h2>
        <div className="gridlines proj-grid reveal">
          {PROJECTS.map(p => (
            <div className="card" key={p.n}>
              <div className="proj-top">
                <span className="num">{p.n}</span>
                <div className="proj-links">
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live</a>}
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">Repo</a>
                </div>
              </div>
              <h3 className="proj-title">{p.name}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
