import { useState, useEffect, useRef } from 'react' // useRef add kiya
import { supabase } from '../../lib/supabaseClient'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa' // Arrows add kiye
import { useReveal } from '../../hooks/useReveal'

export default function Testimonials() {
  const [ref, visible] = useReveal()
  const scrollRef = useRef(null) // Slider ko control karne ke liye ref
  
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

  // Slider Scroll Function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
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

        {/* --- REVIEWS SLIDER WITH CONTROLS --- */}
        <div className="relative group mb-20">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-gold/10 hover:bg-gold text-gold hover:text-black p-3 rounded-full border border-gold/20 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
          >
            <FaChevronLeft />
          </button>

          {/* Slider Container */}
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10"
          >
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="min-w-[300px] md:min-w-[400px] snap-center bg-white/5 p-8 border border-gold/10 italic flex-shrink-0"
              >
                <div className="flex text-gold mb-4 gap-1">
                  {[...Array(Number(rev.rating))].map((_, i) => <FaStar key={i} size={10}/>)}
                </div>
                <p className="font-cormorant text-lg leading-relaxed">"{rev.comment}"</p>
                <p className="text-[0.65rem] uppercase tracking-widest text-gold mt-6">— {rev.name}</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-gold/10 hover:bg-gold text-gold hover:text-black p-3 rounded-full border border-gold/20 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* --- ADD REVIEW FORM (UNCHANGED) --- */}
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