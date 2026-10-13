import Ticker from './components/Ticker'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Phones from './components/Phones'
import HowItWorks from './components/HowItWorks'
import Plans from './components/Plans'
import Testimonials from './components/Testimonials'
import WhyUs from './components/WhyUs'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Ticker />
      <Navbar />
      <main>
        <Hero />
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
