"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface InstagramEmbedProps {
  url: string;
  postId: string;
  title: string;
  thumbnail?: string;
  type?: "reel" | "post";
}

function extractInstagramId(url: string): { id: string; type: "reel" | "p" } {
  const reelMatch = url.match(/\/reel\/([^/?]+)/);
  if (reelMatch) return { id: reelMatch[1], type: "reel" };
  const postMatch = url.match(/\/p\/([^/?]+)/);
  if (postMatch) return { id: postMatch[1], type: "p" };
  return { id: "", type: "reel" };
}

export default function InstagramEmbed({
  url,
  postId,
  title,
  thumbnail,
  type = "reel",
}: InstagramEmbedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = extractInstagramId(url);
  const embedId = id || postId;

  return (
    <>
      {/* Card trigger */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="group relative rounded-2xl overflow-hidden bg-brand-card border border-white/5 cursor-pointer card-hover"
      >
        <div className="relative aspect-[9/16] max-h-[280px] sm:max-h-[350px] overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-brand-card flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-brand-gold/50"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Play icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </div>
          </div>

          {/* Instagram badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-[9px] font-heading font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {type === "reel" ? "Reel" : "Post"}
            </span>
          </div>
        </div>

        <div className="p-3">
          <h4 className="text-xs font-heading font-semibold text-white truncate group-hover:text-brand-gold transition-colors">
            {title}
          </h4>
          <p className="text-[10px] text-zinc-500 mt-0.5">Live Performance</p>
        </div>
      </motion.div>

      {/* Modal with Instagram embed */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Title */}
              <h3 className="text-sm font-heading font-semibold text-white mb-3 truncate">
                {title}
              </h3>

              {/* Embed iframe */}
              <div className="rounded-2xl overflow-hidden bg-brand-card border border-white/10">
                <iframe
                  src={`https://www.instagram.com/${type === "reel" ? "reel" : "p"}/${embedId}/embed/`}
                  width="100%"
                  height="550"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full"
                />
              </div>

              {/* Fallback link */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-center text-xs text-zinc-500 hover:text-brand-gold transition-colors"
              >
                Open on Instagram &rarr;
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
