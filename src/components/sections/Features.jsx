import { FaUtensils, FaCoffee, FaParking, FaLeaf, FaChild, FaCheckCircle, FaClock } from 'react-icons/fa'
import { useReveal } from '../../hooks/useReveal'

const featureGroups = [
  {
    title: "Service Options",
    icon: <FaUtensils />,
    items: ["Dine-in", "Takeout", "Delivery", "Drive-through"]
  },
  {
    title: "The Vibe",
    icon: <FaCoffee />,
    items: ["Great Tea Selection", "Cozy & Quiet", "Trendy Atmosphere", "Solo Dining"]
  },
  {
    title: "Offerings",
    icon: <FaLeaf />,
    items: ["Halal Food", "Quick Bites", "Small Plates", "Dinner Service"]
  },
  {
    title: "Facilities",
    icon: <FaParking />,
    items: ["Free Parking Lot", "Restroom Available", "Good for Kids", "Tourists Welcome"]
  }
]

export default function Features() {
  const [ref, visible] = useReveal()

  return (
    <section className="py-20 bg-[#1a0e05] border-y border-gold/10">
      <div className="max-w-6xl mx-auto px-8">
        
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <p className="font-jost text-gold tracking-[0.3em] uppercase text-[0.7rem] mb-3">The Experience</p>
          <h2 className="font-cormorant italic text-4xl text-white">Guest <em className="text-gold">Amenities</em> & Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {featureGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="text-gold text-2xl mb-4 opacity-80">
                {group.icon}
              </div>
              <h4 className="font-cormorant text-xl text-white italic mb-4 border-b border-gold/20 pb-2 w-full">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-cream/60 font-jost text-[0.8rem] tracking-wide">
                    <FaCheckCircle className="text-gold/40 text-[0.6rem]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}