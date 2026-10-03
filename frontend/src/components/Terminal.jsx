import { useEffect, useRef, useState } from 'react'
import { BOOT_LINES, CONFIG, TERMINAL_HELP } from '../data/content'

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const sleep = ms => new Promise(r => setTimeout(r, reduced ? 0 : ms))
const goTo = id => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })

export default function Terminal() {
  const [lines, setLines] = useState([])
  const [ready, setReady] = useState(false)
  const [input, setInput] = useState('')
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const idRef = useRef(0)
  const history = useRef([])
  const hIdx = useRef(-1)

  const push = line => {
    const id = idRef.current++
    setLines(l => [...l, { id, ...line }])
    return id
  }
  const patch = (id, p) => setLines(l => l.map(x => (x.id === id ? { ...x, ...p } : x)))

  // Boot sequence. The `cancelled` flag stops React StrictMode's double-run from printing everything twice.
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setLines([]); idRef.current = 0
      push({ text: '> Booting portfolio.exe...', cls: 'g' })
      await sleep(300); if (cancelled) return
      push({ text: '' })

      // progress bar line
      const barId = push({ text: BOOT_LINES[0], bar: 0 })
      await sleep(60); if (cancelled) return
      patch(barId, { bar: 100 })
      await sleep(750); if (cancelled) return

      // dotted "done" lines
      for (const text of BOOT_LINES.slice(1)) {
        const id = push({ text, dots: 0 })
        for (let i = 1; i <= 12; i++) {
          if (cancelled) return
          patch(id, { dots: i }); await sleep(40)
        }
        patch(id, { done: true })
      }
      if (cancelled) return
      push({ text: '' })
      push({ text: 'Welcome to my digital space.', cls: 'b' })
      push({ text: '' })
      push({ text: '> Passionate about crafting scalable,' })
      push({ text: '  high-performance applications.' })
      push({ text: '> Always learning. Always shipping.' })
      push({ text: "> Let's build something meaningful together.", cls: 'g' })
      push({ text: '' })
      push({ text: "type 'help' to look around.", cls: 'g' })
      setReady(true)
    }
    run()
    return () => { cancelled = true }
    // eslint-disable-next-line
  }, [])

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [lines])

  const COMMANDS = {
    help: () => [TERMINAL_HELP],
    about: () => ['CS student at SGT University, B.Tech 2025–2029.', 'I build backend systems and the interfaces on top of them.'],
    skills: () => ['Frontend, Backend, Database, Auth & Security, Languages, Cloud & DevOps — see the Skills section for the full breakdown.'],
    projects: () => { goTo('projects'); return ['scrolling to projects — StaySphere, React Weather App, Exam Seat Allocator, Billing System.'] },
    services: () => { goTo('services'); return ['scrolling to services — web apps, backend & APIs, automation tools, fixes & feature work.'] },
    process: () => { goTo('process'); return ['scrolling to process.'] },
    contact: () => { goTo('contact'); return ['scrolling to contact.'] },
    socials: () => [
      { label: 'linkedin: ', href: CONFIG.linkedin },
      { label: 'github: ', href: CONFIG.github },
      { label: 'x: ', href: CONFIG.x },
    ],
    clear: () => { setLines([]); return [] },
    'sudo hire-me': () => ['permission granted. see you in the contact section.'],
  }

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      const raw = input.trim()
      if (!raw) return
      history.current.push(raw); hIdx.current = history.current.length
      const fn = COMMANDS[raw.toLowerCase()]
      if (raw.toLowerCase() === 'clear') { setLines([]); setInput(''); return }
      push({ text: `guest@tushar:~$ ${raw}` })
      if (fn) fn().forEach(out => push(typeof out === 'string' ? { text: out, cls: 'g' } : { link: out, cls: 'g' }))
      else push({ text: `command not found: ${raw} — type 'help' to see what's available.` })
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (hIdx.current > 0) { hIdx.current--; setInput(history.current[hIdx.current]) }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (hIdx.current < history.current.length - 1) { hIdx.current++; setInput(history.current[hIdx.current]) }
      else { hIdx.current = history.current.length; setInput('') }
    }
  }

  const renderLine = l => {
    if (l.link) return <div key={l.id} className={`tline ${l.cls || ''}`}>{l.link.label}<a href={l.link.href} target="_blank" rel="noopener noreferrer">{l.link.href}</a></div>
    if (l.bar !== undefined) return (
      <div key={l.id} className={`tline ${l.cls || ''}`}>{l.text} <span className="bar"><i style={{ width: `${l.bar}%` }} /></span></div>
    )
    if (l.dots !== undefined) return (
      <div key={l.id} className={`tline ${l.cls || ''}`}>
        {l.text} {'.'.repeat(l.dots)}{l.done && <span style={{ color: '#4daf7c' }}> done</span>}
      </div>
    )
    return <div key={l.id} className={`tline ${l.cls || ''}`}>{l.text || '\u00A0'}</div>
  }

  return (
    <div className="term" onClick={() => ready && inputRef.current?.focus()}>
      <div className="term-bar"><i /><i /><i /><span>portfolio.exe</span></div>
      <div className="term-body" ref={bodyRef}>
        {lines.map(renderLine)}
        {ready && (
          <div className="tinrow">
            <span className="prompt">guest@tushar:~$</span>
            <input ref={inputRef} className="tin" value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
              autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="terminal input" />
          </div>
        )}
      </div>
    </div>
  )
}
