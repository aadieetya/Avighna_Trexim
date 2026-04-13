import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { X, Download, FileText, Send, Loader2 } from "lucide-react";

// ── Change this to your actual brochure filename placed inside /public ──
const BROCHURE_FILE = "/brochure.pdf";
const BROCHURE_DISPLAY_NAME = "Avighna-Trexim-Brochure.pdf";

export default function BrochureModal({ isOpen, onClose }) {
  const formRef = useRef();
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    company: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // "" | "loading" | "success" | "error"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.from_name.trim()) newErrors.from_name = "Name is required";
    if (!form.from_email.trim()) {
      newErrors.from_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.from_email)) {
      newErrors.from_email = "Enter a valid email";
    }
    if (!form.company.trim()) newErrors.company = "Company name is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const digits = form.phone.replace(/\D/g, "");
      if (digits.length < 7)  newErrors.phone = "Phone number is too short (min 7 digits)";
      if (digits.length > 15) newErrors.phone = "Phone number is too long (max 15 digits)";
    }
    return newErrors;
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = BROCHURE_FILE;
    link.download = BROCHURE_DISPLAY_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    // We send a hidden "subject" and "message" to reuse the existing template
    emailjs
      .send(
        "service_cq8w5ee",
        "template_jrlcvxd",
        {
          from_name: form.from_name,
          from_email: form.from_email,
          company: form.company || "—",
          phone: form.phone || "—",
          subject: "Brochure Download Lead",
          message: `This visitor requested the company brochure.\n\nName: ${form.from_name}\nEmail: ${form.from_email}\nCompany: ${form.company || "—"}\nPhone: ${form.phone || "—"}`,
        },
        "d_L0DLsWPVgN3DCDz"
      )
      .then(() => {
        setStatus("success");
        triggerDownload();
        // Reset and auto-close after 2.5 s
        setTimeout(() => {
          onClose();
          setForm({ from_name: "", from_email: "", company: "", phone: "" });
          setErrors({});
          setStatus("");
        }, 2500);
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header strip */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a3c6e 0%, #2563eb 100%)",
              }}
              className="px-6 pt-6 pb-10 text-white relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 rounded-xl p-2.5">
                  <FileText size={22} className="text-white" />
                </div>
                <span className="text-sm font-philosopher font-medium tracking-wide opacity-90">
                  FREE DOWNLOAD
                </span>
              </div>

              <h2 className="text-2xl font-poppins font-bold mb-1">
                Get Our Company Brochure
              </h2>
              <p className="text-sm font-philosopher opacity-80 leading-relaxed">
                Fill in a few quick details and your brochure will download
                immediately — no waiting, no spam.
              </p>

              {/* Decorative blob */}
              <div
                className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #93c5fd, transparent)" }}
              />
            </div>

            {/* Form card — overlaps header */}
            <div className="px-6 pb-6 -mt-5 relative">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download size={28} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-poppins font-bold text-gray-800 mb-2">
                      Download Started! 🎉
                    </h3>
                    <p className="text-sm font-philosopher text-gray-500">
                      Thank you! Your brochure should be downloading now. We'll
                      be in touch soon.
                    </p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4">
                      {/* Name & Email */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-philosopher font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="from_name"
                            type="text"
                            placeholder="John Doe"
                            value={form.from_name}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-3 py-2.5 text-sm font-philosopher outline-none transition-all ${
                              errors.from_name
                                ? "border-red-400 focus:ring-2 focus:ring-red-400"
                                : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                          />
                          {errors.from_name && (
                            <p className="mt-1 text-xs text-red-500 font-philosopher">
                              {errors.from_name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-philosopher font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="from_email"
                            type="email"
                            placeholder="you@company.com"
                            value={form.from_email}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-3 py-2.5 text-sm font-philosopher outline-none transition-all ${
                              errors.from_email
                                ? "border-red-400 focus:ring-2 focus:ring-red-400"
                                : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                          />
                          {errors.from_email && (
                            <p className="mt-1 text-xs text-red-500 font-philosopher">
                              {errors.from_email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Company & Phone */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-philosopher font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Company <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="company"
                            type="text"
                            placeholder="Acme Ltd."
                            value={form.company}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-3 py-2.5 text-sm font-philosopher outline-none transition-all ${
                              errors.company
                                ? "border-red-400 focus:ring-2 focus:ring-red-400"
                                : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                          />
                          {errors.company && (
                            <p className="mt-1 text-xs text-red-500 font-philosopher">
                              {errors.company}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-philosopher font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            placeholder="+91-XXXXXXXXXX"
                            value={form.phone}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-3 py-2.5 text-sm font-philosopher outline-none transition-all ${
                              errors.phone
                                ? "border-red-400 focus:ring-2 focus:ring-red-400"
                                : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            }`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500 font-philosopher">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Error (email send failure) */}
                      {status === "error" && (
                        <p className="text-xs text-red-500 font-philosopher text-center">
                          ❌ Something went wrong. Please try again.
                        </p>
                      )}

                      {/* Submit */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-poppins font-semibold text-white shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background:
                            "linear-gradient(135deg, #1a3c6e 0%, #2563eb 100%)",
                        }}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Download size={16} />
                            Download Brochure
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-gray-400 font-philosopher">
                        🔒 Your details are safe with us. No spam, ever.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
