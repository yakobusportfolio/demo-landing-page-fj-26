import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      // Tambahkan class agar scrollbar muncul
      if (!document.body.classList.contains("is-scrolling")) {
        document.body.classList.add("is-scrolling");
      }

      // Bersihkan timer lama
      clearTimeout(scrollTimeout);

      // Sembunyikan kembali setelah 800ms (kurang dari 1 detik agar terasa sigap)
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 800);
    };

    // Gunakan 'wheel' untuk mouse/trackpad agar lebih akurat mendeteksi gesture
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return <RouterProvider router={router} />;
}