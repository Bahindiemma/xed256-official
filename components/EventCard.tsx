"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Event } from "@/types";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const isPast = event.status === "past";
  const isSoldOut = event.status === "sold-out";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 ${
        isPast
          ? "bg-brand-card/50 border-white/5 opacity-70"
          : "bg-brand-card border-white/5 hover:border-brand-gold/20 card-hover"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-card/90 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 to-transparent md:hidden" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Date badge */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-xs font-heading font-semibold text-brand-gold uppercase tracking-wider">
                  {isPast ? "Past Event" : isSoldOut ? "Sold Out" : "Upcoming"}
                </span>
              </div>
              <span className="text-xs text-zinc-500">
                {formatDate(event.date)}
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:gradient-text transition-all duration-300">
              {event.title}
            </h3>

            <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {event.venue}, {event.city}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {event.time}
              </span>
            </div>
          </div>

          {/* CTA */}
          {!isPast && (
            <div className="mt-6">
              {isSoldOut ? (
                <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-heading font-semibold bg-white/5 text-zinc-500 cursor-not-allowed">
                  Sold Out
                </span>
              ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={`/events/tickets/${event.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-heading font-semibold bg-gradient-to-r from-brand-gold to-brand-gold-dark text-black hover:shadow-lg hover:shadow-brand-gold/25 transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Get Tickets
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
