import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  // --- GREETING LOGIC START ---
  const [greeting, setGreeting] = useState('')
  const videoRef = useRef(null); 

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    // --- VIDEO SPEED LOGIC ---
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; 
    }
  }, [])
  // --- GREETING LOGIC END ---

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* --- VIDEO BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef} 
          autoPlay
          loop
          muted
          playsInline
          key="hero-video"
          className="w-full h-full object-cover opacity-70"
        >
          <source 
            src="/hero.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center animate-fade-up px-4">
        {/* Naya Greeting Label */}
        <p className="font-cormorant italic text-gold/90 text-lg mb-2 tracking-widest animate-pulse">
          {greeting}
        </p>
        
        <p className="font-jost font-[200] text-[0.72rem] tracking-widest3 uppercase text-gold mb-6">
          Where Nature Meets Luxury
        </p>
        <h1 className="font-cormorant font-light leading-[0.9] text-site-white mb-2"
            style={{ fontSize: 'clamp(4rem, 10vw, 8.5rem)' }}>
          Cafe<br />
          <em className="italic text-gold">Bayak</em>
        </h1>
        <p className="font-cormorant font-light italic text-cream-dark mb-12"
           style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', letterSpacing: '0.05em' }}>
          A sanctuary of warmth, flavour &amp; tranquility
        </p>
        <div className="flex gap-5 justify-center items-center flex-wrap">
          <a href="#rooms" className="btn-primary">Explore Rooms</a>
          <a href="#restaurant" className="btn-outline">View Menu</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce-slow flex flex-col items-center gap-2">
        <span className="font-jost font-[200] text-[0.65rem] tracking-[0.3em] uppercase text-gold-light">
          Discover
        </span>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, #C9A96E, transparent)' }} />
      </div>
    </section>
  )
}