import { FaWhatsapp, FaCheckCircle } from 'react-icons/fa'

export default function SuccessModal({ isOpen, onClose, details, type }) {
  if (!isOpen) return null;

  const adminWhatsApp = "923554952450"; // <-- Apna asli WhatsApp number yahan likhen

  // WhatsApp Message Logic
  const message = type === 'order'
    ? `Hello! My name is ${details.name}. I have placed an order for ${details.item} from the website, with a price of ${details.price}. Please confirm it.`
    : `Hello! My name is ${details.name}. My phone number is ${details.phone}. I would like to book ${details.item}. Check-in: ${details.checkin} and Check-out: ${details.checkout}. Please confirm the booking.`;
  
  const waLink = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-[#1a2418] border border-gold/30 p-10 text-center max-w-md shadow-2xl relative">
        <div className="text-gold text-6xl mb-6 flex justify-center animate-bounce">
          <FaCheckCircle />
        </div>
        
        <h2 className="font-cormorant text-4xl text-white italic mb-2 tracking-wide">
            Great Choice, {details.name}!
        </h2>
        
        <p className="text-cream/70 font-jost text-[0.7rem] leading-relaxed mb-8 uppercase tracking-[0.2em]">
          Your request has been recorded.
        </p>

        <div className="flex flex-col gap-4">
          <p className="text-white/30 text-[0.6rem] uppercase tracking-widest mb-2 italic font-jost">
            Tap below to confirm on WhatsApp
          </p>
          
          <a 
            href={waLink} 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#25D366] text-white py-4 px-6 flex items-center justify-center gap-3 font-bold uppercase text-[0.7rem] tracking-widest hover:brightness-110 transition-all shadow-xl font-jost"
          >
            <FaWhatsapp size={22} /> Confirm on WhatsApp
          </a>
          
          <button 
            onClick={onClose}
            className="mt-4 text-white/30 hover:text-gold uppercase text-[0.6rem] tracking-[0.2em] transition-colors border-b border-transparent hover:border-gold/30 font-jost"
          >
            Back to Website
          </button>
        </div>
      </div>
    </div>
  )
}