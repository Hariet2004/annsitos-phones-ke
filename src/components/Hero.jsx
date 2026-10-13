import { MessageCircle, Phone } from 'lucide-react'
import { phones } from '../data/phones'

const heroPhones = phones.slice(0, 4)

const stats = [
  ['500+', 'Happy Customers'],
  ['20+', 'Phone Models'],
  ['KSh 4,599', 'Min. Deposit'],
]

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-label">Pioneer House, Kimathi St · Nairobi CBD</span>
          <h1 className="hero-heading">Get a brand new</h1>
          <span className="hero-sub">smartphone, pay weekly.</span>
          <p className="hero-lead">
            Small deposit · Weekly M-Pesa payments · No collateral · Sealed in box with full warranty.
          </p>
          <div className="hero-btns">
            <a className="btn-fill green" href="https://wa.me/254181563460?text=Hi%20Annsito's%20Phones!%20I%20want%20to%20order." target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              Order on WhatsApp
            </a>
            <a className="btn-outline" href="tel:+254181563460">
              <Phone size={16} />
              Call Us
            </a>
          </div>
          <div className="hero-trust">
            {stats.map(([v, l], i) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {i > 0 && <div className="hero-divider" />}
                <div className="hero-stat">
                  <strong>{v}</strong>
                  <span>{l}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-mosaic">
          <div className="hero-col">
            <div className="hero-tile portrait">
              <img src={heroPhones[0]?.image} alt={heroPhones[0]?.name} />
            </div>
            <div className="hero-tile square">
              <img src={heroPhones[1]?.image} alt={heroPhones[1]?.name} />
            </div>
          </div>
          <div className="hero-col offset">
            <div className="hero-tile square">
              <img src={heroPhones[2]?.image} alt={heroPhones[2]?.name} />
            </div>
            <div className="hero-tile portrait">
              <img src={heroPhones[3]?.image} alt={heroPhones[3]?.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
