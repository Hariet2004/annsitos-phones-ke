const items = [
  'Brand new sealed phones',
  'Pay weekly via M-Pesa',
  'No collateral · No guarantors',
  'Same day delivery in Nairobi CBD',
  'Deposit from KSh 4,599',
]

export default function Ticker() {
  const row = items.map((t, i) => (
    <span key={t}>
      <span className="tk-item">{t}</span>
      {i < items.length - 1 && <span className="tk-dot">●</span>}
    </span>
  ))
  return (
    <div className="tk" aria-hidden="true">
      <div className="tk-track">
        {row}
        {row}
      </div>
    </div>
  )
}
