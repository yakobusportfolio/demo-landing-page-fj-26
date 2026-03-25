/**Upgrade the existing Hero section into a responsive slideshow-based hero while preserving the current layout structure, CTA buttons, and modal functionality.

IMPORTANT:
- Do NOT change layout, spacing, typography, colors, or UI design
- Do NOT redesign any section
- Do NOT break existing CTA buttons (Check Availability, Explore Add-ons)
- Do NOT modify useAvailabilityModal logic
- Keep existing layout hierarchy EXACTLY the same

SYSTEM REQUIREMENT (CRITICAL):
- Follow the existing image management system strictly
- Do NOT hardcode any image URLs
- ALL images must be:
  ✔ stored in /public/images/hero/
  ✔ registered inside /src/app/constants/images.ts
  ✔ accessed via IMAGES constant

---

HERO SLIDESHOW REQUIREMENTS:

1. Convert hero background into a slideshow with 3 slides.

2. Create image structure inside images.ts:
**/
hero: {
  slides: [
    "/images/hero/hero-slide-1.jpg",
    "/images/hero/hero-slide-2.jpg",
    "/images/hero/hero-slide-3.jpg"
  ]
}
/**
3. Use IMAGES.hero.slides[index] inside the component
- No hardcoded <img src="...">

---

SLIDES CONTENT:

Slide 1:
Title: "Luxury Wedding Photography"
Subtitle: "Capture timeless and cinematic moments of your wedding day"

Slide 2:
Title: "Mini Studio Portrait Add-on"
Subtitle: "Elegant studio-style portraits during your wedding celebration"

Slide 3:
Title: "Interactive Scan Barcode Experience"
Subtitle: "Let your guests instantly access and relive your wedding moments"

---

VISUAL BEHAVIOR:

- Background images:
  ✔ full screen (w-full h-screen)
  ✔ object-cover
  ✔ smooth fade transition (opacity)
  ✔ subtle zoom (scale animation / Ken Burns effect)

- Add overlay:
  ✔ bg-black/40 for readability

---

ANIMATION:

- Crossfade transition ~1000ms
- Optional slow zoom (scale 1 → 1.05)

---

TIMING:

- Auto slide every 6–7 seconds
- Infinite loop

---

DESKTOP INTERACTION:

- Left/right navigation arrows:
  ✔ hidden by default (opacity 0)
  ✔ appear on hover (group-hover)
  ✔ smooth fade

---

MOBILE BEHAVIOR (PRIORITY):

- Enable swipe gesture (left/right)
- Hide arrows completely
- Center-align text
- Responsive typography:
  ✔ Title: text-3xl → text-4xl
  ✔ Subtitle: text-base → text-lg

- Safe padding:
  ✔ px-6 or px-8

- Vertical centering:
  ✔ flex items-center justify-center

---

DOT INDICATOR:

- Bottom center
- 3 dots (dynamic based on slides.length)
- Active: solid white
- Inactive: white/40

---

PERFORMANCE:

- Use loading="eager" for first slide
- Use loading="lazy" for others
- Do NOT load external images
- Use local images only (/public/images/hero/)

---

AUTO-ORGANIZATION RULE:

- If hero slide images do not exist:
  ��� create /public/images/hero/
  ✔ generate placeholder images
  ✔ register them in images.ts automatically

- Naming convention:
  hero-slide-1.jpg
  hero-slide-2.jpg
  hero-slide-3.jpg

---

KEEP EVERYTHING ELSE INTACT:

- CTA buttons
- modal logic
- layout structure
- responsiveness
- animation system

---

OUTPUT:

- Premium slideshow hero
- Fully integrated with centralized image system
- Clean and scalable structure
- Ready for real image replacement without editing components
**/