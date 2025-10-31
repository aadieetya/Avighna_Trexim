import { useState, useEffect, useRef  } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView   } from "framer-motion";
import farmImage from "../assets/old-farm.png"
import warehouse from "../assets/warehouse.png"
import coldstorage from "../assets/cold-storage.png"
import loadingcontainer from "../assets/loading-container.png"
import { countries } from "../data/countriesData";
import { Globe2, Plane, Ship } from "lucide-react";
import * as d3 from "d3-geo";

// Import icons
import { 
  Sprout, 
  Users, 
  TrendingUp, 
  Globe, 
  Package,
  Award,
  Shield,
  Handshake,
  CheckCircle,
  Play,
  Star
} from "lucide-react";

export default function About() {

  // Counter component
const Counter = ({ value, duration = 1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    // Handle percentage
    if (value.includes("%")) {
      return Math.round(latest) + "%";
    }
    // Handle numbers with +
    if (value.includes("+")) {
      return Math.round(latest) + "+";
    }
    return Math.round(latest);
  });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, ""));
      const controls = animate(count, numericValue, { duration });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

  const [hoveredCountry, setHoveredCountry] = useState(null);
  
    // Setup Mercator Projection for map
    const projection = d3.geoMercator()
      .scale(160) // zoom level
      .translate([500, 250]); // center for 1000x500 viewBox
  
    // Get India as origin
    const india = countries.find(c => c.name === "India");
    const [indiaX, indiaY] = projection([india.lon, india.lat]);
  
  const [hovered, setHovered] = useState(null);
  const [activeStory, setActiveStory] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const storyTimeline = [
    {
      year: "3 Generations Ago",
      title: "Our Roots",
      description: "Our family began farming in the fertile lands of Nashik, cultivating the region's finest produce with traditional methods and deep-rooted knowledge passed down through generations.",
      icon: Sprout,
      color: "from-green-500 to-green-600",
      stats: { label: "Heritage", value: "30+ Years" },
      trustPoint: "Time-tested farming wisdom",
      image : farmImage
      // Image suggestions:
      // - Black & white photo of grandfather in the field
      // - Traditional farming tools
      // - Old family photo with farm in background
      // - Vintage photo of first harvest
    },
    {
      year: "15+ Years",
      title: "Trusted Suppliers",
      description: "We've been supplying premium quality products to traders across India. The products you use today might have come from our farms! Our reputation speaks through our long-standing relationships.",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      stats: { label: "Happy Traders", value: "500+" },
      trustPoint: "Proven track record",
      image : warehouse
      // Image suggestions:
      // - Handshake with trader/buyer
      // - Loading trucks with produce
      // - Quality certificates displayed
      // - Warehouse full of sorted produce
    },
    {
      year: "Present Day",
      title: "Direct to You",
      description: "As the third generation, I'm taking our legacy forward by connecting directly with customers, ensuring quality from farm to table with complete transparency and traceability.",
      icon: Package,
      color: "from-purple-500 to-purple-600",
      stats: { label: "Direct Customers", value: "1000+" },
      trustPoint: "No middlemen, pure quality",
      image : coldstorage
      // Image suggestions:
      // - Modern packaging facility
      // - You (owner) inspecting produce
      // - Direct delivery to customer
      // - QR code tracking system
    },
    {
      year: "Going Global",
      title: "Export Excellence",
      description: "Now exporting our premium Nashik products worldwide, bringing authentic taste and quality to international markets with all necessary certifications and compliance.",
      icon: Globe,
      color: "from-brand-500 to-brand-600",
      stats: { label: "Countries", value: "20+" },
      trustPoint: "International standards",
      image : loadingcontainer
      // Image suggestions:
      // - Products being loaded in container
      // - Export certificates (APEDA, FSSAI)
      // - World map with export destinations
      // - International quality badges
    }
  ];

  // Auto-play timeline
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setActiveStory((prev) => (prev + 1) % storyTimeline.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, storyTimeline.length]);

  const CurrentIcon = storyTimeline[activeStory].icon;

  // Trust badges data
  const trustBadges = [
    { icon: Shield, label: "IEC Certified", color: "text-blue-600" },
    { icon: Award, label: "APEDA Registered", color: "text-green-600" },
    { icon: CheckCircle, label: "FSSAI Approved", color: "text-purple-600" },
    { icon: Handshake, label: "Trusted Since 1989", color: "text-orange-600" }
  ];

  return (
    <section id="about" className="relative bg-gradient-to-b from-white to-secondary py-20 scroll-mt-28 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-brand-600 rounded-full filter blur-3xl opacity-5"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500 rounded-full filter blur-3xl opacity-5"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container-px mx-auto max-w-7xl relative z-10">
        {/* Section Header with Trust Indicator */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <span className="text-sm font-philosopher text-green-600">Verified Family Business</span>
          </div>
          <h2 className="mb-4 text-4xl font-poppins font-bold text-brand-600 sm:text-5xl">
            Our Story of Trust & Excellence
          </h2>
          <p className="text-lg font-philosopher text-gray-600 max-w-2xl mx-auto">
            Three generations of farming excellence, now bringing you the finest produce directly from our family to yours
          </p>
        </motion.div>

        {/* Interactive Timeline with Auto-play */}
        <div className="mb-20">
          {/* Timeline Progress Bar */}
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
            <div className="relative flex justify-between">
              {storyTimeline.map((story, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setActiveStory(index);
                    setAutoPlay(false);
                  }}
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`w-12 h-12 rounded-full border-4 transition-all ${
                    activeStory === index
                      ? 'bg-brand-600 border-brand-600'
                      : activeStory > index
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'
                  }`}>
                    {activeStory > index && (
                      <CheckCircle className="w-full h-full text-white p-2" />
                    )}
                    {activeStory === index && (
                      <motion.div
                        className="w-full h-full rounded-full bg-white/30"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <span className="absolute top-16 left-1/2 -translate-x-1/2 text-xs font-poppins font-medium whitespace-nowrap">
                    {story.year}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Story Content with 3D Card Effect */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-center"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left - rect.width / 2);
                mouseY.set(e.clientY - rect.top - rect.height / 2);
              }}
            >
              {/* Story Text with Trust Elements */}
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className={`p-4 rounded-2xl bg-gradient-to-br ${storyTimeline[activeStory].color} text-white`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CurrentIcon size={32} />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-poppins font-bold text-brand-600">
                      {storyTimeline[activeStory].title}
                    </h3>
                    <p className="text-sm font-philosopher text-gray-500">
                      {storyTimeline[activeStory].year}
                    </p>
                  </div>
                </div>
                
                <p className="text-lg font-philosopher text-gray-700 leading-relaxed mb-6">
                  {storyTimeline[activeStory].description}
                </p>

                {/* Trust Point */}
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm font-philosopher text-green-800">
                    {storyTimeline[activeStory].trustPoint}
                  </p>
                </div>

                {/* Live Stats */}
                <motion.div 
                  className="mt-6 flex items-center gap-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-center">
                    <motion.h4 
                      className="text-3xl font-poppins font-bold text-brand-600"
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      {storyTimeline[activeStory].stats.value}
                    </motion.h4>
                    <p className="text-sm font-philosopher text-gray-600">
                      {storyTimeline[activeStory].stats.label}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Interactive 3D Image Card */}
              <motion.div 
                className="order-1 md:order-2"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* <div className={`absolute inset-0 bg-gradient-to-br ${storyTimeline[activeStory].color} opacity-20`}></div> */}
                  
                  {/* Placeholder for actual image */}
                  <div className="h-full w-full bg-gray-200 flex flex-col items-center justify-center p-8 text-center">
                    <CurrentIcon size={80} className="text-gray-400 mb-4" />
                    <p className="text-sm font-philosopher text-gray-500">
                       <img
                  src={storyTimeline[activeStory].image}
                  alt={storyTimeline[activeStory].title}
                />
                    </p>
                  </div>

                  {/* Trust Badge Overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-poppins font-medium">Verified</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-8 items-center gap-4">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="text-sm font-philosopher text-gray-600 hover:text-brand-600 transition-colors"
            >
              {autoPlay ? 'Pause Story' : 'Play Story'}
            </button>
          </div>
        </div>
                {/* Trust Badges Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center"
              whileHover={{ y: -5, shadow: "xl" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.color}`} />
              <p className="text-sm font-poppins font-medium text-gray-700">{badge.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Info with Video Testimonial Placeholder */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2">
            {/* Left: Company Info */}
            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-poppins font-bold text-brand-600 mb-4">
                Why Choose Avighna Trexim?
              </h3>
              <p className="font-philosopher text-gray-700 mb-4">
                Partner with us today and take your business to new global heights.
              </p>
              <p className="font-philosopher text-gray-600 leading-relaxed mb-6">
                At Avighna Trexim, we create powerful, results-driven brand strategies designed to help your business grow faster. Our approach goes beyond just planning — we continuously refine and optimize campaigns to deliver the best outcomes.
              </p>
              
              {/* Key Benefits */}
              <div className="space-y-3">
                {[
                  "Direct from farm - No middlemen",
                  "3rd generation expertise",
                  "International quality standards",
                  "Complete transparency & traceability"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-philosopher text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Video Testimonial Placeholder */}
            <div className="relative bg-gradient-to-br from-brand-50 to-brand-100 p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center mb-4">
                    <Play className="w-12 h-12 text-brand-600 ml-1" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-brand-600/30"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h4 className="text-xl font-poppins font-semibold text-brand-600 mb-2">
                  Watch Our Story
                </h4>
                <p className="font-philosopher text-gray-600">
                  See how we've grown from a small family farm to a global exporter
                </p>
                {/* Suggested: Add actual video testimonial from owner */}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { value: "30+", label: "Years of Heritage", color: "from-green-400 to-green-600" },
            { value: "500+", label: "Happy Traders", color: "from-blue-400 to-blue-600" },
            { value: "20+", label: "Export Countries", color: "from-purple-400 to-purple-600" },
            { value: "100%", label: "Quality Assured", color: "from-orange-400 to-orange-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              <div className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-lg">
                <h4 className="text-3xl font-poppins font-bold text-brand-600 mb-1">{stat.value}</h4>
                <p className="text-sm font-philosopher text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Statistics Section ends */}

{/* Statistics Section this section has animation logic, shall be used if required */}
{/* <motion.div
  className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {[
    { value: "30+", label: "Years of Heritage", color: "from-green-400 to-green-600" },
    { value: "500+", label: "Happy Traders", color: "from-blue-400 to-blue-600" },
    { value: "20+", label: "Export Countries", color: "from-purple-400 to-purple-600" },
    { value: "100%", label: "Quality Assured", color: "from-orange-400 to-orange-600" }
  ].map((stat, index) => (
    <motion.div
      key={index}
      className="relative group"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      <div className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-lg">
        <h4 className="text-3xl font-poppins font-bold text-brand-600 mb-1">
          <Counter value={stat.value} duration={2.5} />
        </h4>
        <p className="text-sm font-philosopher text-gray-600">{stat.label}</p>
      </div>
    </motion.div>
  ))}
</motion.div> */}
{/* Statistics Section ends */}

        {/* Customer Reviews Section */}
        {/* <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-poppins font-bold text-center text-brand-600 mb-8">
            What Our Partners Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                role: "Trader, Mumbai",
                comment: "Been sourcing from them for 10 years. Quality is always consistent!",
                rating: 5
              },
              {
                name: "Sarah Johnson",
                role: "Importer, USA",
                comment: "Their export documentation and product quality exceed expectations.",
                rating: 5
              },
              {
                name: "Ahmed Hassan",
                role: "Distributor, UAE",
                comment: "Reliable partner with authentic products. Highly recommended!",
                rating: 5
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-philosopher text-gray-600 mb-4 italic">"{review.comment}"</p>
                <div>
                  <p className="font-poppins font-semibold text-gray-800">{review.name}</p>
                  <p className="text-sm font-philosopher text-gray-500">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

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

      </div>
    </section>
  );
}