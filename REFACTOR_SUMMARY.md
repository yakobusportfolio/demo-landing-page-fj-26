# Refactor Summary — Faralljibrill Photography

This file is a running changelog of all image system and structural refactors applied to the project.

---

## v2.1 — Full Image Centralization (March 18, 2026)

### Goal
Complete the image centralization started in v2.0 by removing the last two groups of hardcoded image URLs still present in component files.

### Files Modified

| File | Change |
|------|--------|
| `/src/app/constants/images.ts` | Added `IMAGES.scanBarcode` section; added `IMAGES.contact` section; updated placeholder colors; added new TypeScript type exports |
| `/src/app/sections/PhotoScanBarcodeStorySection.tsx` | Removed `PLACEHOLDER_PHOTOS` array (6 hardcoded Unsplash URLs); replaced with `IMAGES.scanBarcode.placeholderPhotos`; replaced hardcoded intro background URL with `IMAGES.scanBarcode.introBg`; added `IMAGES` import |
| `/src/app/pages/ContactPage.tsx` | Removed hardcoded `placehold.co` map URL; replaced with `IMAGES.contact.mapPlaceholder`; added `IMAGES` import |

### New Registry Entries

```typescript
// Added to IMAGES in images.ts:

scanBarcode: {
  introBg: "https://placehold.co/1920x1080/...",       // intro slide background
  placeholderPhotos: [                                   // 6 photos behind frame overlays
    "https://placehold.co/1200x800/...",
    // × 6 total
  ],
},

contact: {
  mapPlaceholder: "https://placehold.co/800x600/...",   // contact page map card
},
```

### New TypeScript Exports

```typescript
export type ScanBarcodeImage = keyof typeof IMAGES.scanBarcode;
export type ContactImage     = keyof typeof IMAGES.contact;
```

### Verification

```bash
grep -rn "unsplash.com\|placehold.co" src/
# → 0 matches — no raw URLs remain in any component file
```

### Result
- **0 hardcoded image URLs** remain in any `.tsx` component file
- All image sources live exclusively in `/src/app/constants/images.ts`

---

## v2.0 — Centralized Image Management System (March 17, 2026)

### Goal
Replace all scattered Unsplash external URLs with a centralized, placeholder-based system that is easy to swap for real photography.

### Before

```
❌ Images hardcoded as Unsplash URLs directly in components
❌ No single source of truth
❌ External API dependency (Unsplash)
❌ Difficult to track which images are used where
❌ No type safety on image paths
```

### After

```
✅ Single source of truth: /src/app/constants/images.ts
✅ All Unsplash URLs replaced with placehold.co neutral placeholders
✅ Organized folder structure documented in /public/images/
✅ Zero hardcoded paths in component files
✅ TypeScript as const with full type exports
✅ Comprehensive inline documentation in images.ts
```

### Files Modified

| File | Change |
|------|--------|
| `/src/app/constants/images.ts` | Complete rewrite: replaced 23 Unsplash `U` entries with placehold.co; made `w()` a no-op; added portfolio gallery (16 clients); added modal section |
| `/src/app/sections/HeroSection.tsx` | Updated to use `IMAGES.hero.slides[]` |
| `/src/app/sections/PortfolioSection.tsx` | Updated to use `IMAGES.portfolio.*` |
| `/src/app/sections/AddOnsSection.tsx` | Updated to use `IMAGES.addOns.miniStudio` |
| `/src/app/sections/CTASection.tsx` | Updated to use `IMAGES.cta.background` |
| `/src/app/components/CheckAvailabilityModal.tsx` | Updated to use `IMAGES.modal.checkAvailability` |
| `/src/app/pages/PortfolioPage.tsx` | Uses `clientsData` → references `IMAGES.portfolioGallery.*` |
| `/src/app/constants/portfolio-data.ts` | Created: maps 16 clients to `IMAGES.portfolioGallery.*` entries |

### Files Created

| File | Purpose |
|------|---------|
| `/src/app/constants/images.ts` | Main image registry |
| `/src/app/constants/portfolio-data.ts` | Portfolio client data (names, venues, image references) |
| `/src/app/utils/imageValidator.ts` | Dev-mode path validation helpers |
| `/public/images/README.md` | Quick folder reference |
| `/IMAGE_MANAGEMENT_GUIDE.md` | Full image system documentation |
| `/IMAGE_REPLACEMENT_CHECKLIST.md` | Step-by-step replacement checklist |
| `/QUICK_REFERENCE.md` | One-page developer cheat sheet |
| `/REFACTOR_SUMMARY.md` | This file |

### Image Registry Structure (v2.0)

```
IMAGES
├── hero.main                          (legacy slot)
├── hero.slides[]                      3 images
├── portfolio.miniStudio
├── portfolio.scanBarcode
├── addOns.miniStudio
├── addOns.scanBarcode
├── addOns.frames.frame1–4.images[]    4 × 4 = 16 images
├── cta.background
├── modal.checkAvailability
└── portfolioGallery
    ├── miniStudio.client01–08         8 covers + ~109 gallery images
    └── scanBarcode.client01–08        8 covers + ~109 gallery images
```

### Statistics

| Metric | Value |
|--------|-------|
| Total image slots | ~242 |
| Hardcoded URLs in components | 0 |
| External image dependencies | 0 |
| placehold.co placeholders | ~242 |
| Portfolio clients | 16 (8 mini-studio + 8 scan-barcode) |

---

## v1.0 — Initial Build (Pre-March 2026)

### State
- All images sourced directly from Unsplash as hardcoded URLs in component files
- No central management, no documentation, no type safety
- External dependency on Unsplash API availability
- Replacing any image required searching multiple component files

---

## Current System Status

| Concern | Status |
|---------|--------|
| Hardcoded URLs in components | ✅ Zero |
| Central image registry | ✅ `/src/app/constants/images.ts` |
| Placeholder system | ✅ `placehold.co` with brand colors |
| TypeScript type safety | ✅ Full `as const` with type exports |
| Documentation | ✅ Complete |
| Portfolio gallery | ✅ 16 clients, ~210 gallery images |
| Figma design assets | ✅ Kept as `figma:asset/` imports (out of scope for `images.ts`) |
| Ready for real photos | ✅ Replace URLs in `images.ts` only |

---

**Maintained by:** Development Team
**Project:** Faralljibrill Photography Landing Page
