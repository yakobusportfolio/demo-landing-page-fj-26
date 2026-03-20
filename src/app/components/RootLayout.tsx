import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "./ui/sonner";

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  
  // Use useLayoutEffect to ensure scroll happens before paint
  React.useLayoutEffect(() => {
    if (hash) {
      // If there is a hash, scroll to that element
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Otherwise scroll to top instantly before paint
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);
  
  return null;
}

/**
 * Adds/removes .is-scrolling on <body> so the CSS
 * scrollbar thumb fades in only while the user scrolls.
 */
function useScrollRevealScrollbar() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      document.body.classList.add("is-scrolling");

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 600); // hide thumb 0.6s after scroll stops
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timer.current) clearTimeout(timer.current);
      document.body.classList.remove("is-scrolling");
    };
  }, []);
}

export function RootLayout() {
  useScrollRevealScrollbar();

  return (
    <div className="min-h-screen bg-white selection:bg-[#70161e] selection:text-white flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}