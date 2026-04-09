"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const shortBio =
  "Xed 256 (Edward Muligirwa) is a genre-defying Ugandan artist from Fort Portal, blending Amapiano, Afrobeats, RnB, and Hip-Hop with Rutooro, English, and Luganda. Active since 2015, he is known for his tagline 'FortPortal Ni Dubai' and his hands-on approach to music production.";

const longBio = `Born and raised in the heart of Fort Portal, Uganda, Xed 256 is a genre-defying artist who bridges the gap between African tradition and global modernity. With a sound that fuses Amapiano, Afrobeats, RnB, Hip-Hop, and Pop — all woven through with his native Rutooro, Runyankore, Luganda, and English — Xed 256 creates music that speaks to the soul while moving the body.

Active since 2015, Xed 256 has carved a unique niche in Uganda's vibrant music scene. A hands-on producer who contributes to 70% of his production, he directs all his own music projects with a meticulous creative vision. His training at Swangz Avenue — Uganda's premier music label — sharpened his already formidable skills, adding industry-grade polish to his raw, authentic sound.

Beyond the mic, Xed 256 is a trained barrister and mixologist — a Renaissance man whose diverse experiences fuel his artistry. His music carries the warmth of Fort Portal's misty mountains, the energy of Kampala's nightlife, and the ambition of a Dubai skyline. "FortPortal Ni Dubai" isn't just a tagline — it's a declaration that greatness can come from anywhere.`;

const keyFacts = [
  { label: "Real Name", value: "Edward Muligirwa" },
  { label: "Origin", value: "Fort Portal, Uganda" },
  { label: "Genres", value: "Afrobeats, Amapiano, RnB, Hip-Hop, Pop" },
  { label: "Active Since", value: "2015" },
  { label: "Label", value: "Independent" },
  { label: "Contact", value: "muligirwaxed12@gmail.com" },
];

const pressPhotos = [
  {
    src: "/media/images/xed-2325.jpg",
    alt: "Xed 256 portrait shot",
    filename: "xed-256-portrait.jpg",
  },
  {
    src: "/media/images/xed-2076.jpg",
    alt: "Xed 256 performing live",
    filename: "xed-256-performance.jpg",
  },
  {
    src: "/media/images/xed-2067.jpg",
    alt: "Xed 256 on stage",
    filename: "xed-256-stage.jpg",
  },
  {
    src: "/media/images/xed-2326.jpg",
    alt: "Xed 256 editorial",
    filename: "xed-256-editorial.jpg",
  },
];

const pressCoverage = [
  {
    title: "The Case of Regional Artists Breaking Into Kampala",
    source: "Daily Monitor",
    url: "https://www.monitor.co.ug",
    type: "Print / Online",
  },
  {
    title: "XED256 Opens Up About Losing His Mom, Music & Life Beyond Fame",
    source: "Ugandan Boy Talk Show",
    url: "https://www.youtube.com/watch?v=hSLJNfI1cMI",
    type: "Video Interview",
  },
  {
    title: "Xed's Enchanted Melody — A Magical Tale of Music",
    source: "MCI Radio",
    url: "https://mciradio.live/xeds-enchanted-melody-a-magical-tale-of-music/",
    type: "Radio Feature",
  },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-heading font-semibold hover:bg-brand-gold/20 hover:border-brand-gold/40 transition-all duration-300"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-brand-gold">
              For Media & Press
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-brand-gold via-transparent to-transparent" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-heading font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6"
          >
            Press <span className="gradient-text">Kit</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-zinc-400 max-w-xl mx-auto"
          >
            Everything you need to feature Xed 256
          </motion.p>
        </div>
      </section>

      {/* Section 1: Bio */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-8">
              <span className="gradient-text">Biography</span>
            </h2>
          </motion.div>

          {/* Short Bio */}
          <motion.div {...fadeUp} className="mb-6">
            <div className="glass rounded-2xl p-6 md:p-8 glow-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-zinc-400">
                  Short Bio
                </h3>
                <CopyButton text={shortBio} label="Copy" />
              </div>
              <p className="text-zinc-300 leading-relaxed">{shortBio}</p>
            </div>
          </motion.div>

          {/* Long Bio */}
          <motion.div {...fadeUp}>
            <div className="glass rounded-2xl p-6 md:p-8 glow-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-zinc-400">
                  Full Bio
                </h3>
                <CopyButton text={longBio} label="Copy" />
              </div>
              <div className="space-y-4">
                {longBio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-zinc-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Key Facts */}
      <section className="py-16 px-4 md:px-8 bg-brand-darker">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-8">
              <span className="gradient-text">Key Facts</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
            {keyFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="glass rounded-2xl p-6 h-full border border-white/[0.06] hover:border-brand-gold/20 transition-colors duration-300">
                  <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-gold mb-2">
                    {fact.label}
                  </p>
                  <p className="text-white font-medium">{fact.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Press Photos */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
              <span className="gradient-text">Press Photos</span>
            </h2>
            <p className="text-zinc-500 text-sm mb-8">
              High-resolution images available for editorial use. Please credit &quot;Xed 256&quot; when publishing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pressPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="group relative rounded-2xl overflow-hidden glow-border">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <a
                      href={photo.src}
                      download={photo.filename}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-brand-gold text-black font-heading font-semibold text-sm hover:bg-brand-gold-light transition-colors duration-300"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Press Coverage */}
      <section className="py-16 px-4 md:px-8 bg-brand-darker">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-8">
              <span className="gradient-text">Press Coverage</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pressCoverage.map((item, i) => (
              <motion.div
                key={item.source}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full glass rounded-2xl p-6 border border-white/[0.06] hover:border-brand-gold/30 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(212,175,55,0.08)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-brand-gold/10 text-brand-gold text-[10px] font-heading font-semibold uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm mb-2 group-hover:text-brand-gold-light transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500">{item.source}</p>

                  <div className="flex items-center gap-1 mt-4 text-brand-gold text-xs font-heading font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Read</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Booking / Press Contact */}
      <section className="py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-8">
              <span className="gradient-text">Booking & Press Contact</span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp}>
            <div className="glass rounded-2xl p-8 md:p-10 glow-border max-w-2xl">
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                For press inquiries, interview requests, bookings, and collaboration proposals, please reach out through the contact details below.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:muligirwaxed12@gmail.com"
                      className="text-white hover:text-brand-gold transition-colors duration-300 font-medium"
                    >
                      muligirwaxed12@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                      Phone / WhatsApp
                    </p>
                    <a
                      href="tel:+256751155990"
                      className="text-white hover:text-brand-gold transition-colors duration-300 font-medium"
                    >
                      +256 751 155 990
                    </a>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                      Social Media
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <a
                        href="https://www.instagram.com/xed256"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 hover:text-brand-gold transition-colors duration-300"
                      >
                        Instagram
                      </a>
                      <span className="text-zinc-700">|</span>
                      <a
                        href="https://www.youtube.com/@xed256"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 hover:text-brand-gold transition-colors duration-300"
                      >
                        YouTube
                      </a>
                      <span className="text-zinc-700">|</span>
                      <a
                        href="https://www.tiktok.com/@xeduganda"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 hover:text-brand-gold transition-colors duration-300"
                      >
                        TikTok
                      </a>
                      <span className="text-zinc-700">|</span>
                      <a
                        href="https://x.com/xed256"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 hover:text-brand-gold transition-colors duration-300"
                      >
                        X
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
