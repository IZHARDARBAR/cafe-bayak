import { useEffect, useState } from 'react';

export default function PreLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2.5 seconds ke baad pre-loader khatam ho jayega
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-[#1a0e05] flex flex-col items-center justify-center">
      {/* Brand Name Animation */}
      <div className="relative overflow-hidden mb-4">
        <h1 className="font-cormorant text-4xl md:text-6xl text-gold italic tracking-[0.3em] animate-pulse">
          CAFE BAYAK
        </h1>
      </div>
      
      {/* Elegant Loading Bar */}
      <div className="w-32 h-px bg-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold w-full animate-progress-line"></div>
      </div>

      <p className="font-jost text-gold/40 text-[0.6rem] uppercase tracking-[0.5em] mt-8 animate-fade-in">
        Hunza Valley
      </p>

      {/* TailWind custom animation for progress line (Add in index.css if not exists) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-line {
          animation: progress-line 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}