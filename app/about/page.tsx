"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { artist } from "@/data/artist";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const stats = [
  { value: "10+", label: "Years Active", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "50+", label: "Live Shows", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3m0 0L9.5 7.5M12 3l2.5 4.5" },
  { value: "9+", label: "Original Tracks", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" },
  { value: "5", label: "Genres", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
];

const socialPlatforms = [
  {
    name: "Instagram",
    url: artist.socialLinks.instagram,
    color: "from-pink-500 to-purple-600",
    hoverBorder: "hover:border-pink-500/40",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: artist.socialLinks.tiktok,
    color: "from-cyan-400 to-pink-500",
    hoverBorder: "hover:border-cyan-400/40",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.2v-3.46a4.83 4.83 0 01-3.77-1.48V6.69h3.77z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    url: artist.socialLinks.twitter,
    color: "from-zinc-300 to-zinc-500",
    hoverBorder: "hover:border-zinc-400/40",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: artist.socialLinks.youtube,
    color: "from-red-500 to-red-700",
    hoverBorder: "hover:border-red-500/40",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bioSections = artist.bio.split("\n\n");

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-20">
          <Image
            src="/media/images/xed-2325.jpg"
            alt="Xed 256 portrait"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/60 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 via-transparent to-brand-gold/5" />
        </motion.div>

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block absolute -top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full border border-brand-gold/5"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full border border-brand-gold/5"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-brand-gold/10 blur-[100px]"
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-px bg-gradient-to-r from-brand-gold to-transparent" />
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-brand-gold">
                About the Artist
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-heading font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6"
            >
              The Story of{" "}
              <br className="hidden sm:block" />
              <span className="gradient-text">Xed 256</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-zinc-300 max-w-lg leading-relaxed mb-4"
            >
              {artist.realName}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-zinc-500 text-sm max-w-md leading-relaxed"
            >
              {artist.shortBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/music" className="btn-primary">
                Listen to Music
              </Link>
              <Link href="/contact" className="btn-outline">
                Book Xed
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-heading">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== BIO SECTION ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/3 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Portrait Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glow-border sticky top-28">
                <Image
                  src={artist.profileImage}
                  alt={`${artist.name} portrait`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-heading font-bold text-xl text-white">
                    {artist.name}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {artist.realName} &bull; {artist.tagline}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div {...fadeUp}>
                <span className="inline-block px-4 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6">
                  Biography
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-2 leading-tight">
                  From Fort Portal{" "}
                  <span className="gradient-text">To The World</span>
                </h2>
              </motion.div>

              {bioSections.map((paragraph, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 border border-white/5">
                    <p className="text-zinc-300 leading-relaxed md:text-lg">
                      {paragraph}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Quick facts */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="glass rounded-2xl p-6 md:p-8 border border-brand-gold/10"
              >
                <h3 className="font-heading font-semibold text-brand-gold text-sm uppercase tracking-wider mb-4">
                  Quick Facts
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500">Real Name</p>
                    <p className="text-white font-medium">{artist.realName}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Origin</p>
                    <p className="text-white font-medium">Fort Portal, Uganda</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Languages</p>
                    <p className="text-white font-medium">Rutooro, Runyankore, Luganda, English</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Also Known As</p>
                    <p className="text-white font-medium">Barrister, Mixologist, Producer</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ACHIEVEMENT TIMELINE ========== */}
      <section className="section-padding relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <SectionHeading
            label="Journey"
            title="The Timeline"
            description="A decade of music, growth, and relentless pursuit of greatness."
          />

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-gold to-brand-gold/20" />

            <div className="space-y-8 md:space-y-12">
              {artist.achievements.map((achievement, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={achievement.year}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`relative flex items-center gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="w-4 h-4 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold shadow-lg shadow-brand-gold/30"
                      />
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        className="absolute inset-0 rounded-full bg-brand-gold/20"
                      />
                    </div>

                    {/* Content Card */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="glass rounded-2xl p-6 glow-border card-hover"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 text-xs font-heading font-bold rounded-full bg-gradient-to-r from-brand-gold/20 to-brand-gold/20 text-brand-gold border border-brand-gold/20">
                            {achievement.year}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-lg text-white mb-2">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {achievement.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[200px]" />

        <div className="max-w-5xl mx-auto relative">
          <SectionHeading
            label="By The Numbers"
            title="The Impact"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass-strong rounded-2xl p-6 md:p-8 text-center glow-border group cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/20 flex items-center justify-center group-hover:from-brand-gold/30 group-hover:to-brand-gold/30 transition-all duration-500">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#statGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <defs>
                      <linearGradient id="statGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#00F0FF" />
                      </linearGradient>
                    </defs>
                    <path d={stat.icon} />
                  </svg>
                </div>

                <motion.p
                  className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-1"
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs md:text-sm text-zinc-500 font-heading uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SOCIAL LINKS SECTION ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/images/xed-2076.jpg"
            alt="Xed 256 background"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <SectionHeading
            label="Connect"
            title="Follow The Movement"
            description="Join the community across all platforms. Be part of the FortPortal Ni Dubai movement."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialPlatforms.map((platform, i) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`glass rounded-2xl p-6 flex items-center gap-5 border border-white/5 ${platform.hoverBorder} transition-all duration-500 group card-hover`}
              >
                {/* Icon container */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center flex-shrink-0 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-500`}>
                  {platform.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-white group-hover:gradient-text transition-all duration-300">
                    {platform.name}
                  </p>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">
                    {platform.url.replace("https://www.", "").replace("https://", "")}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  className="text-zinc-600 group-hover:text-white transition-colors duration-300 flex-shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
                  </svg>
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-12 text-center"
          >
            <div className="glass-strong rounded-3xl p-8 md:p-12 glow-box">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
                Want to Work with <span className="gradient-text">Xed 256</span>?
              </h3>
              <p className="text-zinc-400 text-sm md:text-base mb-6 max-w-md mx-auto">
                For bookings, collaborations, and press inquiries, get in touch.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary">
                  Get In Touch
                </Link>
                <Link href="/music" className="btn-outline">
                  Explore Music
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
