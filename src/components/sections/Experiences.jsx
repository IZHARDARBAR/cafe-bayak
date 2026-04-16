import { useReveal } from '../../hooks/useReveal'
import { FaMountain, FaWater, FaCampground, FaWhatsapp } from 'react-icons/fa'

const experiences = [
  {
    id: 1,
    title: "Attabad Lake Tour",
    category: "Sightseeing",
    desc: "A breathtaking boat ride through the turquoise waters of Hunza's most famous lake.",
    img: "/attabad.png",
    duration: "Full Day",
    icon: <FaWater />
  },
  {
    id: 2,
    title: "Rakaposhi Basecamp",
    category: "Adventure",
    desc: "Experience the majestic glaciers and mountain air with our expert local guides.",
    img: "/basecamp.png",
    duration: "8-10 Hours",
    icon: <FaMountain />
  },
  {
  id: 3,
  title: "Passu Cones Experience",
  category: "Adventure",
  desc: "Witness the breathtaking Passu Cones (Passu Cathedral), surrounded by dramatic peaks.",
  img: "/passucones.png",
  duration: "Daytime",
  icon: <FaMountain />
}
]

export default function Experiences() {
  const [ref, visible] = useReveal()

  const handleInquiry = (tourName) => {
   const message = `Assalam o Alaikum! I would like to get information about ${tourName} at Cafe Bayak.`
    const waLink = `https://wa.me/923554952450?text=${encodeURIComponent(message)}`
    window.open(waLink, '_blank')
  }

  return (
    <section id="experience" className="py-28 bg-[#fdfaf5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header */}
        <div ref={ref} className={`reveal text-center mb-20 ${visible ? 'visible' : ''}`}>
          <p className="font-jost text-gold tracking-[0.3em] uppercase text-[0.7rem] mb-4">Discover Hunza</p>
          <h2 className="font-cormorant italic text-5xl text-brown mb-6">The Bayak <em>Experiences</em></h2>
          <div className="w-20 h-px bg-gold mx-auto" />
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="group relative bg-white border border-gold/10 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={exp.img} 
                  alt={exp.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-brown/90 text-gold px-3 py-1 text-[0.6rem] uppercase tracking-widest font-bold">
                  {exp.category}
                </div>
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                     onClick={() => handleInquiry(exp.title)}
                     className="bg-gold text-brown p-4 rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500"
                   >
                     <FaWhatsapp size={24} />
                   </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <div className="text-gold text-xl mb-4 flex justify-center opacity-70">
                  {exp.icon}
                </div>
                <h3 className="font-cormorant text-2xl text-brown italic mb-3">{exp.title}</h3>
                <p className="font-jost text-gray-500 text-sm leading-relaxed mb-6 h-12">
                  {exp.desc}
                </p>
                <div className="flex justify-between items-center border-t border-gold/10 pt-4">
                  <span className="text-[0.6rem] uppercase tracking-widest text-gray-400 font-bold">
                    Duration: {exp.duration}
                  </span>
                  <button 
                    onClick={() => handleInquiry(exp.title)}
                    className="text-gold uppercase text-[0.65rem] font-bold tracking-widest border-b border-transparent hover:border-gold transition-all"
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="font-cormorant italic text-gray-400 text-lg mb-6">
            "Your journey to the heart of the mountains starts here."
          </p>
          <a 
            href="#contact" 
            className="inline-block border border-gold text-gold px-10 py-4 uppercase text-[0.7rem] tracking-widest font-bold hover:bg-gold hover:text-white transition-all"
          >
            Custom Travel Plan
          </a>
        </div>

      </div>
    </section>
  )
}