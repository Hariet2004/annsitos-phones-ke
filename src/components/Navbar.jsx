import { useState } from 'react'
import { Search, Headphones, User, ChevronDown } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { setCatalogFilter } from '../lib/catalogFilter'

const cats = ['All Categories', 'Samsung', 'Apple', 'Motorola']

const barLinks = [
  ['Smartphones', '#phones', null],
  ['Samsung', '#phones', 'Samsung'],
  ['Apple', '#phones', 'Apple'],
  ['Motorola', '#phones', 'Motorola'],
  ['Best Deals', '#plans', null],
  ['Plans', '#plans', null],
  ['How It Works', '#how-it-works', null],
  ['Reviews', '#reviews', null],
  ['FAQ', '#faq', null],
  ['Contact', '#contact', null],
]

function goToCatalog() {
  const el = document.getElementById('phones')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function pick(brand) {
  setCatalogFilter({ brand: brand === 'All Categories' ? null : brand, query: '' })
  goToCatalog()
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [cat, setCat] = useState('All Categories')
  const [search, setSearch] = useState('')

  function onSearch(e) {
    e.preventDefault()
    setCatalogFilter({ query: search.trim() })
    goToCatalog()
  }

  return (
    <header className={`site-head ${open ? 'menu-open' : ''}`}>
      <div className="head-main">
        <a href="#home" className="nav-logo">Annsito<em>&apos;s</em><span>Phones</span></a>

        <form className="head-search" onSubmit={onSearch} role="search">
          <div className="head-cat">
            <select
              value={cat}
              onChange={e => { setCat(e.target.value); pick(e.target.value) }}
              aria-label="Product category"
            >
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={15} />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for products"
            aria-label="Search for products"
          />
          <button type="submit" aria-label="Search">
            <Search size={19} />
          </button>
        </form>

        <a className="head-help" href="tel:+254181563460">
          <span className="head-helpicon"><Headphones size={19} /></span>
          <span className="head-helptext">
            <small>Need Help?</small>
            <strong>0718 156 3460</strong>
          </span>
        </a>

        <div className="head-icons">
          <a href="#contact" className="head-icon" aria-label="Account">
            <User size={19} />
          </a>
          <a href="https://wa.me/254181563460" target="_blank" rel="noreferrer" className="head-icon wa" aria-label="Order on WhatsApp">
            <WhatsAppIcon size={19} />
          </a>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
            <span className={open ? 'x' : ''} />
          </button>
        </div>
      </div>

      <nav className={`catbar ${open ? 'open' : ''}`}>
        <div className="catbar-inner">
          {barLinks.map(([label, href, brand]) => (
            <a key={label} href={href} onClick={() => {
              setOpen(false)
              if (brand) { setCatalogFilter({ brand, query: '' }); goToCatalog() }
            }}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
