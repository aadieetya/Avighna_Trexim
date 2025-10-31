import { useState } from "react";
import { motion } from "framer-motion";
import fallbackBg from "../assets/backdrop-image.jpg";
import logo from "../assets/Avighna-Logo-white-transparent.png"; // Add your logo path here

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleScrollDown = () => {
    // Scroll down by 100vh (one full viewport height)
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Fallback Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${fallbackBg})`
        }}
      />
      
      {/* Background Video */}
      {!videoError && (
        <video 
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src="/backdrop-video.mp4" type="video/mp4" />
        </video>
      )}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Loading Spinner */}
      {!videoLoaded && !videoError && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {/* Centered Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Logo */}
          <motion.img
            src={logo}
            alt="Avighna Trexim Logo"
            className="mx-auto mb-6 h-20 w-auto sm:h-24 md:h-28 lg:h-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-poppins font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Avighna Trexim
          </h1>
          <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Delivering Trust Across Oceans!!
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-philosopher text-gray-100 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Driving business growth across borders with integrity and trusted solutions.
          </p>
          <div className="mt-8">
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded-md bg-brand-600 px-8 py-4 text-lg font-poppins font-medium text-white shadow-lg hover:bg-brand-700 transition-colors"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating Down Arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        onClick={handleScrollDown}
      >
        <svg
          className="w-8 h-8 text-white drop-shadow-lg"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}