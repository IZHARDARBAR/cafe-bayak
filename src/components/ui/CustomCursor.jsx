import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-8 h-8 border border-gold rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block`}
      style={{ 
        transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})`,
        backgroundColor: isPointer ? 'rgba(201, 169, 110, 0.2)' : 'transparent'
      }}
    />
  );
}