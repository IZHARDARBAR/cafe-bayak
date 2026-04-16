import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { 
  FaEye, FaEyeSlash, FaTrash, FaBed, FaUtensils, 
  FaClipboardList, FaEnvelope, FaSearch, FaSync, 
  FaPlus, FaImage, FaTimes, FaStar, FaEdit, FaPrint, FaFileInvoice,
  FaQrcode, FaDownload 
} from 'react-icons/fa'

// PDF Generation Libraries
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
// QR Code Library
import { QRCodeCanvas } from 'qrcode.react'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('orders')
  const [activeContentTab, setActiveContentTab] = useState('rooms')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  // Data States
  const [orders, setOrders] = useState([])
  const [bookings, setBookings] = useState([])
  const [generalRes, setGeneralRes] = useState([])
  const [emails, setEmails] = useState([])
  const [dbRooms, setDbRooms] = useState([])
  const [dbMenu, setDbMenu] = useState([])
  const [reviews, setReviews] = useState([])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'bayak123') setIsLoggedIn(true)
    else alert("Invalid Password")
  }

  const fetchData = async () => {
    setLoading(true)
    const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    const { data: b } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    const { data: gr } = await supabase.from('reservations_main').select('*').order('created_at', { ascending: false })
    const { data: n } = await supabase.from('newsletter').select('*').order('created_at', { ascending: false })
    const { data: r } = await supabase.from('rooms').select('*').order('name', { ascending: true })
    const { data: m } = await supabase.from('menu').select('*').order('title', { ascending: true })
    const { data: rev } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })

    setOrders(o || [])
    setBookings(b || [])
    setGeneralRes(gr || [])
    setEmails(n || [])
    setDbRooms(r || [])
    setDbMenu(m || [])
    setReviews(rev || [])
    setLoading(false)
  }

  useEffect(() => {
    if (isLoggedIn) fetchData()
  }, [isLoggedIn])

  // --- INVOICE GENERATOR FUNCTION ---
  const generateInvoice = async (order) => {
    const element = document.getElementById(`invoice-box-${order.id}`);
    element.style.display = "block"; 
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Cafe-Bayak-Invoice-${order.customer_name}.pdf`);
    
    element.style.display = "none"; 
  };

  // --- QR CODE DOWNLOAD FUNCTION ---
  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-menu-canvas");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "Cafe-Bayak-QR-Menu.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleStatusChange = async (table, id, newStatus) => {
    const { error } = await supabase.from(table).update({ status: newStatus }).eq('id', id)
    if (!error) fetchData()
  }

  const handleDelete = async (table, id) => {
    if (window.confirm("Delete permanently?")) {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (!error) fetchData()
    }
  }

  const handleAddContent = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const file = e.target.image.files[0]
    let imageUrl = ""

    if (file) {
      const fileName = `${Date.now()}_${file.name}`
      const { data: upError } = await supabase.storage.from('bayak-images').upload(fileName, file)
      if (!upError) {
        const { data: urlData } = supabase.storage.from('bayak-images').getPublicUrl(fileName)
        imageUrl = urlData.publicUrl
      }
    }

    const table = activeContentTab === 'rooms' ? 'rooms' : 'menu'
    const payload = activeContentTab === 'rooms' 
      ? { name: formData.get('title'), type: formData.get('type'), price: formData.get('price'), description: formData.get('desc'), img: imageUrl }
      : { title: formData.get('title'), category: formData.get('type'), price: formData.get('price'), description: formData.get('desc'), img: imageUrl }

    const { error } = await supabase.from(table).insert([payload])
    if (!error) { setShowAddModal(false); fetchData(); }
    setLoading(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-[#1a0e05] flex items-center justify-center p-6 text-white font-jost">
        <form onSubmit={handleLogin} className="bg-[#2D1B0D] p-10 border border-gold/20 shadow-2xl max-w-sm w-full rounded-lg">
          <h2 className="text-gold font-cormorant text-2xl mb-8 text-center uppercase tracking-widest font-bold">Admin Login</h2>
          <div className="relative mb-8 text-gold">
            <input type={showPassword ? "text" : "password"} placeholder="PASSWORD" 
              className="bg-transparent border-b border-gold/50 p-3 text-gold outline-none w-full" onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-3 opacity-50">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
          </div>
          <button className="w-full bg-gold text-brown py-4 font-bold uppercase text-[0.7rem] tracking-widest">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#1a0e05] font-jost pb-20">
      <nav className="bg-[#1a0e05] text-white p-6 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-cormorant italic font-bold text-gold">Bayak Admin Console</h1>
          <div className="flex items-center gap-6">
            <div className="relative"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 text-xs text-white" /><input type="text" placeholder="Search..." className="bg-white/10 border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs w-48 md:w-64 text-white" onChange={(e) => setSearch(e.target.value.toLowerCase())} /></div>
            <button onClick={fetchData} className="text-gold"><FaSync /></button>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-900/40 text-red-200 px-4 py-2 rounded text-[0.6rem] uppercase border border-red-900">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12 text-white">
            <StatCard label="Orders" count={orders.length} icon={<FaUtensils />} color="bg-gold" />
            <StatCard label="Rooms" count={bookings.length} icon={<FaBed />} color="bg-brown" />
            <StatCard label="General" count={generalRes.length} icon={<FaClipboardList />} color="bg-green-800" />
            <StatCard label="Reviews" count={reviews.length} icon={<FaStar />} color="bg-orange-700" />
            <StatCard label="Emails" count={emails.length} icon={<FaEnvelope />} color="bg-blue-800" />
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm w-fit border border-gold/10 font-jost">
          <TabBtn active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={<FaUtensils />} label="Orders" />
          <TabBtn active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} icon={<FaBed />} label="Rooms" />
          <TabBtn active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={<FaClipboardList />} label="General" />
          <TabBtn active={activeTab === 'manage'} onClick={() => setActiveTab('manage')} icon={<FaEdit />} label="Manage" />
          <TabBtn active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} icon={<FaStar />} label="Reviews" />
          <TabBtn active={activeTab === 'emails'} onClick={() => setActiveTab('emails')} icon={<FaEnvelope />} label="Emails" />
        </div>

        {/* CONTENT AREA */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden font-jost">
          {activeTab === 'manage' ? (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-4">
                  <button onClick={() => setActiveContentTab('rooms')} className={`px-6 py-2 rounded-full text-xs font-bold ${activeContentTab === 'rooms' ? 'bg-gold text-brown' : 'bg-gray-100'}`}>ROOMS</button>
                  <button onClick={() => setActiveContentTab('menu')} className={`px-6 py-2 rounded-full text-xs font-bold ${activeContentTab === 'menu' ? 'bg-gold text-brown' : 'bg-gray-100'}`}>MENU</button>
                </div>
                <button onClick={() => setShowAddModal(true)} className="bg-[#1a0e05] text-gold px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2"><FaPlus /> ADD NEW</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(activeContentTab === 'rooms' ? dbRooms : dbMenu).map((item) => (
                  <div key={item.id} className="border border-gray-100 rounded-lg overflow-hidden relative group shadow-sm">
                    <img src={item.img} className="h-32 w-full object-cover" />
                    <div className="p-3">
                      <p className="font-bold text-sm uppercase">{item.name || item.title}</p>
                      <p className="text-gold font-bold">{item.price}</p>
                      <button onClick={() => handleDelete(activeContentTab === 'rooms' ? 'rooms' : 'menu', item.id)} className="mt-2 text-red-500 text-[0.6rem] font-bold uppercase flex items-center gap-1"><FaTrash /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* QR SECTION */}
              <div className="mt-12 bg-[#1a0e05] p-8 rounded-xl border border-gold/20 flex flex-col md:flex-row items-center gap-10">
                <div className="bg-white p-4 rounded-lg shadow-2xl">
                  <QRCodeCanvas id="qr-menu-canvas" value={window.location.origin + "/#restaurant"} size={180} level={"H"} includeMargin={true} />
                </div>
                <div className="text-center md:text-left text-white">
                  <h3 className="font-cormorant text-3xl text-gold italic mb-2 flex items-center gap-3 justify-center md:justify-start"><FaQrcode /> Digital Menu QR</h3>
                  <p className="text-cream/60 text-sm font-jost mb-6 max-w-sm leading-relaxed">Print this QR and place it on tables. Customers can scan to see your live menu & rates.</p>
                  <button onClick={downloadQRCode} className="bg-gold text-brown px-8 py-3 rounded-full font-bold uppercase text-[0.7rem] tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-lg">
                    <FaDownload /> Download QR Code
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto text-sm font-jost">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-[0.6rem] uppercase tracking-widest text-gray-400">
                  <tr><th className="p-5">Customer Info</th><th className="p-5">Details</th><th className="p-5 text-center">Requests</th><th className="p-5 text-right">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* ORDERS TAB */}
                  {activeTab === 'orders' && orders.filter(o => o.customer_name.toLowerCase().includes(search)).map(o => (
                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5"><strong>{o.customer_name}</strong><br/><span className="text-[0.6rem] opacity-50">{new Date(o.created_at).toLocaleString()}</span></td>
                      <td className="p-5">{o.dish_name} <br/> <span className="text-gold font-bold">{o.total_price}</span></td>
                      <td className="p-5 text-center">
                        <select value={o.status || 'pending'} onChange={(e) => handleStatusChange('orders', o.id, e.target.value)} className={`text-[0.6rem] font-bold p-1 rounded outline-none border-none cursor-pointer ${o.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          <option value="pending">Pending</option><option value="confirmed">Confirmed</option>
                        </select>
                      </td>
                      <td className="p-5 text-right space-x-3">
                        <button onClick={() => generateInvoice(o)} title="Print Invoice" className="text-blue-500 hover:scale-125 transition-transform"><FaPrint /></button>
                        <button onClick={() => handleDelete('orders', o.id)} className="text-red-400"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}

                  {/* ROOM BOOKINGS TAB */}
                  {activeTab === 'bookings' && bookings.filter(b => b.guest_name.toLowerCase().includes(search)).map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5"><strong>{b.guest_name}</strong><br/><span className="text-[0.7rem] font-bold text-gold">{b.guest_phone}</span><br/><span className="text-[0.6rem] opacity-50">{b.guest_email}</span></td>
                      <td className="p-5">Room: {b.room_name} <br/> <span className="text-gold font-bold">{b.check_in} to {b.check_out}</span></td>
                      <td className="p-5 text-center">
                        <select value={b.status || 'pending'} onChange={(e) => handleStatusChange('bookings', b.id, e.target.value)} className={`text-[0.6rem] font-bold p-1 rounded outline-none cursor-pointer ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          <option value="pending">Pending</option><option value="confirmed">Confirmed</option>
                        </select>
                      </td>
                      <td className="p-5 text-right"><button onClick={() => handleDelete('bookings', b.id)} className="text-red-400"><FaTrash /></button></td>
                    </tr>
                  ))}

                  {/* REVIEWS TAB */}
                  {activeTab === 'reviews' && reviews.filter(r => r.name.toLowerCase().includes(search)).map(r => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5"><strong>{r.name}</strong><br/><span className="text-[0.6rem] opacity-50">{new Date(r.created_at).toLocaleDateString()}</span></td>
                      <td className="p-5 text-xs italic font-medium">"{r.comment}"</td>
                      <td className="p-5 text-center text-gold">{"★".repeat(r.rating)}</td>
                      <td className="p-5 text-right"><button onClick={() => handleDelete('reviews', r.id)} className="text-red-400"><FaTrash /></button></td>
                    </tr>
                  ))}

                  {/* EMAILS TAB */}
                  {activeTab === 'emails' && emails.filter(e => e.email.toLowerCase().includes(search)).map(e => (
                    <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5"><strong>{e.email}</strong></td>
                      <td className="p-5 text-xs text-gray-400 uppercase tracking-widest">Newsletter Subscriber</td>
                      <td className="p-5 text-center opacity-30 text-xs">{new Date(e.created_at).toLocaleDateString()}</td>
                      <td className="p-5 text-right"><button onClick={() => handleDelete('newsletter', e.id)} className="text-red-400"><FaTrash /></button></td>
                    </tr>
                  ))}

                  {/* GENERAL RESERVATIONS TAB (FULL DATA ADDED HERE) */}
                  {activeTab === 'general' && generalRes.filter(g => g.full_name.toLowerCase().includes(search)).map(g => (
                    <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5 border-l-4 border-gold">
                        <strong>{g.full_name}</strong><br/>
                        <span className="text-[0.7rem] font-bold text-gold">{g.phone}</span><br/>
                        <span className="text-[0.6rem] opacity-50">{g.email}</span>
                      </td>
                      <td className="p-5 text-[0.75rem]">
                        <p>Booking: <span className="font-bold text-brown uppercase">{g.room_type}</span></p>
                        <p>Guests: <span className="font-bold">{g.guests}</span></p>
                        <div className="flex gap-4 mt-1 text-[0.65rem] text-gray-500 uppercase font-bold border-t pt-1">
                           <span>IN: {g.check_in}</span>
                           <span>OUT: {g.check_out}</span>
                        </div>
                      </td>
                      <td className="p-5 text-center text-xs italic text-gray-500 max-w-[200px] truncate" title={g.special_requests}>
                        {g.special_requests || 'No special requests'}
                      </td>
                      <td className="p-5 text-right">
                        <button onClick={() => handleDelete('reservations_main', g.id)} className="text-red-400 hover:text-red-600 transition-all">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* HIDDEN INVOICE BOXES */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        {orders.map(o => (
          <div key={o.id} id={`invoice-box-${o.id}`} style={{ width: '210mm', padding: '20mm', background: 'white', color: '#1a0e05' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #C9A96E', paddingBottom: '20px', marginBottom: '30px' }}>
              <h1 style={{ fontSize: '40px', fontFamily: 'serif', fontStyle: 'italic', marginBottom: '5px' }}>Cafe Bayak</h1>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Mayoon, Hunza Valley, Gilgit-Baltistan</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              <div><p style={{ fontSize: '10px', color: '#C9A96E', fontWeight: 'bold', marginBottom: '5px' }}>BILL TO:</p><p style={{ fontSize: '18px', fontWeight: 'bold' }}>{o.customer_name}</p></div>
              <div style={{ textAlign: 'right' }}><p style={{ fontSize: '10px', color: '#C9A96E', fontWeight: 'bold', marginBottom: '5px' }}>DATE:</p><p style={{ fontSize: '12px' }}>{new Date(o.created_at).toLocaleDateString()}</p></div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
              <thead><tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}><th style={{ padding: '15px 0' }}>Description</th><th style={{ padding: '15px 0', textAlign: 'right' }}>Amount</th></tr></thead>
              <tbody><tr><td style={{ padding: '20px 0' }}>{o.dish_name}</td><td style={{ padding: '20px 0', textAlign: 'right', fontWeight: 'bold' }}>{o.total_price}</td></tr></tbody>
            </table>
            <div style={{ borderTop: '2px solid #C9A96E', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}><h2 style={{ fontSize: '18px' }}>Total</h2><h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>{o.total_price}</h2></div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md text-[#1a0e05]">
          <form onSubmit={handleAddContent} className="bg-white p-8 max-w-md w-full rounded-xl shadow-2xl">
             <div className="flex justify-between mb-6 border-b pb-4"><h3 className="font-bold uppercase tracking-widest text-brown">New {activeContentTab}</h3><button type="button" onClick={() => setShowAddModal(false)}><FaTimes /></button></div>
             <div className="space-y-4">
               <input name="title" placeholder="NAME / TITLE" required className="w-full border-b p-2 outline-none text-sm" />
               <input name="price" placeholder="PRICE (Rs.)" required className="w-full border-b p-2 outline-none text-sm" />
               <input name="type" placeholder="TYPE / CATEGORY" required className="w-full border-b p-2 outline-none text-sm" />
               <textarea name="desc" placeholder="DESCRIPTION" className="w-full border-b p-2 text-sm h-20 outline-none" />
               <input type="file" name="image" required className="text-[0.65rem] text-gray-400" />
               <button type="submit" disabled={loading} className="w-full bg-[#1a0e05] text-gold py-4 font-bold uppercase text-[0.7rem] tracking-widest hover:brightness-110 transition-all">{loading ? "SAVING..." : "SAVE TO WEBSITE"}</button>
             </div>
          </form>
        </div>
      )}
    </div>
  )
}

const StatCard = ({ label, count, icon, color }) => (
  <div className={`${color} p-5 rounded-xl shadow-lg flex justify-between items-center transition-transform hover:scale-105`}>
    <div><p className="opacity-60 text-[0.6rem] uppercase font-bold tracking-widest">{label}</p><h3 className="text-2xl font-bold">{count}</h3></div>
    <div className="text-3xl opacity-20">{icon}</div>
  </div>
)

const TabBtn = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-3 rounded-md transition-all text-[0.7rem] uppercase font-bold ${active ? 'bg-[#1a0e05] text-gold shadow-lg' : 'text-gray-400 hover:bg-gray-100'}`}>
    {icon} {label}
  </button>
)