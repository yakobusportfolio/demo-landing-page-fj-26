import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Instagram, Clock,
  MessageCircle, Youtube, Music2, Sparkles, Navigation,
  Users, Award, ChevronDown, Play, Pause,
} from "lucide-react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";
import { IMAGES } from "../constants/images";

// ============================================================================
// TYPES
// ============================================================================

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

interface SlideshowIndicatorsProps {
  currentImg: number;
  total: number;
  onDotClick: (index: number) => void;
}

interface ReservationCardProps {
  onOpen: () => void;
}

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  color: string;
  hoverText: string;
}

interface WhyChooseUsItem {
  title: string;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
}


// ============================================================================
// CONSTANTS
// ============================================================================

const SLIDESHOW_INTERVAL = 4000;

const FAQ_DATA = [
  {
    question: "Apakah melayani pemotretan luar kota?",
    answer: "Ya, kami melayani pemotretan di seluruh Indonesia. Untuk lokasi di luar area kantor kami, akan dikenakan biaya akomodasi dan transportasi sesuai lokasi tujuan."
  },
  {
    question: "Berapa lama proses editing foto & video?",
    answer: "Proses seleksi preview biasanya 2-3 hari. Hasil final (editing detail, album, & cinematic video) memakan waktu 14-30 hari kerja tergantung kerumitan paket."
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "DP sebesar 30-50% diperlukan untuk mengunci tanggal. Pelunasan dilakukan maksimal H-7 sebelum hari H."
  },
  {
    question: "Apakah saya bisa request konsep atau lagu sendiri?",
    answer: "Tentu! Kami sangat terbuka untuk diskusi konsep. Untuk musik, kami akan membantu mengarahkan agar tetap selaras dengan vibe sinematik Faralljibrill."
  },
  {
    question: "Apakah file original/mentahan (RAW) diberikan?",
    answer: "Standar layanan kami memberikan file final hasil seleksi dan editing. Jika membutuhkan file RAW, silakan konsultasikan dengan admin karena ada ketentuan khusus."
  },
  {
    question: "Berapa banyak tim yang akan bertugas di hari H?",
    answer: "Jumlah kru bervariasi mulai dari 2 orang hingga tim lengkap sebanyak 5-6 orang, menyesuaikan dengan kebutuhan paket dan skala acara Anda."
  },
  {
    question: "Bisa reschedule tanggal jika ada perubahan?",
    answer: "Bisa, selama jadwal baru kami masih tersedia. Harap informasikan perubahan tanggal minimal 1-2 bulan sebelumnya."
  },
  {
    question: "Apakah melayani paket selain Wedding?",
    answer: "Ya, kami juga memiliki paket khusus untuk Lamaran, Pre-wedding, Maternity, hingga dokumentasi Corporate."
  }
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/faralljibrill_official",
    icon: Instagram,
    color: "#bc1888",
    hoverText: "hover:text-[#bc1888]"
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://tiktok.com/@faralljibrill",
    icon: Music2,
    color: "#000000",
    hoverText: "hover:text-black"
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@faralljibrill",
    icon: Youtube,
    color: "#FF0000",
    hoverText: "hover:text-[#FF0000]"
  }
];

const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  { title: "Kualitas Premium", icon: Award },
  { title: "Tim Berpengalaman", icon: Users },
  { title: "Storytelling", icon: Sparkles }
];

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

function usePreferReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

// ============================================================================
// COMPONENTS
// ============================================================================

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="w-full py-6 flex items-center justify-between text-left group transition-all focus:outline-none focus:ring-2 focus:ring-[#70161e]/50 px-2 -mx-2 rounded"
      >
        <span className="text-[#041e48] font-bold text-sm md:text-base group-hover:text-[#70161e] transition-colors tracking-tight">
          {question}
        </span>
        <div
          className={`p-1 rounded-full border border-gray-200 transition-all ${
            isOpen ? "bg-[#70161e] border-[#70161e] text-white" : "text-gray-400"
          }`}
        >
          <ChevronDown
            className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
            size={16}
            aria-hidden="true"
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="pb-6 px-2 text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlideshowIndicators({ currentImg, total, onDotClick }: SlideshowIndicatorsProps) {
  return (
    // PERBAIKAN: Ditambahkan pointer-events-auto agar indikator tetap bisa diklik
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-auto">
      {Array.from({ length: total }).map((_, i: number) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to slide ${i + 1} of ${total}`}
          aria-pressed={currentImg === i}
          className={`transition-all focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full ${
            currentImg === i
              ? "w-8 h-2 bg-white"
              : "w-2 h-2 bg-white/40 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  );
}

function SocialLinksSection() {
  return (
    <div className="space-y-4 mb-16">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">
        Get in Touch with Us
      </h4>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://wa.me/6282111334334"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-3 py-4 bg-gray-50 rounded-2xl hover:bg-[#25D366]/10 transition-all active:scale-95 border border-transparent hover:border-[#25D366]/20 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
        >
          <MessageCircle size={16} className="text-[#25D366]" aria-hidden="true" />
          <span className="text-xs font-bold text-[#041e48]">Admin Intan</span>
        </a>
        <a
          href="https://wa.me/6281227663007"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-3 py-4 bg-gray-50 rounded-2xl hover:bg-[#25D366]/10 transition-all active:scale-95 border border-transparent hover:border-[#25D366]/20 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
        >
          <MessageCircle size={16} className="text-[#25D366]" aria-hidden="true" />
          <span className="text-xs font-bold text-[#041e48]">Admin Putri</span>
        </a>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {SOCIAL_LINKS.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit our ${social.name}`}
              className={`flex flex-col items-center gap-2 p-5 bg-gray-50 rounded-2xl ${social.hoverText} transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#041e48]/50`}
            >
              <Icon size={20} aria-hidden={true} />
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#041e48]">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function WhyChooseUsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 border-t border-gray-100 pt-10">
      {WHY_CHOOSE_US.map((item, i: number) => {
        const Icon = item.icon;
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="text-[#70161e]" aria-hidden="true">
              <Icon size={18} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#041e48]">
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MapsSection() {
  const [mapsLoaded, setMapsLoaded] = useState(false);

  return (
    <div className="space-y-6 mb-20 border-t border-gray-100 pt-16">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#041e48] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#041e48]/20">
          <MapPin size={18} className="text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-serif text-[#041e48]">Studio & Kantor</h3>
          <p className="text-gray-600 text-sm leading-relaxed mt-1">
            Perum Cantika Pastika Mangesti, Gentan, Baki, <br />
            Sukoharjo, Jawa Tengah 57556
          </p>
          <div className="flex items-center gap-2 text-[11px] text-gray-600 font-bold uppercase tracking-widest mt-3">
            <Clock size={14} className="text-[#70161e]" aria-hidden="true" />
            <span>Senin - Jumat | 09:00 - 17:00 WIB</span>
          </div>
        </div>
      </div>

      <div className="relative rounded-[1rem] overflow-hidden h-[350px] border border-gray-200 shadow-sm bg-gray-100">
        {!mapsLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Memuat peta...</div>
          </div>
        )}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.9369721210146!2d110.77706397529236!3d-7.581839992432593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15d57ae0dfc3%3A0x8a8bdd21653e75ee!2sFaralljibrill%20Photography%20(Official)!5e0!3m2!1sid!2sid!4v1774680791645!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Faralljibrill Photography di Sukoharjo, Jawa Tengah"
          onLoad={() => setMapsLoaded(true)}
        />
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl text-[#041e48] text-[11px] font-bold flex items-center gap-2 border border-gray-200">
            <div className="w-2 h-2 rounded-full bg-[#70161e] animate-pulse" aria-hidden="true" />
            <span>Faralljibrill Studio</span>
          </div>
        </div>
      </div>

      <a
        href="https://maps.app.goo.gl/gcKokw1WEff3XWQLA"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-3 w-full py-5 bg-[#041e48] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#1b355e] transition-all active:scale-95 shadow-xl shadow-[#041e48]/20 focus:outline-none focus:ring-2 focus:ring-[#041e48]/50"
      >
        <Navigation size={16} aria-hidden="true" /> Petunjuk Arah (Buka di Maps)
      </a>
    </div>
  );
}

function ReservationCard({ onOpen }: ReservationCardProps) {
  return (
    <div className="bg-[#041e48] rounded-[2.5rem] p-8 md:p-10 text-center text-white shadow-2xl mb-16 relative overflow-hidden group">
      <Sparkles
        className="absolute -right-4 -top-4 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform duration-1000"
        aria-hidden={true}
      />
      <h3 className="text-2xl font-serif mb-3 text-white">Cek Ketersediaan</h3>
      <p className="text-white/70 text-sm mb-8">Amankan tanggal pernikahan Anda sekarang.</p>
      <button
        onClick={onOpen}
        className="w-full py-4 bg-[#f5c767] text-[#041e48] rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#ffd966] active:scale-95 transition-all shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#f5c767]/50"
        aria-label="Reservasi sekarang untuk mengecek ketersediaan"
      >
        Reservasi Sekarang
      </button>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export function ContactPage() {
  const { isOpen, open, close } = useCheckAvailabilityModal();
  const [currentImg, setCurrentImg] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = usePreferReducedMotion();
  const slides = IMAGES.contact?.heroSlides || [];
  const slidesLength = slides.length;

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % slidesLength);
    }, SLIDESHOW_INTERVAL) as unknown as ReturnType<typeof setInterval>;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slidesLength, isPlaying, prefersReducedMotion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentImg((prev) => (prev + 1) % slidesLength);
        setIsPlaying(false);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentImg((prev) => (prev - 1 + slidesLength) % slidesLength);
        setIsPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slidesLength]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentImg(index);
    setIsPlaying(false);
  };

  const handlePausePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full flex flex-col lg:flex-row">
        
        {/* SISI KIRI: Ditambahkan pointer-events-none agar tidak menahan scroll mouse/swipe */}
        <div
          className="fixed top-0 left-0 w-full lg:w-1/2 h-[50vh] md:h-[60vh] lg:h-screen z-0 overflow-hidden bg-[#041e48] pointer-events-none"
          role="region"
          aria-label="Hero slideshow"
        >
          <AnimatePresence mode="wait">
            {slides.length > 0 ? (
              <motion.div
                key={currentImg}
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 1.5,
                  ease: "easeInOut"
                }}
                className="absolute inset-0"
              >
                <img
                  src={slides[currentImg]}
                  alt={`Wedding moment slide ${currentImg + 1}`}
                  className="w-full h-full object-cover"
                  loading={currentImg === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-[#041e48] flex items-center justify-center text-white/30 font-serif">
                Memuat Galeri...
              </div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#041e48]/90 via-[#041e48]/20 to-transparent lg:bg-gradient-to-r" />

          {slides.length > 0 && (
            <>
              {/* PERBAIKAN: Tombol kembali diberi pointer-events-auto agar tetap bisa diklik */}
              <button
                onClick={handlePausePlay}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 pointer-events-auto"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              {slides.length > 1 && (
                <SlideshowIndicators
                  currentImg={currentImg}
                  total={slides.length}
                  onDotClick={handleDotClick}
                />
              )}

              <div className="absolute top-6 left-6 z-20 hidden md:block">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                  ← → untuk navigasi
                </p>
              </div>
            </>
          )}

          <div className="absolute bottom-12 md:bottom-16 left-6 md:left-16 z-10 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[0.5px] bg-white" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">
                  Wedding Documentation
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-[1.1]">
                Preserving Your <br /> Legacy of Love
              </h2>
            </motion.div>
          </div>
        </div>

        {/* SISI KANAN: Konten yang akan berjalan saat layar di-scroll */}
        <div 
          className="relative z-10 w-full lg:w-1/2 bg-white flex flex-col pt-12 md:pt-20 lg:pt-24 pb-20 px-6 md:px-12 lg:px-20 
                     mt-[50vh] md:mt-[60vh] lg:mt-0 lg:ml-[50%] 
                     rounded-t-[2.5rem] lg:rounded-t-none 
                     shadow-[0_-20px_30px_rgba(4,30,72,0.08)] lg:shadow-none"
        >
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <div>
              <span className="text-[#70161e] text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">
                Let's Connect
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#041e48] mb-6 leading-[1.1]">
                Mari Abadikan <br /> Cerita Anda
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
                Setiap pasangan memiliki esensi cerita yang unik. Mari diskusikan bagaimana kami dapat
                mengabadikan mahakarya cinta Anda.
              </p>
            </div>

            <WhyChooseUsSection />
            <ReservationCard onOpen={open} />
            <SocialLinksSection />
            <MapsSection />

            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-3xl md:text-4xl font-serif text-[#041e48] mb-10">
                Pertanyaan Umum
              </h3>
              <div className="space-y-1">
                {FAQ_DATA.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </div>
  );
}