import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { countries } from "../data/countriesData";
import { Globe2, Plane, Ship } from "lucide-react";
import * as d3 from "d3-geo";

export default function GlobalReachSection() {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Setup Mercator Projection for map
  const projection = d3.geoMercator()
    .scale(160) // zoom level
    .translate([500, 250]); // center for 1000x500 viewBox

  // Get India as origin
  const india = countries.find(c => c.name === "India");
  const [indiaX, indiaY] = projection([india.lon, india.lat]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* ===== HEADER ===== */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-poppins font-bold text-brand-600 mb-2">
          Our Global Reach
        </h3>
        <p className="font-philosopher text-gray-600">
          Delivering quality products to satisfied customers worldwide
        </p>
      </div>

      {/* ===== MAP CONTAINER ===== */}
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 rounded-3xl p-8 shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background World Map Image */}
          <div className="relative w-full h-[500px] bg-white rounded-2xl overflow-hidden">
            <img
              src="/world-map-light.svg"
              alt="World Map"
              className="absolute inset-0 w-full h-[500px] object-cover opacity-90"
            />

            <svg
              viewBox="0 0 1000 500"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connection from India to hovered country */}
              {hoveredCountry && (() => {
                const [x2, y2] = projection([hoveredCountry.lon, hoveredCountry.lat]);
                return (
                  <motion.line
                    x1={indiaX} y1={indiaY}
                    x2={x2} y2={y2}
                    stroke="#1a75b6" strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })()}

              {/* Country markers */}
              {countries.map((country, i) => {
                const [x, y] = projection([country.lon, country.lat]);
                const isHovered = hoveredCountry?.name === country.name;

                return (
                  <motion.g
                    key={country.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    className="cursor-pointer"
                  >
                    {/* Pulse animation */}
                    {isHovered && (
                      <>
                        <motion.circle
                          cx={x} cy={y} r="20"
                          fill="none" stroke="#1a75b6" strokeWidth="2"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.circle
                          cx={x} cy={y} r="20"
                          fill="none" stroke="#1a75b6" strokeWidth="2"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        />
                      </>
                    )}

                    {/* Solid dot */}
                    <motion.circle
                      cx={x} cy={y}
                      r={isHovered ? "12" : "8"}
                      fill={isHovered ? "#0f5795" : "#1a75b6"}
                      stroke="white" strokeWidth="2"
                      animate={{ scale: isHovered ? 1.2 : 1 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Label */}
                    {isHovered && (
                      <motion.text
                        x={x} y={y - 20}
                        textAnchor="middle"
                        className="text-sm font-poppins font-bold fill-brand-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {country.name}
                      </motion.text>
                    )}
                  </motion.g>
                );
              })}

              {/* India Origin Marker */}
              <motion.g
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <circle cx={indiaX} cy={indiaY} r="15" fill="#ef4444" stroke="white" strokeWidth="3" />
                <text x={indiaX} y={indiaY + 30} textAnchor="middle"
                  className="text-sm font-poppins font-bold fill-red-600">
                  Nashik, India
                </text>
              </motion.g>
            </svg>
          </div>

          {/* Floating Info Card */}
          <AnimatePresence>
            {hoveredCountry && (
              <motion.div
                className="absolute top-8 right-8 w-80 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 z-20"
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-xl font-poppins font-bold text-brand-600 mb-2">
                  {hoveredCountry.name}
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Ship className="w-5 h-5 text-blue-600" />
                    <p>{hoveredCountry.port}</p>
                  </div>
                  <div className="flex gap-3">
                    <Plane className="w-5 h-5 text-green-600" />
                    <p>{hoveredCountry.airport}</p>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-600">
                  Direct shipping available from Mumbai to {hoveredCountry.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pills */}
        <motion.div className="mt-8 flex flex-wrap justify-center gap-2">
          {countries.map((country, i) => (
            <motion.button
              key={country.name}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                hoveredCountry?.name === country.name
                  ? "bg-brand-600 text-white"
                  : "bg-white text-brand-600 border-2 border-brand-600"
              }`}
              onMouseEnter={() => setHoveredCountry(country)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              {country.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}