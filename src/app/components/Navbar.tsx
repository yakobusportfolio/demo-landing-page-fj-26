import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Instagram } from "lucide-react";
import { CheckAvailabilityModal } from "./CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isOpen, open, close } = useCheckAvailabilityModal();

  // Check if we're on the contact page
  const isContactPage = location.pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  return (
    <>
      {/* Primary Full Navbar - Visible only at the very top */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        } ${
          isContactPage 
            ? "bg-white/95 backdrop-blur-sm shadow-md py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className={`text-lg font-serif tracking-wide drop-shadow-sm ${
            isContactPage ? "text-[#041e48]" : "text-white"
          }`}>
            Faralljibrill Photography
          </Link>
          
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/portfolio" className={`text-sm tracking-wide hover:opacity-70 transition-opacity ${
              isContactPage ? "text-[#041e48]" : "text-white drop-shadow-md"
            }`}>
              Gallery
            </Link>
            <button 
              onClick={open}
              className={`text-sm tracking-wide hover:opacity-70 transition-opacity bg-transparent border-0 cursor-pointer ${
                isContactPage ? "text-[#041e48]" : "text-white drop-shadow-md"
              }`}
            >
              Booking Now!
            </button>
            <Link 
              to="/contact" 
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-lg ${
                isContactPage 
                  ? "bg-[#70161e] text-white hover:bg-[#70161e]/90" 
                  : "bg-white text-[#041e48] hover:bg-white/90"
              }`}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

      {/* Floating Hamburger Button - Visible when scrolled or on mobile */}
      <div 
        className={`fixed top-6 right-6 z-50 transition-all duration-500 ${
          !scrolled && !isMenuOpen ? "opacity-100 md:opacity-0 md:pointer-events-none" : "opacity-100"
        }`}
      >
        <button 
          className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 ${
            isMenuOpen 
              ? "bg-white text-[#041e48]" 
              : isContactPage
                ? "bg-white text-[#041e48] border border-gray-200"
                : "bg-[#041e48]/90 text-white border border-white/20"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#041e48] flex flex-col justify-center items-center"
          >
            <div className="absolute top-6 left-6">
              <Link to="/" className="text-lg font-serif tracking-wide text-white" onClick={() => setIsMenuOpen(false)}>
                Faralljibrill Photography
              </Link>
            </div>
            
            <nav className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-lg px-6">
              <Link 
                to="/" 
                className="text-3xl md:text-5xl font-serif text-white hover:text-white/70 transition-colors"
                onClick={(e) => {
                  // Cek apakah user sudah berada di halaman Home ("/")
                  if (location.pathname === "/") {
                    e.preventDefault(); // Mencegah router mengabaikan klik
                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll ke atas mulus
                  }
                  setIsMenuOpen(false); // Tetap tutup menu hamburger-nya
                }}
              >
                Home
              </Link>
              <Link 
                to="/portfolio" 
                className="text-3xl md:text-5xl font-serif text-white hover:text-white/70 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Portfolios
              </Link>
              <Link 
                to="/#add-ons" 
                className="text-3xl md:text-5xl font-serif text-white hover:text-white/70 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lihat Add-Ons
              </Link>
              <Link 
                to="/contact" 
                className="text-3xl md:text-5xl font-serif text-white hover:text-white/70 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get in touch with us
              </Link>
            </nav>
            
            <div className="absolute bottom-10 left-0 right-0 text-center flex flex-col items-center gap-3">
              <p className="text-white/60 text-xs tracking-widest uppercase">Get in touch</p>
              <div className="flex gap-4 items-center">
                <a 
                  href="https://wa.me/6282111334334" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white hover:text-white/70 transition-colors p-1.5 rounded-full border border-white/20 hover:border-white/50"
                  aria-label="WhatsApp"
                >
                  <Phone size={15} />
                </a>
                <a 
                  href="https://wa.me/6281227663007" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white hover:text-white/70 transition-colors p-1.5 rounded-full border border-white/20 hover:border-white/50"
                  aria-label="WhatsApp"
                >
                  <Phone size={15} />
                </a>
                <a 
                  href="https://instagram.com/faralljibrill_official" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white hover:text-white/70 transition-colors p-1.5 rounded-full border border-white/20 hover:border-white/50"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Check Availability Modal */}
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
