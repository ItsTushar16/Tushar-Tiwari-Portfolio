import { PROCESS } from '../data/content'

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="wrap">
        <div className="eyebrow"><span>05 — How I Work</span><i /></div>
        <h2 className="h2 reveal">My <em>Process</em></h2>
        <div className="gridlines process-grid reveal">
          {PROCESS.map(s => (
            <div className="card" key={s.n}>
              <div className="pnum">{s.n}</div>
              <div className="ptitle">{s.t}</div>
              <div className="pdesc">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
