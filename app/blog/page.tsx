"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6 },
};

const categoryColors: Record<string, string> = {
  Events: "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
  "Behind The Scenes": "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
  Features: "bg-brand-gold-dark/10 text-brand-gold-dark border-brand-gold-dark/20",
  Press: "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
};

function getCategoryStyle(category: string) {
  return categoryColors[category] || "bg-white/5 text-zinc-400 border-white/10";
}

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/media/images/xed-2067.jpg"
            alt="Xed 256"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/85 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 via-transparent to-brand-gold-dark/5" />
        </div>

        {/* Background particles */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.02, 0.06, 0.02],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.2,
              }}
              className="absolute rounded-full bg-brand-gold"
              style={{
                width: 100 + i * 60,
                height: 100 + i * 60,
                left: `${15 + i * 18}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
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
              Blog
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-heading font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl text-white leading-[0.95] mb-6"
          >
            News &
            <br />
            <span className="gradient-text">Updates</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-zinc-300 max-w-lg leading-relaxed"
          >
            Stories, announcements, and behind-the-scenes moments from the
            FortPortal Ni Dubai journey.
          </motion.p>
        </div>
      </section>

      {/* ========== FEATURED POST ========== */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp}
            onClick={() => setSelectedPost(featuredPost)}
            className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-card cursor-pointer hover:border-brand-gold/20 transition-all duration-500"
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 md:h-[450px] overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-card/80 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent md:hidden" />
                {/* Featured badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-heading font-semibold uppercase tracking-wider bg-brand-gold/20 text-brand-gold border border-brand-gold/30 backdrop-blur-sm">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full border ${getCategoryStyle(
                      featuredPost.category
                    )}`}
                  >
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {featuredPost.readTime} read
                  </span>
                </div>

                <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-4 group-hover:gradient-text transition-all duration-300 leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-brand-gold group-hover:gap-3 transition-all duration-300">
                    Read More
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== POST GRID ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        {/* Background glow */}
        <div className="hidden sm:block absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[180px]" />
        <div className="hidden sm:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/3 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            label="More Stories"
            title="Latest Articles"
            description="Dive deeper into the world of Xed 256. Music, culture, and everything in between."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                onClick={() => setSelectedPost(post)}
                className="group relative rounded-2xl overflow-hidden border border-white/5 bg-brand-card cursor-pointer hover:border-brand-gold/20 card-hover transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/20 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[9px] font-heading font-semibold uppercase tracking-wider rounded-full border backdrop-blur-sm ${getCategoryStyle(
                        post.category
                      )}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:gradient-text transition-all duration-300 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-zinc-500">
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== POST MODAL ========== */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
            onClick={() => setSelectedPost(null)}
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-brand-dark/90 backdrop-blur-sm" />

            {/* Modal content */}
            <motion.article
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl mx-4 my-8 sm:my-16 rounded-2xl overflow-hidden border border-white/10 bg-brand-card shadow-2xl shadow-black/50"
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
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
              </motion.button>

              {/* Hero image */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/40 to-transparent" />

                {/* Category & meta over image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-block px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full border backdrop-blur-sm ${getCategoryStyle(
                        selectedPost.category
                      )}`}
                    >
                      {selectedPost.category}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {selectedPost.readTime} read
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-10">
                <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                  <span className="text-sm text-zinc-500">
                    {formatDate(selectedPost.date)}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-sm text-zinc-500">By Xed 256</span>
                </div>

                {/* Render content with basic markdown-like formatting */}
                <div className="prose-custom space-y-4">
                  {selectedPost.content.split("\n\n").map((block, i) => {
                    if (block.startsWith("## ")) {
                      return (
                        <h3
                          key={i}
                          className="font-heading font-bold text-xl text-white mt-8 mb-3"
                        >
                          {block.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (block.startsWith("- ")) {
                      const items = block.split("\n");
                      return (
                        <ul key={i} className="space-y-2 ml-1">
                          {items.map((item, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={i}
                        className="text-sm sm:text-base text-zinc-300 leading-relaxed"
                      >
                        {block}
                      </p>
                    );
                  })}
                </div>

                {/* Share / Close */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 font-heading uppercase tracking-wider">
                      Share
                    </span>
                    <div className="flex gap-2">
                      {[
                        {
                          label: "Twitter",
                          icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          ),
                        },
                        {
                          label: "WhatsApp",
                          icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                            </svg>
                          ),
                        },
                      ].map((s) => (
                        <button
                          key={s.label}
                          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
                        >
                          {s.icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-2 rounded-full text-sm font-heading font-semibold bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
