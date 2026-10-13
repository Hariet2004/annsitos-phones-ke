const testimonials = [
  {
    name: 'Faith Wanjiru',
    role: 'Teacher, Westlands',
    quote: 'Got my Samsung S23 Ultra same day. Weekly payments are so easy, I barely notice them!',
  },
  {
    name: 'Brian Omondi',
    role: 'Boda Boda Rider',
    quote: 'Annsito alinisaidia sana. iPhone 14 yangu ilikuja same day. M-Pesa payments ni rahisi sana.',
  },
  {
    name: 'Mercy Achieng',
    role: 'Salon Owner, Ngara',
    quote: 'No collateral at all. Just my ID and deposit and I walked out with a brand new sealed phone.',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="sec">
      <div className="sec-head center">
        <span className="eyebrow">Happy customers</span>
        <h2 className="sec-title">What Nairobi says</h2>
        <p className="sec-sub" style={{ marginBottom: 48 }}>Real reviews from real customers.</p>
      </div>
      <div className="rev-grid">
        {testimonials.map(t => (
          <div className="rev-card" key={t.name}>
            <div className="rev-stars">★★★★★</div>
            <p className="rev-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="rev-foot">
              <span className="rev-name">{t.name}</span>
              <span className="rev-role">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
