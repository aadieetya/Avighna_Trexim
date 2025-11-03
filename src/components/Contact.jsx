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
  Building2
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
      details: ["+91-721-912-3487", "+91-744-788-5501", "+91-817-793-1733"],
      link: ["tel:+917219123487", "tel:+917447885501", "tel:+918177931733"],
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
            Contact <span className="text-brand-500">Avighna Trexim</span>
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
              className={`w-full rounded-lg border px-4 py-3 text-sm font-philosopher outline-none transition-all ${
                errors.from_name
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
              className={`w-full rounded-lg border px-4 py-3 text-sm font-philosopher outline-none transition-all ${
                errors.from_email
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
            className={`w-full resize-none rounded-lg border px-4 py-3 text-sm font-philosopher outline-none transition-all ${
              errors.message
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
          className={`text-center text-sm font-philosopher mt-4 ${
            success.startsWith("❌") ? "text-red-500" : "text-green-600"
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
    <div className="bg-brand-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
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
    <div className="grid gap-4 flex-grow">
      {contactInfo.map((info, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg bg-gray-50 ${info.color}`}>
              <info.icon size={24} />
            </div>

            <div className="flex-1">
              <h4 className="font-poppins font-semibold text-gray-800 mb-2">
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
                        className="block text-brand-600 hover:text-brand-700 font-philosopher transition-colors"
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
                        className="block text-brand-600 hover:text-brand-700 font-philosopher transition-colors"
                      >
                        {detail}
                      </a>
                    ))
                  )
                ) : (
                  // No link (e.g., address or hours)
                  info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 font-philosopher">
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
  </div>
</motion.div></div>
    </div>
    </motion.section>
  );
}
