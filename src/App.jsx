import { useState, useRef, useEffect } from "react";
import { Element } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import Team from "./components/Team.jsx";
import Clients from "./components/Clients.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";
import GlobalReachSection from "./components/Countries.jsx";
import BrochureModal from "./components/BrochureModal.jsx";
import SampleModal from "./components/SampleModal.jsx";

// ── FAB Speed-Dial ──────────────────────────────────────────────────────────
const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="white">
    <path d="M16.003 2.667C8.639 2.667 2.667 8.639 2.667 16c0 2.364.638 4.673 1.848 6.694L2.667 29.333l6.805-1.782A13.285 13.285 0 0 0 16.003 29.333C23.364 29.333 29.333 23.361 29.333 16S23.364 2.667 16.003 2.667zm0 24.267a11.01 11.01 0 0 1-5.616-1.54l-.403-.24-4.038 1.058 1.078-3.93-.263-.42A10.98 10.98 0 0 1 5.04 16c0-6.046 4.919-10.96 10.963-10.96S27 9.954 27 16s-4.993 10.934-10.997 10.934zm6.04-8.2c-.33-.165-1.954-.963-2.257-1.073-.303-.11-.524-.165-.744.165s-.854 1.073-1.047 1.293c-.193.22-.385.248-.716.083-.33-.165-1.394-.513-2.655-1.638-.981-.875-1.643-1.955-1.835-2.285-.193-.33-.02-.508.145-.672.148-.148.33-.385.496-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.744-1.793-1.02-2.455-.269-.644-.54-.557-.744-.567L9.87 10c-.22 0-.578.083-.88.413-.303.33-1.154 1.128-1.154 2.75s1.182 3.19 1.347 3.41c.165.22 2.326 3.55 5.636 4.979.788.34 1.403.543 1.882.695.79.252 1.51.216 2.079.131.634-.094 1.954-.8 2.23-1.572.275-.771.275-1.432.193-1.572-.083-.138-.303-.22-.634-.385z" />
  </svg>
);

const BROCHURE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <polyline points="9 14 12 17 15 14" />
  </svg>
);

const SAMPLE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
  </svg>
);

const ACTIONS = [
  {
    id: "whatsapp",
    label: "Talk to Us 💬",
    bg: "#25D366",
    shadow: "rgba(37,211,102,0.45)",
    icon: WA_ICON,
    href: "https://wa.me/919545451755?text=Hello%2C%20I%20am%20interested%20in%20your%20import%20and%20export%20services.%20Please%20share%20more%20details.",
  },
  {
    id: "brochure",
    label: "Get Brochure 📄",
    bg: "linear-gradient(135deg,#1a3c6e,#2563eb)",
    shadow: "rgba(37,99,235,0.45)",
    icon: BROCHURE_ICON,
  },
  {
    id: "sample",
    label: "Request a Sample 📦",
    bg: "linear-gradient(135deg,#92400e,#f97316)",
    shadow: "rgba(249,115,22,0.45)",
    icon: SAMPLE_ICON,
  },
];

function FloatingActions({ onBrochure, onSample }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAction = (action) => {
    setOpen(false);
    if (action.id === "brochure") { onBrochure(); return; }
    if (action.id === "sample") { onSample(); return; }
    if (action.href) window.open(action.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={ref}
      style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0" }}
    >
      {/* Speed-dial tray */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            style={{
              marginBottom: "14px",
              background: "white",
              borderRadius: "18px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
              overflow: "hidden",
              minWidth: "260px",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            {/* Tray header */}
            <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid #f1f5f9" }}>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#94a3b8", fontFamily: "Poppins, sans-serif", textTransform: "uppercase" }}>
                Quick Actions
              </p>
            </div>

            {/* Action rows */}
            {ACTIONS.map((action, i) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleAction(action)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                  width: "100%",
                  padding: "13px 16px",
                  background: "transparent",
                  border: "none",
                  borderBottom: i < ACTIONS.length - 1 ? "1px solid #f8fafc" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                whileHover={{ backgroundColor: "#f8fafc" }}
              >
                {/* Icon bubble */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: action.bg,
                    boxShadow: `0 3px 12px ${action.shadow}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {action.icon}
                </div>

                {/* Label */}
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#1e293b",
                    fontFamily: "Poppins, sans-serif",
                    lineHeight: 1.3,
                  }}
                >
                  {action.label}
                </span>

                {/* Chevron */}
                <svg style={{ marginLeft: "auto", flexShrink: 0, color: "#cbd5e1" }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating label — visible only when tray is closed */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: "14px",
              right: "72px",
              background: "white",
              borderRadius: "999px",
              padding: "7px 14px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              border: "1px solid rgba(0,0,0,0.06)",
              animation: "fabLabelBob 3s ease-in-out infinite",
            }}
          >
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#1e293b", fontFamily: "Poppins, sans-serif" }}>
              Ready to ship? Let’s go 🚢
            </span>
            {/* Tail */}
            <div style={{
              position: "absolute", right: "-6px", top: "50%", transform: "translateY(-50%)",
              width: 0, height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "6px solid white",
              filter: "drop-shadow(1px 0 1px rgba(0,0,0,0.06))",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: open
            ? "#1e293b"
            : "linear-gradient(135deg, #1a3c6e 0%, #2563eb 100%)",
          boxShadow: "0 4px 24px rgba(37,99,235,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          animation: open ? "none" : "fabPulse 2.5s infinite",
          transition: "background 0.25s",
        }}
        aria-label={open ? "Close menu" : "Open quick actions"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* FAB pulse keyframe */}
      <style>{`
        @keyframes fabPulse {
          0%   { box-shadow: 0 4px 24px rgba(37,99,235,0.5), 0 0 0 0 rgba(37,99,235,0.4); }
          70%  { box-shadow: 0 4px 24px rgba(37,99,235,0.5), 0 0 0 14px rgba(37,99,235,0); }
          100% { box-shadow: 0 4px 24px rgba(37,99,235,0.5), 0 0 0 0 rgba(37,99,235,0); }
        }
        @keyframes fabLabelBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [showBrochure, setShowBrochure] = useState(false);
  const [showSample, setShowSample] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Navbar is fixed/sticky so it's outside <main> */}
      <Navbar />

      {/* Main content */}
      <main>
        <Element name="home">
          <Hero />
        </Element>

        <Element name="services">
          <Services />
        </Element>

        <Element name="about">
          <About />
        </Element>

        <Element name="certifications">
          <Work />
        </Element>

        <Element name="team">
          <Team />
        </Element>

        <Element name="contact">
          <Contact />
        </Element>
      </main>

      {/* Footer always at the bottom */}
      <Footer />

      {/* FAB Speed-Dial */}
      <FloatingActions
        onBrochure={() => setShowBrochure(true)}
        onSample={() => setShowSample(true)}
      />

      {/* Modals */}
      <BrochureModal isOpen={showBrochure} onClose={() => setShowBrochure(false)} />
      <SampleModal isOpen={showSample} onClose={() => setShowSample(false)} />
    </div>
  );
}
