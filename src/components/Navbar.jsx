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
    <header
      ref={headerRef}
      className="fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-secondary/20"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <button
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 group"
        >
          <div className="grid h-10 w-10 place-items-center rounded-full p-1 transition-transform group-hover:scale-110">
            <img
              src={avighnaLogo}
              alt="Avighna Trexim Logo"
              className="h-8 w-8 object-contain"
            />
          </div>
          <h4 className="hidden text-lg font-poppins font-semibold text-brand-600 sm:block group-hover:text-brand-700 transition-colors">
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
          className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? (
            <X className="h-6 w-6 text-brand-600" />
          ) : (
            <Menu className="h-6 w-6 text-brand-600" />
          )}
        </button>

        {/* Mobile menu */}
        {open && (
          <div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <aside
              id="mobile-menu"
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="bg-brand-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white p-1">
                      <img
                        src={avighnaLogo}
                        alt="Avighna Trexim Logo"
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <h4 className="text-lg font-poppins font-semibold text-white">
                      Avighna Trexim
                    </h4>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="p-4">
                <ul className="space-y-2">
                  {nav.map((item) => (
                    <li key={item.label}>
                      <a
                        href={`#${item.to}`}
                        onClick={(e) => handleNavClick(e, item.to)}
                        className="block w-full cursor-pointer rounded-lg px-4 py-3 text-base font-philosopher hover:bg-secondary transition-colors text-gray-700 hover:text-brand-600"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </header>
  );
}
