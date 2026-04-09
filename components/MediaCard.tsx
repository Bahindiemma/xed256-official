"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface MediaCardProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  onClick?: () => void;
  icon?: "play" | "music" | "video";
}

export default function MediaCard({
  image,
  title,
  subtitle,
  badge,
  onClick,
  icon = "play",
}: MediaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden bg-brand-card border border-white/5 cursor-pointer card-hover"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
          >
            {icon === "play" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
            {icon === "music" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            )}
          </motion.div>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full bg-brand-gold/80 backdrop-blur-sm text-black">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading font-semibold text-white text-sm truncate group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-zinc-500 mt-1 truncate">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
