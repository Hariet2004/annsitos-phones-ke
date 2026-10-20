const links = [
  ['Phones', '#phones'],
  ['Plans', '#plans'],
  ['How It Works', '#how-it-works'],
  ['Reviews', '#reviews'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
]

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-brand">
          <span className="ft-logo">Annsito<em>&apos;s</em> Phones</span>
          <span className="ft-tagline">Brand new phones, paid weekly. Nairobi, Kenya.</span>
        </div>
        <div className="ft-links">
          {links.map(([l, h]) => (
            <a key={h} href={h}>{l}</a>
          ))}
        </div>
        <div className="ft-right">
          <span className="ft-copy">© {year} Annsito&apos;s Phones KE · Kimathi St, Nairobi CBD</span>
          <span className="ft-built">
            Built by <a href="https://hariet-wambui-portfolio.vercel.app/" target="_blank" rel="noreferrer">HK Web Studios</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
