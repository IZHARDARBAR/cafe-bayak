import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useReveal } from '../../hooks/useReveal'

const faqs = [
  {
    q: "What are the check-in and check-out times?",
    a: "Our standard check-in time is 2:00 PM and check-out is 12:00 PM. Early check-in or late check-out is subject to availability."
  },
  {
    q: "Is there secure parking at Cafe Bayak?",
    a: "Yes, we provide free and secure on-site parking for all our guests, including space for large vehicles."
  },
  {
    q: "Do you offer local Hunza cuisine?",
    a: "Absolutely! Our restaurant specializes in traditional Hunza dishes like Chapshuro and Mamtu, alongside modern continental favorites."
  },
  {
    q: "Is high-speed internet available?",
    a: "Yes, we provide complimentary high-speed Wi-Fi in all rooms and the restaurant area to keep you connected."
  }
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, visible] = useReveal()

  return (
    <section id="faq" className="py-28 bg-[#fdfaf5]">
      <div className="max-w-4xl mx-auto px-8">
        
        <div ref={ref} className={`reveal text-center mb-16 ${visible ? 'visible' : ''}`}>
          <p className="font-jost text-gold tracking-[0.3em] uppercase text-[0.7rem] mb-4">Assistance</p>
          <h2 className="font-cormorant italic text-5xl text-brown mb-6">Frequently Asked <em>Questions</em></h2>
          <div className="w-20 h-px bg-gold mx-auto" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-gold/20 rounded-sm transition-all duration-500 ${open === i ? 'bg-white shadow-lg' : 'bg-transparent'}`}
            >
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-jost text-sm uppercase tracking-widest text-brown font-medium">
                  {faq.q}
                </span>
                <span className="text-gold">
                  {open === i ? <FaMinus size={12} /> : <FaPlus size={12} />}
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 font-jost text-gray-500 text-sm leading-relaxed border-t border-gold/5 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}