import { useState } from 'react'

const badges = [
  ['pink', 'New Arrival'],
  ['teal', 'Best Value'],
  ['purple', 'Popular'],
  ['amber', 'Hot Deal'],
  ['plain', 'None'],
]

const defaultPlan = () => ({
  name: 'MoSaver',
  duration: '6 months',
  deposit: '',
  weekly: '',
  total: '',
  discount: '',
})

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
    plans: (phone?.plans?.length ? phone.plans : [defaultPlan()]).map(p => ({
      name: p.name || 'MoSaver',
      duration: p.duration || '6 months',
      deposit: p.deposit ?? '',
      weekly: p.weeklyRate ?? '',
      total: p.total ?? '',
      discount: p.discount ?? '',
    })),
  })
  const [error, setError] = useState('')

  const [imageFile, setImageFile] = useState(null)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const setPlan = (planIndex, key) => (e) => {
    setForm(f => {
      const plans = [...f.plans]
      plans[planIndex] = { ...plans[planIndex], [key]: e.target.value }
      return { ...f, plans }
    })
  }

  const addPlan = () => {
    setForm(form => ({ ...form, plans: [...form.plans, defaultPlan()] }))
  }

  const removePlan = (index) => {
    if (form.plans.length <= 1) return
    setForm(form => {
      const plans = [...form.plans]
      plans.splice(index, 1)
      return { ...form, plans }
    })
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Name is required.')
    if (!form.cashPrice) return setError('Cash price is required.')

    const plans = form.plans.filter(p => p.weekly || p.deposit || p.total || p.discount).map(p => ({
      name: p.name || 'Plan',
      duration: p.duration || '',
      deposit: Number(p.deposit || 0),
      weeklyRate: Number(p.weekly || 0),
      total: Number(p.total || 0),
      discount: Number(p.discount || 0),
    }))

    if (plans.length === 0) return setError('Add at least one payment plan.')

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
      plans,
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
          <input className="adm-input" value={form.name} onChange={set('name')} placeholder="Moto G Stylus 128GB" />
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
          <input className="adm-input" type="number" value={form.cashPrice} onChange={set('cashPrice')} placeholder="27999" />
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
        <label className="adm-label">Payment plans</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {form.plans.map((plan, i) => (
            <div key={i} style={{ border: '1.5px solid var(--border)', borderRadius: '12px', padding: '14px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span className="adm-label">Plan {i + 1}</span>
                <button type="button" onClick={() => removePlan(i)} className="adm-small" style={{ padding: '4px 10px', fontSize: '.75rem' }} disabled={form.plans.length <= 1}>Remove</button>
              </div>
              <div className="adm-row">
                <div>
                  <label className="adm-label">Plan name</label>
                  <input className="adm-input" value={plan.name} onChange={setPlan(i, 'name')} placeholder="MoSaver" />
                </div>
                <div>
                  <label className="adm-label">Duration</label>
                  <input className="adm-input" value={plan.duration} onChange={setPlan(i, 'duration')} placeholder="6 months" />
                </div>
              </div>
              <div className="adm-row">
                <div>
                  <label className="adm-label">Deposit (KSh)</label>
                  <input className="adm-input" type="number" value={plan.deposit} onChange={setPlan(i, 'deposit')} placeholder="11899" />
                </div>
                <div>
                  <label className="adm-label">Weekly (KSh)</label>
                  <input className="adm-input" type="number" value={plan.weekly} onChange={setPlan(i, 'weekly')} placeholder="1000" />
                </div>
              </div>
              <div className="adm-row">
                <div>
                  <label className="adm-label">Total (KSh)</label>
                  <input className="adm-input" type="number" value={plan.total} onChange={setPlan(i, 'total')} placeholder="36899" />
                </div>
                <div>
                  <label className="adm-label">Discount (%)</label>
                  <input className="adm-input" type="number" value={plan.discount} onChange={setPlan(i, 'discount')} placeholder="20" />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addPlan} className="adm-small" style={{ width: 'fit-content', marginTop: 8 }}><span style={{ marginRight: 6 }}>+</span> Add plan</button>
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
