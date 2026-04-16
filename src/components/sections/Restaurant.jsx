import { useState, useRef, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useReveal } from '../../hooks/useReveal'
import SuccessModal from '../ui/SuccessModal'

export default function Restaurant() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()
  const [menu, setMenu] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderDetails, setOrderDetails] = useState({})
  const scrollRef = useRef(null)

  useEffect(() => {
    async function fetchMenu() {
      const { data } = await supabase.from('menu').select('*')
      setMenu(data || [])
    }
    fetchMenu()
  }, [])

  const handleOrder = async (e) => {
    e.preventDefault()
    const name = e.target.customer.value

    // Supabase Insert
    const { error } = await supabase.from('orders').insert([{ 
        customer_name: name, 
        dish_name: selectedDish.title, 
        total_price: selectedDish.price 
    }])
    
    if (!error) {
      setOrderDetails({ name, item: selectedDish.title, price: selectedDish.price })
      setShowSuccess(true)
      setSelectedDish(null)
    }
  }

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' })
    }
  }

  return (
    <section id="restaurant" className="py-24 bg-[#1a2418] relative text-cream">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div ref={ref1} className={`reveal ${v1 ? 'visible' : ''}`}>
          <p className="text-gold uppercase tracking-widest text-[0.7rem]">The Kitchen</p>
          <h2 className="text-5xl font-cormorant italic mt-2 mb-8 text-white">Flavours of <em className="text-gold">Mayoon</em></h2>
          <div className="border-t border-gold/20 pt-6 space-y-4">
            {menu.slice(0, 4).map((item) => (
              <div key={item.id} className="flex justify-between border-b border-gold/10 pb-4 transition-all hover:pl-2">
                <div><h4 className="text-white font-cormorant text-lg">{item.title}</h4><p className="text-[0.7rem] text-gold/60 italic">{item.description}</p></div>
                <span className="text-gold font-cormorant">{item.price}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowGallery(true)} className="mt-10 border border-gold text-gold px-10 py-3 uppercase tracking-widest text-[0.7rem] hover:bg-gold hover:text-black transition-all">View Full Menu</button>
        </div>
        <div ref={ref2} className={`reveal grid grid-cols-2 gap-2 h-[500px] ${v2 ? 'visible' : ''}`}>
          <img src={menu[0]?.img} className="row-span-2 h-full w-full object-cover" />
          <img src={menu[1]?.img} className="h-full w-full object-cover" />
          <img src={menu[2]?.img} className="h-full w-full object-cover" />
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-[150] bg-black/98 flex flex-col justify-center items-center backdrop-blur-md">
          <button onClick={() => setShowGallery(false)} className="absolute top-8 right-8 text-gold text-4xl">&times;</button>
          <h3 className="text-gold font-cormorant italic text-3xl mb-10">Our Full Menu</h3>
          <div className="relative w-full flex items-center">
            <button onClick={() => scroll('left')} className="absolute left-4 z-20 text-gold text-2xl p-4">←</button>
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto px-20 no-scrollbar snap-x py-10">
              {menu.map((dish) => (
                <div key={dish.id} onClick={() => setSelectedDish(dish)} className="min-w-[300px] snap-center cursor-pointer border border-gold/10 relative group">
                  <div className="h-[400px] overflow-hidden">
                    <img src={dish.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black flex items-end p-6"><h4 className="text-white font-cormorant text-xl italic">{dish.title}</h4></div>
                </div>
              ))}
            </div>
            <button onClick={() => scroll('right')} className="absolute right-4 z-20 text-gold text-2xl p-4">→</button>
          </div>
        </div>
      )}

      {selectedDish && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90" onClick={() => setSelectedDish(null)}>
          <div className="bg-[#1a2418] max-w-md w-full p-8 border border-gold/30 shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={selectedDish.img} className="w-full h-48 object-cover mb-6 border border-gold/10" />
            <h4 className="text-white font-cormorant text-2xl italic">{selectedDish.title}</h4>
            <p className="text-gold my-2">{selectedDish.price}</p>
            <p className="text-white/60 text-sm mb-6 italic">{selectedDish.description}</p>
            <form onSubmit={handleOrder} className="mt-6 space-y-4">
              <input name="customer" placeholder="YOUR NAME" required className="w-full bg-transparent border-b border-gold/20 p-2 text-xs text-cream focus:outline-none focus:border-gold" />
              <button className="w-full bg-gold text-black py-3 uppercase tracking-widest text-[0.7rem] font-bold hover:bg-white transition-all">Confirm Order</button>
            </form>
          </div>
        </div>
      )}
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} details={orderDetails} type="order" />
    </section>
  )
}