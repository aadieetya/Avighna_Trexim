import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { X, FlaskConical, Send, Loader2, CheckCircle2 } from "lucide-react";

const PRODUCTS = [
  "Garlic Powder",
  "Dried Garlic Flakes",
  "Dehydrated Onion Flakes",
  "Dehydrated Onion Powder",
  "Pulses and Grains",
  "Rice",
];

const QUANTITIES = ["1 kg", "2 kg", "5 kg"];

export default function SampleModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    company: "",
    phone: "",
    product: "",
    quantity: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // "" | "loading" | "success" | "error"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.from_name.trim()) errs.from_name = "Name is required";
    if (!form.from_email.trim()) {
      errs.from_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.from_email)) {
      errs.from_email = "Enter a valid email";
    }
    if (!form.company.trim()) errs.company = "Company name is required";
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else {
      const digits = form.phone.replace(/\D/g, "");
      if (digits.length < 7)  errs.phone = "Phone number is too short (min 7 digits)";
      if (digits.length > 15) errs.phone = "Phone number is too long (max 15 digits)";
    }
    if (!form.product)  errs.product  = "Please select a product";
    if (!form.quantity) errs.quantity = "Please select a quantity";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    emailjs
      .send(
        "service_cq8w5ee",
        "template_jrlcvxd",
        {
          from_name: form.from_name,
          from_email: form.from_email,
          company: form.company || "—",
          phone: form.phone || "—",
          subject: `Sample Request — ${form.product}`,
          message: `A visitor has requested a product sample.\n\nProduct: ${form.product}\nQuantity: ${form.quantity}\nName: ${form.from_name}\nEmail: ${form.from_email}\nCompany: ${form.company || "—"}\nPhone: ${form.phone || "—"}`,
        },
        "d_L0DLsWPVgN3DCDz"
      )
      .then(() => {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setForm({ from_name: "", from_email: "", company: "", phone: "", product: "", quantity: "" });
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

  const selectClass = (field) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm font-philosopher outline-none transition-all bg-white appearance-none cursor-pointer ${errors[field]
      ? "border-red-400 focus:ring-2 focus:ring-red-400"
      : "border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
    }`;

  const inputClass = (field) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm font-philosopher outline-none transition-all ${errors[field]
      ? "border-red-400 focus:ring-2 focus:ring-red-400"
      : "border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
    }`;

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
            {/* Header */}
            <div
              style={{ background: "linear-gradient(135deg, #92400e 0%, #f97316 100%)" }}
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
                  <FlaskConical size={22} className="text-white" />
                </div>
                <span className="text-sm font-philosopher font-medium tracking-wide opacity-90">
                  REQUEST SAMPLE
                </span>
              </div>

              <h2 className="text-2xl font-poppins font-bold mb-1">Order a Sample</h2>
              <p className="text-sm font-philosopher opacity-80 leading-relaxed">
                Tell us what you'd like to try. We'll ship a sample directly to you — no commitment.
              </p>

              {/* Decorative blob */}
              <div
                className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #fed7aa, transparent)" }}
              />
            </div>

            {/* Form card */}
            <div className="px-6 pb-6 -mt-5 relative">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} className="text-orange-500" />
                    </div>
                    <h3 className="text-lg font-poppins font-bold text-gray-800 mb-2">
                      Request Submitted! 🎉
                    </h3>
                    <p className="text-sm font-philosopher text-gray-500">
                      Thank you! Our team will process your sample request and reach out soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
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
                            className={inputClass("from_name")}
                          />
                          {errors.from_name && (
                            <p className="mt-1 text-xs text-red-500 font-philosopher">{errors.from_name}</p>
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
                            className={inputClass("from_email")}
                          />
                          {errors.from_email && (
                            <p className="mt-1 text-xs text-red-500 font-philosopher">{errors.from_email}</p>
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
                            className={inputClass("company")}
                          />
                          {errors.company && (
                            <p className="mt-1 text-xs text-red-500 font-philosopher">{errors.company}</p>
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
                            className={inputClass("phone")}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500 font-philosopher">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Product dropdown */}
                      <div>
                        <label className="block text-xs font-philosopher font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                          Product <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            className={selectClass("product")}
                          >
                            <option value="">— Select a product —</option>
                            {PRODUCTS.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.product && (
                          <p className="mt-1 text-xs text-red-500 font-philosopher">{errors.product}</p>
                        )}
                      </div>

                      {/* Quantity dropdown */}
                      <div>
                        <label className="block text-xs font-philosopher font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                          Sample Quantity <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            className={selectClass("quantity")}
                          >
                            <option value="">— Select quantity —</option>
                            {QUANTITIES.map((q) => (
                              <option key={q} value={q}>{q}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.quantity && (
                          <p className="mt-1 text-xs text-red-500 font-philosopher">{errors.quantity}</p>
                        )}
                      </div>

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
                        style={{ background: "linear-gradient(135deg, #92400e 0%, #f97316 100%)" }}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending Request…
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Request Sample
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
