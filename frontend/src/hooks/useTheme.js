import { useEffect, useState } from 'react'

// Light is the default. Dark is only used if the visitor explicitly switched to it before.
const getInitial = () => {
  try { return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' } catch (e) { return 'light' }
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light')
    else document.documentElement.removeAttribute('data-theme')
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
  return [theme, toggle]
}
