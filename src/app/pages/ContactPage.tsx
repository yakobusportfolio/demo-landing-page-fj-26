import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, Mail, Instagram, Phone, Clock, Calendar, 
  ChevronRight, MessageCircle, Youtube, Music2, Sparkles, Navigation,
  Users, Award, Zap, ChevronDown 
} from "lucide-react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";
import { IMAGES } from "../constants/images";

// --- Komponen FAQ Item ---
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <span className="text-[#041e48] font-bold text-sm md:text-base group-hover:text-[#70161e] transition-colors tracking-tight">
          {question}
        </span>
        <div className={`p-1 rounded-full border border-gray-200 transition-all ${isOpen ? 'bg-[#70161e] border-[#70161e] text-white' : 'text-gray-400'}`}>
          <ChevronDown className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} size={16} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="pb-6 text-gray-500 text-xs md:text-sm leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function ContactPage() {
  const { isOpen, open, close } = useCheckAvailabilityModal();
  const [currentImg, setCurrentImg] = useState(0);

  // AMBIL SLIDES DARI STRUKTUR IMAGES.contact.heroSlides
  const slides = IMAGES.contact?.heroSlides || [];

  // Auto-Slideshow Logic dengan transisi 4 detik agar lebih dinamis
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % slides.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative w-full lg:h-screen flex flex-col lg:flex-row overflow-hidden">
        
        {/* SISI KIRI: IMMERSIVE SLIDESHOW */}
        <div className="w-full lg:w-1/2 h-[65vh] lg:h-full relative overflow-hidden bg-[#041e48]">
          <AnimatePresence mode="wait">
            {slides.length > 0 ? (
              <motion.div
                key={currentImg}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={slides[currentImg]} 
                  alt="Faralljibrill Wedding Moment" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-[#041e48] flex items-center justify-center text-white/20 font-serif">
                Memuat Galeri...
              </div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#041e48]/90 via-[#041e48]/20 to-transparent lg:bg-gradient-to-r" />
          
          <div className="absolute bottom-12 left-8 md:left-16 z-10 max-w-md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[0.5px] bg-white" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">Wedding Documentation</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-[1.1]">Preserving Your <br/>Legacy of Love</h2>
            </motion.div>
          </div>
        </div>

        {/* SISI KANAN: KONTEN */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col pt-12 md:pt-24 lg:pt-32 pb-20 px-6 md:px-16 lg:px-24 overflow-y-auto">
           <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <span className="text-[#70161e] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Let's Connect</span>
              <h1 className="text-5xl md:text-7xl font-serif text-[#041e48] mb-8 leading-[1.1]">Mari Abadikan <br/> Cerita Anda</h1>
              
              <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-lg">
                Setiap pasangan memiliki esensi cerita yang unik. Mari diskusikan bagaimana kami dapat mengabadikan mahakarya cinta Anda.
              </p>

              {/* WHY CHOOSE US */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 border-t border-gray-100 pt-10">
                {[
                  { title: "Kualitas Premium", icon: <Award size={18}/> },
                  { title: "Tim Berpengalaman", icon: <Users size={18}/> },
                  { title: "Storytelling", icon: <Sparkles size={18}/> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-[#70161e]">{item.icon}</div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#041e48]">{item.title}</span>
                  </div>
                ))}
              </div>

              {/* RESERVASI CARD */}
              <div className="bg-[#041e48] rounded-[2.5rem] p-8 md:p-10 text-center text-white shadow-2xl mb-16 relative overflow-hidden group">
                <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-1000" />
                <h3 className="text-2xl font-serif mb-3 text-white">Cek Ketersediaan</h3>
                <p className="text-white/60 text-sm mb-8">Amankan tanggal pernikahan Anda sekarang.</p>
                <button onClick={open} className="w-full py-4 bg-[#f5c767] text-[#041e48] rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white active:scale-95 transition-all shadow-xl">
                  Reservasi Sekarang
                </button>
              </div>

              {/* WHATSAPP & SOCIAL */}
              <div className="space-y-4 mb-16">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Get in Touch with Us</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://wa.me/6282111334334" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 py-4 bg-gray-50 rounded-2xl hover:bg-[#25D366]/10 transition-all active:scale-95 border border-transparent hover:border-[#25D366]/20">
                    <MessageCircle size={16} className="text-[#25D366]" />
                    <span className="text-xs font-bold text-[#041e48]">Admin Intan</span>
                  </a>
                  <a href="https://wa.me/6281227663007" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 py-4 bg-gray-50 rounded-2xl hover:bg-[#25D366]/10 transition-all active:scale-95 border border-transparent hover:border-[#25D366]/20">
                    <MessageCircle size={16} className="text-[#25D366]" />
                    <span className="text-xs font-bold text-[#041e48]">Admin Putri</span>
                  </a>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <a href="https://instagram.com/faralljibrill_official" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 p-5 bg-gray-50 rounded-2xl hover:text-[#bc1888] transition-all active:scale-95">
                    <Instagram size={20} />
                    <span className="text-[8px] font-bold tracking-widest uppercase text-[#041e48]">Instagram</span>
                  </a>
                  <a href="https://tiktok.com/@faralljibrill" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 p-5 bg-gray-50 rounded-2xl hover:text-black transition-all active:scale-95">
                    <Music2 size={20} />
                    <span className="text-[8px] font-bold tracking-widest uppercase text-[#041e48]">TikTok</span>
                  </a>
                  <a href="https://youtube.com/@faralljibrill" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 p-5 bg-gray-50 rounded-2xl hover:text-[#FF0000] transition-all active:scale-95">
                    <Youtube size={20} />
                    <span className="text-[8px] font-bold tracking-widest uppercase text-[#041e48]">YouTube</span>
                  </a>
                </div>
              </div>

              {/* --- SECTION MAPS & ALAMAT --- */}
              <div className="space-y-6 mb-20 border-t border-gray-100 pt-16">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#041e48] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#041e48]/20">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-[#041e48]">Studio & Kantor</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mt-1">
                      Perum Cantika Pastika Mangesti, Gentan, Baki, <br />
                      Sukoharjo, Jawa Tengah 57556
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-3">
                      <Clock size={14} className="text-[#70161e]"/>
                      <span>Senin - Jumat | 09:00 - 17:00 WIB</span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-[1rem] overflow-hidden h-[350px] border border-gray-100 shadow-inner group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.9369721210146!2d110.77706397529236!3d-7.581839992432593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15d57ae0dfc3%3A0x8a8bdd21653e75ee!2sFaralljibrill%20Photography%20(Official)!5e0!3m2!1sid!2sid!4v1774680791645!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Faralljibrill Photography"
                  />
                  <div className="absolute bottom-4 left-4 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl text-[#041e48] text-[10px] font-bold flex items-center gap-2 border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-[#70161e] animate-pulse" />
                      <span>Faralljibrill Studio</span>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://maps.app.goo.gl/gcKokw1WEff3XWQLA" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 bg-[#041e48] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#1b355e] transition-all active:scale-95 shadow-xl shadow-[#041e48]/20"
                >
                  <Navigation size={16} /> Petunjuk Arah (Buka di Maps)
                </a>
              </div>

              {/* FAQ AREA - 8 POIN LENGKAP */}
              <div className="pt-16 border-t border-gray-100">
                <h3 className="text-3xl font-serif text-[#041e48] mb-10">Pertanyaan Umum</h3>
                <div className="space-y-1">
                  <FAQItem 
                    question="Apakah melayani pemotretan luar kota?" 
                    answer="Ya, kami melayani pemotretan di seluruh Indonesia. Untuk lokasi di luar area kantor kami, akan dikenakan biaya akomodasi dan transportasi sesuai lokasi tujuan." 
                  />
                  <FAQItem 
                    question="Berapa lama proses editing foto & video?" 
                    answer="Proses seleksi preview biasanya 2-3 hari. Hasil final (editing detail, album, & cinematic video) memakan waktu 14-30 hari kerja tergantung kerumitan paket." 
                  />
                  <FAQItem 
                    question="Bagaimana sistem pembayarannya?" 
                    answer="DP sebesar 30-50% diperlukan untuk mengunci tanggal. Pelunasan dilakukan maksimal H-7 sebelum hari H." 
                  />
                  <FAQItem 
                    question="Apakah saya bisa request konsep atau lagu sendiri?" 
                    answer="Tentu! Kami sangat terbuka untuk diskusi konsep. Untuk musik, kami akan membantu mengarahkan agar tetap selaras dengan vibe sinematik Faralljibrill." 
                  />
                  <FAQItem 
                    question="Apakah file original/mentahan (RAW) diberikan?" 
                    answer="Standar layanan kami memberikan file final hasil seleksi dan editing. Jika membutuhkan file RAW, silakan konsultasikan dengan admin karena ada ketentuan khusus." 
                  />
                  <FAQItem 
                    question="Berapa banyak tim yang akan bertugas di hari H?" 
                    answer="Jumlah kru bervariasi mulai dari 2 orang hingga tim lengkap sebanyak 5-6 orang, menyesuaikan dengan kebutuhan paket dan skala acara Anda." 
                  />
                  <FAQItem 
                    question="Bisa reschedule tanggal jika ada perubahan?" 
                    answer="Bisa, selama jadwal baru kami masih tersedia. Harap informasikan perubahan tanggal minimal 1-2 bulan sebelumnya." 
                  />
                  <FAQItem 
                    question="Apakah melayani paket selain Wedding?" 
                    answer="Ya, kami juga memiliki paket khusus untuk Lamaran, Pre-wedding, Maternity, hingga dokumentasi Corporate." 
                  />
                </div>
              </div>
           </motion.div>
        </div>
      </section>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </div>
  );
}