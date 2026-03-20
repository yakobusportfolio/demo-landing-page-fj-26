# /public/images — Image Assets Directory

This folder holds all static images served by the website.
Every image here must be registered in `/src/app/constants/images.ts` to be used.

---

## Folder Structure

```
/public/images/
│
├── hero/                        ← Hero section slideshow backgrounds
│   ├── hero-1.jpg               (1920×1080 — 16:9)
│   ├── hero-2.jpg
│   └── hero-3.jpg
│
├── portfolio/                   ← Landing page portfolio preview cards
│   ├── mini-studio-preview.jpg  (800×1000 — 4:5)
│   └── scan-barcode-preview.jpg
│
├── addons/                      ← Add-Ons section images
│   ├── mini-studio.jpg          (1200×800 — 3:2)
│   └── frames/                  ← Frame carousel preview photos
│       ├── frame-1-photo-1.jpg  (1200×800 — 3:2)
│       └── ... (16 photos total across 4 frames)
│
├── scan-barcode/                ← Photo Scan Barcode story section
│   ├── intro-bg.jpg             (1920×1080 — 16:9)
│   ├── photo-1.jpg              (1200×800 — 3:2, behind frame overlays)
│   ├── photo-2.jpg
│   ├── photo-3.jpg
│   ├── photo-4.jpg
│   ├── photo-5.jpg
│   └── photo-6.jpg
│
├── cta/                         ← CTA section background
│   └── cta-background.jpg       (1920×1080 — 16:9)
│
├── modal/                       ← Check Availability modal banner
│   └── couple-moment.jpg        (800×533 — 3:2)
│
├── contact/                     ← Contact page map placeholder
│   └── studio-map.jpg           (800×600 — 4:3)
│
└── portfolio-gallery/           ← Full client galleries
    ├── mini-studio/
    │   ├── client-01/
    │   │   ├── cover.jpg        (800×1000 — 4:5 portrait)
    │   │   ├── img-01.jpg       (varied — masonry grid)
    │   │   ├── img-02.jpg
    │   │   └── ... (12 images)
    │   ├── client-02/ … client-08/
    └── scan-barcode/
        ├── client-01/ … client-08/
```

---

## Image Specifications

| Folder | Required Size | Ratio | Notes |
|--------|--------------|-------|-------|
| `hero/` | 1920×1080 | 16:9 | Critical path — loads eagerly |
| `portfolio/` | 800×1000 | 4:5 | Preview cards on landing page |
| `addons/` | 1200×800 | 3:2 | |
| `addons/frames/` | 1200×800 | 3:2 | Inside a `aspect-[3/2]` container |
| `scan-barcode/intro-bg.jpg` | 1920×1080 | 16:9 | Full-screen section background |
| `scan-barcode/photo-*.jpg` | 1200×800 | 3:2 | Behind frame overlay cards |
| `cta/` | 1920×1080 | 16:9 | Full-width background |
| `modal/` | 800×533 | 3:2 | Modal banner strip |
| `contact/` | 800×600 | 4:3 | Map card (or replace with embed) |
| `portfolio-gallery/*/cover.jpg` | 800×1000 | 4:5 | Client card cover |
| `portfolio-gallery/*/img-*.jpg` | Mixed | Various | Masonry — vary aspect ratios |

---

## How to Replace a Placeholder

**1. Drop your file here:**
```
/public/images/hero/hero-1.jpg
```

**2. Update the URL in the registry:**
```typescript
// /src/app/constants/images.ts
slides: [
  "/images/hero/hero-1.jpg",   // ← replace the placehold.co URL
  ...
],
```

**3. Done.** No component files need to change.

---

## File Naming Rules

```
✅  hero-1.jpg
✅  cover.jpg
✅  img-01.jpg
✅  cta-background.jpg

❌  Hero 1.jpg           (no spaces)
❌  IMG_1234.JPG         (uppercase extension, not descriptive)
❌  portfolioCover.jpg   (use hyphens, not camelCase)
❌  photo.png            (use JPG for photos; PNG only for logos/graphics)
```

---

## Compression Requirements

- Target **under 300 KB** per image
- Use **TinyPNG** (https://tinypng.com) or **Squoosh** (https://squoosh.app)
- JPG quality 80–85% is ideal for photos
- Consider **WebP** for 25–35% smaller files

---

## Important Notes

- **Never** hardcode paths directly in React component files
- **Always** register new images in `/src/app/constants/images.ts` first
- The `figma:asset/` design files (frame overlays, studio backgrounds) are **not** stored here — they are embedded Figma exports managed separately

---

**Full Documentation:** `/IMAGE_MANAGEMENT_GUIDE.md`
**Replacement Checklist:** `/IMAGE_REPLACEMENT_CHECKLIST.md`
