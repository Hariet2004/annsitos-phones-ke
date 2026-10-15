import { useEffect, useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { phones } from '../data/phones'
import { FILTER_EVENT } from '../lib/catalogFilter'

const badgeType = {
  'bg-teal-600': 'teal',
  'bg-emerald-600': 'teal',
  'bg-green-700': 'teal',
  'bg-purple-600': 'purple',
  'bg-indigo-600': 'purple',
  'bg-violet-700': 'purple',
  'bg-amber-600': 'amber',
  'bg-orange-400': 'amber',
  'bg-orange-500': 'amber',
}

const tabs = ['All Phones', 'Apple', 'Samsung', 'Motorola']

const nf = new Intl.NumberFormat('en-KE')

export default function Phones() {
  const [tab, setTab] = useState('All Phones')
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')

  useEffect(() => {
    function onFilter(e) {
      const { brand, query } = e.detail || {}
      setTab(brand && phones.some(p => p.brand === brand) ? brand : 'All Phones')
      setQuery(query || '')
    }
    window.addEventListener(FILTER_EVENT, onFilter)
    return () => window.removeEventListener(FILTER_EVENT, onFilter)
  }, [])

  const list = useMemo(() => {
    let items = tab === 'All Phones' ? phones : phones.filter(p => p.brand === tab)
    if (query) {
      const q = query.toLowerCase()
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.badge || '').toLowerCase().includes(q)
      )
    }
    if (sort === 'low') items = [...items].sort((a, b) => a.cashPrice - b.cashPrice)
    if (sort === 'high') items = [...items].sort((a, b) => b.cashPrice - a.cashPrice)
    if (sort === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [tab, sort, query])

  return (
    <section id="phones" className="sec">
      <div className="sec-head">
        <span className="eyebrow">Our Collection</span>
        <h2 className="sec-title">The Phone Catalog</h2>
        <p className="sec-sub">Every phone is brand new, sealed and warrantied. Pick one and pay weekly.</p>
      </div>

      <div className="cat-filterbar">
        {tabs.map(t => (
          <button key={t} className={`cat-tab ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="cat-toolbar">
        <span className="cat-count">
          {list.length} {list.length === 1 ? 'phone' : 'phones'} available
          {query && <span className="cat-active"> · matching &ldquo;{query}&rdquo;</span>}
        </span>
        {query && <button className="cat-clear" onClick={() => setQuery('')}>Clear search</button>}
        <div className="cat-sortwrap">
          <span className="cat-sortlabel">Sort by</span>
          <select className="cat-sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="cat-grid">
        {list.map(p => (
          <div className="p-card" key={p.id}>
            <div className="p-imgwrap">
              <span className="p-cattag">{p.brand}</span>
              <span className="p-badge" data-badge={badgeType[p.badgeColor] || 'pink'}>{p.badge}</span>
              <img className="p-img" src={p.image} alt={p.name} loading="lazy" />
              <div className="p-overlay">
                <a className="p-overlay-btn"
                  href={`https://wa.me/254181563460?text=${encodeURIComponent(`Hi Annsito's Phones! I'm interested in the ${p.name}.`)}`}
                  target="_blank" rel="noreferrer">
                  <MessageCircle size={13} />
                  Order on WhatsApp
                </a>
              </div>
              <span className="p-pricetag"><sup>KSh</sup>{nf.format(p.plans[0].weeklyRate)}/wk</span>
            </div>
            <div className="p-body">
              <h3 className="p-name">{p.name}</h3>
              <div className="p-meta">
                <span className="p-price">KSh {nf.format(p.cashPrice)}</span>
                <span className="p-size">{p.storage} · {p.ram}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
