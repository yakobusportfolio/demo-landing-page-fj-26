# Project Structure — Faralljibrill Photography

**Last Updated:** March 18, 2026
A wedding photography landing page built with React, TypeScript, Tailwind CSS v4, React Router, and Motion.

---

## Quick Start

```bash
npm install
npm run dev
```

### Replace Images
1. Add photos to `/public/images/[category]/`
2. Update URLs in `/src/app/constants/images.ts`
3. Done — all components update automatically

---

## Folder Structure

```
faralljibrill-photography/
│
├── public/
│   └── images/                          ← Drop real photos here
│       ├── hero/                        (1920×1080 — 16:9)
│       ├── portfolio/                   (800×1000 — 4:5)
│       ├── addons/                      (1200×800 — 3:2)
│       ├── scan-barcode/                (see IMAGE_MANAGEMENT_GUIDE.md)
│       ├── cta/                         (1920×1080 — 16:9)
│       ├── modal/                       (800×533 — 3:2)
│       ├── contact/                     (800×600 — 4:3)
│       ├── portfolio-gallery/
│       │   ├── mini-studio/
│       │   │   ├── client-01/ … client-08/
│       │   └── scan-barcode/
│       │       ├── client-01/ … client-08/
│       └── README.md
│
├── src/
│   ├── app/
│   │   │
│   │   ├── constants/                   ← Configuration & data
│   │   │   ├── images.ts                ← SINGLE SOURCE OF TRUTH for all images
│   │   │   └── portfolio-data.ts        ← Client names, venues, image references
│   │   │
│   │   ├── hooks/
│   │   │   └── useCheckAvailabilityModal.ts   ← Open/close state for booking modal
│   │   │
│   │   ├── sections/                    ← Home page sections (used in Home.tsx)
│   │   │   ├── HeroSection.tsx          ← Slideshow + CTAs
│   │   │   ├── BenefitsSection.tsx      ← Three-column benefits grid
│   │   │   ├── AddOnsSection.tsx        ← Mini Studio service showcase
│   │   │   ├── PhotoScanBarcodeStorySection.tsx  ← Horizontal scroll storytelling
│   │   │   ├── PortfolioSection.tsx     ← Two-card portfolio preview
│   │   │   ├── TestimonialsSection.tsx  ← Client testimonials
│   │   │   └── CTASection.tsx           ← Final call-to-action
│   │   │
│   │   ├── pages/                       ← Full-page route components
│   │   │   ├── Home.tsx                 ← Assembles all sections
│   │   │   ├── PortfolioPage.tsx        ← Masonry gallery with filtering + lightbox
│   │   │   ├── ContactPage.tsx          ← Check availability + studio info
│   │   │   └── AdminPage.tsx            ← Submission viewer (localStorage)
│   │   │
│   │   ├── components/                  ← Shared / reusable components
│   │   │   ├── Navbar.tsx               ← Transparent → floating hamburger
│   │   │   ├── Footer.tsx               ← Links + social icons
│   │   │   ├── CheckAvailabilityModal.tsx  ← Booking inquiry modal form
│   │   │   ├── CheckAvailabilityForm.tsx
│   │   │   ├── RootLayout.tsx           ← Wraps all routes (Navbar + Footer)
│   │   │   ├── AdminSubmissions.tsx
│   │   │   ├── PhotoSlider.tsx
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx   ← Protected — do not modify
│   │   │   └── ui/                      ← Shadcn component library
│   │   │       ├── button.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       └── ... (accordion, dialog, select, etc.)
│   │   │
│   │   ├── utils/
│   │   │   └── imageValidator.ts        ← Dev-mode image path helpers
│   │   │
│   │   ├── routes.tsx                   ← React Router configuration
│   │   └── App.tsx                      ← RouterProvider entry point
│   │
│   ├── imports/                         ← Figma exports (read-only)
│   │   └── pasted_text/
│   │
│   └── styles/
│       ├── index.css                    ← CSS entry point
│       ├── tailwind.css                 ← Tailwind directives
│       ├── theme.css                    ← Brand CSS variables
│       └── fonts.css                   ← Google Font imports
│
├── IMAGE_MANAGEMENT_GUIDE.md            ← Full image system documentation
├── IMAGE_REPLACEMENT_CHECKLIST.md       ← Checklist for swapping placeholders
├── REFACTOR_SUMMARY.md                  ← Changelog of all refactors
├── QUICK_REFERENCE.md                   ← One-page developer cheat sheet
├── PROJECT_STRUCTURE.md                 ← This file
├── MODAL_COMPONENT_GUIDE.md
├── package.json
└── vite.config.ts
```

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page — all sections in order |
| `/portfolio` | `PortfolioPage` | Client gallery with category filter + lightbox |
| `/portfolio?category=mini-studio` | `PortfolioPage` | Filtered to Mini Studio clients |
| `/portfolio?category=scan-barcode` | `PortfolioPage` | Filtered to Scan Barcode clients |
| `/contact` | `ContactPage` | Availability form + studio info |
| `/admin` | `AdminPage` | Admin panel (localStorage submissions) |

---

## Image Management System

All images are controlled from one file:

```
/src/app/constants/images.ts
```

### IMAGES Object Structure

```typescript
IMAGES.hero.slides[]                       // 3 hero slideshow backgrounds
IMAGES.portfolio.miniStudio                // portfolio section card image
IMAGES.portfolio.scanBarcode               // portfolio section card image
IMAGES.addOns.miniStudio                   // add-ons feature image
IMAGES.addOns.frames.frame1–4.images[]    // frame carousel photos
IMAGES.scanBarcode.introBg                 // scan barcode section intro bg
IMAGES.scanBarcode.placeholderPhotos[]     // 6 photos behind frame overlays
IMAGES.cta.background                      // CTA section background
IMAGES.modal.checkAvailability             // modal form banner image
IMAGES.contact.mapPlaceholder             // contact page map
IMAGES.portfolioGallery.miniStudio.client01–08    // 8 clients × cover + images
IMAGES.portfolioGallery.scanBarcode.client01–08   // 8 clients × cover + images
```

### Figma Design Assets (NOT in `images.ts`)

Some images are Figma exports embedded via `figma:asset/` imports. These are design system elements, not content photos, and are managed separately through Figma:

- Frame overlay templates (`navyFrameTemplate`, `whiteFrameTemplate`, `navyBannerTemplate`, `whiteBannerTemplate`) — used in `PhotoScanBarcodeStorySection`
- Studio background options (`bgLightGrey`, `bgDarkGrey`, `bgDarkGreen`, `bgTerracotta`) — used in `AddOnsSection`
- Studio preview images (`previewLightGrey`, etc.) — used in `AddOnsSection` lightbox

---

## Design System

### Color Palette

```css
--primary:    #041e48   /* Navy — headings, buttons, nav background */
--secondary:  #1b355e   /* Light navy — secondary elements */
--accent:     #70161e   /* Deep red — CTA highlights, form accents */
```

### Typography

- **Headings:** Serif font — elegant, wedding-appropriate
- **Body:** Sans-serif — clean, readable

### UI Patterns

- **Glassmorphism:** `backdrop-blur` + `bg-white/10` overlays on dark backgrounds
- **Cards:** `rounded-2xl` with `shadow-lg`
- **Buttons:** Pill shape (`rounded-full`), primary navy or white ghost variants

---

## Key Features

### Navigation
- Transparent navbar at top → hides on scroll → floating hamburger button appears
- Full-screen overlay mobile menu
- `ScrollToTop` component resets position on every route change

### Photo Scan Barcode Story Section
- Desktop: Horizontal scroll driven by vertical scrolling (5 sticky panels)
- Mobile: Swipeable slide carousel with `AnimatePresence`
- Frame overlay carousel — photos cycle behind Figma frame templates

### Portfolio Page
- Masonry grid layout (`react-responsive-masonry`)
- Category filter via URL query param (`?category=mini-studio`)
- Client drill-down: click a cover to open gallery
- Mobile: horizontal scroll strip; Desktop: masonry grid
- Lightbox with keyboard and swipe navigation

### Check Availability Modal
- Bottom sheet on mobile, centered modal on desktop
- `react-hook-form` validation
- Submission saved to `localStorage` (ready for Supabase/Formspree)
- Success confirmation modal after submit

### Admin Page
- Reads `localStorage` submissions
- Filter / status management for booking inquiries

---

## Dependencies

### Core
| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI library |
| `typescript` | Type safety |
| `vite` | Build tool |
| `react-router` | Routing (Data Mode) |

### UI & Styling
| Package | Purpose |
|---------|---------|
| `tailwindcss` v4 | Utility CSS |
| `motion` | Animations (`motion/react`) |
| `lucide-react` | Icon library |

### Forms & UX
| Package | Purpose |
|---------|---------|
| `react-hook-form@7.55.0` | Form management |
| `sonner` | Toast notifications |
| `react-responsive-masonry` | Masonry grid |

---

## Development Workflows

### Add a New Section
```tsx
// 1. Create: /src/app/sections/NewSection.tsx
export function NewSection() {
  return <section id="new-section">...</section>;
}

// 2. Register images: /src/app/constants/images.ts
newSection: { image1: "/images/new-section/image-1.jpg" }

// 3. Import in Home.tsx
import { NewSection } from "../sections/NewSection";
```

### Add a New Route
```tsx
// /src/app/routes.tsx
{ path: "new-page", Component: NewPage }
```

### Modify Global Styles
- **Theme tokens** → `/src/styles/theme.css`
- **Component styles** → Tailwind classes inline in components
- **Fonts** → `/src/styles/fonts.css` (imports only at top)

---

## Next Steps to Production

1. **Replace placeholder images** — see `/IMAGE_REPLACEMENT_CHECKLIST.md`
2. **Update contact info** — WhatsApp numbers, email, Instagram handle, studio address
3. **Connect form backend** — Supabase or Formspree to replace localStorage
4. **SEO** — Add `<meta>` tags, Open Graph, sitemap, robots.txt
5. **Performance** — Convert images to WebP, enable CDN caching

---

**Built for Faralljibrill Photography**
