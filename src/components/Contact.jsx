import WhatsAppIcon from './WhatsAppIcon'

const channels = [
  {
    icon: '💬',
    title: 'WhatsApp',
    desc: 'Fastest replies for orders, questions and payments',
    handle: '+254 181 563 460',
    href: 'https://wa.me/254181563460',
  },
  {
    icon: '📞',
    title: 'Call us',
    desc: 'Mon to Sat, 8am to 8pm. Sun, 10am to 5pm.',
    handle: '+254 181 563 460',
    href: 'tel:+254181563460',
  },
  {
    icon: '📍',
    title: 'Visit the store',
    desc: 'Walk in and browse the full catalog',
    handle: 'Pioneer House, 5th Floor, Kimathi St',
    href: 'https://maps.google.com/?q=Pioneer+House+Kimathi+Street+Nairobi',
  },
  {
    icon: '✉️',
    title: 'Email',
    desc: 'For orders, partnerships and bulk deals',
    handle: 'hadasaanne@gmail.com',
    href: 'mailto:hadasaanne@gmail.com',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="sec">
      <div className="sec-head center">
        <span className="eyebrow">Reach us</span>
        <h2 className="sec-title">Let&apos;s get you that phone</h2>
        <p className="sec-sub" style={{ marginBottom: 48 }}>Pick whatever channel suits you. We reply fast.</p>
      </div>
      <div className="ch-grid">
        {channels.map(c => (
          <a className="ch-card" key={c.title} href={c.href} target="_blank" rel="noreferrer">
            <span className="ch-iconwrap"><span className="ch-emoji">{c.icon}</span></span>
            <h3 className="ch-title">{c.title}</h3>
            <p className="ch-desc">{c.desc}</p>
            <span className="ch-handle">{c.handle}</span>
          </a>
        ))}
      </div>

      <div className="cta-row">
        <a className="cta-wa" href="https://wa.me/254181563460" target="_blank" rel="noreferrer">
          <WhatsAppIcon size={18} />
          WhatsApp Us
        </a>
      </div>
    </section>
  )
}
