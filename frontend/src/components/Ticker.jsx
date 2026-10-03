import { TICK_ITEMS } from '../data/content'

export default function Ticker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker animate-tick">
        {[...TICK_ITEMS, ...TICK_ITEMS].map((t, i) => <span key={i}><b>{t}</b></span>)}
      </div>
    </div>
  )
}
