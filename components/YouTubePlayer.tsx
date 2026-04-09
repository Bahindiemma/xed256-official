"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  thumbnail?: string;
  autoplay?: boolean;
  className?: string;
}

export default function YouTubePlayer({
  videoId,
  title,
  thumbnail,
  autoplay = false,
  className = "",
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const ytThumbnail =
    thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-brand-card ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              src={ytThumbnail}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-brand-gold/30"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="#000"
                  className="ml-1"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </motion.div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-sm font-heading font-semibold text-white truncate">
                {title}
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Xed 256</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
              title={title}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
