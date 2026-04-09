"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";

const upcomingEvents = events.filter((e) => e.status === "upcoming" || e.status === "sold-out");
const pastEvents = events.filter((e) => e.status === "past");

export default function EventsPage() {
  const [showPast, setShowPast] = useState(false);

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/media/images/xed-2079.jpg"
            alt="Xed 256 live performance"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/80 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 to-transparent" />
          {/* Neon accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 via-transparent to-brand-gold/5" />
        </div>

        {/* Animated background rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block absolute -top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full border border-brand-gold/5"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full border border-brand-gold/5"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gradient-to-r from-brand-gold to-transparent" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Live Shows
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-heading font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-white leading-[0.95] mb-6"
          >
            Experience
            <br />
            <span className="gradient-text">The Energy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-zinc-300 max-w-lg leading-relaxed"
          >
            From intimate showcases to festival stages, Xed 256 delivers
            electrifying performances that bring FortPortal Ni Dubai to life.
          </motion.p>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 sm:gap-8 mt-10"
          >
            {[
              { value: `${upcomingEvents.length}`, label: "Upcoming Shows" },
              { value: "50+", label: "Shows Performed" },
              { value: "5+", label: "Cities" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading font-bold text-2xl md:text-3xl gradient-text">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== UPCOMING EVENTS ========== */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Don't Miss Out"
            title="Upcoming Events"
            description="Secure your spot at the next Xed 256 live experience. Every show is a journey."
          />

          <div className="space-y-5">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="glass rounded-2xl p-12 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-brand-gold"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">
                  No Upcoming Shows
                </h3>
                <p className="text-sm text-zinc-400">
                  New dates are being announced soon. Follow Xed 256 on social
                  media to be the first to know.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ========== PAST EVENTS ========== */}
      {pastEvents.length > 0 && (
        <section className="section-padding bg-brand-darker relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/5 rounded-full blur-[150px]" />

          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] rounded-full bg-white/5 text-zinc-500 border border-white/5 mb-4">
                  Archive
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white">
                  Past Events
                </h2>
                <p className="mt-3 text-sm text-zinc-500 max-w-md">
                  A look back at some of the incredible shows and performances
                  that built the Xed 256 legacy.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPast(!showPast)}
                className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-semibold bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                {showPast ? "Hide" : "Show"} Past Events
                <motion.svg
                  animate={{ rotate: showPast ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </motion.button>
            </div>

            <AnimatePresence>
              {showPast && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-5 pb-4">
                    {pastEvents.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed preview */}
            {!showPast && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {pastEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setShowPast(true)}
                    className="group relative rounded-xl overflow-hidden border border-white/5 bg-brand-card/30 p-4 cursor-pointer hover:border-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-semibold text-sm text-zinc-400 group-hover:text-zinc-300 truncate transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-xs text-zinc-600 mt-1">
                          {event.venue} &bull; {event.city}
                        </p>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ========== CTA ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-darker" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/3 rounded-full blur-[180px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Want Xed 256 at
              <br />
              <span className="gradient-text">Your Event?</span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Book Xed 256 for concerts, festivals, private events, and
              collaborations. Let&apos;s create something unforgettable.
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Book Now
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
