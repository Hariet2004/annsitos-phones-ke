import { setCatalogFilter } from '../lib/catalogFilter'

const cards = [
  {
    title: 'Smartphones',
    image: '/phones/samsung-s25-ultra.png',
    alt: 'Samsung Galaxy S25 Ultra',
    links: [
      ['Samsung Phones', { brand: 'Samsung', query: '' }],
      ['iPhone', { brand: 'Apple', query: '' }],
      ['Motorola', { brand: 'Motorola', query: '' }],
    ],
    more: { brand: null, query: '' },
  },
  {
    title: 'Samsung Galaxy',
    image: '/phones/samsung-s24-ultra.png',
    alt: 'Samsung Galaxy S24 Ultra',
    links: [
      ['Galaxy S Series', { brand: 'Samsung', query: 'galaxy s' }],
      ['Galaxy Note Series', { brand: 'Samsung', query: 'note' }],
      ['Galaxy Ultra', { brand: 'Samsung', query: 'ultra' }],
    ],
    more: { brand: 'Samsung', query: '' },
  },
  {
    title: 'iPhone',
    image: '/phones/iphone-16-pro-max.png',
    alt: 'Apple iPhone 16 Pro Max',
    links: [
      ['iPhone Pro Max', { brand: 'Apple', query: 'pro max' }],
      ['iPhone 13 Series', { brand: 'Apple', query: '13' }],
      ['iPhone 12 Series', { brand: 'Apple', query: '12' }],
    ],
    more: { brand: 'Apple', query: '' },
  },
  {
    title: 'Motorola',
    image: '/phones/moto-g-stylus.png',
    alt: 'Moto G Stylus',
    links: [
      ['Moto G Power', { brand: 'Motorola', query: 'g power' }],
      ['Moto G Stylus', { brand: 'Motorola', query: 'stylus' }],
      ['Moto G Series', { brand: 'Motorola', query: 'moto g' }],
    ],
    more: { brand: 'Motorola', query: '' },
  },
  {
    title: 'Popular Picks',
    image: '/phones/samsung-s21-fe.png',
    alt: 'Samsung Galaxy S21 FE 5G',
    links: [
      ['Most Wanted', { brand: null, query: 'popular' }],
      ['Hot Deal', { brand: null, query: 'hot deal' }],
      ['Great Value', { brand: null, query: 'great value' }],
    ],
    more: { brand: null, query: 'popular' },
  },
  {
    title: 'Ultra Series',
    image: '/phones/samsung-s23-ultra.png',
    alt: 'Samsung Galaxy S23 Ultra',
    links: [
      ['Galaxy S25 Ultra', { brand: 'Samsung', query: 's25 ultra' }],
      ['Galaxy S24 Ultra', { brand: 'Samsung', query: 's24 ultra' }],
      ['Galaxy S23 Ultra', { brand: 'Samsung', query: 's23 ultra' }],
    ],
    more: { brand: 'Samsung', query: 'ultra' },
  },
]

function goToCatalog() {
  const el = document.getElementById('phones')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function pick(filter) {
  setCatalogFilter(filter)
  goToCatalog()
}

export default function CategoryGrid() {
  return (
    <section className="sec">
      <div className="catcards">
        {cards.map(c => (
          <div className="catcard" key={c.title}>
            <div className="catcard-img">
              <img src={c.image} alt={c.alt} loading="lazy" />
            </div>
            <div className="catcard-body">
              <h3 className="catcard-title">{c.title}</h3>
              <ul className="catcard-links">
                {c.links.map(([label, filter]) => (
                  <li key={label}>
                    <button onClick={() => pick(filter)}>{label}</button>
                  </li>
                ))}
              </ul>
              <button className="catcard-more" onClick={() => pick(c.more)}>Shop More &gt;&gt;</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
