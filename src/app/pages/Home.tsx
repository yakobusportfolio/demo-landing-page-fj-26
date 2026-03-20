import { HeroSection } from "../sections/HeroSection";
import { BenefitsSection } from "../sections/BenefitsSection";
import { AddOnsSection } from "../sections/AddOnsSection";
import { PhotoScanBarcodeStorySection } from "../sections/PhotoScanBarcodeStorySection";
import { PortfolioSection } from "../sections/PortfolioSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { CTASection } from "../sections/CTASection";

/**
 * Home Page Component
 * 
 * Main landing page displaying all sections in order:
 * 1. Hero - Main introduction with CTA buttons (slideshow)
 * 2. Benefits - Three key benefits
 * 3. Add-Ons - Photo Mini Studio service
 * 4. Photo Scan Barcode Story - Horizontal scroll storytelling section
 * 5. Portfolio - Gallery preview cards
 * 6. Testimonials - Client reviews
 * 7. CTA - Final call-to-action
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <AddOnsSection />
      <PhotoScanBarcodeStorySection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}