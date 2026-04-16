import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { supabase } from "../../lib/supabaseClient";
import SuccessModal from '../ui/SuccessModal'

export default function Reservation() {
  const [ref, visible] = useReveal()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [details, setDetails] = useState({})

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    roomType: '',
    guests: '1 Guest',
    requests: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert("Please enter Name and Phone Number")
      return
    }

    setLoading(true)

    // Save to Supabase
    const { error } = await supabase.from('reservations_main').insert([{
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      check_in: formData.checkin,
      check_out: formData.checkout,
      room_type: formData.roomType,
      guests: formData.guests,
      special_requests: formData.requests
    }])

    setLoading(false)

    if (!error) {
      setDetails({
        name: formData.name,
        phone: formData.phone,
        item: formData.roomType || "Stay Reservation",
        checkin: formData.checkin,
        checkout: formData.checkout
      })
      setShowSuccess(true)
      // Reset Form
      setFormData({ name: '', email: '', phone: '', checkin: '', checkout: '', roomType: '', guests: '1 Guest', requests: '' })
    } else {
      alert("Error: " + error.message)
    }
  }

  const inputClass = 'w-full px-4 py-3 font-jost font-light text-[0.9rem] text-white placeholder-site-muted outline-none border transition-colors duration-300 focus:border-gold'
  const inputStyle = {
    background: 'rgba(249,244,236,0.07)',
    borderColor: 'rgba(201,169,110,0.3)',
  }

  return (
    <section id="reservation" className="py-28 relative overflow-hidden" style={{ backgroundColor: '#1a0e05' }}>
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div ref={ref} className={`reveal relative max-w-2xl mx-auto px-8 text-center ${visible ? 'visible' : ''}`}>
        <p className="section-label">Make a Booking</p>
        <h2 className="section-title mt-2 mb-2">Your Stay <em>Awaits</em></h2>
        <p className="font-cormorant italic text-[1.1rem] text-cream-dark mb-10 text-white/60">
          Reserve a room or a table — we will be in touch within hours to confirm.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="font-jost font-light text-[0.65rem] tracking-[0.25em] uppercase text-gold">Full Name</label>
            <input 
              type="text" placeholder="Your name" 
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={inputClass} style={inputStyle} required 
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="font-jost font-light text-[0.65rem] tracking-[0.25em] uppercase text-gold">Phone Number</label>
            <input 
              type="tel" placeholder="0300 1234567" 
              value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={inputClass} style={inputStyle} required 
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-jost font-light text-[0.65rem] tracking-[0.25em] uppercase text-gold">Email Address</label>
            <input 
              type="email" placeholder="your@email.com" 
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={inputClass} style={inputStyle} required 
            />
          </div>

          {/* Room Type */}
          <div className="flex flex-col gap-1">
            <label className="font-jost font-light text-[0.65rem] tracking-[0.25em] uppercase text-gold">Room Type</label>
            <select 
              value={formData.roomType} onChange={(e) => setFormData({...formData, roomType: e.target.value})}
              className={inputClass} style={{ ...inputStyle, color: '#F9F4EC' }} required
            >
              <option value="" style={{ background: '#1a0e05' }}>Select a room</option>
              <option value="Grand Suite" style={{ background: '#1a0e05' }}>Bayak Grand Suite</option>
              <option value="Forest Retreat" style={{ background: '#1a0e05' }}>Forest Retreat Deluxe</option>
              <option value="Valley Panorama" style={{ background: '#1a0e05' }}>Valley Panorama Suite</option>
              <option value="Timber Nest" style={{ background: '#1a0e05' }}>Timber Nest Classic</option>
              <option value="Restaurant Only" style={{ background: '#1a0e05' }}>Restaurant Reservation Only</option>
            </select>
          </div>

          {/* Check-In */}
          <div className="flex flex-col gap-1">
            <label className="font-jost font-light text-[0.65rem] tracking-[0.25em] uppercase text-gold">Check-In</label>
            <input 
              type="date" 
              value={formData.checkin} onChange={(e) => setFormData({...formData, checkin: e.target.value})}
              className={inputClass} style={{ ...inputStyle, colorScheme: 'dark' }} required 
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col gap-1">
            <label className="font-jost font-light text-[0.65rem] tracking-[0.25em] uppercase text-gold">Check-Out</label>
            <input 
              type="date" 
              value={formData.checkout} onChange={(e) => setFormData({...formData, checkout: e.target.value})}
              className={inputClass} style={{ ...inputStyle, colorScheme: 'dark' }} required 
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1">
            <label className="font-jost font-light text-[0.65rem] tracking-[0.25em] uppercase text-gold">Guests</label>
            <select 
              value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})}
              className={inputClass} style={{ ...inputStyle, color: '#F9F4EC' }}
            >
              {['1 Guest', '2 Guests', '3 Guests', '4+ Guests'].map((g) => (
                <option key={g} style={{ background: '#1a0e05' }}>{g}</option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <div className="flex flex-col gap-1 sm:col-span-1">
            <label className="font-jost font-light text-[0.65rem] tracking-[0.25em] uppercase text-gold">Requests</label>
            <input 
              type="text" placeholder="Any special needs?" 
              value={formData.requests} onChange={(e) => setFormData({...formData, requests: e.target.value})}
              className={inputClass} style={inputStyle} 
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 mt-4 py-5 bg-gold text-brown font-jost font-normal text-[0.78rem] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-white hover:-translate-y-0.5 shadow-lg"
          >
            {loading ? 'Sending Request...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>

      {/* Success Modal Connection */}
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        details={details} 
        type="reservation" 
      />
    </section>
  )
}