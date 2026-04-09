"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { artist } from "@/data/artist";

const eventTypes = ["Concert", "Private Event", "Festival", "Collaboration", "Other"] as const;

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  preferredDate: "",
  message: "",
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6 },
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(
      `Thank you, ${formData.name}! Your booking request has been received. We'll get back to you within 24-48 hours.`
    );

    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/media/images/xed-2073.jpg"
            alt="Xed 256"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/85 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 via-transparent to-brand-gold/5" />
        </div>

        {/* Animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-gold"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.05, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="hidden sm:block absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-gold"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gradient-to-r from-brand-gold to-transparent" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Bookings & Inquiries
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-heading font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-white leading-[0.95] mb-6"
          >
            Get In
            <br />
            <span className="gradient-text">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-zinc-300 max-w-lg leading-relaxed"
          >
            Ready to book Xed 256 for your next event? Have a collaboration in
            mind? Reach out and let&apos;s make it happen.
          </motion.p>
        </div>
      </section>

      {/* ========== FORM & INFO ========== */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* ===== FORM (3 cols) ===== */}
            <motion.div {...fadeUp} className="lg:col-span-3">
              <div className="glass rounded-2xl p-6 sm:p-8 md:p-10 glow-border">
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-2xl text-white mb-2">
                    Booking Request
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Fill out the form below and our team will respond within
                    24-48 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/25 transition-all duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/25 transition-all duration-300 text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone & Event Type row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+256 xxx xxx xxx"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/25 transition-all duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="eventType"
                        className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Event Type *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/25 transition-all duration-300 text-sm appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                        }}
                      >
                        <option value="" disabled className="bg-brand-dark text-zinc-500">
                          Select event type
                        </option>
                        {eventTypes.map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-brand-dark text-white"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/25 transition-all duration-300 text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your event, venue, expected audience, and any special requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/25 transition-all duration-300 text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-heading font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-brand-gold to-brand-gold-dark text-white hover:shadow-lg hover:shadow-brand-gold/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Booking Request
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* ===== SIDEBAR (2 cols) ===== */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Direct Contact */}
              <div className="glass rounded-2xl p-6 sm:p-8">
                <h3 className="font-heading font-bold text-lg text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-brand-gold"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  Direct Contact
                </h3>

                <div className="space-y-5">
                  {/* Phone */}
                  <a
                    href={`tel:${artist.phone}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/10 transition-colors">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-zinc-500 group-hover:text-brand-gold transition-colors"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-heading uppercase tracking-wider mb-1">
                        Phone / WhatsApp
                      </p>
                      <p className="text-sm text-white group-hover:text-brand-gold transition-colors">
                        {artist.phone}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${artist.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/10 transition-colors">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-zinc-500 group-hover:text-brand-gold transition-colors"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-heading uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <p className="text-sm text-white group-hover:text-brand-gold transition-colors break-all">
                        {artist.email}
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-zinc-500"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-heading uppercase tracking-wider mb-1">
                        Based In
                      </p>
                      <p className="text-sm text-white">
                        Fort Portal &amp; Kampala, Uganda
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Management */}
              <div className="glass rounded-2xl p-6 sm:p-8">
                <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-brand-gold"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  Management
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  For professional bookings, press inquiries, and business
                  collaborations, reach out through the form or contact us
                  directly.
                </p>
                <div className="px-4 py-3 rounded-xl bg-brand-gold/5 border border-brand-gold/10">
                  <p className="text-xs text-brand-gold font-heading uppercase tracking-wider mb-1">
                    Response Time
                  </p>
                  <p className="text-sm text-zinc-300">
                    Within 24-48 hours on business days
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-2xl p-6 sm:p-8">
                <h3 className="font-heading font-bold text-lg text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold-dark/10 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-brand-gold-dark"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </div>
                  Follow Xed 256
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      name: "Instagram",
                      url: artist.socialLinks.instagram,
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      ),
                      color: "hover:border-pink-500/30 hover:bg-pink-500/5",
                    },
                    {
                      name: "TikTok",
                      url: artist.socialLinks.tiktok,
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.17 8.17 0 005.58 2.18V11.7a4.83 4.83 0 01-3.77-1.24V6.69z" />
                        </svg>
                      ),
                      color: "hover:border-white/30 hover:bg-white/5",
                    },
                    {
                      name: "Twitter/X",
                      url: artist.socialLinks.twitter,
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                      color: "hover:border-blue-400/30 hover:bg-blue-400/5",
                    },
                    {
                      name: "YouTube",
                      url: artist.socialLinks.youtube,
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg>
                      ),
                      color: "hover:border-red-500/30 hover:bg-red-500/5",
                    },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white transition-all duration-300 ${social.color}`}
                    >
                      {social.icon}
                      <span className="text-sm font-heading font-medium">
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Note */}
              <div className="rounded-2xl p-5 border border-brand-gold/10 bg-brand-gold/[0.02]">
                <div className="flex gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-brand-gold flex-shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Available for performances across Uganda and
                    internationally. Travel arrangements can be discussed during
                    the booking process.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
