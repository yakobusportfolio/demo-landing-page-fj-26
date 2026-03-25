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
 * FOLDER STRUCTURE (when replacing placeholders):
 * ─────────────────────────────────────────
 * /public/
 * └── images/
 *     ├── hero/
 *     │   ├── hero-1.jpg          (1920×1080 — 16:9 landscape)
 *     │   ├── hero-2.jpg
 *     │   └── hero-3.jpg
 *     │
 *     ├── portfolio/
 *     │   ├── mini-studio-preview.jpg    (800×1000 — 4:5 portrait)
 *     │   └── scan-barcode-preview.jpg   (800×1000 — 4:5 portrait)
 *     │
 *     ├── addons/
 *     │   └── mini-studio.jpg     (1200×800 — 3:2 landscape)
 *     │
 *     ├── scan-barcode/
 *     │   ├── intro-bg.jpg        (1920×1080 — 16:9 landscape)
 *     │   ├── photo-1.jpg         (1200×800 — 3:2 landscape, behind frame overlay)
 *     │   ├── photo-2.jpg
 *     │   ├── photo-3.jpg
 *     │   ├── photo-4.jpg
 *     │   ├── photo-5.jpg
 *     │   └── photo-6.jpg
 *     │
 *     ├── cta/
 *     │   └── cta-background.jpg  (1920×1080 — 16:9 landscape)
 *     │
 *     ├── modal/
 *     │   └── couple-moment.jpg   (800×533  — 3:2 landscape)
 *     │
 *     ├── contact/
 *     │   └── studio-map.jpg      (800×600  — 4:3 landscape)
 *     │
 *     └── portfolio-gallery/
 *         ├── mini-studio/
 *         │   ├── client-01/
 *         │   │   ├── cover.jpg   (800×1000 — 4:5 portrait)
 *         │   │   ├── img-01.jpg  (varied — for masonry grid)
 *         │   │   └── ...
 *         │   └── client-02/ ... client-08/
 *         └── scan-barcode/
 *             ├── client-01/ ... client-08/
 *
 * ─────────────────────────────────────────
 * HOW TO REPLACE PLACEHOLDERS:
 * ─────────────────────────────────────────
 * 1. Add your image file to the correct /public/images/[category]/ folder
 * 2. Update the URL string below — e.g. replace
 *       "https://placehold.co/800x1000/ede8e0/9a8878?text=couple-studio.jpg"
 *    with
 *       "/images/portfolio-gallery/mini-studio/client-01/cover.jpg"
 * 3. Every component that references IMAGES will instantly use the new file.
 *
 * ─────────────────────────────────────────
 * PLACEHOLDER COLOR GUIDE:
 * ─────────────────────────────────────────
 * Warm portrait   — bg #ede8e0 / text #9a8878  (4:5  — 800×1000)
 * Neutral event   — bg #dbd4cc / text #7a6e66  (3:2  — 1200×800)
 * Dark hero/venue — bg #1b355e / text #c8b89a  (16:9 — 1920×1080)
 * Dark map        — bg #041e48 / text #c8b89a  (4:3  — 800×600)
 */

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER LOOKUP TABLE
// Each key is a semantic photo category. Replace URLs with local /images/ paths.
// ─────────────────────────────────────────────────────────────────────────────

const U = {
  // ── Portrait subjects (4:5 ratio — 800×1000) ──────────────────────────────
  coupleStudio:  "https://placehold.co/800x1000/ede8e0/9a8878?text=couple-studio.jpg",
  brideGroom:    "https://placehold.co/800x1000/ede8e0/9a8878?text=bride-groom.jpg",
  veilBride:     "https://placehold.co/800x1000/ede8e0/9a8878?text=veil-bride.jpg",
  groomSuit:     "https://placehold.co/800x1000/ede8e0/9a8878?text=groom-suit.jpg",
  preparation:   "https://placehold.co/800x1000/ede8e0/9a8878?text=preparation.jpg",
  centerpiece:   "https://placehold.co/800x1000/ede8e0/9a8878?text=centerpiece.jpg",
  dressDetail:   "https://placehold.co/800x1000/ede8e0/9a8878?text=dress-detail.jpg",
  cake:          "https://placehold.co/800x1000/ede8e0/9a8878?text=wedding-cake.jpg",
  polaroid:      "https://placehold.co/800x1000/ede8e0/9a8878?text=polaroid.jpg",
  bouquet:       "https://placehold.co/800x1000/ede8e0/9a8878?text=bouquet.jpg",
  ring:          "https://placehold.co/800x800/ede8e0/9a8878?text=ring.jpg",

  // ── Landscape events (3:2 ratio — 1200×800) ───────────────────────────────
  ceremony:      "https://placehold.co/1200x800/dbd4cc/7a6e66?text=ceremony.jpg",
  reception:     "https://placehold.co/1200x800/dbd4cc/7a6e66?text=reception.jpg",
  gardenCouple:  "https://placehold.co/1200x800/dbd4cc/7a6e66?text=garden-couple.jpg",
  firstDance:    "https://placehold.co/1200x800/dbd4cc/7a6e66?text=first-dance.jpg",
  holdingHands:  "https://placehold.co/1200x800/dbd4cc/7a6e66?text=holding-hands.jpg",
  embrace:       "https://placehold.co/1200x800/dbd4cc/7a6e66?text=embrace.jpg",
  photoBooth:    "https://placehold.co/1200x800/dbd4cc/7a6e66?text=photo-booth.jpg",
  guests:        "https://placehold.co/1200x800/dbd4cc/7a6e66?text=wedding-guests.jpg",
  toast:         "https://placehold.co/1200x800/dbd4cc/7a6e66?text=champagne-toast.jpg",
  bridesmaids:   "https://placehold.co/1200x800/dbd4cc/7a6e66?text=bridesmaids.jpg",
  invitation:    "https://placehold.co/1200x800/dbd4cc/7a6e66?text=invitation.jpg",

  // ── Wide / hero (16:9 ratio — 1920×1080) ──────────────────────────────────
  venueHall:     "https://placehold.co/1920x1080/1b355e/c8b89a?text=venue-hall.jpg",
  sunset:        "https://placehold.co/1920x1080/1b355e/c8b89a?text=sunset-couple.jpg",
} as const;

/**
 * Width variant — kept for backward-compatibility.
 * Placehold.co bakes dimensions into the URL, so the width param is ignored here.
 * When switching to real CDN images, restore the original w() implementation.
 */
const w = (url: string, _width?: number): string => url;

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
      "/images/hero/hero-1.jpg",  // → /images/hero/hero-1.jpg
      "/images/hero/hero-2.jpg",  // → /images/hero/hero-2.jpg
      "/images/hero/hero-3.jpg",  // → /images/hero/hero-3.jpg
    ],
  },

  /**
   * PORTFOLIO SECTION — landing page preview cards
   * ─────────────────────────────────────────────
   * Replace with: /images/portfolio/mini-studio-preview.jpg  (800×1000 — 4:5)
   */
  portfolio: {
    miniStudio: "/images/portfolio/mini-studio-preview.jpg", // → /images/portfolio/mini-studio-preview.jpg
    scanBarcode: "/images/portfolio/scan-barcode-preview.jpg", // → /images/portfolio/scan-barcode-preview.jpg
  },

  /**
   * ADD-ONS SECTION — feature image card
   * ──────────────────────────────────────
   * Replace with: /images/addons/mini-studio.jpg  (1200×800 — 3:2 landscape)
   */
  addOns: {
    miniStudio: "/images/addons/mini-studio.jpg", // → /images/addons/mini-studio.jpg
    scanBarcode: "/images/addons/scan-barcode.jpg", // → /images/addons/scan-barcode.jpg
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
    // ADD THIS:
    templates: {
      navy: "/images/frame/temp-frame-1.png",
      white: "/images/frame/temp-frame-2.png",
      navyBanner: "/images/frame/temp-frame-3.png",
      whiteBanner: "/images/frame/temp-frame-4.png",
    },
    backgroundPreview: {
      darkGreen: "/images/background-preview/preview-dark-green.jpg",
      darkGrey: "/images/background-preview/preview-dark-grey.jpg",
      terracotta: "/images/background-preview/preview-terakota-red.jpg",
      lightGrey: "/images/background-preview/preview-light-grey.jpg",
    },
    backgroundOption: {
      lightGrey: "/images/background-option/Light-Grey-BG.jpg",
      darkGrey: "/images/background-option/Dark-Grey-BG.jpg",
      darkGreen: "/images/background-option/Dark-Green-BG.jpg",
      terracotta: "/images/background-option/terakota-red-BG.jpg",
    },
  },
  /**
   * PHOTO SCAN BARCODE STORY SECTION
   * ──────────────────────────────────
   * introBg         → /images/scan-barcode/intro-bg.jpg   (1920×1080)
   * placeholderPhotos → /images/scan-barcode/photo-N.jpg  (1200×800 — 3:2 landscape)
   *
   * placeholderPhotos cycle behind the frame overlay cards in the carousel.
   * Replace with actual client photos in the same aspect ratio.
   */
  scanBarcode: {
    introBg: "/images/scan-barcode/intro-bg.jpg",
    // → /images/scan-barcode/intro-bg.jpg

    placeholderPhotos: [
      "/images/scan-barcode/photo-1.jpg",
      "/images/scan-barcode/photo-2.jpg",
      "/images/scan-barcode/photo-3.jpg",
      "/images/scan-barcode/photo-4.jpg",
      "/images/scan-barcode/photo-5.jpg",
      "/images/scan-barcode/photo-6.jpg",
      // → /images/scan-barcode/photo-1.jpg … photo-6.jpg
    ] as string[],
  },

  /**
   * CTA SECTION — full-width background
   * ─────────────────────────────────────
   * Replace with: /images/cta/cta-background.jpg  (1920×1080 — 16:9)
   */
  cta: {
    background: "/images/cta/cta-background.jpg", // → /images/cta/cta-background.jpg
  },

  /**
   * MODAL — check availability banner image
   * ─────────────────────────────────────────
   * Replace with: /images/modal/couple-moment.jpg  (800×533 — 3:2 landscape)
   */
  modal: {
    checkAvailability: "/images/modal/couple-moment.jpg", // → /images/modal/couple-moment.jpg
  },

  /**
   * CONTACT PAGE
   * ─────────────
   * Replace with: /images/contact/studio-map.jpg  (800×600 — 4:3)
   * Or embed a real map iframe — no image needed in that case.
   */
  contact: {
    mapPlaceholder: "/images/contact/studio-map.jpg",
    // → /images/contact/studio-map.jpg
    maps: {
      studio: {
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.9369721210146!2d110.77706397529236!3d-7.581839992432593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15d57ae0dfc3%3A0x8a8bdd21653e75ee!2sFaralljibrill%20Photography%20(Official)!5e0!3m2!1sid!2sid!4v1774454611749!5m2!1sid!2sid" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        width: 600,
        height: 450,
      },
    },
  },

  /**
   * ════════════════════════════════════════════════════════════
   * PORTFOLIO GALLERY
   * ════════════════════════════════════════════════════════════
   * Organized by category › client › cover + images array.
   *
   * Covers:  4:5 portrait  (800×1000)
   * Images:  mixed aspect ratios for a natural masonry grid
   *
   * Replace paths:
   *   cover  → /images/portfolio-gallery/mini-studio/client-01/cover.jpg
   *   img-NN → /images/portfolio-gallery/mini-studio/client-01/img-NN.jpg
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
} as const};

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
