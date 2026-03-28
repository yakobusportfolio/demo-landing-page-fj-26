import React from "react";
import { Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-[#041e48] text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-serif tracking-wide mb-2">FARALLJIBRILL PHOTOGRAPHY</h2>
            <p className="text-white/60 text-sm">A walk to Remember.</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/faralljibrill_official/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
              <Instagram size={20} />
            </a>
            <a href="https://wa.me/6282111334334" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
              <Phone size={20} />
            </a>
            <a href="mailto:faralljibril.official@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Faralljibrill Photography. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
