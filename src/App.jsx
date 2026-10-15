import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryGrid from './components/CategoryGrid'
import Phones from './components/Phones'
import HowItWorks from './components/HowItWorks'
import Plans from './components/Plans'
import Testimonials from './components/Testimonials'
import WhyUs from './components/WhyUs'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './admin/Admin'

function isAdminPath() {
  return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin'
}

function useAdminRoute() {
  const [isAdmin, setIsAdmin] = useState(isAdminPath)
  useEffect(() => {
    const onChange = () => setIsAdmin(isAdminPath())
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [])
  return isAdmin
}

export default function App() {
  const isAdmin = useAdminRoute()

  if (isAdmin) return <Admin />

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <Phones />
        <HowItWorks />
        <Plans />
        <Testimonials />
        <WhyUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
