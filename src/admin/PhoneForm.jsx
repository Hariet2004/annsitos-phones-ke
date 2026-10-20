import { useState } from 'react'

const badges = [
  ['pink', 'New Arrival'],
  ['teal', 'Best Value'],
  ['purple', 'Popular'],
  ['amber', 'Hot Deal'],
  ['plain', 'None'],
]

export default function PhoneForm({ phone, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: phone?.id ?? 0,
    name: phone?.name || '',
    brand: phone?.brand || 'Samsung',
    image: phone?.image || '',
    cashPrice: phone?.cashPrice ?? '',
    storage: phone?.storage || '128GB',
    ram: phone?.ram || '8GB',
    camera: phone?.camera || '',
    battery: phone?.battery || '5000mAh',
    badge: phone?.badge || 'New Arrival',
    badgeType: phone?.badgeType || 'pink',
    weekly: phone?.plans?.[0]?.weeklyRate ?? '',
    deposit: phone?.plans?.[0]?.deposit ?? '',
  })
  const [error, setError] = useState('')

  const [imageFile, setImageFile] = useState(null)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Name is required.')
    if (!form.cashPrice || !form.weekly) return setError('Price and weekly payment are required.')

    const weekly = Number(form.weekly)
    const deposit = Number(form.deposit || 0)
    onSave({
      id: phone?.id ?? Date.now(),
      name: form.name.trim(),
      brand: form.brand,
      image: form.image.trim() || '/phones/samsung-s25-ultra.webp',
      cashPrice: Number(form.cashPrice),
      storage: form.storage,
      ram: form.ram,
      camera: form.camera,
      battery: form.battery,
      badge: form.badge === 'None' ? '' : form.badge,
      badgeColor: form.badge === 'None' ? 'bg-gray-600' : `bg-${form.badgeType}-600`,
      plans: [
        { name: 'MoSaver', weeklyRate: weekly, duration: '6 months', deposit },
        { name: 'MoStandard', weeklyRate: Math.round(weekly * 0.85), duration: '12 months', deposit: Math.round(deposit * 0.55) },
      ],
    })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setForm(f => ({ ...f, image: reader.result }))
    reader.readAsDataURL(file)
  }

  return (
    <form className="adm-form" onSubmit={submit}>
      <div className="adm-row">
        <div>
          <label className="adm-label">Phone name</label>
          <input className="adm-input" value={form.name} onChange={set('name')} placeholder="Samsung Galaxy S25 128GB" />
        </div>
        <div>
          <label className="adm-label">Brand</label>
          <select className="adm-input" value={form.brand} onChange={set('brand')}>
            <option>Samsung</option><option>Apple</option><option>Motorola</option>
          </select>
        </div>
      </div>

      <div className="adm-row">
        <div>
          <label className="adm-label">Cash price (KSh)</label>
          <input className="adm-input" type="number" value={form.cashPrice} onChange={set('cashPrice')} placeholder="45999" />
        </div>
        <div>
          <label className="adm-label">Weekly payment (KSh)</label>
          <input className="adm-input" type="number" value={form.weekly} onChange={set('weekly')} placeholder="1750" />
        </div>
      </div>

      <div className="adm-row">
        <div>
          <label className="adm-label">Deposit (KSh)</label>
          <input className="adm-input" type="number" value={form.deposit} onChange={set('deposit')} placeholder="20699" />
        </div>
        <div>
          <label className="adm-label">Badge</label>
          <select className="adm-input" value={form.badge} onChange={set('badge')}>
            {badges.map(([, label]) => <option key={label}>{label}</option>)}
          </select>
        </div>
      </div>

      <div className="adm-row">
        <div>
          <label className="adm-label">Storage</label>
          <input className="adm-input" value={form.storage} onChange={set('storage')} placeholder="128GB" />
        </div>
        <div>
          <label className="adm-label">RAM</label>
          <input className="adm-input" value={form.ram} onChange={set('ram')} placeholder="8GB" />
        </div>
      </div>

      <div className="adm-row">
        <div>
          <label className="adm-label">Camera</label>
          <input className="adm-input" value={form.camera} onChange={set('camera')} placeholder="50MP Triple" />
        </div>
        <div>
          <label className="adm-label">Battery</label>
          <input className="adm-input" value={form.battery} onChange={set('battery')} placeholder="5000mAh" />
        </div>
      </div>

      <div>
        <label className="adm-label">Phone photo</label>
        <input className="adm-input" type="file" accept="image/*" onChange={handleImage} />
        {form.image && form.image.startsWith('data:') && (
          <img src={form.image} alt="preview" style={{ marginTop: 10, width: 120, height: 120, objectFit: 'cover', borderRadius: 12, border: '1.5px solid var(--border)' }} />
        )}
        {imageFile && <span className="adm-hint">{imageFile.name}</span>}
        <span className="adm-hint">Upload a photo — it will be saved with the phone.</span>
      </div>

      {error && <p className="adm-error">{error}</p>}

      <div className="adm-actions">
        <button type="button" className="adm-small" onClick={onCancel}>Cancel</button>
        <button type="submit" className="adm-primary">{phone ? 'Save changes' : 'Add phone'}</button>
      </div>
    </form>
  )
}
