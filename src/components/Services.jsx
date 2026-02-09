import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../data/servicesData";

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-white to-secondary py-20 scroll-mt-28"
    >
      <div className="container-px mx-auto max-w-7xl">
        {/* Heading */}
        <motion.h2
          className="mb-4 text-center text-4xl font-poppins font-bold text-brand-600 sm:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Products
        </motion.h2>
        
        <motion.p
          className="mb-12 text-center text-lg font-philosopher text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Discover our premium range of agricultural products, sourced directly from the finest farms and processing units.
        </motion.p>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-secondary/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="mb-3 text-xl font-poppins font-semibold text-brand-600">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm font-philosopher text-gray-600 line-clamp-3">
                  {service.desc}
                </p>
                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-poppins font-medium text-white transition-all hover:bg-brand-700 hover:gap-3"
                >
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Image */}
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedService.img}
                  alt={selectedService.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="absolute bottom-6 left-6 right-6 text-3xl font-poppins font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                {selectedService.details?.specs && (
                  <div className="mb-8">
                    <h4 className="mb-4 text-xl font-poppins font-semibold text-brand-600">
                      Product Specifications
                    </h4>
                    <div className="overflow-hidden rounded-lg border border-secondary">
                      <table className="w-full">
                        <tbody>
                          {selectedService.details.specs.map((spec, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-secondary/30' : 'bg-white'}>
                              <td className="py-3 px-4 font-poppins font-medium text-gray-700 border-r border-secondary">
                                {spec.label}
                              </td>
                              <td className="py-3 px-4 font-philosopher text-gray-600">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {selectedService.details?.description && (
                  <div className="mb-8">
                    <h4 className="mb-4 text-xl font-poppins font-semibold text-brand-600">
                      Product Description
                    </h4>
                    <p className="font-philosopher text-gray-700 leading-relaxed">
                      {selectedService.details.description}
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="rounded-lg border border-brand-600 px-6 py-2 font-poppins font-medium text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                  >
                    Close
                  </button>
                  {/* <button
                    className="rounded-lg bg-brand-600 px-6 py-2 font-poppins font-medium text-white transition-colors hover:bg-brand-700"
                  >
                    Contact for Inquiry
                  </button> */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}