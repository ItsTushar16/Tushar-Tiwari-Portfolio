import { useRef, useState } from 'react'
import { CONFIG } from '../data/content'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const sleep = ms => new Promise(r => setTimeout(r, ms))

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null) // { type: 'ok' | 'err', text }
  const [sending, setSending] = useState(false)
  const loadedAt = useRef(Date.now())

  const set = k => e => {
    let v = e.target.value
    if (k === 'phone') v = v.replace(/\D/g, '').slice(0, 10) // digits only, max 10 — matches the backend rule
    setForm(f => ({ ...f, [k]: v }))
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (sending) return
    // Read straight from the form (not just React state): some autofill and
    // password-manager implementations set a field's value without firing the
    // 'input' event React listens for. The field then LOOKS filled to the
    // visitor, but React's state never updates — so trusting only `form` here
    // would reject a genuinely filled-in submission as empty.
    const fd = new FormData(e.currentTarget)
    const data = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').replace(/\D/g, '').slice(0, 10),
      message: String(fd.get('message') || '').trim(),
    }

    // same rules the backend enforces, so people get instant feedback
    if (!data.name || !data.email || !data.message) return setStatus({ type: 'err', text: 'Name, email and message are required.' })
    if (!EMAIL_RE.test(data.email)) return setStatus({ type: 'err', text: 'Please enter a valid email address.' })
    if (data.phone && data.phone.length !== 10) return setStatus({ type: 'err', text: 'Phone must be exactly 10 digits, or left blank.' })
    if (data.message.length > 2000) return setStatus({ type: 'err', text: 'Message is too long (2000 characters max).' })

    setSending(true)
    const success = { type: 'ok', text: "Message received — I'll reply within 24 hours." }

    // Bot traps: a filled hidden field, or a submit faster than a human could type.
    // Pretend it worked so the bot learns nothing, but never hit the API.
    // A hidden honeypot field used to sit here too, but Chrome's own profile
    // autofill would sometimes drop a saved value into it on a genuine visit
    // (confirmed on this exact form), silently discarding a real inquiry with
    // no error shown. That failure mode is worse than the bot traffic it
    // stopped, so bot defense here is: this timing check, plus the backend's
    // rate limiting (per IP, per email, and a global/daily ceiling) and strict
    // input validation — none of which can be triggered by a browser autofilling
    // a field a human never sees.
    const elapsed = Date.now() - loadedAt.current
    const tooFast = elapsed < 1200
    if (tooFast) {
      await sleep(500)
      setStatus(success); setForm({ name: '', email: '', phone: '', message: '' }); setSending(false)
      return
    }

    if (!CONFIG.formEndpoint) {
      await sleep(500)
      setStatus({ type: 'ok', text: 'Demo mode — the backend URL is not configured yet (set VITE_FORM_ENDPOINT).' })
      setSending(false)
      return
    }

    try {
      const payload = { name: data.name, email: data.email, message: data.message }
      if (data.phone) payload.phone = data.phone // omit when blank so the backend's default text applies
      const res = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const json = await res.json().catch(() => ({}))
      if (res.status === 429) throw new Error(`RATE:${json.error || 'Too many attempts — please wait a while and try again.'}`)
      if (!res.ok) throw new Error(json.errors ? json.errors.map(x => x.msg).join(', ') : 'Server error')
      setStatus(success)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      const friendly = err.message.startsWith('RATE:') ? err.message.slice(5) : `Something went wrong — please try again or email me directly at ${CONFIG.email}.`
      setStatus({ type: 'err', text: friendly })
    }
    setSending(false)
  }

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="eyebrow"><span>06 — Contact</span><i /></div>
        <div className="contact-grid">
          <div className="reveal">
            <h2 className="h2" style={{ marginBottom: 16 }}>Let's Make Something <em>Remarkable</em></h2>
            <p className="contact-desc">Open to internships, freelance projects, and meaningful collaborations. I respond within 24 hours.</p>
            <a className="citem" href={`mailto:${CONFIG.email}`}><div className="cicon">✉</div><div><span className="clabel">Email</span><span className="cval">{CONFIG.email}</span></div></a>
            <div className="citem"><div className="cicon">📍</div><div><span className="clabel">Location</span><span className="cval">{CONFIG.location}</span></div></div>
            <a className="citem" href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer"><div className="cicon">in</div><div><span className="clabel">LinkedIn</span><span className="cval">linkedin.com/in/tushar-tiwari-dev</span></div></a>
            <a className="citem" href={CONFIG.github} target="_blank" rel="noopener noreferrer"><div className="cicon">gh</div><div><span className="clabel">GitHub</span><span className="cval">github.com/ItsTushar16</span></div></a>
          </div>
          <div className="reveal">
            <form id="iform" onSubmit={onSubmit} noValidate>
              <div className="row2">
                <div className="field"><label htmlFor="fn">Name *</label><input id="fn" name="name" autoComplete="name" value={form.name} onChange={set('name')} maxLength={100} required /></div>
                <div className="field"><label htmlFor="fp">Phone</label><input id="fp" name="phone" type="tel" autoComplete="tel" inputMode="numeric" placeholder="10-digit number" value={form.phone} onChange={set('phone')} /></div>
              </div>
              <div className="field"><label htmlFor="fe">Email *</label><input id="fe" name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required /></div>
              <div className="field"><label htmlFor="fm">Message *</label><textarea id="fm" name="message" autoComplete="off" rows={5} maxLength={2000} placeholder="Tell me about the project or opportunity..." value={form.message} onChange={set('message')} required /></div>
              <button className="btn solid" type="submit" disabled={sending} style={{ width: '100%', textAlign: 'center' }}><span>{sending ? 'Sending...' : 'Send Message'}</span></button>
              {status && <div className={`status ${status.type}`} role="status">{status.text}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
