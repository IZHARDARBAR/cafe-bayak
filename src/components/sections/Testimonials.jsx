import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FaStar } from 'react-icons/fa'
import { useReveal } from '../../hooks/useReveal'

export default function Testimonials() {
  const [ref, visible] = useReveal()
  
  // --- NAYA CODE (ONLY ADDED) ---
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const fetchReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
    setReviews(data || [])
  }

  useEffect(() => { fetchReviews() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('reviews').insert([{ name, rating, comment }])
    if (!error) {
      alert("Review Added!")
      setName(''); setComment(''); fetchReviews()
    }
  }
  // --- NAYA CODE END ---

  return (
    <section id="testimonials" className="py-24 bg-[#1a0e05] text-cream font-jost">
      <div className="max-w-6xl mx-auto px-8">
        
        <div ref={ref} className={`reveal text-center mb-16 ${visible ? 'visible' : ''}`}>
          <p className="section-label">Guest Voices</p>
          <h2 className="section-title mt-2">What they <em>Say</em></h2>
        </div>

        {/* Reviews Grid (Displaying from Database) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white/5 p-8 border border-gold/10 italic">
              <div className="flex text-gold mb-4 gap-1">
                {[...Array(Number(rev.rating))].map((_, i) => <FaStar key={i} size={10}/>)}
              </div>
              <p className="font-cormorant text-lg">"{rev.comment}"</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-gold mt-6">— {rev.name}</p>
            </div>
          ))}
        </div>

        {/* --- ADD REVIEW FORM (NEWLY ADDED) --- */}
        <div className="max-w-xl mx-auto border border-gold/10 p-10 bg-[#2D1B0D]">
          <h4 className="text-[0.7rem] uppercase tracking-widest mb-8 text-center text-gold">Share Your Experience</h4>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              value={name} onChange={e => setName(e.target.value)} 
              placeholder="YOUR NAME" 
              className="w-full bg-transparent border-b border-gold/20 p-2 text-sm outline-none focus:border-gold transition-all" required 
            />
            <select 
              value={rating} onChange={e => setRating(e.target.value)} 
              className="w-full bg-transparent border-b border-gold/20 p-2 text-sm text-gold outline-none"
            >
              <option value="5" className="bg-[#1a0e05]">5 Stars - Excellent</option>
              <option value="4" className="bg-[#1a0e05]">4 Stars - Great</option>
              <option value="3" className="bg-[#1a0e05]">3 Stars - Good</option>
            </select>
            <textarea 
              value={comment} onChange={e => setComment(e.target.value)} 
              placeholder="YOUR REVIEW..." 
              className="w-full bg-transparent border-b border-gold/20 p-2 text-sm h-24 outline-none focus:border-gold" required 
            />
            <button className="w-full bg-gold text-brown py-4 font-bold uppercase text-[0.7rem] tracking-widest hover:bg-white transition-all">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}