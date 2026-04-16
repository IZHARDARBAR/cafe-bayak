import { useState } from 'react'
import { supabase } from "../../lib/supabaseClient";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPaperPlane } from 'react-icons/fa'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setStatus('Subscribing...')
    
    // Supabase ke 'newsletter' table mein email save karna
    const { error } = await supabase.from('newsletter').insert([{ email }])
    
    if (!error) {
      setStatus('Subscribed Successfully!')
      setEmail('')
      setTimeout(() => setStatus(''), 5000)
    } else {
      setStatus('Already subscribed or error.')
    }
  }

  const scroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="py-20 bg-[#140a04] border-t border-gold/10 text-cream">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-gold font-cormorant text-4xl mb-4 tracking-wider">Cafe Bayak</h2>
            <p className="text-white/40 text-[0.85rem] leading-relaxed font-jost">
              Mayoon, Hunza Valley.<br />
              Gilgit-Baltistan, Pakistan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold text-[0.7rem] uppercase tracking-[0.3em] mb-8 font-jost font-bold">Explore</h4>
            <ul className="space-y-4 text-[0.9rem] text-white/60 font-jost">
              <li className="cursor-pointer hover:text-gold transition-all" onClick={() => scroll('#rooms')}>Rooms & Suites</li>
              <li className="cursor-pointer hover:text-gold transition-all" onClick={() => scroll('#restaurant')}>The Kitchen</li>
              <li className="cursor-pointer hover:text-gold transition-all" onClick={() => scroll('#contact')}>Location</li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-gold text-[0.7rem] uppercase tracking-[0.3em] mb-8 font-jost font-bold">Newsletter</h4>
            <p className="text-white/40 text-xs mb-6 uppercase tracking-widest">Get updates on special offers and mountain news.</p>
            <form onSubmit={handleSubscribe} className="flex border-b border-gold/30 pb-3 relative">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="ENTER YOUR EMAIL" 
                className="bg-transparent w-full text-sm focus:outline-none placeholder:text-white/20" 
                required 
              />
              <button type="submit" className="text-gold hover:scale-125 transition-transform">
                <FaPaperPlane size={18}/>
              </button>
            </form>
            {status && <p className="text-gold text-[0.6rem] mt-3 uppercase tracking-widest animate-pulse">{status}</p>}
          </div>
        </div>

        {/* Bottom Bar with BIG Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gold/10 pt-10 gap-8">
          <div className="text-[0.7rem] text-white/30 uppercase tracking-[0.2em] font-jost">
            © {new Date().getFullYear()} Cafe Bayak Hunza. Crafted with Passion.
          </div>
          
          {/* Social Icons - Size Increased */}
          <div className="flex gap-8">
            <a href="#" className="text-white/40 hover:text-gold hover:-translate-y-1 transition-all duration-300">
              <FaFacebookF size={24} /> 
            </a>
            <a href="#" className="text-white/40 hover:text-gold hover:-translate-y-1 transition-all duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#25D366] hover:-translate-y-1 transition-all duration-300">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}