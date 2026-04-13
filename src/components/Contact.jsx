import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Clock,
  Send,
  Building2,
  Share2
} from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validate = () => {
    let newErrors = {};
    if (!form.from_name.trim()) newErrors.from_name = "Name is required";
    if (!form.from_email.trim()) {
      newErrors.from_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.from_email)) {
      newErrors.from_email = "Enter a valid email";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    emailjs
      .sendForm(
        "service_cq8w5ee",
        "template_jrlcvxd",
        formRef.current,
        "d_L0DLsWPVgN3DCDz"
      )
      .then(
        () => {
          setSuccess("✅ Message sent successfully! We'll get back to you soon.");
          setForm({ from_name: "", from_email: "", company: "", phone: "", subject: "", message: "" });
          setErrors({});
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setSuccess("❌ Failed to send message. Please try again later.");
          setLoading(false);
        }
      );
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Main Street, Devlali Camp", "Nashik, Maharashtra, India"],
      color: "text-red-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@avighnatrexim.com"],
      link: "mailto:info@avighnatrexim.com",
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91-954-545-1755"],
      link: ["tel:+919545451755"],
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday", "9:00 AM - 6:00 PM IST"],
      color: "text-purple-600"
    }
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      id="contact"
      className="relative py-20 bg-gradient-to-b from-white to-secondary scroll-mt-28 overflow-hidden"
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
          initial={{ y: -40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Building2 className="w-6 h-6 text-brand-600" />
            <span className="text-sm font-philosopher text-brand-600">Get In Touch</span>
          </div>
          <h2 className="mb-4 text-4xl font-poppins font-thin text-brand-600 sm:text-5xl">
            Contact <span className="text-brand-500">Avighnaa Trexim</span>
          </h2>
          <p className="text-lg font-philosopher text-gray-600 max-w-2xl mx-auto">
            Ready to take your business global? Let's discuss how we can help you succeed in international trade
          </p>
        </motion.div>
        <div className="grid gap-12 lg:grid-cols-2 items-stretch">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full"
          >
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="flex flex-col h-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-poppins font-bold text-gray-800 mb-6">
                Send Us a Message
              </h3>

              <div className="grid gap-5 flex-grow">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-philosopher text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      name="from_name"
                      type="text"
                      placeholder="John Doe"
                      value={form.from_name}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-3 text-sm font-philosopher outline-none transition-all ${errors.from_name
                        ? "border-red-400 focus:ring-2 focus:ring-red-400"
                        : "border-gray-200 focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
                        }`}
                    />
                    {errors.from_name && (
                      <p className="mt-1 text-sm text-red-500 font-philosopher">
                        {errors.from_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-philosopher text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      name="from_email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.from_email}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-3 text-sm font-philosopher outline-none transition-all ${errors.from_email
                        ? "border-red-400 focus:ring-2 focus:ring-red-400"
                        : "border-gray-200 focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
                        }`}
                    />
                    {errors.from_email && (
                      <p className="mt-1 text-sm text-red-500 font-philosopher">
                        {errors.from_email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company and Phone Row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-philosopher text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      name="company"
                      type="text"
                      placeholder="Your Company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-philosopher focus:ring-2 focus:ring-brand-600 focus:border-brand-600 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-philosopher text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+91-9999999999"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-philosopher focus:ring-2 focus:ring-brand-600 focus:border-brand-600 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-philosopher text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-philosopher focus:ring-2 focus:ring-brand-600 focus:border-brand-600 outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-philosopher text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your requirements..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full resize-none rounded-lg border px-4 py-3 text-sm font-philosopher outline-none transition-all ${errors.message
                      ? "border-red-400 focus:ring-2 focus:ring-red-400"
                      : "border-gray-200 focus:ring-2 focus:ring-brand-600 focus:border-brand-600"
                      }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 font-philosopher">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="mt-auto w-full rounded-lg bg-brand-600 px-6 py-3 font-poppins font-medium text-white shadow-lg hover:bg-brand-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success / Error Message */}
              {success && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center text-sm font-philosopher mt-4 ${success.startsWith("❌") ? "text-red-500" : "text-green-600"
                    }`}
                >
                  {success}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full lg:pl-8"
          >
            <div className="flex flex-col h-full">
              {/* Company Info Card */}
              <div className="bg-brand-600 rounded-2xl p-6 text-white mb-5 shadow-xl">
                <h3 className="text-2xl font-poppins font-bold mb-4">
                  Ready to Go Global?
                </h3>
                <p className="font-philosopher opacity-90 mb-6">
                  With our expertise in agricultural exports and strong network across
                  20+ countries, we're your trusted partner for international trade
                  success.
                </p>
                <div className="flex items-center gap-4">
                  <Globe className="w-12 h-12 opacity-80" />
                  <div>
                    <p className="font-poppins font-semibold">Worldwide Shipping</p>
                    <p className="text-sm font-philosopher opacity-80">
                      Direct from Nashik farms
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-2 gap-3 flex-grow">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col gap-3">
                      <div className={`p-2.5 rounded-lg bg-gray-50 w-fit ${info.color}`}>
                        <info.icon size={20} />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-poppins font-semibold text-gray-800 mb-1.5 text-sm">
                          {info.title}
                        </h4>

                        <div className="space-y-1">
                          {info.link ? (
                            Array.isArray(info.link) ? (
                              // Multiple links (e.g., phone numbers)
                              info.details.map((detail, idx) => (
                                <a
                                  key={idx}
                                  href={info.link[idx] ?? info.link[0]}
                                  className="block text-brand-600 hover:text-brand-700 font-philosopher text-sm transition-colors"
                                >
                                  {detail}
                                </a>
                              ))
                            ) : (
                              // Single link (e.g., email)
                              info.details.map((detail, idx) => (
                                <a
                                  key={idx}
                                  href={info.link}
                                  className="block text-brand-600 hover:text-brand-700 font-philosopher text-sm transition-colors"
                                >
                                  {detail}
                                </a>
                              ))
                            )
                          ) : (
                            // No link (e.g., address or hours)
                            info.details.map((detail, idx) => (
                              <p key={idx} className="text-gray-600 font-philosopher text-sm">
                                {detail}
                              </p>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Corner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mt-4"
              >
                <h4 className="font-poppins font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Share2 size={18} className="text-brand-600" />
                  Social Media Corner
                </h4>
                <div className="flex items-center gap-3">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/avighnaatrexim"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: "#0A66C2" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/avighnaatrexim/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/avighnaatrexim"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: "#1877F2" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <p className="text-sm font-philosopher text-gray-500 ml-1">
                    Follow us & stay updated
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div></div>
      </div>
    </motion.section>
  );
}
