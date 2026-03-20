# 🔌 Modal Integration Examples

Quick copy-paste examples for integrating the Check Availability Modal into different parts of your application.

---

## ✅ Basic Pattern

```tsx
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

function YourComponent() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      {/* Your trigger button */}
      <button onClick={open}>Check Availability</button>

      {/* Modal (render once) */}
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

## 📋 Integration Examples

### 1. Hero Section (✅ Already Implemented)

```tsx
import React from "react";
import { motion } from "motion/react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function HeroSection() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <section className="relative h-screen">
      {/* Hero content */}
      <button onClick={open} className="cta-button">
        Check Availability
      </button>

      {/* Modal */}
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </section>
  );
}
```

---

### 2. Pricing Card

```tsx
import React from "react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function PricingCard({ title, price, features }) {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <div className="pricing-card">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <ul>
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <button onClick={open} className="book-now-button">
          Book This Package
        </button>
      </div>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

### 3. Sticky CTA Button (Bottom of Page)

```tsx
import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function StickyBookingButton() {
  const { isOpen, open, close } = useCheckAvailabilityModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <button
        onClick={open}
        className="fixed bottom-6 right-6 z-40
                   px-6 py-4 bg-[#70161e] text-white rounded-full
                   shadow-2xl hover:shadow-3xl transition-all
                   flex items-center gap-2 font-medium"
      >
        <Calendar size={20} />
        <span className="hidden sm:inline">Check Availability</span>
        <span className="sm:hidden">Book Now</span>
      </button>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

**Usage in Layout:**
```tsx
// In RootLayout.tsx or App.tsx
<StickyBookingButton />
```

---

### 4. Navbar CTA

```tsx
import React from "react";
import { Link } from "react-router";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function Navbar() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <nav className="navbar">
        <div className="logo">Faralljibrill</div>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <button onClick={open} className="nav-cta">
          Book Now
        </button>
      </nav>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

### 5. Portfolio Gallery Item

```tsx
import React from "react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function PortfolioItem({ image, title, description }) {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <div className="portfolio-item">
        <img src={image} alt={title} />
        <div className="overlay">
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={open} className="book-similar">
            Book Similar Experience
          </button>
        </div>
      </div>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

### 6. Add-Ons Section

```tsx
import React from "react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function AddOnCard({ title, description, image }) {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <div className="add-on-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
        
        <div className="actions">
          <a href="#details">Learn More</a>
          <button onClick={open} className="add-to-booking">
            Add to Booking
          </button>
        </div>
      </div>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

### 7. Testimonials Section

```tsx
import React from "react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function TestimonialsSection() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <section className="testimonials">
        <h2>What Our Couples Say</h2>
        
        {/* Testimonials content */}
        
        <div className="cta-after-testimonials">
          <p>Ready to create your own love story?</p>
          <button onClick={open} className="primary-button">
            Check Your Date
          </button>
        </div>
      </section>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

### 8. Footer

```tsx
import React from "react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function Footer() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            {/* Links */}
          </div>

          <div className="footer-section">
            <h4>Ready to Book?</h4>
            <button onClick={open} className="footer-cta">
              Check Availability
            </button>
          </div>
        </div>
      </footer>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

### 9. CTA Section (✅ Already Implemented)

```tsx
import React from "react";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function CTASection() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <section className="cta-section">
        <h2>Ready to Book Your Wedding?</h2>
        <p>Limited dates available for 2026</p>
        
        <button onClick={open} className="cta-button">
          <Calendar size={20} />
          Check Availability
        </button>
      </section>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

### 10. Mobile Menu

```tsx
import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, open, close } = useCheckAvailabilityModal();

  const handleBookNow = () => {
    setMenuOpen(false); // Close menu first
    open(); // Then open modal
  };

  return (
    <>
      <button onClick={() => setMenuOpen(true)} className="menu-toggle">
        <Menu />
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)}>
            <X />
          </button>

          <nav>
            <a href="#home">Home</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </nav>

          <button onClick={handleBookNow} className="menu-cta">
            Check Availability
          </button>
        </div>
      )}

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

## 🔄 Multiple Triggers, Single Modal

**Best Practice:** Use one modal instance for multiple triggers

```tsx
import React from "react";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function LandingPage() {
  // Single hook for entire page
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      {/* Hero CTA */}
      <section className="hero">
        <button onClick={open}>Hero: Check Availability</button>
      </section>

      {/* Pricing CTA */}
      <section className="pricing">
        <button onClick={open}>Pricing: Book Now</button>
      </section>

      {/* Footer CTA */}
      <footer>
        <button onClick={open}>Footer: Get Started</button>
      </footer>

      {/* Single modal instance (renders only once) */}
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

## 🎨 Custom Trigger Styles

### Primary CTA Button
```tsx
<button
  onClick={open}
  className="px-8 py-4 bg-[#70161e] hover:bg-[#70161e]/90 
             text-white rounded-full font-medium
             shadow-lg hover:shadow-xl transition-all"
>
  Check Availability
</button>
```

### Secondary CTA Button
```tsx
<button
  onClick={open}
  className="px-8 py-4 border-2 border-[#041e48] 
             text-[#041e48] hover:bg-[#041e48] hover:text-white
             rounded-full font-medium transition-all"
>
  Book Now
</button>
```

### Text Link
```tsx
<button
  onClick={open}
  className="text-[#70161e] underline hover:text-[#70161e]/80
             font-medium transition-colors"
>
  Check availability →
</button>
```

### Icon Button
```tsx
import { Calendar } from "lucide-react";

<button
  onClick={open}
  className="flex items-center gap-2 px-6 py-3
             bg-white text-[#041e48] rounded-lg
             shadow-md hover:shadow-lg transition-all"
>
  <Calendar size={20} />
  <span>Check Date</span>
</button>
```

### Glassmorphism Button
```tsx
<button
  onClick={open}
  className="px-8 py-4 bg-white/10 backdrop-blur-md
             border border-white/30 text-white
             rounded-full font-medium
             hover:bg-white/20 transition-all"
>
  Check Availability
</button>
```

---

## 🚫 Common Mistakes

### ❌ Multiple Modal Instances

```tsx
// DON'T: Create modal in every component
function Component1() {
  const { isOpen, open, close } = useCheckAvailabilityModal();
  return <CheckAvailabilityModal isOpen={isOpen} onClose={close} />;
}

function Component2() {
  const { isOpen, open, close } = useCheckAvailabilityModal();
  return <CheckAvailabilityModal isOpen={isOpen} onClose={close} />;
}
```

### ✅ Correct: Single Instance

```tsx
// DO: Share modal state, render once
function ParentComponent() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <Component1 onOpenModal={open} />
      <Component2 onOpenModal={open} />
      
      {/* Single modal */}
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}

function Component1({ onOpenModal }) {
  return <button onClick={onOpenModal}>Open Modal</button>;
}
```

---

### ❌ Hardcoding Modal in Component

```tsx
// DON'T: Import and render modal in every component
import { CheckAvailabilityModal } from "./CheckAvailabilityModal";

function MyButton() {
  return (
    <>
      <button>Click</button>
      <CheckAvailabilityModal isOpen={true} onClose={() => {}} />
    </>
  );
}
```

### ✅ Correct: Use Hook and Prop Drilling

```tsx
// DO: Use hook at parent level, pass open function down
function Parent() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <>
      <MyButton onOpen={open} />
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}

function MyButton({ onOpen }) {
  return <button onClick={onOpen}>Click</button>;
}
```

---

## 🎯 Advanced: Context Provider Pattern

For large apps with many nested components:

```tsx
// 1. Create context
import React, { createContext, useContext } from "react";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const modal = useCheckAvailabilityModal();

  return (
    <ModalContext.Provider value={modal}>
      {children}
      <CheckAvailabilityModal isOpen={modal.isOpen} onClose={modal.close} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

// 2. Wrap app
function App() {
  return (
    <ModalProvider>
      <YourApp />
    </ModalProvider>
  );
}

// 3. Use anywhere
function AnyComponent() {
  const { open } = useModal();
  return <button onClick={open}>Check Availability</button>;
}
```

---

## 📊 Analytics Integration

Track modal opens:

```tsx
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

export function MyComponent() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  const handleOpen = () => {
    // Track event
    if (window.gtag) {
      window.gtag('event', 'modal_opened', {
        event_category: 'engagement',
        event_label: 'check_availability',
        event_location: 'hero_section' // or 'pricing', 'footer', etc.
      });
    }

    // Open modal
    open();
  };

  return (
    <>
      <button onClick={handleOpen}>Check Availability</button>
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

---

## 🎨 Styled Examples

### Gradient Button
```tsx
<button
  onClick={open}
  className="px-8 py-4 bg-gradient-to-r from-[#70161e] to-[#041e48]
             text-white rounded-full font-medium
             shadow-lg hover:shadow-xl transition-all
             hover:scale-105 transform"
>
  Check Availability
</button>
```

### Outlined with Icon
```tsx
<button
  onClick={open}
  className="flex items-center gap-2 px-6 py-3
             border-2 border-[#70161e] text-[#70161e]
             hover:bg-[#70161e] hover:text-white
             rounded-lg font-medium transition-all group"
>
  <Calendar className="group-hover:scale-110 transition-transform" size={20} />
  <span>Check Your Date</span>
</button>
```

### Pill with Badge
```tsx
<button
  onClick={open}
  className="relative px-8 py-4 bg-[#041e48] text-white
             rounded-full font-medium shadow-lg
             hover:bg-[#1b355e] transition-colors"
>
  Check Availability
  <span className="absolute -top-2 -right-2 px-2 py-1
                   bg-[#70161e] text-white text-xs rounded-full
                   animate-pulse">
    3 Slots Left
  </span>
</button>
```

---

**Need more examples? Check `/MODAL_COMPONENT_GUIDE.md` for full documentation.**
