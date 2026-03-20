# Image Replacement Checklist — Faralljibrill Photography

Use this checklist when replacing placeholder images with actual wedding photography.

**Last Updated:** March 18, 2026
**Registry File:** `/src/app/constants/images.ts`
**Images Folder:** `/public/images/`

---

## Progress Tracker

**Total Image Slots:** ~258
**Replaced:** `___` / ~258
**Percentage:** `___%`
**Started:** ____________
**Completed:** ____________

---

## Replacement Workflow (Do This First)

```
1. Gather & organize all wedding photos by section
2. Resize / compress each image (target < 300 KB per file)
3. Rename files following convention: kebab-case, no spaces
4. Copy files into /public/images/[category]/
5. Open /src/app/constants/images.ts
6. Replace each placehold.co URL with the local path
7. Run dev server and verify each section visually
8. Test on mobile, tablet, and desktop
```

---

## Section 1 — Hero Slides (3 images)

> Size: **1920×1080px** | Ratio: **16:9** | Folder: `/public/images/hero/`

- [ ] `IMAGES.hero.slides[0]` — `hero-1.jpg`
  - Used on: Hero slideshow slide 1 ("Luxury Wedding Photography")
- [ ] `IMAGES.hero.slides[1]` — `hero-2.jpg`
  - Used on: Hero slideshow slide 2 ("Mini Studio Portrait Add-on")
- [ ] `IMAGES.hero.slides[2]` — `hero-3.jpg`
  - Used on: Hero slideshow slide 3 ("Interactive Scan Barcode Experience")

---

## Section 2 — Portfolio Preview Cards (2 images)

> Size: **800×1000px** | Ratio: **4:5** | Folder: `/public/images/portfolio/`

- [ ] `IMAGES.portfolio.miniStudio` — `mini-studio-preview.jpg`
  - Used on: Portfolio section card (links to mini-studio gallery)
- [ ] `IMAGES.portfolio.scanBarcode` — `scan-barcode-preview.jpg`
  - Used on: Portfolio section card (links to scan-barcode gallery)

---

## Section 3 — Add-Ons Section (1 image)

> Size: **1200×800px** | Ratio: **3:2** | Folder: `/public/images/addons/`

- [ ] `IMAGES.addOns.miniStudio` — `mini-studio.jpg`
  - Used on: Add-Ons section, large feature image beside the feature list

> Note: `IMAGES.addOns.scanBarcode` exists in the registry but the
> Photo Scan Barcode section uses its own dedicated `IMAGES.scanBarcode.*`
> entries below. The addOns.scanBarcode slot is reserved for future use.

---

## Section 4 — Add-On Frame Preview Images (16 images)

> Size: **1200×800px** | Ratio: **3:2** | Folder: `/public/images/addons/frames/`
> These appear inside the carousel cards on the Add-Ons section.

**Frame 1 — Classic Elegance**
- [ ] `IMAGES.addOns.frames.frame1.images[0]` — `frame-1-photo-1.jpg`
- [ ] `IMAGES.addOns.frames.frame1.images[1]` — `frame-1-photo-2.jpg`
- [ ] `IMAGES.addOns.frames.frame1.images[2]` — `frame-1-photo-3.jpg`
- [ ] `IMAGES.addOns.frames.frame1.images[3]` — `frame-1-photo-4.jpg`

**Frame 2 — Modern Minimal**
- [ ] `IMAGES.addOns.frames.frame2.images[0]` — `frame-2-photo-1.jpg`
- [ ] `IMAGES.addOns.frames.frame2.images[1]` — `frame-2-photo-2.jpg`
- [ ] `IMAGES.addOns.frames.frame2.images[2]` — `frame-2-photo-3.jpg`
- [ ] `IMAGES.addOns.frames.frame2.images[3]` — `frame-2-photo-4.jpg`

**Frame 3 — Romantic Blush**
- [ ] `IMAGES.addOns.frames.frame3.images[0]` — `frame-3-photo-1.jpg`
- [ ] `IMAGES.addOns.frames.frame3.images[1]` — `frame-3-photo-2.jpg`
- [ ] `IMAGES.addOns.frames.frame3.images[2]` — `frame-3-photo-3.jpg`
- [ ] `IMAGES.addOns.frames.frame3.images[3]` — `frame-3-photo-4.jpg`

**Frame 4 — Bold Navy**
- [ ] `IMAGES.addOns.frames.frame4.images[0]` — `frame-4-photo-1.jpg`
- [ ] `IMAGES.addOns.frames.frame4.images[1]` — `frame-4-photo-2.jpg`
- [ ] `IMAGES.addOns.frames.frame4.images[2]` — `frame-4-photo-3.jpg`
- [ ] `IMAGES.addOns.frames.frame4.images[3]` — `frame-4-photo-4.jpg`

---

## Section 5 — Photo Scan Barcode Story Section (7 images)

> Folder: `/public/images/scan-barcode/`

**Intro Background**
> Size: **1920×1080px** | Ratio: **16:9**
- [ ] `IMAGES.scanBarcode.introBg` — `intro-bg.jpg`
  - Used on: Full-screen intro slide background (desktop + mobile)

**Frame Overlay Photos** (cycle behind the frame template cards)
> Size: **1200×800px** | Ratio: **3:2** — shown inside a 3:2 container
- [ ] `IMAGES.scanBarcode.placeholderPhotos[0]` — `photo-1.jpg`
- [ ] `IMAGES.scanBarcode.placeholderPhotos[1]` — `photo-2.jpg`
- [ ] `IMAGES.scanBarcode.placeholderPhotos[2]` — `photo-3.jpg`
- [ ] `IMAGES.scanBarcode.placeholderPhotos[3]` — `photo-4.jpg`
- [ ] `IMAGES.scanBarcode.placeholderPhotos[4]` — `photo-5.jpg`
- [ ] `IMAGES.scanBarcode.placeholderPhotos[5]` — `photo-6.jpg`

---

## Section 6 — CTA Section (1 image)

> Size: **1920×1080px** | Ratio: **16:9** | Folder: `/public/images/cta/`

- [ ] `IMAGES.cta.background` — `cta-background.jpg`
  - Used on: Full-width background with dark overlay behind the CTA card

---

## Section 7 — Check Availability Modal (1 image)

> Size: **800×533px** | Ratio: **3:2** | Folder: `/public/images/modal/`

- [ ] `IMAGES.modal.checkAvailability` — `couple-moment.jpg`
  - Used on: Emotional banner image inside the Check Availability modal form

---

## Section 8 — Contact Page (1 image)

> Size: **800×600px** | Ratio: **4:3** | Folder: `/public/images/contact/`

- [ ] `IMAGES.contact.mapPlaceholder` — `studio-map.jpg`
  - Used on: Contact page map card. Can also be replaced with a Google Maps embed.

---

## Section 9 — Portfolio Gallery: Mini Studio (8 clients)

> Covers: **800×1000px** (4:5 portrait)
> Gallery images: **Mixed** — vary aspect ratios for masonry grid variety
> Folder: `/public/images/portfolio-gallery/mini-studio/client-XX/`

### Client 01 — Eleanor & Liam (Alana Hotel Solo)

- [ ] `client01.cover` — `cover.jpg`
- [ ] `client01.images[0–11]` — `img-01.jpg` … `img-12.jpg` (12 images)

### Client 02 — Sophia & Michael (Alila Solo)

- [ ] `client02.cover` — `cover.jpg`
- [ ] `client02.images[0–13]` — `img-01.jpg` … `img-14.jpg` (14 images)

### Client 03 — Amara & Daniel (The Sunan Hotel)

- [ ] `client03.cover` — `cover.jpg`
- [ ] `client03.images[0–12]` — `img-01.jpg` … `img-13.jpg` (13 images)

### Client 04 — Nadia & Reyhan (Syariah Hotel Solo)

- [ ] `client04.cover` — `cover.jpg`
- [ ] `client04.images[0–14]` — `img-01.jpg` … `img-15.jpg` (15 images)

### Client 05 — Citra & Fajar (Royal Surakarta Heritage)

- [ ] `client05.cover` — `cover.jpg`
- [ ] `client05.images[0–11]` — `img-01.jpg` … `img-12.jpg` (12 images)

### Client 06 — Layla & Aditya (Grand Orchid Hotel)

- [ ] `client06.cover` — `cover.jpg`
- [ ] `client06.images[0–15]` — `img-01.jpg` … `img-16.jpg` (16 images)

### Client 07 — Ratih & Bima (The Lawu Park Resort)

- [ ] `client07.cover` — `cover.jpg`
- [ ] `client07.images[0–12]` — `img-01.jpg` … `img-13.jpg` (13 images)

### Client 08 — Dinda & Arkan (Lorin Hotel Solo)

- [ ] `client08.cover` — `cover.jpg`
- [ ] `client08.images[0–13]` — `img-01.jpg` … `img-14.jpg` (14 images)

---

## Section 10 — Portfolio Gallery: Scan Barcode (8 clients)

> Same specifications as Mini Studio above.
> Folder: `/public/images/portfolio-gallery/scan-barcode/client-XX/`

### Client 01 — Ava & Benjamin (Best Western Solo Baru)

- [ ] `client01.cover` — `cover.jpg`
- [ ] `client01.images[0–11]` — `img-01.jpg` … `img-12.jpg` (12 images)

### Client 02 — Isabella & Lucas (Diamond Convention Hall)

- [ ] `client02.cover` — `cover.jpg`
- [ ] `client02.images[0–13]` — `img-01.jpg` … `img-14.jpg` (14 images)

### Client 03 — Putri & Galih (Graha Saba Buana)

- [ ] `client03.cover` — `cover.jpg`
- [ ] `client03.images[0–12]` — `img-01.jpg` … `img-13.jpg` (13 images)

### Client 04 — Anisa & Rizky (Solo Paragon Hotel)

- [ ] `client04.cover` — `cover.jpg`
- [ ] `client04.images[0–14]` — `img-01.jpg` … `img-15.jpg` (15 images)

### Client 05 — Maya & Hanif (Kusuma Sahid Prince Hotel)

- [ ] `client05.cover` — `cover.jpg`
- [ ] `client05.images[0–11]` — `img-01.jpg` … `img-12.jpg` (12 images)

### Client 06 — Sari & Eko (De Sinjang Ballroom)

- [ ] `client06.cover` — `cover.jpg`
- [ ] `client06.images[0–15]` — `img-01.jpg` … `img-16.jpg` (16 images)

### Client 07 — Tiara & Bayu (Grand Hall Kartasura)

- [ ] `client07.cover` — `cover.jpg`
- [ ] `client07.images[0–12]` — `img-01.jpg` … `img-13.jpg` (13 images)

### Client 08 — Fira & Yusuf (Swiss-Belhotel Surakarta)

- [ ] `client08.cover` — `cover.jpg`
- [ ] `client08.images[0–13]` — `img-01.jpg` … `img-14.jpg` (14 images)

---

## What NOT to Replace via `images.ts`

The following are Figma design assets embedded with `figma:asset/` imports.
They are not content images — do not add them to `images.ts`:

| Asset | File | Note |
|-------|------|------|
| Navy frame overlay | `AddOnsSection.tsx` | Figma export — update via Figma |
| White frame overlay | `PhotoScanBarcodeStorySection.tsx` | Figma export |
| Navy banner overlay | `PhotoScanBarcodeStorySection.tsx` | Figma export |
| White banner overlay | `PhotoScanBarcodeStorySection.tsx` | Figma export |
| Studio backgrounds (4) | `AddOnsSection.tsx` | Figma exports |
| Studio previews (4) | `AddOnsSection.tsx` | Figma exports |

---

## Quick Verification After Replacing

```bash
# 1. Verify folder contents
ls -R /public/images/

# 2. Check for oversized files (> 500 KB)
find /public/images/ -type f -size +500k

# 3. Confirm paths in constants file
grep -n "placehold.co" /src/app/constants/images.ts
# ^ Should return 0 results when all placeholders are replaced

# 4. Run local dev server
npm run dev
```

---

## Final Sign-Off

Before marking complete:

- [ ] All placeholder URLs replaced in `images.ts`
- [ ] All images under 300 KB each
- [ ] No broken images in browser
- [ ] Hero slideshow works correctly
- [ ] Portfolio gallery loads all client images
- [ ] Modal image visible when form opens
- [ ] Scan Barcode frame overlay photos cycle correctly
- [ ] Contact map image (or map embed) visible
- [ ] Tested on desktop (1280px+)
- [ ] Tested on tablet (768px)
- [ ] Tested on mobile (375px)
- [ ] No console errors

---

**Status:** ⏳ In Progress
**Updated By:** ____________
**Completed:** ____________
