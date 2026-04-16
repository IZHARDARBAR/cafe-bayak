import { useState, useEffect } from 'react'
import WeatherWidget from '../ui/WeatherWidget'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Rooms', href: '#rooms' },
    { label: 'Restaurant', href: '#restaurant' },
    { label: 'Experiences', href: '#experience' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 border-b border-gold/20 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'bg-site-dark/97' : 'bg-brown/85'
      }`}
    >
      {/* Logo Group with Weather */}
      <div className="flex items-center">
        <a href="#" className="flex flex-col leading-none no-underline">
          <span className="font-cormorant text-[1.8rem] font-medium tracking-[0.08em] text-gold">
            Cafe Bayak
          </span>
          <span className="font-jost font-[200] text-[0.62rem] tracking-widest2 uppercase text-gold-light mt-0.5">
            Hotel & Restaurant
          </span>
        </a>
        
        {/* Weather Widget yahan Logo ke barabar mein show hoga */}
        <WeatherWidget />
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="font-jost font-light text-[0.78rem] tracking-[0.2em] uppercase text-cream-dark no-underline transition-colors duration-300 hover:text-gold"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#reservation" className="hidden md:inline-block btn-outline-gold text-sm">
        Reserve Now
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-px bg-gold-light transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-px bg-gold-light transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-gold-light transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute bg-[#2e2d24] top-full left-0 right-0 bg-site-dark/98 border-t border-gold/15 md:hidden">
          <ul className="flex flex-col list-none py-4">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-8 py-3 font-jost font-light text-[0.8rem] tracking-[0.2em] uppercase text-cream-dark no-underline hover:text-gold hover:bg-brown/40 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-8 pt-3 pb-2 text-center">
               {/* Mobile view mein weather (Chota sa) */}
               <div className="mb-4 inline-block">
                 <WeatherWidget />
               </div>
              <a href="#reservation" onClick={() => setMenuOpen(false)} className="btn-outline-gold block text-center">
                Reserve Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}