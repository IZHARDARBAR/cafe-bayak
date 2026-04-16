import { useReveal } from '../../hooks/useReveal'

const stats = [
  { num: '5', suffix: '+', label: 'Years of Excellence' },
  { num: '5',  suffix: '',  label: 'Luxury Rooms' },
  { num: '8',   suffix: 'k', label: 'Happy Guests' },
  { num: '5',   suffix: '★', label: 'Rating' },
]

export default function About() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()

  return (
    <section id="about" className="bg-cream py-28">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-24 items-center">

          {/* Text */}
          <div ref={ref1} className={`reveal ${v1 ? 'visible' : ''}`}>
            <p className="section-label" style={{ color: '#8B6347' }}>Our Story</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light leading-tight text-brown mb-6">
              A Place to <em className="italic text-gold-dark">Breathe</em> &amp; Belong
            </h2>
            <div className="w-16 h-px bg-gold-dark mb-6" />
            <p className="font-jost font-light text-[1.05rem] leading-[1.9] text-brown-mid mb-6">
              Nestled amidst verdant landscapes and mountain whispers, Cafe Bayak is more than a hotel — it is an immersive escape. Since our founding, we have curated an environment where every stone, every meal, and every moment is a testament to heartfelt hospitality.
            </p>
            <p className="font-jost font-light text-[1.05rem] leading-[1.9] text-brown-mid mb-10">
              Our philosophy is simple: the finest ingredients, the most attentive care, and spaces that feel as natural as the land they inhabit.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-cormorant text-6xl font-light text-brown leading-none">
                    {s.num}
                    <em className="italic text-gold-dark text-4xl">{s.suffix}</em>
                  </div>
                  <div className="font-jost font-light text-[0.72rem] tracking-[0.2em] uppercase text-brown-light mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={ref2} className={`reveal relative ${v2 ? 'visible' : ''}`}>
            <div className="absolute -bottom-8 -left-8 w-2/5 aspect-square bg-gold-dark -z-10" />
            <img
              src="/aboutus.png"
              alt="Cafe Bayak Hotel Interior"
              className="w-full object-cover"
              style={{ aspectRatio: '3/4' }}
            />
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-brown flex flex-col items-center justify-center text-center">
              <div className="font-cormorant text-5xl font-light text-gold leading-none">★</div>
              <div className="font-jost font-[200] text-[0.58rem] tracking-[0.15em] uppercase text-cream-dark mt-1 px-2">
                Award Winning Since 2009
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
