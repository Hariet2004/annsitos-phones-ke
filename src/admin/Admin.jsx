import { useState, useEffect } from 'react'
import { X, LayoutDashboard, Smartphone, ExternalLink, LogOut, Plus, Download, RotateCcw } from 'lucide-react'
import './admin.css'
import { phones as defaultPhones } from '../data/phones'
import PhoneForm from './PhoneForm'

const STORAGE_KEY = 'annsitos:phones'
const AUTH_KEY = 'annsitos:admin'
const PASSCODE = 'annsito2024'

const tabs = ['All Phones', 'Apple', 'Samsung', 'Motorola']
const nf = new Intl.NumberFormat('en-KE')

const bands = [
  { label: 'Under KSh 25,000', max: 25000, min: 0 },
  { label: 'KSh 25,000 to 50,000', max: 50000, min: 25000 },
  { label: 'KSh 50,000 to 100,000', max: 100000, min: 50000 },
  { label: 'Over KSh 100,000', max: Infinity, min: 100000 },
]

function loadPhones() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return defaultPhones
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [phones, setPhones] = useState(loadPhones)
  const [view, setView] = useState('dashboard')
  const [tab, setTab] = useState('All Phones')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(phones))
  }, [phones])

  if (!authed) {
    return <AdminLogin onLogin={() => { sessionStorage.setItem(AUTH_KEY, '1'); setAuthed(true) }} passcode={PASSCODE} />
  }

  const filtered = phones
    .filter(p => tab === 'All Phones' || p.brand === tab)
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  const value = phones.reduce((s, p) => s + p.cashPrice, 0)
  const avgWeekly = phones.length ? Math.round(phones.reduce((s, p) => s + p.plans[0].weeklyRate, 0) / phones.length) : 0
  const deposit = phones.reduce((min, p) => Math.min(min, p.plans[0].deposit), Infinity)
  const avgPrice = phones.length ? Math.round(value / phones.length) : 0
  const cheapest = phones.reduce((min, p) => Math.min(min, p.plans[0].weeklyRate), Infinity)

  const brandStats = [...new Set(phones.map(p => p.brand))]
    .map(brand => {
      const items = phones.filter(p => p.brand === brand)
      return { brand, count: items.length, value: items.reduce((s, p) => s + p.cashPrice, 0) }
    })
    .sort((a, b) => b.count - a.count)
  const brandMax = brandStats.reduce((m, b) => Math.max(m, b.count), 1)

  const bandStats = bands.map(b => ({ ...b, count: phones.filter(p => p.cashPrice >= b.min && p.cashPrice < b.max).length }))
  const bandMax = bandStats.reduce((m, b) => Math.max(m, b.count), 1)

  const planMix = phones
    .flatMap(p => p.plans)
    .reduce((acc, pl) => { acc[pl.name] = (acc[pl.name] || 0) + 1; return acc }, {})
  const planRows = Object.entries(planMix).sort((a, b) => b[1] - a[1])

  const save = (phone) => {
    setPhones(list => list.some(p => p.id === phone.id)
      ? list.map(p => p.id === phone.id ? phone : p)
      : [...list, phone])
    setShowForm(false)
    setEditing(null)
  }

  const remove = (id) => {
    if (window.confirm('Delete this phone?')) setPhones(list => list.filter(p => p.id !== id))
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(phones, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'phones.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const reset = () => { if (window.confirm('Reset catalog to defaults?')) { setPhones(defaultPhones); localStorage.removeItem(STORAGE_KEY) } }
  const openAdd = () => { setEditing(null); setShowForm(true) }

  return (
    <div className="adm">
      <aside className="adm-side">
        <span className="adm-brand">Annsito<em>&apos;s</em> Admin</span>
        <span className="adm-sidelabel">Menu</span>
        <button className={`adm-nav ${view === 'dashboard' ? 'on' : ''}`} onClick={() => setView('dashboard')}>
          <LayoutDashboard size={17} /> Dashboard
        </button>
        <button className={`adm-nav ${view === 'catalog' ? 'on' : ''}`} onClick={() => setView('catalog')}>
          <Smartphone size={17} /> Catalog
          <span className="adm-navcount">{phones.length}</span>
        </button>
        <div className="adm-sidefoot">
          <span className="adm-sidelabel">Account</span>
          <a className="adm-nav" href="/" target="_blank" rel="noreferrer">
            <ExternalLink size={17} /> View site
          </a>
          <button className="adm-nav" onClick={() => { sessionStorage.removeItem(AUTH_KEY); window.location.href = '/' }}>
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>

      <main className="adm-main">
        {view === 'dashboard' ? (
          <>
            <div className="adm-pagehead">
              <h1 className="adm-pagetitle">Dashboard</h1>
              <p className="adm-pagesub">Overview of the Annsito&apos;s Phones catalog.</p>
            </div>

            <div className="adm-stats">
              <div className="adm-stat"><span className="adm-statlabel">Total models</span><span className="adm-statvalue">{phones.length}</span></div>
              <div className="adm-stat"><span className="adm-statlabel">Inventory value</span><span className="adm-statvalue">KSh {nf.format(value)}</span></div>
              <div className="adm-stat"><span className="adm-statlabel">Average price</span><span className="adm-statvalue">KSh {nf.format(avgPrice)}</span></div>
              <div className="adm-stat"><span className="adm-statlabel">Avg per week</span><span className="adm-statvalue teal">KSh {nf.format(avgWeekly)}</span></div>
              <div className="adm-stat"><span className="adm-statlabel">From per week</span><span className="adm-statvalue teal">KSh {nf.format(cheapest)}</span></div>
              <div className="adm-stat"><span className="adm-statlabel">Lowest deposit</span><span className="adm-statvalue teal">KSh {nf.format(deposit)}</span></div>
            </div>

            <div className="adm-panels">
              <section className="adm-panel">
                <div className="adm-panelhead"><h2>Stock by brand</h2><span className="adm-panelhint">{brandStats.length} brands</span></div>
                <div className="adm-bars">
                  {brandStats.map(b => (
                    <div className="adm-barrow" key={b.brand}>
                      <div className="adm-barlabel"><strong>{b.brand}</strong><span>{b.count} models · KSh {nf.format(b.value)}</span></div>
                      <div className="adm-bartrack"><div className="adm-barfill" style={{ width: `${Math.round(b.count / brandMax * 100)}%` }} /></div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="adm-panel">
                <div className="adm-panelhead"><h2>Price bands</h2><span className="adm-panelhint">cash prices</span></div>
                <div className="adm-bars">
                  {bandStats.map(b => (
                    <div className="adm-barrow" key={b.label}>
                      <div className="adm-barlabel"><strong>{b.label}</strong><span>{b.count}</span></div>
                      <div className="adm-bartrack"><div className="adm-barfill alt" style={{ width: `${Math.round(b.count / bandMax * 100)}%` }} /></div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="adm-panel">
                <div className="adm-panelhead"><h2>Plan mix</h2><span className="adm-panelhint">instalment options</span></div>
                <div className="adm-planmix">
                  {planRows.map(([name, count]) => (
                    <span className="adm-planchip" key={name}>{name}<strong>{count}</strong></span>
                  ))}
                </div>
              </section>

              <section className="adm-panel">
                <div className="adm-panelhead"><h2>Quick actions</h2></div>
                <div className="adm-quick">
                  <button className="adm-quickbtn fill" onClick={openAdd}><Plus size={16} /> Add phone</button>
                  <button className="adm-quickbtn" onClick={exportJson}><Download size={16} /> Export JSON</button>
                  <button className="adm-quickbtn" onClick={reset}><RotateCcw size={16} /> Reset catalog</button>
                </div>
                <p className="adm-note">Changes are saved in this browser only (localStorage). Use Export to get phones.json for the real catalog in src/data/phones.js.</p>
              </section>
            </div>
          </>
        ) : (
          <>
            <div className="adm-pagehead">
              <h1 className="adm-pagetitle">Catalog</h1>
              <p className="adm-pagesub">Add, edit and remove phones in the store.</p>
            </div>

            <div className="adm-catalogbar">
              <div className="adm-chips">
                {tabs.map(t => (
                  <button key={t} className={`adm-chipbtn ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>{t}</button>
                ))}
              </div>
              <input className="adm-search" placeholder="Search phones..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>

            <div className="adm-toolbar">
              <span className="adm-count">{filtered.length} shown · {phones.length} total · avg KSh {nf.format(avgPrice)} · from KSh {nf.format(cheapest)}/wk</span>
              <button className="adm-primary" onClick={openAdd}>+ Add Phone</button>
            </div>

            <div className="adm-tablewrap">
              <table className="adm-table">
                <thead>
                  <tr><th>Phone</th><th>Brand</th><th>Price</th><th>Weekly</th><th>Specs</th><th /></tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="adm-cell">
                          <img className="adm-thumb" src={p.image} alt="" />
                          <div><strong>{p.name}</strong><span className="adm-sub">{p.badge}</span></div>
                        </div>
                      </td>
                      <td><span className="adm-chip">{p.brand}</span></td>
                      <td>KSh {nf.format(p.cashPrice)}</td>
                      <td className="adm-teal">KSh {nf.format(p.plans[0].weeklyRate)}</td>
                      <td className="adm-dim">{p.storage} / {p.ram}</td>
                      <td>
                        <div className="adm-rowactions">
                          <button className="adm-small" onClick={() => { setEditing(p); setShowForm(true) }}>Edit</button>
                          <button className="adm-small danger" onClick={() => remove(p.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr><td colSpan={6} className="adm-empty">No phones found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {showForm && (
        <div className="adm-backdrop" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="adm-modal">
            <div className="adm-modalhead">
              <h2>{editing ? 'Edit phone' : 'Add phone'}</h2>
              <button className="adm-x" onClick={() => setShowForm(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <PhoneForm phone={editing} onSave={save} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

function AdminLogin({ onLogin, passcode }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (value === passcode) onLogin()
    else setError('Wrong passcode. Try again.')
  }

  return (
    <div className="adm-login">
      <div className="adm-logincard">
        <span className="adm-loginlogo">Annsito<em>&apos;s</em> Admin</span>
        <h1 className="adm-logintitle">Welcome back</h1>
        <p className="adm-loginsub">Enter your passcode to manage the catalog.</p>
        <form onSubmit={submit}>
          <label className="adm-label" htmlFor="code">Passcode</label>
          <input id="code" className="adm-input" type="password" value={value} onChange={e => setValue(e.target.value)} placeholder="••••••••" autoFocus />
          {error && <p className="adm-error">{error}</p>}
          <button className="adm-submit" type="submit">Sign in</button>
        </form>
        <p className="adm-loginnote">Local tool only. Not real security, do not share the passcode.</p>
      </div>
    </div>
  )
}
