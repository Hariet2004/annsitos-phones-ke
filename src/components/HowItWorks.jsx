const steps = [
  {
    num: '01',
    title: 'Choose a phone',
    desc: 'Pick any phone from our catalog. Budget Moto G, mid range Galaxy or flagship iPhone, all sealed and warrantied.',
    tags: [['20+ models', 'teal'], ['Walk in anytime', 'warm']],
  },
  {
    num: '02',
    title: 'Pay your deposit',
    desc: 'Send your deposit via M-Pesa. No paperwork, no guarantors, no collateral. Just your Kenyan ID.',
    tags: [['From KSh 4,599', 'warm'], ['M-Pesa till', 'teal']],
  },
  {
    num: '03',
    title: 'Pay weekly and own it',
    desc: 'Weekly M-Pesa payments until it is fully yours. Pick up at the shop or get it delivered same day in Nairobi CBD.',
    tags: [['Delivered same day', 'teal'], ['Clear early anytime', 'warm']],
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="steps">
      <div className="steps-inner">
        <div className="sec-head center">
          <span className="eyebrow">How it works</span>
          <h2 className="sec-title">Simple steps to own your phone today</h2>
          <p className="sec-sub" style={{ marginBottom: 52 }}>Three easy steps and that new phone is yours.</p>
        </div>
        <div className="steps-grid">
          {steps.map(s => (
            <div className="step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              <div className="step-meta">
                {s.tags.map(([label, kind]) => (
                  <span className={`tag ${kind}`} key={label}>{label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
