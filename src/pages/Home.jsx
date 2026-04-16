import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import WhatsAppSticky from '../components/layout/WhatsAppSticky'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Rooms from '../components/sections/Rooms'
import Restaurant from '../components/sections/Restaurant'
import Experiences from '../components/sections/Experiences'
import FAQ from '../components/sections/FAQ'
import Gallery from '../components/sections/Gallery'
import Testimonials from '../components/sections/Testimonials'
import Reservation from '../components/sections/Reservation'
import Contact from '../components/sections/Contact'
import Features from '../components/sections/Features'
import PreLoader from '../components/ui/PreLoader'
import CustomCursor from '../components/ui/CustomCursor'

export default function Home() {
  return (
    <>
      <PreLoader />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Restaurant />
      <Experiences />
      <Features />
      <Gallery />
      <FAQ />
      <Testimonials />
      <Reservation />
      <Contact />
      <Footer />
      <WhatsAppSticky />
    </>
  )
}