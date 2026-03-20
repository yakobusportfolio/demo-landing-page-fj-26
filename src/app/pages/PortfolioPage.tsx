import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { clientsData, type ClientPortfolio } from "../constants/portfolio-data";

export function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedClient, setSelectedClient] = useState<ClientPortfolio | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Keep active category synced with URL params
  const categoryParam = searchParams.get("category") as "mini-studio" | "scan-barcode" | null;
  const activeCategory = categoryParam || "all";

  const setActiveCategory = (cat: "all" | "mini-studio" | "scan-barcode") => {
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedClient, activeCategory]);

  const filteredClients = clientsData.filter(client => activeCategory === "all" || client.category === activeCategory);

  const handleClientClick = (client: ClientPortfolio) => {
    setSelectedClient(client);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedClient && selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % selectedClient.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedClient && selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! - 1 + selectedClient.images.length) % selectedClient.images.length);
    }
  };

  const pageTitle = activeCategory === "mini-studio" ? "Mini Studio Portfolios" 
                    : activeCategory === "scan-barcode" ? "Scan Barcode Portfolios" 
                    : "All Client Portfolios";

  return (
    <div className="min-h-screen bg-[#041e48] pt-32 pb-12">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl font-serif text-white text-center md:text-left">
            {selectedClient ? `${selectedClient.name}'s Gallery` : pageTitle}
          </h2>
          
          {!selectedClient ? (
            <div className="flex bg-[#1b355e]/50 backdrop-blur-md rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2 rounded-full text-sm transition-all ${activeCategory === "all" ? "bg-white/20 text-white shadow-sm" : "text-white/60 hover:text-white"}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveCategory("mini-studio")}
                className={`px-6 py-2 rounded-full text-sm transition-all ${activeCategory === "mini-studio" ? "bg-white/20 text-white shadow-sm" : "text-white/60 hover:text-white"}`}
              >
                Mini Studio
              </button>
              <button 
                onClick={() => setActiveCategory("scan-barcode")}
                className={`px-6 py-2 rounded-full text-sm transition-all ${activeCategory === "scan-barcode" ? "bg-white/20 text-white shadow-sm" : "text-white/60 hover:text-white"}`}
              >
                Scan Barcode
              </button>
            </div>
          ) : (
             <button 
                onClick={() => setSelectedClient(null)} 
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full transition-all group w-fit"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                Back to Clients
              </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!selectedClient ? (
            <motion.div 
              key="client-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredClients.length > 0 ? (
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
                  <Masonry gutter="24px">
                    {filteredClients.map((client) => (
                      <div 
                        key={client.id} 
                        className="overflow-hidden rounded-lg cursor-pointer group relative bg-[#1b355e]/50"
                        onClick={() => handleClientClick(client)}
                      >
                        <div className="absolute inset-0 bg-black/30 md:bg-black/0 md:group-hover:bg-black/40 transition-colors duration-300 z-10" />
                        <img 
                          src={client.coverImage} 
                          alt={client.name} 
                          className="w-full block transform group-hover:scale-105 transition-transform duration-700 object-cover aspect-[4/5]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                          <div className="flex flex-col items-center text-center">
                            <span className="text-white text-2xl md:text-3xl lg:text-4xl font-serif tracking-wide drop-shadow-lg">
                              {client.name}
                            </span>
                            <span className="text-white/80 text-sm md:text-base italic tracking-widest">
                              at {client.venue}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              ) : (
                <div className="text-center py-20 text-white/60 text-lg">
                  No portfolios found for this category yet.
                </div>
              )}
              
              <div className="mt-16 flex justify-center">
                <button 
                  onClick={() => navigate('/')} 
                  className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full transition-all group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                  Back to Homepage
                </button>
              </div>
            </motion.div>
          ) : selectedImageIndex === null ? (
            <motion.div
              key="client-gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Mobile Horizontal Slide */}
              <div className="block md:hidden pb-8">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar">
                  {selectedClient.images.map((src, idx) => (
                    <div 
                      key={idx} 
                      className="shrink-0 w-[85vw] snap-center rounded-xl overflow-hidden relative cursor-pointer group"
                      onClick={() => handleImageClick(idx)}
                    >
                      <img src={src} className="w-full h-auto min-h-[40vh] max-h-[70vh] object-contain bg-[#1b355e]/30 rounded-xl" alt={`Gallery ${idx + 1}`} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                    </div>
                  ))}
                </div>
                <div className="text-center text-white/50 text-sm mt-4">Swipe to see more</div>
              </div>

              {/* Desktop Masonry Grid */}
              <div className="hidden md:block">
                <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 1024: 3 }}>
                  <Masonry gutter="24px">
                    {selectedClient.images.map((src, idx) => (
                      <div 
                        key={idx} 
                        className="overflow-hidden rounded-lg cursor-pointer group relative bg-[#1b355e]/50"
                        onClick={() => handleImageClick(idx)}
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                        <img 
                          src={src} 
                          alt={`Gallery image ${idx + 1}`} 
                          className="w-full block transform group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
                <div className="mt-12 flex justify-center pb-12">
                  <button 
                    onClick={() => setSelectedClient(null)} 
                    className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full transition-all group"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    Back to Portfolios
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="lightbox"
              className="fixed inset-0 z-[60] flex items-center justify-center bg-[#041e48]/98 backdrop-blur-xl"
              onClick={() => setSelectedImageIndex(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-10"
              >
                <ChevronLeft size={32} />
              </button>
              
              <motion.img 
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={selectedClient.images[selectedImageIndex]} 
                alt="Zoomed" 
                className="max-w-[90vw] max-h-[85vh] object-contain px-4"
                onClick={(e) => e.stopPropagation()}
              />
              
              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-10"
              >
                <ChevronRight size={32} />
              </button>

              <button 
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <X size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}