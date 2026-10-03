import { CONFIG } from '../data/content'
import { LinkedIn, GitHub, X } from './Icons'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© {new Date().getFullYear()} Tushar Tiwari · Crafted with precision</span>
        <div className="hd-right">
          {CONFIG.sourceRepo && <a id="viewSourceLink" href={CONFIG.sourceRepo} target="_blank" rel="noopener noreferrer">View Source</a>}
          <div className="socialrow">
            <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn size={16} /></a>
            <a href={CONFIG.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHub size={16} /></a>
            <a href={CONFIG.x} target="_blank" rel="noopener noreferrer" aria-label="X"><X size={14} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
