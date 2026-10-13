import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Are the phones brand new?', a: 'Yes. Every phone is 100% brand new, sealed in the original manufacturer box with full warranty.' },
  { q: 'How do I pay?', a: 'All payments are via M-Pesa. We send you our M-Pesa details once you confirm your order on WhatsApp.' },
  { q: 'Do I need collateral or guarantors?', a: 'No. Just a valid Kenyan ID and your deposit payment.' },
  { q: 'Do you deliver?', a: 'Yes. We deliver same day in Nairobi CBD after deposit payment. Other areas can be arranged.' },
  { q: 'Can I visit your store?', a: 'Yes! Walk in at Pioneer House, 5th Floor, Kimathi Street, Nairobi CBD.' },
  { q: 'Can I pay off early?', a: 'Yes. Contact us on WhatsApp anytime to get your remaining balance and clear it.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="sec faq">
      <div className="sec-head center">
        <span className="eyebrow">Good to know</span>
        <h2 className="sec-title">Questions &amp; Answers</h2>
        <p className="sec-sub" style={{ marginBottom: 48 }}>Everything you need before ordering.</p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div className={`faq-item ${open === i ? 'open' : ''}`} key={faq.q}>
            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>{faq.q}</span>
              <span className="faq-icon"><ChevronDown size={18} /></span>
            </button>
            {open === i && <p className="faq-a">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
