import React, { useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Instagram, Phone, Clock, Calendar } from "lucide-react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";
import { IMAGES } from "../constants/images";

export function ContactPage() {
  const { isOpen, open, close } = useCheckAvailabilityModal();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-[#041e48] mb-6">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We'd love to hear about your special day. Check our availability or reach out through any of the channels below.
          </p>
        </motion.div>

        {/* Availability Form Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#70161e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#70161e]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#041e48] mb-3">
                  Check Our Availability
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Secure your special date before it's fully booked. We'll respond within 24 hours.
                </p>
              </div>
              
              <button
                onClick={open}
                className="px-8 py-4 bg-[#70161e] hover:bg-[#70161e]/90 text-white rounded-full font-medium text-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                Check Availability Now
              </button>
              
              <p className="text-sm text-gray-400 mt-4">
                Limited slots available this month
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#041e48]/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#041e48]/10 transition-colors">
                <Phone className="w-6 h-6 text-[#041e48]" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-[#041e48] mb-2">WhatsApp Admin</h3>
                <p className="text-gray-500 mb-4">Chat with our dedicated admins to check availability and packages.</p>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/6282111334334" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#70161e] hover:text-[#041e48] font-medium transition-colors">
                    <span>Admin 1: +6282111334334</span>
                  </a>
                  <a href="https://wa.me/6281227663007" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#70161e] hover:text-[#041e48] font-medium transition-colors">
                    <span>Admin 2: +6281227663007</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#041e48]/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#041e48]/10 transition-colors">
                <Instagram className="w-6 h-6 text-[#041e48]" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-[#041e48] mb-2">Social Media</h3>
                <p className="text-gray-500 mb-4">Follow us for the latest updates and wedding inspirations.</p>
                <a href="https://instagram.com/faralljibrill_official" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#70161e] hover:text-[#041e48] font-medium transition-colors">
                  @faralljibrill.photography 
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#041e48]/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#041e48]/10 transition-colors">
                <Mail className="w-6 h-6 text-[#041e48]" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-[#041e48] mb-2">Email Inquiries</h3>
                <p className="text-gray-500 mb-4">For formal inquiries and business collaborations.</p>
                <a href="mailto:hello@faralljibrill.com" className="inline-flex items-center gap-2 text-[#70161e] hover:text-[#041e48] font-medium transition-colors">
                  faralljibrill.official@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Location & Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col"
          >
            <div className="mb-10 flex items-start gap-6">
              <div className="w-12 h-12 bg-[#041e48] rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-[#041e48] mb-2">Our Studio</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  123 Wedding Avenue, Studio District<br />
                  Jakarta Selatan, Indonesia 12345
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>Mon - Fri, 09:00 - 18:00 WIB</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 rounded-xl overflow-hidden bg-gray-100 min-h-[300px] relative">
              {/* Placeholder for map - Replace with actual map integration if needed */}
              <img 
                src={IMAGES.contact.mapPlaceholder}
                alt="Studio Location Map"
                className="w-full h-full object-cover absolute inset-0 opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#041e48]/10 mix-blend-multiply" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md text-[#041e48] font-medium flex items-center gap-2">
                  <MapPin size={18} className="text-[#70161e]" />
                  <span>Faralljibrill Studio</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Check Availability Modal */}
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </div>
  );
}