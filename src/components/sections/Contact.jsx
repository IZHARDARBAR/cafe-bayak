import { useReveal } from '../../hooks/useReveal'

const info = [
  {
    icon: '📍',
    title: 'Address',
    lines: ['Mayun, Hunza Valley', 'Gilgit-Baltistan, Pakistan'], // Maine location update kar di hai
  },
  {
    icon: '📞',
    title: 'Reservations',
    lines: ['+92 300 123 4567', '+92 58 765 4321'],
  },
  {
    icon: '✉',
    title: 'Email',
    lines: ['reservations@cafebayak.pk', 'info@cafebayak.pk'],
  },
  {
    icon: '🕐',
    title: 'Restaurant Hours',
    lines: ['Breakfast 7:00 – 11:00', 'Lunch 12:00 – 15:30', 'Dinner 18:30 – 23:00'],
  },
]

export default function Contact() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()

  // Aapka provided Google Map URL
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3210.8721847049937!2d74.54375327456196!3d36.412287589472236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e899a6bb4074fd%3A0xcdc6af8c00f5baf2!2sCafe%20bayak%20mayun!5e0!3m2!1sen!2s!4v1776069296967!5m2!1sen!2s";

  return (
    <section id="contact" className="bg-[#2D1B0D] py-28 text-cream">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">

          {/* Info Section */}
          <div ref={ref1} className={`reveal ${v1 ? 'visible' : ''}`}>
            <p className="font-jost text-gold tracking-[0.3em] uppercase text-[0.7rem]">Find Us</p>
            <h2 className="font-cormorant italic text-5xl mt-2 mb-8">
              Come <em className="text-gold">Visit</em>
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />

            {info.map((item) => (
              <div key={item.title} className="flex gap-6 mb-10">
                <div
                  className="w-11 h-11 flex-shrink-0 flex items-center justify-center text-gold text-lg"
                  style={{ border: '0.5px solid rgba(201,169,110,0.3)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="font-jost font-[200] text-[0.65rem] tracking-[0.3em] uppercase text-gold mb-1">
                    {item.title}
                  </div>
                  {item.lines.map((line) => (
                    <div key={line} className="font-cormorant text-[1.1rem] leading-relaxed">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div ref={ref2} className={`reveal ${v2 ? 'visible' : ''}`}>
            <div
              className="relative overflow-hidden rounded-sm group shadow-2xl"
              style={{
                border: '0.5px solid rgba(201,169,110,0.3)',
                aspectRatio: '4/4', // Square look for premium feel
              }}
            >
              {/* Actual Google Map */}
              <iframe
                title="Cafe Bayak Mayun Location"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ 
                    border: 0, 
                    filter: 'grayscale(0.3) contrast(1.1) brightness(0.9)', // Thora dark theme match karne ke liye
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Decorative Frame Overlay */}
              <div className="absolute inset-0 pointer-events-none border-[1px] border-gold/20 m-2"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}