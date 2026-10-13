import { useState } from 'react'

const links = [
  ['Phones', '#phones'],
  ['Plans', '#plans'],
  ['How It Works', '#how-it-works'],
  ['Reviews', '#reviews'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <a href="#home" className="nav-logo">Annsito<em>&apos;s</em></a>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(([label, href]) => (
          <li key={href}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>
        ))}
        <li>
          <a className="nav-cta" href="https://wa.me/254181563460" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            WhatsApp Us
          </a>
        </li>
      </ul>

      <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        <span className={open ? 'x' : ''} />
      </button>
    </nav>
  )
}
