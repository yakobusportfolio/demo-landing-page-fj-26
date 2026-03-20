# Image Management Guide — Faralljibrill Photography

**Last Updated:** March 18, 2026
**Project:** Faralljibrill Photography Landing Page
**Single Source of Truth:** `/src/app/constants/images.ts`

---

## Overview

All images in this project flow through one file. No component ever holds a raw URL — every `<img src>` references the `IMAGES` constant. This means you can swap any image by editing a single line in `images.ts` and every section that uses it updates automatically.

---

## The Golden Rule

```tsx
// NEVER do this in a component:
<img src="https://example.com/photo.jpg" />
<img src="/images/hero/hero-1.jpg" />

// ALWAYS do this:
import { IMAGES } from "../constants/images";
<img src={IMAGES.hero.slides[0]} />
```

---

## File & Folder Structure

```
/public/
└── images/                          ← Drop real photos here
    ├── hero/                        (1920×1080 — 16:9 landscape)
    │   ├── hero-1.jpg
    │   ├── hero-2.jpg
    │   └── hero-3.jpg
    ├── portfolio/                   (800×1000 — 4:5 portrait)
    │   ├── mini-studio-preview.jpg
    │   └── scan-barcode-preview.jpg
    ├── addons/                      (1200×800 — 3:2 landscape)
    │   └── mini-studio.jpg
    ├── scan-barcode/                (see specs below)
    │   ├── intro-bg.jpg             (1920×1080 — 16:9)
    │   ├── photo-1.jpg              (1200×800 — 3:2)
    │   ├── photo-2.jpg
    │   ├── photo-3.jpg
    │   ├── photo-4.jpg
    │   ├── photo-5.jpg
    │   └── photo-6.jpg
    ├── cta/                         (1920×1080 — 16:9 landscape)
    │   └── cta-background.jpg
    ├── modal/                       (800×533 — 3:2 landscape)
    │   └── couple-moment.jpg
    ├── contact/                     (800×600 — 4:3 landscape)
    │   └── studio-map.jpg
    └── portfolio-gallery/
        ├── mini-studio/
        │   ├── client-01/           cover.jpg + img-01.jpg … img-12.jpg
        │   ├── client-02/           cover.jpg + img-01.jpg … img-14.jpg
        │   ├── client-03/           cover.jpg + img-01.jpg … img-13.jpg
        │   ├── client-04/           cover.jpg + img-01.jpg … img-15.jpg
        │   ├── client-05/           cover.jpg + img-01.jpg … img-12.jpg
        │   ├── client-06/           cover.jpg + img-01.jpg … img-16.jpg
        │   ├── client-07/           cover.jpg + img-01.jpg … img-13.jpg
        │   └── client-08/           cover.jpg + img-01.jpg … img-14.jpg
        └── scan-barcode/
            ├── client-01/ … client-08/   (same structure as mini-studio)

/src/app/constants/
└── images.ts                        ← EDIT THIS to swap any image
```

---

## Image Specifications

| Section | Key | Size | Ratio | Format |
|---------|-----|------|-------|--------|
| Hero slides | `IMAGES.hero.slides[]` | 1920×1080 | 16:9 | JPG/WebP |
| Portfolio preview cards | `IMAGES.portfolio.*` | 800×1000 | 4:5 | JPG/WebP |
| Add-on feature image | `IMAGES.addOns.miniStudio` | 1200×800 | 3:2 | JPG/WebP |
| Scan Barcode intro bg | `IMAGES.scanBarcode.introBg` | 1920×1080 | 16:9 | JPG/WebP |
| Scan Barcode frame photos | `IMAGES.scanBarcode.placeholderPhotos[]` | 1200×800 | 3:2 | JPG/WebP |
| CTA background | `IMAGES.cta.background` | 1920×1080 | 16:9 | JPG/WebP |
| Modal banner | `IMAGES.modal.checkAvailability` | 800×533 | 3:2 | JPG/WebP |
| Contact map | `IMAGES.contact.mapPlaceholder` | 800×600 | 4:3 | JPG/WebP |
| Portfolio covers | `IMAGES.portfolioGallery.*.clientXX.cover` | 800×1000 | 4:5 | JPG/WebP |
| Portfolio gallery | `IMAGES.portfolioGallery.*.clientXX.images[]` | Mixed | Various | JPG/WebP |

---

## Complete Image Registry (`images.ts`)

### Structure at a Glance

```typescript
export const IMAGES = {
  hero: {
    main:   "...",         // unused legacy slot — keep for compatibility
    slides: ["...", "...", "..."],   // 3 hero slideshow images
  },

  portfolio: {
    miniStudio:  "...",    // landing page preview card
    scanBarcode: "...",    // landing page preview card
  },

  addOns: {
    miniStudio:  "...",    // Add-Ons section feature image
    scanBarcode: "...",    // (reserved — currently displays via figma:asset)
    frames: {
      frame1: { name, description, images: ["...", ...] },   // 4 images
      frame2: { name, description, images: ["...", ...] },
      frame3: { name, description, images: ["...", ...] },
      frame4: { name, description, images: ["...", ...] },
    },
  },

  scanBarcode: {
    introBg:          "...",   // Full-screen intro background
    placeholderPhotos: ["...", "...", "...", "...", "...", "..."],   // 6 photos
  },

  cta: {
    background: "...",
  },

  modal: {
    checkAvailability: "...",
  },

  contact: {
    mapPlaceholder: "...",
  },

  portfolioGallery: {
    miniStudio: {
      client01: { cover: "...", images: ["...", ...] },   // 12 images
      client02: { cover: "...", images: ["...", ...] },   // 14 images
      // ... client03–client08
    },
    scanBarcode: {
      client01: { cover: "...", images: ["...", ...] },
      // ... client02–client08
    },
  },
} as const;
```

---

## Current Placeholder System

**Status:** All content images use `placehold.co` neutral placeholders.

### Placeholder Color Guide

| Type | Bg | Text | Example |
|------|-----|------|---------|
| Warm portrait (4:5) | `#ede8e0` | `#9a8878` | bride-groom.jpg |
| Neutral landscape (3:2) | `#dbd4cc` | `#7a6e66` | ceremony.jpg |
| Dark hero / venue (16:9) | `#1b355e` | `#c8b89a` | venue-hall.jpg |
| Dark map (4:3) | `#041e48` | `#c8b89a` | studio-map.jpg |

### What Are NOT Placeholders

The following are **actual design assets** imported via `figma:asset/` — do **not** replace them via `images.ts`. They are Figma export files embedded directly:

| File | Used In | Purpose |
|------|---------|---------|
| `navyFrameTemplate` | `PhotoScanBarcodeStorySection` | Frame overlay on photo carousel |
| `whiteFrameTemplate` | `PhotoScanBarcodeStorySection` | Frame overlay on photo carousel |
| `navyBannerTemplate` | `PhotoScanBarcodeStorySection` | Banner frame overlay |
| `whiteBannerTemplate` | `PhotoScanBarcodeStorySection` | Banner frame overlay |
| `bgLightGrey` | `AddOnsSection` | Studio background option |
| `bgDarkGrey` | `AddOnsSection` | Studio background option |
| `bgDarkGreen` | `AddOnsSection` | Studio background option |
| `bgTerracotta` | `AddOnsSection` | Studio background option |
| `previewLightGrey` | `AddOnsSection` | Lightbox preview |
| `previewDarkGrey` | `AddOnsSection` | Lightbox preview |
| `previewDarkGreen` | `AddOnsSection` | Lightbox preview |
| `previewTerracotta` | `AddOnsSection` | Lightbox preview |

These assets can only be updated by replacing the Figma source file and re-exporting.

---

## How to Replace a Placeholder

### Step 1 — Add the file
```bash
/public/images/hero/hero-1.jpg
```

### Step 2 — Update `images.ts`
```typescript
// Before (placeholder):
slides: [
  "https://placehold.co/1920x1080/1b355e/c8b89a?text=hero-1.jpg",
  ...
],

// After (real file):
slides: [
  "/images/hero/hero-1.jpg",
  ...
],
```

### Step 3 — Done
Every component that reads `IMAGES.hero.slides[0]` instantly picks up the new file.

---

## Image Inventory Summary

| Category | Key Path | Count | Current Status |
|----------|----------|-------|----------------|
| Hero slides | `IMAGES.hero.slides[]` | 3 | Placeholder |
| Portfolio previews | `IMAGES.portfolio.*` | 2 | Placeholder |
| Add-on feature | `IMAGES.addOns.miniStudio` | 1 | Placeholder |
| Add-on frame previews | `IMAGES.addOns.frames.frameN.images[]` | 16 | Placeholder |
| Scan Barcode intro | `IMAGES.scanBarcode.introBg` | 1 | Placeholder |
| Scan Barcode photos | `IMAGES.scanBarcode.placeholderPhotos[]` | 6 | Placeholder |
| CTA background | `IMAGES.cta.background` | 1 | Placeholder |
| Modal banner | `IMAGES.modal.checkAvailability` | 1 | Placeholder |
| Contact map | `IMAGES.contact.mapPlaceholder` | 1 | Placeholder |
| Portfolio covers (×16 clients) | `IMAGES.portfolioGallery.*.clientXX.cover` | 16 | Placeholder |
| Portfolio gallery (×16 clients) | `IMAGES.portfolioGallery.*.clientXX.images[]` | ~210 | Placeholder |
| **Total registered slots** | | **~258** | **All placeholders** |

---

## Adding a New Image Category

```typescript
// 1. Add to images.ts
export const IMAGES = {
  // ... existing
  team: {
    photographer1: "/images/team/photographer-1.jpg",
    photographer2: "/images/team/photographer-2.jpg",
  },
} as const;

// 2. Create folder
//    /public/images/team/photographer-1.jpg

// 3. Use in component
import { IMAGES } from "../constants/images";
<img src={IMAGES.team.photographer1} alt="Lead Photographer" />
```

---

## TypeScript Type Exports

```typescript
import type {
  ImageCategory,           // keyof IMAGES
  HeroImage,               // keyof IMAGES.hero
  PortfolioImage,          // keyof IMAGES.portfolio
  AddOnImage,              // keyof IMAGES.addOns
  ScanBarcodeImage,        // keyof IMAGES.scanBarcode  ← NEW
  CTAImage,                // keyof IMAGES.cta
  ContactImage,            // keyof IMAGES.contact      ← NEW
  PortfolioGalleryCategory // keyof IMAGES.portfolioGallery
} from "../constants/images";
```

---

## File Naming Convention

```bash
✅  hero-1.jpg
✅  mini-studio-preview.jpg
✅  scan-barcode-intro.jpg
✅  cover.jpg
✅  img-01.jpg

❌  Hero Background.jpg      (no spaces)
❌  IMG_1234.JPG             (uppercase extension)
❌  portfolio_cover.jpg      (use hyphens, not underscores)
❌  photo.png                (use JPG for photos)
```

**Pattern:** `[section]-[description]-[index].jpg`

---

## Optimization Checklist

Before adding any image:
- [ ] Compress to under 300 KB (use TinyPNG or Squoosh)
- [ ] Correct dimensions for the section (see spec table above)
- [ ] Filename is lowercase with hyphens
- [ ] Saved as JPG (or WebP for better compression)
- [ ] Registered in `images.ts` before using in a component

---

## Troubleshooting

### Image not showing
1. Is the file in `/public/images/[category]/`?
2. Is the path updated in `images.ts`?
3. Is `IMAGES` imported in the component?
4. Does the path start with `/images/` (not `/public/images/`)?

### Wrong path format
```typescript
❌  "/hero/image.jpg"          // missing /images/
❌  "images/hero/image.jpg"    // missing leading /
❌  "/public/images/hero/..."  // never include /public/

✅  "/images/hero/image.jpg"
```

### Placeholder still showing
You haven't replaced the URL yet. Open `images.ts`, find the relevant key, and change the value from `https://placehold.co/...` to your local path.

---

## Code Review Checklist

Before merging any PR:
- [ ] No raw URLs in `.tsx` component files
- [ ] New images registered in `images.ts`
- [ ] Files placed in correct `/public/images/[category]/` folder
- [ ] Naming convention followed
- [ ] `loading="lazy"` on non-hero images, `loading="eager"` on hero

---

## Changelog

### v2.1 — March 18, 2026
- Added `IMAGES.scanBarcode` section (`introBg` + `placeholderPhotos[6]`)
- Added `IMAGES.contact` section (`mapPlaceholder`)
- Removed hardcoded `PLACEHOLDER_PHOTOS` array from `PhotoScanBarcodeStorySection.tsx`
- Removed hardcoded map URL from `ContactPage.tsx`
- All component files now have zero raw image URLs
- Updated type exports with new categories `ScanBarcodeImage` and `ContactImage`
- Documented `figma:asset` design files as out-of-scope for `images.ts`

### v2.0 — March 17, 2026
- Replaced all Unsplash external URLs with `placehold.co` neutral placeholders
- Created centralized `IMAGES` constant as single source of truth
- Replaced Unsplash `U` lookup table with brand-colored placehold.co entries
- Added `w()` helper as no-op for backward compatibility
- Organized `portfolioGallery` with 16 clients (8 mini-studio + 8 scan-barcode)
- Added `IMAGES.modal.checkAvailability`
- Added `IMAGES.hero.slides[]` array for slideshow

### v1.0 — Previous
- Images hardcoded as Unsplash URLs directly in components
- No central management, no type safety
