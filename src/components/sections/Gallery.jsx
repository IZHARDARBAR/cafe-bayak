import { useReveal } from '../../hooks/useReveal'

const photos = [
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80', alt: 'Hotel exterior', span: true },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', alt: 'Luxury room' },
  { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', alt: 'Pool area' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', alt: 'Fine dining', spanCol: true },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80', alt: 'Spa treatment' },
  { src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&q=80', alt: 'Mountain nature' },
]

export default function Gallery() {
  const [ref, visible] = useReveal()

  return (
    <section id="gallery" className="bg-brown py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className={`reveal text-center mb-12 ${visible ? 'visible' : ''}`} ref={ref}>
          <p className="section-label">A Visual Journey</p>
          <h2 className="section-title mt-2">
            The World of <em>Cafe Bayak</em>
          </h2>
        </div>

        {/* Mosaic grid */}
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: '250px 250px',
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.alt}
              className="overflow-hidden"
              style={{
                gridColumn: i === 0 ? 'span 2' : i === 3 ? 'span 2' : undefined,
                gridRow:    i === 0 ? 'span 2' : undefined,
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-all duration-600 brightness-[0.85] hover:brightness-100 hover:scale-[1.08]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
