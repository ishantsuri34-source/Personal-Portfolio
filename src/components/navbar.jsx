import { useEffect, useRef, useState } from "react";
import OverlayMenu from "./overlaymenue";
import Logo from "../assets/Logo.png";
import { TfiMenuAlt } from "react-icons/tfi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY = useRef(0);
  const hideTimer = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    if (!homeSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(homeSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) {
        setVisible(true);
        return;
      }

      const currentY = window.scrollY;

      if (currentY > lastScrollY.current + 5) {
        setVisible(false);
      } else if (currentY < lastScrollY.current - 5) {
        setVisible(true);

        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
          setVisible(false);
        }, 2500);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [forceVisible]);

  return (
    <>
      {/* Lightweight overlay instead of heavy blur */}
      <div
        className={`
          fixed inset-0 z-40
          transition-opacity duration-300 ease-out
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{
          background: "rgba(5,8,20,0.65)",   // fake glass effect
          willChange: "opacity"
        }}
        onClick={() => setMenuOpen(false)}
      />

      <nav
        className={`
          fixed top-0 left-0 w-full z-50
          flex items-center justify-between px-6 py-4
          transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
        style={{ willChange: "transform" }}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-18 h-18" />
          <div className="hidden sm:block text-2xl font-bold text-white">
            Ishantpreet
          </div>
        </div>

        {/* Menu button */}
        <div className="block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="
              text-white text-3xl focus:outline-none
              transition-transform duration-200 ease-out
              hover:scale-110 hover:text-indigo-300
              active:scale-95
            "
            aria-label="Open Menu"
          >
            <TfiMenuAlt />
          </button>
        </div>

        {/* Reach out button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="
              relative inline-flex items-center justify-center
              px-6 py-2 rounded-full font-semibold text-white

              bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600

              shadow-[0_0_25px_rgba(99,102,241,0.6)]
              hover:shadow-[0_0_45px_rgba(139,92,246,0.9)]

              transition-transform duration-300 ease-out
              hover:scale-105
              active:scale-95
            "
          >
            Reach Out
          </a>
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
