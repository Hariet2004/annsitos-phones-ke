import { MessageCircle } from 'lucide-react'
import { phones } from '../data/phones'

const highlights = [3, 11, 9].map(id => phones.find(p => p.id === id))

const tags = [['No collateral', 'warm'], ['Delivered same day', 'teal'], ['Sealed and warranted', 'warm']]

export default function WhyUs() {
  return (
    <section id="why-us" className="sec">
      <div className="story-grid">
        <div className="story-art">
          <div className="story-photos">
            {highlights.map(p => (
              <figure key={p.id}>
                <img src={p.image} alt={p.name} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
        <div>
          <span className="eyebrow">Our story</span>
          <h2 className="story-title">Nairobi&apos;s friendliest phone shop, on your side since day one</h2>
          <p className="story-body">
            Annsito&apos;s Phones KE started with one simple belief: owning a great phone
            shouldn&apos;t require a lump sum. We stock brand new, sealed iPhones, Samsung
            Galaxy devices and Motorola G series phones and let you pay for them weekly
            through M-Pesa.
          </p>
          <p className="story-body">
            No paperwork. No guarantors. No collateral. Just your ID, a small deposit and
            weekly payments that fit your budget. Visit us on Kimathi Street or order on
            WhatsApp and we deliver same day within Nairobi CBD.
          </p>
          <div className="story-tags">
            {tags.map(([label, kind]) => (
              <span className={`tag ${kind}`} key={label}>{label}</span>
            ))}
          </div>
          <div className="story-btns">
            <a className="btn-fill green" href="https://wa.me/254181563460" target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              Chat with us
            </a>
            <a className="btn-outline" href="#phones">Browse phones</a>
          </div>
        </div>
      </div>
    </section>
  )
}
