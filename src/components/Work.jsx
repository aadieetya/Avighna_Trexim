import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Award, 
  FileCheck, 
  Building2, 
  Leaf, 
  Globe,
  X,
  CheckCircle,
  Lock
} from "lucide-react";
import IEC from "../assets/IEC.png"
import APEDA from "../assets/APEDA.png"
import GST from "../assets/GST.png"
import UDYAM from "../assets/UDYAM.png"
import FSSAI from "../assets/FSSAI.jpg"
import FIEO from "../assets/FIEO.jpg"

export default function Work() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      id: 1,
      name: "IEC Certificate",
      fullName: "Import Export Code Certificate",
      icon: Globe,
      color: "from-blue-500 to-blue-600",
      description: "Authorized for international trade operations",
      benefits: ["Global Trade Authorization", "Direct Export/Import Rights", "Government Recognized"],
      image: IEC
    },
    {
      id: 2,
      name: "GST Registration",
      fullName: "Goods and Services Tax Registration",
      icon: FileCheck,
      color: "from-green-500 to-green-600",
      description: "Compliant with Indian tax regulations",
      benefits: ["Tax Compliant", "Input Tax Credit", "Legal Business Entity"],
      image: GST
    },
    {
      id: 3,
      name: "UDYAM Certificate",
      fullName: "MSME Registration Certificate",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      description: "Registered Micro, Small & Medium Enterprise",
      benefits: ["Government Benefits", "Priority Sector Lending", "Subsidy Schemes"],
      image: UDYAM
    },
    {
      id: 4,
      name: "FSSAI Certificate",
      fullName: "Food Safety and Standards Authority of India",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      description: "Certified for food safety standards",
      benefits: ["Food Safety Certified", "Quality Assured", "Consumer Trust"],
      image: FSSAI
    },
    {
      id: 5,
      name: "APEDA Registration",
      fullName: "Agricultural & Processed Food Products Export Development Authority",
      icon: Leaf,
      color: "from-brand-500 to-brand-600",
      description: "Authorized agricultural products exporter",
      benefits: ["Export Subsidies", "Quality Certification", "Market Development"],
      image: APEDA
    },
    {
      id: 6,
      name: "FIEO Certificate",
      fullName: "Federation of Indian Export Organisations",
      icon: Award,
      color: "from-red-500 to-red-600",
      description: "Member of apex export promotion organization",
      benefits: ["Export Promotion", "Trade Facilitation", "Global Network Access"],
      image: FIEO
    }
  ];

  return (
    <section
      id="certifications"
      className="relative bg-gradient-to-b from-white to-secondary py-20 scroll-mt-28 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600 rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500 rounded-full filter blur-3xl opacity-5"></div>
      </div>

      <div className="container-px mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-brand-600" />
            <span className="text-sm font-philosopher text-brand-600">Certified Excellence</span>
          </div>
          <h2 className="mb-4 text-4xl font-poppins font-bold text-brand-600 sm:text-5xl">
            Our Certifications
          </h2>
          <p className="text-lg font-philosopher text-gray-600 max-w-2xl mx-auto">
            Backed by prestigious certifications ensuring quality, compliance, and trust in every transaction
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} text-white`}>
                        <Icon size={24} />
                      </div>
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-sm font-philosopher text-gray-600 mb-4">
                      {cert.description}
                    </p>
                    
                    {/* Benefits */}
                    <div className="space-y-1">
                      {cert.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="font-philosopher">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* View Certificate Link */}
                    <div className="mt-4 flex items-center gap-2 text-brand-600 group-hover:gap-3 transition-all">
                      <span className="text-sm font-poppins font-medium">View Certificate</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Statement */}
        <motion.div
          className="bg-brand-600 rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-poppins font-bold mb-4">
            Compliance You Can Trust
          </h3>
          <p className="font-philosopher text-lg opacity-90 max-w-3xl mx-auto">
            All our certifications are regularly updated and verified. We maintain the highest standards of compliance to ensure smooth and trustworthy business operations globally.
          </p>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`relative bg-gradient-to-br ${selectedCert.color} p-6 text-white`}>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-white/20">
                    <selectedCert.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-poppins font-bold">{selectedCert.name}</h3>
                    <p className="font-philosopher opacity-90">{selectedCert.fullName}</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Certificate Image */}
                  <div className="relative group">
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                      {/* Disable right-click and drag */}
                      <img
                        src={selectedCert.image}
                        alt={selectedCert.name}
                        className="w-full h-auto select-none pointer-events-none"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                      />
                      {/* Watermark overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-brand-600/10 font-poppins font-bold text-6xl rotate-[-45deg]">
                          AVIGHNA TREXIM
                        </div>
                      </div>
                    </div>
                    {/* Protected notice */}
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Lock className="w-3 h-3" />
                      <span className="font-philosopher">Protected Document</span>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div>
                    <h4 className="text-xl font-poppins font-semibold text-gray-800 mb-4">
                      About This Certification
                    </h4>
                    <p className="font-philosopher text-gray-600 mb-6">
                      {selectedCert.description}
                    </p>

                    <h5 className="text-lg font-poppins font-semibold text-gray-800 mb-3">
                      Key Benefits
                    </h5>
                    <div className="space-y-2 mb-6">
                      {selectedCert.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="font-philosopher text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-brand-50 rounded-lg border border-brand-200">
                      <p className="text-sm font-philosopher text-brand-800">
                        <strong className="font-poppins">Note:</strong> This certificate is regularly updated and maintained in compliance with all regulatory requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}