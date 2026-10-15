import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import './admin.css'
import { phones as defaultPhones } from '../data/phones'
import PhoneForm from './PhoneForm'

const STORAGE_KEY = 'annsitos:phones'
const AUTH_KEY = 'annsitos:admin'
const PASSCODE = 'annsito2024'

const tabs = ['All Phones', 'Apple', 'Samsung', 'Motorola']
const nf = new Intl.NumberFormat('en-KE')

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

  const cheapest = phones.reduce((min, p) => Math.min(min, p.plans[0].weeklyRate), Infinity)
  const avgPrice = phones.length ? Math.round(phones.reduce((s, p) => s + p.cashPrice, 0) / phones.length) : 0

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

  return (
    <div className="adm">
      <header className="adm-top">
        <span className="adm-brand">Annsito<em>'</em> Admin</span>
        <div className="adm-tabs">
          {tabs.map(t => (
            <button key={t} className={`adm-tab ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="adm-topactions">
          <button className="adm-ghost" onClick={() => { setEditing(null); setShowForm(true) }}>+ Add Phone</button>
          <button className="adm-ghost" onClick={exportJson}>Export</button>
          <button className="adm-ghost" onClick={() => { if (window.confirm('Reset catalog to defaults?')) { setPhones(defaultPhones); localStorage.removeItem(STORAGE_KEY) } }}>Reset</button>
          <button className="adm-ghost" onClick={() => { sessionStorage.removeItem(AUTH_KEY); window.location.href = '/' }}>Log out</button>
        </div>
      </header>

      <main className="adm-content">
        <div className="adm-stats">
          <div className="adm-stat"><span className="adm-statlabel">Total phones</span><span className="adm-statvalue">{phones.length}</span></div>
          <div className="adm-stat"><span className="adm-statlabel">Average price</span><span className="adm-statvalue">KSh {nf.format(avgPrice)}</span></div>
          <div className="adm-stat"><span className="adm-statlabel">From per week</span><span className="adm-statvalue teal">KSh {nf.format(cheapest)}</span></div>
        </div>

        <div className="adm-toolbar">
          <input className="adm-search" placeholder="Search phones..." value={query} onChange={e => setQuery(e.target.value)} />
          <span className="adm-count">{filtered.length} shown</span>
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

        <p className="adm-note">Changes are saved in this browser only (localStorage). Use Export to get phones.json for the real catalog in src/data/phones.js.</p>
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
        <span className="adm-loginlogo">Annsito<em>'</em> Admin</span>
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
