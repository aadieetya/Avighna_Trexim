import React, { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "../data.js";
import avighnaLogo from "../assets/Avighna-Logo-blue-transparent.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-2 sm:top-4 left-1/2 z-50 w-[98%] sm:w-[95%] max-w-7xl -translate-x-1/2 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-secondary/20"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
          {/* Logo */}
          <button
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full p-1 transition-transform group-hover:scale-110">
              <img
                src={avighnaLogo}
                alt="Avighna Trexim Logo"
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
              />
            </div>
            <h4 className="hidden sm:block text-base sm:text-lg font-poppins font-semibold text-brand-600 group-hover:text-brand-700 transition-colors">
              Avighna Trexim
            </h4>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={`#${item.to}`}
                    onClick={(e) => handleNavClick(e, item.to)}
                    className="cursor-pointer px-4 py-2 text-sm font-philosopher font-bold text-gray-700 hover:text-brand-600 transition-colors relative group block"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile button */}
          <button
            className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
          
          {/* Menu Panel */}
          <div
            id="mobile-menu"
            className="fixed top-[4.5rem] sm:top-20 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[90%] max-w-md md:hidden animate-slideDown"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-secondary/20 overflow-hidden">
              {/* Mobile Menu Items */}
              <div className="p-3">
                <ul className="space-y-1">
                  {nav.map((item, index) => (
                    <li 
                      key={item.label}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className="animate-fadeIn"
                    >
                      <a
                        href={`#${item.to}`}
                        onClick={(e) => handleNavClick(e, item.to)}
                        className="block w-full cursor-pointer rounded-xl px-4 py-3 text-base font-philosopher font-semibold hover:bg-brand-50 transition-all text-gray-700 hover:text-brand-600 hover:translate-x-1"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}