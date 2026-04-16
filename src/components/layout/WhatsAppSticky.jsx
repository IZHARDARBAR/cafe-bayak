import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppSticky() {
  const phoneNumber = "923554952450" // <-- Apna asli number yahan likhen
  const message = "Assalam o Alaikum! Mujhe Cafe Bayak ke bare mein maloomat chahiye."
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a 
      href={waLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-[500] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
    >
      {/* Tooltip */}
      <span className="absolute right-16 bg-white text-black text-[0.7rem] font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Chat with us
      </span>
      <FaWhatsapp size={32} />
      {/* Blinking Animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
    </a>
  )
}