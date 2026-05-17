/**
 * ========================================
 * CENTRALIZED IMAGE MANAGEMENT SYSTEM
 * ========================================
 *
 * This is the SINGLE SOURCE OF TRUTH for all images in the project.
 *
 * RULES:
 * 1. ALL images MUST be registered here
 * 2. NO hardcoded image paths in components
 * 3. Store actual images in /public/images/[category]/
 * 4. Use descriptive, consistent naming: [section]-[item]-[index].jpg
 *
 * ─────────────────────────────────────────
 * RECENT UPDATES:
 * - Removed dead placeholder codes (const U & const w) for a cleaner bundle.
 * - Updated Add-Ons Mini Studio structure to support 3D Carousel & Grid Hero.
 * - Standardized naming convention using kebab-case and 'thumbnail'.
 */

// ─────────────────────────────────────────────────────────────────────────────
// MAIN IMAGE REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const IMAGES = {
  /**
   * HERO SECTION
   * ─────────────
   * Replace with: /images/hero/hero-1.jpg  (1920×1080 — 16:9 landscape)
   */
  hero: {
    main:"/images/hero/hero-1.jpg",
    slides: [
      "/images/hero/hero-1.jpg",
      "/images/hero/hero-2.jpg",
      "/images/hero/hero-3.jpg",
    ],
  },

  /**
   * PORTFOLIO SECTION — landing page preview cards
   * ─────────────────────────────────────────────
   */
  portfolio: {
    miniStudio: "/images/portfolio/mini-studio-preview.jpg",
    scanBarcode: "/images/portfolio/scan-barcode-preview.jpg",
  },

  /**
   * ADD-ONS SECTION (PHOTO MINI STUDIO)
   * ──────────────────────────────────────
   */
  addOns: {
    miniStudio: "/images/addons/mini-studio.jpg",
    scanBarcode: "/images/addons/scan-barcode.jpg",

    // --- GRID HERO BACKGROUNDS (5 Columns) ---
    heroGrid: [
      "/images/grid/mini-studio-grid-1.jpg",
      "/images/grid/mini-studio-grid-2.jpg",
      "/images/grid/mini-studio-grid-3.jpg",
      "/images/grid/mini-studio-grid-4.jpg",
      "/images/grid/mini-studio-grid-5.jpg",
    ],

    // --- 3D CAROUSEL & LIGHTBOX BACKGROUNDS ---
    backgrounds: {
      lightGrey: {
        thumb: "/images/background-thumbnail/light-grey-thumbnail.jpg",
        preview: "/images/background-preview/bg-light-grey-preview.jpg"
      },
      black: { 
        thumb: "/images/background-thumbnail/black-thumbnail.jpg",
        preview: "/images/background-preview/bg-black-preview.jpg" 
      },
      darkGreen: {
        thumb: "/images/background-thumbnail/dark-green-thumbnail.jpg",
        preview: "/images/background-preview/bg-dark-green-preview.jpg"
      },
      skyBlue: { 
        thumb: "/images/background-thumbnail/sky-blue-thumbnail.jpg",
        preview: "/images/background-preview/bg-sky-blue-preview.jpg"
      },
      rust: { 
        thumb: "/images/background-thumbnail/rust-thumbnail.jpg",
        preview: "/images/background-preview/bg-rust-preview.jpg"
      },
      teracota: {
        thumb: "/images/background-thumbnail/teracota-thumbnail.jpg",
        preview: "/images/background-preview/bg-teracota-preview.jpg" 
      }
    },

    // --- FRAMES (Used in Scan Barcode Section) ---
    frames: {
      frame1: {
        name: "Classic Navy",
        description: "Timeless ivory border with gold accents",
        images: [
          "/images/frame/temp-frame-1.png",
          "/images/frame/temp-frame-2.png",
          "/images/frame/temp-frame-3.png",
          "/images/frame/temp-frame-4.png",
        ],
      },
      frame2: {
        name: "Modern Minimal",
        description: "Clean white frame with simple lines",
        images: [
          "/images/frame/temp-frame-1.png",
          "/images/frame/temp-frame-2.png",
          "/images/frame/temp-frame-3.png",
          "/images/frame/temp-frame-4.png",
        ],
      },
      frame3: {
        name: "Romantic Blush",
        description: "Soft pink tones with floral elements",
        images: [
          "/images/frame/temp-frame-1.png",
          "/images/frame/temp-frame-2.png",
          "/images/frame/temp-frame-3.png",
          "/images/frame/temp-frame-4.png",
        ],
      },
      frame4: {
        name: "Bold Navy",
        description: "Deep navy with silver metallic details",
        images: [
          "/images/frame/temp-frame-1.png",
          "/images/frame/temp-frame-2.png",
          "/images/frame/temp-frame-3.png",
          "/images/frame/temp-frame-4.png",
        ],
      },
    },
    
    // --- TEMPLATES ---
    templates: {
      navy: "/images/frame/temp-frame-1.png",
      white: "/images/frame/temp-frame-2.png",
      navyBanner: "/images/frame/temp-frame-3.png",
      whiteBanner: "/images/frame/temp-frame-4.png",
    },
  },

  /**
   * PHOTO SCAN BARCODE STORY SECTION
   * ──────────────────────────────────
   */
  scanBarcode: {
    introBg: "/images/scan-barcode/intro-bg.jpg",
    placeholderPhotos: [
      "/images/scan-barcode/photo-1.jpg",
      "/images/scan-barcode/photo-2.jpg",
      "/images/scan-barcode/photo-3.jpg",
      "/images/scan-barcode/photo-4.jpg",
      "/images/scan-barcode/photo-5.jpg",
      "/images/scan-barcode/photo-6.jpg",
    ] as string[],
  },

  /**
   * CTA SECTION 
   * ─────────────────────────────────────
   */
  cta: {
    background: "/images/cta/cta-background.jpg",
  },

  /**
   * MODAL 
   * ─────────────────────────────────────────
   */
  modal: {
    checkAvailability: "/images/modal/couple-moment.jpg",
  },

  /**
   * CONTACT PAGE
   * ─────────────
   */
  contact: {
    heroSlides:[
     "/images/contact-images/contact-hero-1.jpg",
     "/images/contact-images/contact-hero-2.jpg",
     "/images/contact-images/contact-hero-3.jpg",
     "/images/contact-images/contact-hero-4.jpg",
     "/images/contact-images/contact-hero-5.jpg",
     "/images/contact-images/contact-hero-6.jpg",
     "/images/contact-images/contact-hero-7.jpg",
     "/images/contact-images/contact-hero-8.jpg",
     "/images/contact-images/contact-hero-9.jpg",
     "/images/contact-images/contact-hero-10.jpg",
     "/images/contact-images/contact-hero-11.jpg",
    ],
  },

  /**
   * ════════════════════════════════════════════════════════════
   * PORTFOLIO GALLERY
   * ════════════════════════════════════════════════════════════
   */
  portfolioGallery: {

    // ── MINI STUDIO (8 clients) ───────────────────────────────────────────
    miniStudio: {
      client01: {
        cover:  "/images/portfolio-gallery/mini-studio/client-01/cover.jpg",
        images: [
          "/images/portfolio-gallery/mini-studio/client-01/img-01.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-02.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-03.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-04.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-05.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-06.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-07.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-08.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-09.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-10.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-11.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-12.jpg",
          "/images/portfolio-gallery/mini-studio/client-01/img-13.jpg",
        ],
      },
      client02: {
        cover:  "/images/portfolio-gallery/mini-studio/client-02/cover.jpg",
        images: [
          "/images/portfolio-gallery/mini-studio/client-02/img-01.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-02.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-03.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-04.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-05.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-06.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-07.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-08.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-09.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-10.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-11.jpg",
          "/images/portfolio-gallery/mini-studio/client-02/img-12.jpg",
        ],
      },
      client03: {
        cover:  "/images/portfolio-gallery/mini-studio/client-03/cover.jpg",
        images: [
          "/images/portfolio-gallery/mini-studio/client-03/img-01.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-02.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-03.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-04.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-05.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-06.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-07.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-08.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-09.jpg",
          "/images/portfolio-gallery/mini-studio/client-03/img-10.jpg",
        ],
      },
      client04: {
        cover:  "/images/portfolio-gallery/mini-studio/client-04/cover.jpg",
        images: [
          "/images/portfolio-gallery/mini-studio/client-04/img-01.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-02.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-03.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-04.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-05.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-06.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-07.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-08.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-09.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-10.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-11.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-12.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-13.jpg",
          "/images/portfolio-gallery/mini-studio/client-04/img-14.jpg",
        ],
      },
      client05: {
        cover:  "/images/portfolio-gallery/mini-studio/client-05/cover.jpg",
        images: [
          "/images/portfolio-gallery/mini-studio/client-05/img-01.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-02.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-03.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-04.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-05.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-06.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-07.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-08.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-09.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-10.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-11.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-12.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-13.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-14.jpg",
          "/images/portfolio-gallery/mini-studio/client-05/img-15.jpg",
        ],
      },
      client06: {
        cover:  "/images/portfolio-gallery/mini-studio/client-06/cover.jpg",
        images: [
          "/images/portfolio-gallery/mini-studio/client-06/img-01.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-02.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-03.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-04.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-05.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-06.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-07.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-08.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-09.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-10.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-11.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-12.jpg",
          "/images/portfolio-gallery/mini-studio/client-06/img-13.jpg",
        ],
      },
      client07: {
        cover:  "/images/portfolio-gallery/mini-studio/client-07/cover.jpg",
        images: [
          "/images/portfolio-gallery/mini-studio/client-07/img-01.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-02.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-03.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-04.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-05.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-06.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-07.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-08.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-09.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-10.jpg",
          "/images/portfolio-gallery/mini-studio/client-07/img-11.jpg",
        ],
      },
      client08: {
        cover:  "/images/portfolio-gallery/mini-studio/client-08/cover.jpg",
        images: [
          "/images/portfolio-gallery/mini-studio/client-08/img-01.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-02.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-03.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-04.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-05.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-06.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-07.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-08.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-09.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-10.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-11.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-12.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-13.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-14.jpg",
          "/images/portfolio-gallery/mini-studio/client-08/img-15.jpg",
        ],
      },
    },

    // ── SCAN BARCODE (8 clients) ──────────────────────────────────────────
    scanBarcode: {
      client01: {
        cover:  "/images/portfolio-gallery/scan-barcode/client-01/cover.jpg",
        images: [
          "/images/portfolio-gallery/scan-barcode/client-01/img-1.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-2.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-3.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-4.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-5.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-6.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-7.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-8.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-9.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-10.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-11.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-12.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-13.jpg",
          "/images/portfolio-gallery/scan-barcode/client-01/img-14.jpg",
        ],
      },
      client02: {
        cover:  "/images/portfolio-gallery/scan-barcode/client-02/cover.jpg",
        images: [
          "/images/portfolio-gallery/scan-barcode/client-02/img-1.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-2.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-3.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-4.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-5.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-6.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-7.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-8.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-9.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-10.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-11.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-12.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-13.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-14.jpg",
          "/images/portfolio-gallery/scan-barcode/client-02/img-15.jpg",
        ],
      },
      client03: {
        cover:  "/images/portfolio-gallery/scan-barcode/client-03/cover.jpg",
        images: [
          "/images/portfolio-gallery/scan-barcode/client-03/img-1.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-2.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-3.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-4.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-5.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-6.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-7.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-8.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-9.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-10.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-11.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-12.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-13.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-14.jpg",
          "/images/portfolio-gallery/scan-barcode/client-03/img-15.jpg",
        ],
      },
      client04: {
        cover:  "/images/portfolio-gallery/scan-barcode/client-04/cover.jpg",
        images: [
          "/images/portfolio-gallery/scan-barcode/client-04/img-1.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-2.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-3.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-4.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-5.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-6.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-7.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-8.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-9.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-10.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-11.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-12.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-13.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-14.jpg",
          "/images/portfolio-gallery/scan-barcode/client-04/img-15.jpg",
        ],
      },
      client05: {
        cover:  "/images/portfolio-gallery/scan-barcode/client-05/cover.jpg",
        images: [
          "/images/portfolio-gallery/scan-barcode/client-05/img-1.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-2.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-3.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-4.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-5.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-6.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-7.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-8.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-9.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-10.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-11.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-12.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-13.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-14.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-15.jpg",
          "/images/portfolio-gallery/scan-barcode/client-05/img-16.jpg",
        ],
      },
      client06: {
        cover:  "/images/portfolio-gallery/scan-barcode/client-06/cover.jpg",
        images: [
          "/images/portfolio-gallery/scan-barcode/client-06/img-1.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-2.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-3.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-4.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-5.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-6.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-7.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-8.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-9.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-10.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-11.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-12.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-13.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-14.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-15.jpg",
          "/images/portfolio-gallery/scan-barcode/client-06/img-16.jpg",
        ],
      },
      client07: {
        cover:  "/images/portfolio-gallery/scan-barcode/client-07/cover.jpg",
        images: [
          "/images/portfolio-gallery/scan-barcode/client-07/img-1.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-2.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-3.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-4.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-5.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-6.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-7.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-8.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-9.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-10.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-11.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-12.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-13.jpg",
          "/images/portfolio-gallery/scan-barcode/client-07/img-14.jpg",
        ],
      },
      client08: {
        cover:  "/images/portfolio-gallery/scan-barcode/client-08/cover.jpg",
        images: [
          "/images/portfolio-gallery/scan-barcode/client-08/img-1.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-2.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-3.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-4.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-5.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-6.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-7.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-8.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-9.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-10.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-11.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-12.jpg",  
          "/images/portfolio-gallery/scan-barcode/client-08/img-13.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-14.jpg",
          "/images/portfolio-gallery/scan-barcode/client-08/img-15.jpg",
        ],
      },
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPE EXPORTS
// ─────────────────────────────────────────────────────────────────────────────
export type ImageCategory          = keyof typeof IMAGES;
export type HeroImage              = keyof typeof IMAGES.hero;
export type PortfolioImage         = keyof typeof IMAGES.portfolio;
export type AddOnImage             = keyof typeof IMAGES.addOns;
export type CTAImage               = keyof typeof IMAGES.cta;
export type ScanBarcodeImage       = keyof typeof IMAGES.scanBarcode;
export type ContactImage           = keyof typeof IMAGES.contact;
export type PortfolioGalleryCategory = keyof typeof IMAGES.portfolioGallery;