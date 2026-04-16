import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useReveal } from '../../hooks/useReveal'
import SuccessModal from '../ui/SuccessModal'

export default function Rooms() {
  const [ref, visible] = useReveal()
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({})

  // Fetch Rooms from Supabase
  useEffect(() => {
    async function fetchRooms() {
      const { data } = await supabase.from('rooms').select('*')
      setRooms(data || [])
    }
    fetchRooms()
  }, [])

  const handleBooking = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const phone = formData.get('phone')
    const email = formData.get('email')
    const checkin = formData.get('checkin')
    const checkout = formData.get('checkout')

    // Save to Supabase
    const { error } = await supabase.from('bookings').insert([{
      guest_name: name, 
      guest_phone: phone,
      guest_email: email,
      room_name: selectedRoom.name, 
      check_in: checkin, 
      check_out: checkout
    }])

    if (!error) {
      setBookingDetails({ name, phone, item: selectedRoom.name, checkin, checkout })
      setShowSuccess(true)
      setSelectedRoom(null)
    } else {
      alert("Error: " + error.message)
    }
  }

  return (
    <section id="rooms" className="bg-[#2D1B0D] py-28 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div ref={ref} className={`reveal mb-16 ${visible ? 'visible' : ''}`}>
          <p className="text-gold uppercase tracking-widest text-[0.7rem] font-jost">Accommodation</p>
          <h2 className="text-white text-5xl font-cormorant italic mt-2">Our <em className="text-gold">Rooms</em></h2>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              onClick={() => setSelectedRoom(room)} 
              className={`relative overflow-hidden cursor-pointer group ${room.featured ? 'md:row-span-2' : ''}`}
            >
              <img src={room.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 min-h-[350px]" alt={room.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-8 flex flex-col justify-end">
                <p className="text-gold text-[0.6rem] uppercase tracking-widest font-jost">{room.type}</p>
                <h3 className="text-white text-2xl font-cormorant italic">{room.name}</h3>
                <p className="text-gold mt-2 font-jost tracking-wider">{room.price} <span className="text-white/40 text-[0.6rem]">/night</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#1a0e05] max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border border-gold/20 shadow-2xl relative">
            <button onClick={() => setSelectedRoom(null)} className="absolute top-4 right-4 text-gold text-3xl z-10 hover:scale-110 transition-transform">&times;</button>
            
            <div className="h-64 md:h-auto overflow-hidden">
                <img src={selectedRoom.img} className="h-full w-full object-cover" alt={selectedRoom.name} />
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-cormorant italic text-white mb-2">{selectedRoom.name}</h2>
              <p className="text-cream/60 text-[0.8rem] mb-8 leading-relaxed font-jost">{selectedRoom.description}</p>
              
              <form onSubmit={handleBooking} className="space-y-5">
                <input name="name" placeholder="YOUR NAME" required className="w-full bg-transparent border-b border-gold/30 p-2 text-white text-xs focus:outline-none focus:border-gold font-jost" />
                
                <input name="phone" type="tel" placeholder="PHONE NUMBER (e.g. 03001234567)" required className="w-full bg-transparent border-b border-gold/30 p-2 text-white text-xs focus:outline-none focus:border-gold font-jost" />
                
                <input name="email" type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-transparent border-b border-gold/30 p-2 text-white text-xs focus:outline-none focus:border-gold font-jost" />
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.6rem] text-gold uppercase tracking-widest font-jost">Check In</label>
                    <input name="checkin" type="date" required className="bg-transparent border-b border-gold/30 p-2 text-white text-xs focus:outline-none [color-scheme:dark]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.6rem] text-gold uppercase tracking-widest font-jost">Check Out</label>
                    <input name="checkout" type="date" required className="bg-transparent border-b border-gold/30 p-2 text-white text-xs focus:outline-none [color-scheme:dark]" />
                  </div>
                </div>

                <button className="w-full bg-gold text-brown py-4 uppercase tracking-[0.2em] text-[0.7rem] font-bold hover:bg-white hover:text-brown transition-all duration-500 mt-4 font-jost shadow-lg">
                    Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        details={bookingDetails} 
        type="reservation" 
      />
    </section>
  )
}