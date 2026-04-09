"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import MediaCard from "@/components/MediaCard";
import ProductCard from "@/components/ProductCard";
import EventCard from "@/components/EventCard";
import { artist } from "@/data/artist";
import { tracks } from "@/data/music";
import { products } from "@/data/products";
import { events } from "@/data/events";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredTracks = tracks.filter((t) => t.featured);
  const featuredProducts = products.filter((p) => p.featured);
  const upcomingEvents = events.filter((e) => e.status === "upcoming").slice(0, 3);

  return (
    <>
      {/* ========== HERO ========== */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-80 -right-[240px]">
          <Image
            src="/media/images/xed-2067.jpg"
            alt="Xed 256 performing"
            fill
            priority
            className="object-contain object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-transparent" />
          {/* Color overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 via-transparent to-brand-gold/10" />
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border border-brand-gold/5 hidden sm:block"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full border border-brand-gold/5 hidden sm:block"
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-gradient-to-r from-brand-gold to-transparent" />
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Ugandan Artist
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-heading font-bold text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-6"
            >
              Fort
              <span className="gradient-text">Portal</span>
              <br />
              Ni Dubai
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-lg mb-8 sm:mb-10 leading-relaxed"
            >
              {artist.shortBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Link href="/music" className="btn-primary w-full xs:w-auto text-center">
                Listen Now
              </Link>
              <Link href="/store" className="btn-outline w-full xs:w-auto text-center">
                Shop Merch
              </Link>
              <Link
                href="/contact"
                className="btn-outline w-full xs:w-auto text-center border-brand-gold/30 hover:border-brand-gold/60 hover:bg-brand-gold/10"
              >
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

      {/* ========== MARQUEE ========== */}
      <section className="py-6 border-y border-white/5 overflow-hidden bg-brand-darker">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-heading font-bold text-2xl md:text-3xl text-white/[0.03] uppercase tracking-wider"
            >
              XED 256 &bull; FortPortal Ni Dubai &bull; Afrobeats &bull; Amapiano &bull; RnB &bull;
            </span>
          ))}
        </div>
      </section>

      {/* ========== FEATURED MUSIC ========== */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Latest Releases"
            title="Featured Music"
            description="Experience the sound of FortPortal Ni Dubai. A fusion of Afrobeats, Amapiano, RnB, and Hip-Hop."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTracks.map((track, i) => (
              <motion.div key={track.id} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <MediaCard
                  image={track.coverImage}
                  title={track.title}
                  subtitle={`${track.genre} • ${track.year}`}
                  badge={i === 0 ? "New" : undefined}
                  icon="music"
                />
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link href="/music" className="btn-outline">
              View All Music
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== ABOUT PREVIEW ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glow-border">
                <Image
                  src="/media/images/xed-2325.jpg"
                  alt="Xed 256 portrait"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 glow-box"
              >
                <p className="font-heading font-bold text-3xl gradient-text">10+</p>
                <p className="text-xs text-zinc-400 mt-1">Years in Music</p>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6">
                The Artist
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                From Fort Portal
                <br />
                <span className="gradient-text">To The World</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {artist.bio.split("\n\n")[0]}
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
                {[
                  { label: "Tracks", value: "9+" },
                  { label: "Shows", value: "50+" },
                  { label: "Genres", value: "5" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading font-bold text-2xl text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-primary">
                Read Full Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== UPCOMING EVENTS ========== */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Live Shows"
            title="Upcoming Events"
            description="Catch Xed 256 live. Nothing beats the energy of a real performance."
          />

          <div className="space-y-4">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link href="/events" className="btn-outline">
              View All Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== STORE PREVIEW ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            label="Official Merch"
            title="Represent the Movement"
            description="Wear the brand. FortPortal Ni Dubai merchandise — designed for those who dare to be different."
          />

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link href="/store" className="btn-primary">
              Shop All
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== CTA / NEWSLETTER ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/images/xed-2079.jpg"
            alt="Xed 256"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Join The
              <br />
              <span className="gradient-text">Movement</span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Stay updated with new releases, tour dates, and exclusive content from Xed 256.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-gold/50 transition-colors text-sm"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
