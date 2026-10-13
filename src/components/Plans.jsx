const plans = [
  {
    num: '01',
    name: 'MoSaver',
    term: '6 months',
    desc: 'Lowest total cost. Pay a bigger deposit and clear the phone in just 6 months. Ideal for budget and mid range models.',
    weekly: 'KSh 700 to 5,130 / week',
    deposit: 'From KSh 8,299',
  },
  {
    num: '02',
    name: 'MoStandard',
    term: '12 months',
    desc: 'The popular choice. Smaller weekly payments and a lower deposit. Spread any phone comfortably across a full year.',
    weekly: 'KSh 600 to 3,840 / week',
    deposit: 'From KSh 4,599',
  },
  {
    num: '03',
    name: 'Clear & Own',
    term: 'Anytime',
    desc: 'Pay off your remaining balance whenever you like. Message us on WhatsApp for your clearance figure. No penalties, no fees.',
    weekly: 'No extra charge',
    deposit: 'KSh 0 to clear early',
  },
]

export default function Plans() {
  return (
    <section id="plans" className="sec">
      <div className="sec-head center">
        <span className="eyebrow">Payment plans</span>
        <h2 className="sec-title">Flexible weekly plans for every budget</h2>
        <p className="sec-sub" style={{ marginBottom: 52 }}>All payments via M-Pesa. All plans available on every phone in the catalog.</p>
      </div>
      <div className="steps-grid">
        {plans.map(p => (
          <div className="step" key={p.num}>
            <div className="step-num teal">{p.num}</div>
            <h3 className="step-title">{p.name} <span style={{ fontFamily: 'var(--font-b)', fontSize: '.72rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{p.term}</span></h3>
            <p className="step-desc">{p.desc}</p>
            <div className="step-meta">
              <span className="tag teal">{p.weekly}</span>
              <span className="tag warm">{p.deposit}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
