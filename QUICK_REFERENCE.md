# Quick Reference — Image Management
## Faralljibrill Photography

**Last Updated:** March 18, 2026

---

## The Golden Rule

```tsx
// NEVER in a component file:
<img src="https://example.com/image.jpg" />
<img src="/images/hero/hero-1.jpg" />

// ALWAYS:
import { IMAGES } from "../constants/images";
<img src={IMAGES.hero.slides[0]} />
```

---

## All Image Categories

```typescript
// Open /src/app/constants/images.ts to edit any of these:

IMAGES.hero.slides[0–2]                    // Hero slideshow backgrounds
IMAGES.portfolio.miniStudio                // Portfolio section preview card
IMAGES.portfolio.scanBarcode               // Portfolio section preview card
IMAGES.addOns.miniStudio                   // Add-Ons section feature image
IMAGES.addOns.frames.frame1.images[0–3]   // Frame carousel photos (×4 frames)
IMAGES.addOns.frames.frame2.images[0–3]
IMAGES.addOns.frames.frame3.images[0–3]
IMAGES.addOns.frames.frame4.images[0–3]
IMAGES.scanBarcode.introBg                 // Scan Barcode intro background
IMAGES.scanBarcode.placeholderPhotos[0–5] // Photos cycling behind frame overlays
IMAGES.cta.background                      // CTA section background
IMAGES.modal.checkAvailability             // Modal form banner image
IMAGES.contact.mapPlaceholder              // Contact page map card
IMAGES.portfolioGallery.miniStudio.client01–08.cover
IMAGES.portfolioGallery.miniStudio.client01–08.images[]
IMAGES.portfolioGallery.scanBarcode.client01–08.cover
IMAGES.portfolioGallery.scanBarcode.client01–08.images[]
```

---

## Image Size Cheat Sheet

| Section | Key | Size | Ratio |
|---------|-----|------|-------|
| Hero slides | `hero.slides[]` | 1920×1080 | 16:9 |
| Portfolio cards | `portfolio.*` | 800×1000 | 4:5 |
| Add-on feature | `addOns.miniStudio` | 1200×800 | 3:2 |
| Frame photos | `addOns.frames.*.images[]` | 1200×800 | 3:2 |
| Scan Barcode intro | `scanBarcode.introBg` | 1920×1080 | 16:9 |
| Scan Barcode frame photos | `scanBarcode.placeholderPhotos[]` | 1200×800 | 3:2 |
| CTA background | `cta.background` | 1920×1080 | 16:9 |
| Modal banner | `modal.checkAvailability` | 800×533 | 3:2 |
| Contact map | `contact.mapPlaceholder` | 800×600 | 4:3 |
| Portfolio covers | `portfolioGallery.*.clientXX.cover` | 800×1000 | 4:5 |
| Portfolio gallery | `portfolioGallery.*.clientXX.images[]` | Mixed | Various |

---

## Common Tasks

### Replace a placeholder with a real image

```typescript
// 1. Add file: /public/images/hero/hero-1.jpg

// 2. Open /src/app/constants/images.ts — find the key and update:
slides: [
  "/images/hero/hero-1.jpg",   // ← was placehold.co URL
  ...
],

// 3. Done — no component files need touching
```

### Add a new section with images

```typescript
// In /src/app/constants/images.ts:
export const IMAGES = {
  // ... existing
  newSection: {
    image1: "/images/new-section/image-1.jpg",
  },
} as const;

// In your component:
import { IMAGES } from "../constants/images";
<img src={IMAGES.newSection.image1} alt="..." loading="lazy" />
```

### Add a new portfolio client

```typescript
// In /src/app/constants/images.ts → portfolioGallery.miniStudio:
client09: {
  cover:  "/images/portfolio-gallery/mini-studio/client-09/cover.jpg",
  images: [
    "/images/portfolio-gallery/mini-studio/client-09/img-01.jpg",
    // ... more images
  ],
},

// In /src/app/constants/portfolio-data.ts:
{
  id: "ms-09",
  name: "Name & Name",
  venue: "Venue Name",
  category: "mini-studio",
  coverImage: IMAGES.portfolioGallery.miniStudio.client09.cover,
  images: IMAGES.portfolioGallery.miniStudio.client09.images,
},
```

---

## File Locations

| Task | File |
|------|------|
| Edit any image URL | `/src/app/constants/images.ts` |
| Edit portfolio clients | `/src/app/constants/portfolio-data.ts` |
| Store real image files | `/public/images/[category]/` |
| Full guide | `/IMAGE_MANAGEMENT_GUIDE.md` |
| Replacement checklist | `/IMAGE_REPLACEMENT_CHECKLIST.md` |

---

## Pre-Commit Checklist

- [ ] No raw URLs in `.tsx` files
- [ ] New images registered in `images.ts`
- [ ] Files in `/public/images/[category]/`
- [ ] Filenames: lowercase, hyphens, no spaces
- [ ] `loading="lazy"` on non-hero images
- [ ] Images under 300 KB each

---

## What NOT to touch via `images.ts`

These are **Figma design assets** — they live as `figma:asset/` imports and are managed through Figma, not `images.ts`:

- Frame overlays in `PhotoScanBarcodeStorySection.tsx` (navy/white frame + banner templates)
- Studio background options in `AddOnsSection.tsx` (light grey, dark grey, dark green, terracotta)
- Studio preview images in `AddOnsSection.tsx` lightbox

---

## Debugging

| Symptom | Check |
|---------|-------|
| Image not showing | Path in `images.ts` matches actual filename? |
| 404 in console | File exists in `/public/images/`? Path starts with `/images/`? |
| Placeholder still showing | Has the placehold.co URL been replaced in `images.ts`? |
| TypeScript error | Correct key name? Use IDE autocomplete on `IMAGES.` |

---

**Full documentation:** `/IMAGE_MANAGEMENT_GUIDE.md`
