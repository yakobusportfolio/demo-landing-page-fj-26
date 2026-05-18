import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { clientsData, type ClientPortfolio } from "../constants/portfolio-data";

// ============================================================================
// CONSTANTS & VARIANTS
// ============================================================================
const VALID_CATEGORIES = ["mini-studio", "scan-barcode"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as const } },
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

// ✅ Fix: Body scroll lock hook
function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
}

// ✅ Fix: Image preloader hook with readonly array support
function useImagePreloader(images: readonly string[], currentIndex: number | null) {
  useEffect(() => {
    if (currentIndex === null || images.length === 0) return;

    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Preload next and previous images
    const nextIdx = (currentIndex + 1) % images.length;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;

    preloadImage(images[nextIdx]);
    preloadImage(images[prevIdx]);
  }, [currentIndex, images]);
}

// ============================================================================
// IMAGE CARD COMPONENT
// ============================================================================
function ImageCard({
  src,
  alt,
  onClick,
  aspectClass = "aspect-auto",
  delay = 0,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
  aspectClass?: string;
  delay?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // ✅ Fix: Prevent memory leak with cleanup
  useEffect(() => {
    let mounted = true;
    setLoaded(false);
    setError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (mounted) setLoaded(true);
    };
    img.onerror = () => {
      if (mounted) {
        setError(true);
        setLoaded(true);
      }
    };

    return () => {
      mounted = false;
    };
  }, [src]);

  // ✅ Fix: Keyboard handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      className={`relative overflow-hidden rounded-lg bg-[#1a1f2e] transition-opacity duration-500
        ${onClick ? "cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50" : ""}`}
      style={{
        opacity: loaded ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
      onClick={onClick}
    >
      {/* Shimmer skeleton */}
      {!loaded && !error && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#1a1f2e] via-[#252b3b] to-[#1a1f2e]
            animate-pulse ${aspectClass}`}
        />
      )}

      {/* Error state */}
      {error && (
        <div className={`flex items-center justify-center bg-[#1a1f2e] text-white/20 text-xs ${aspectClass}`}>
          Failed to load
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full block transition-transform duration-700 group-hover:scale-105 ${aspectClass}`}
        style={{ display: error ? "none" : "block" }}
      />

      {/* Hover overlay */}
      {onClick && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
      )}
    </div>
  );
}

// ============================================================================
// CLIENT CARD COMPONENT
// ============================================================================
function ClientCard({
  client,
  onClick,
  delay = 0,
}: {
  client: ClientPortfolio;
  onClick: () => void;
  delay?: number;
}) {
  const [loaded, setLoaded] = useState(false);

  // ✅ Fix: Keyboard handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative overflow-hidden rounded-lg cursor-pointer group bg-[#1a1f2e] transition-opacity duration-500 focus:outline-none focus:ring-2 focus:ring-white/50"
      style={{ opacity: loaded ? 1 : 0, transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {/* Shimmer skeleton */}
      {!loaded && (
        <div className="absolute inset-0 aspect-[4/5] bg-gradient-to-r from-[#1a1f2e] via-[#252b3b] to-[#1a1f2e] animate-pulse" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/0 md:group-hover:bg-black/50 transition-colors duration-300 z-10" />

      <img
        src={client.coverImage}
        alt={client.name}
        loading="lazy"
        className="w-full block transform group-hover:scale-105 transition-transform duration-700 object-cover aspect-[4/5]"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />

      {/* Name/venue overlay */}
      <div
        className="absolute inset-0 flex items-end justify-start z-20
        md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none p-5
        bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      >
        <div className="flex flex-col text-left">
          <span className="text-white text-xl md:text-2xl lg:text-3xl font-serif tracking-wide drop-shadow-lg">
            {client.name}
          </span>
          <span className="text-white/75 text-xs md:text-sm italic tracking-widest">
            at {client.venue}
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedClient, setSelectedClient] = useState<ClientPortfolio | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const lightboxRef = useRef<HTMLDivElement>(null);

  // ✅ Fix: Type-safe category param validation
  const categoryParam = searchParams.get("category");
  const activeCategory: "all" | Category =
    categoryParam && VALID_CATEGORIES.includes(categoryParam as Category)
      ? (categoryParam as Category)
      : "all";

  const setActiveCategory = useCallback(
    (cat: "all" | Category) => {
      const next = new URLSearchParams(searchParams);
      if (cat === "all") next.delete("category");
      else next.set("category", cat);
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  // ✅ Fix: Better scroll behavior
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: selectedClient ? "smooth" : "instant",
    });
  }, [selectedClient, activeCategory]);

  // ✅ Fix: Dynamic page title for SEO
  const pageTitle =
    activeCategory === "mini-studio"
      ? "Mini Studio Portfolios"
      : activeCategory === "scan-barcode"
        ? "Scan Barcode Portfolios"
        : "All Client Portfolios";

  useEffect(() => {
    document.title = selectedClient
      ? `${selectedClient.name} - Portfolio | Your Brand`
      : `${pageTitle} | Your Brand`;

    return () => {
      document.title = "Your Brand"; // Reset on unmount
    };
  }, [selectedClient, pageTitle]);

  const filteredClients = clientsData.filter(
    (c) => activeCategory === "all" || c.category === activeCategory
  );

  // ✅ Fix: Body scroll lock when lightbox is open
  useBodyScrollLock(selectedImageIndex !== null);

  // ✅ Fix: Preload adjacent images in lightbox
  useImagePreloader(selectedClient?.images ?? [], selectedImageIndex);

  // ── Lightbox navigation ──────────────────────────────────────────────────
  const nextImage = useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent) => {
      e?.stopPropagation();
      if (selectedClient && selectedImageIndex !== null) {
        setSelectedImageIndex((p) => (p! + 1) % selectedClient.images.length);
      }
    },
    [selectedClient, selectedImageIndex]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent) => {
      e?.stopPropagation();
      if (selectedClient && selectedImageIndex !== null) {
        setSelectedImageIndex(
          (p) => (p! - 1 + selectedClient.images.length) % selectedClient.images.length
        );
      }
    },
    [selectedClient, selectedImageIndex]
  );

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // ── Keyboard navigation ──────────────────────────────────────────────────
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setSelectedImageIndex((p) => (p! + 1) % selectedClient!.images.length);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSelectedImageIndex(
            (p) => (p! - 1 + selectedClient!.images.length) % selectedClient!.images.length
          );
          break;
        case "Escape":
          e.preventDefault();
          closeLightbox();
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedImageIndex, selectedClient, closeLightbox]);

  // ✅ Fix: Focus trap for lightbox
  useEffect(() => {
    if (selectedImageIndex !== null && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#080c14] via-[#0d1117] to-[#111827] pt-32 pb-16">
      {/* ✅ Fix: Scrollbar hiding styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <motion.h1
            key={selectedClient ? "gallery-title" : pageTitle}
            {...fadeVariants}
            className="text-4xl md:text-5xl font-serif text-white text-center md:text-left"
          >
            {selectedClient ? `${selectedClient.name}'s Gallery` : pageTitle}
          </motion.h1>

          {!selectedClient ? (
            /* Category filter */
            <nav aria-label="Portfolio categories">
              <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
                {(["all", "mini-studio", "scan-barcode"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`px-5 py-2 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                      activeCategory === cat
                        ? "bg-white/15 text-white shadow-sm"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {cat === "all" ? "All" : cat === "mini-studio" ? "Mini Studio" : "Scan Barcode"}
                  </button>
                ))}
              </div>
            </nav>
          ) : (
            <button
              onClick={() => setSelectedClient(null)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/8 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white rounded-full transition-all group w-fit focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Clients
            </button>
          )}
        </div>

        {/* ── Content views ── */}
        <AnimatePresence mode="wait">
          {/* VIEW 1: Client list */}
          {!selectedClient ? (
            <motion.div key="client-list" {...fadeVariants}>
              {filteredClients.length > 0 ? (
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
                  <Masonry gutter="20px">
                    {filteredClients.map((client, idx) => (
                      <ClientCard
                        key={client.id}
                        client={client}
                        onClick={() => setSelectedClient(client)}
                        delay={Math.min(idx * 60, 400)}
                      />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              ) : (
                <div className="text-center py-20 text-white/40 text-lg" role="status">
                  No portfolios found for this category yet.
                </div>
              )}

              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 px-8 py-4 bg-white/8 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white rounded-full transition-all group focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Homepage
                </button>
              </div>
            </motion.div>
          ) : selectedImageIndex === null ? (
            /* VIEW 2: Client gallery */
            <motion.div key="client-gallery" {...fadeVariants}>
              {/* Mobile: horizontal scroll */}
              <div className="block md:hidden pb-8">
                <div
                  className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar"
                  role="region"
                  aria-label="Gallery images"
                >
                  {selectedClient.images.map((src, idx) => (
                    <div
                      key={idx}
                      className="shrink-0 w-[85vw] snap-center rounded-xl overflow-hidden"
                    >
                      <ImageCard
                        src={src}
                        alt={`${selectedClient.name} gallery image ${idx + 1}`}
                        onClick={() => setSelectedImageIndex(idx)}
                        aspectClass="min-h-[40vh] max-h-[70vh] object-contain bg-[#1a1f2e]"
                        delay={Math.min(idx * 50, 300)}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-center text-white/30 text-xs tracking-widest uppercase mt-4">
                  Swipe to see more
                </p>
              </div>

              {/* Desktop: masonry grid */}
              <div className="hidden md:block">
                <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 1024: 3 }}>
                  <Masonry gutter="20px">
                    {selectedClient.images.map((src, idx) => (
                      <ImageCard
                        key={idx}
                        src={src}
                        alt={`${selectedClient.name} gallery image ${idx + 1}`}
                        onClick={() => setSelectedImageIndex(idx)}
                        delay={Math.min(idx * 50, 400)}
                      />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>

                <div className="mt-12 flex justify-center pb-8">
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="flex items-center gap-2 px-8 py-4 bg-white/8 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white rounded-full transition-all group focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolios
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* VIEW 3: Lightbox */
            <motion.div
              key="lightbox"
              ref={lightboxRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Image ${selectedImageIndex + 1} of ${selectedClient.images.length}`}
              tabIndex={-1}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl focus:outline-none"
              onClick={closeLightbox}
              {...fadeVariants}
            >
              {/* Prev */}
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-3 md:left-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={selectedClient.images[selectedImageIndex]}
                  alt={`${selectedClient.name} - Image ${selectedImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-[90vw] max-h-[85vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              {/* Next */}
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 md:right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <ChevronRight size={28} />
              </button>

              {/* Close */}
              <button
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <X size={22} />
              </button>

              {/* Image counter */}
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase"
                aria-live="polite"
              >
                {selectedImageIndex + 1} / {selectedClient.images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}