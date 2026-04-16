import WeatherWidget from './WeatherWidget'; // Path sahi check karlein

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left Side: Weather */}
        <div className="hidden md:block">
          <WeatherWidget />
        </div>

        {/* Center: Logo */}
        <div className="text-center">
          <h1 className="font-cormorant text-2xl text-gold italic font-bold uppercase tracking-widest">
            Cafe Bayak
          </h1>
        </div>

        {/* Right Side: Menu Button */}
        <button className="text-gold uppercase text-[0.7rem] tracking-widest border-b border-gold/30">
          Menu
        </button>

      </div>
    </nav>
  );
}