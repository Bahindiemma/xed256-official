"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import YouTubePlayer from "@/components/YouTubePlayer";
import InstagramEmbed from "@/components/InstagramEmbed";
import PhotoGallery from "@/components/PhotoGallery";
import {
  tracks,
  videos,
  performanceVideos,
  interviews,
  galleryImages,
} from "@/data/music";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" as const },
} as const;

const GENRE_FILTERS = [
  "All",
  "Afrobeats",
  "Amapiano",
  "RnB",
  "Hip-Hop",
  "Pop",
] as const;

export default function MusicPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [genreFilter, setGenreFilter] = useState<string>("All");

  const filteredTracks = useMemo(
    () =>
      genreFilter === "All"
        ? tracks
        : tracks.filter((t) => t.genre === genreFilter),
    [genreFilter]
  );

  return (
    <>
      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
        className="relative h-[70vh] min-h-[500px] flex flex-col overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-20">
          <Image
            src="/media/images/xed-2079.jpg"
            alt="Xed 256 performing live"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-brand-dark/50 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/15 via-transparent to-brand-gold/10" />
        </motion.div>

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-gold/10 blur-[80px]"
          />
        </div>

        {/* Breadcrumbs */}
        <div className="relative z-10">
          <Breadcrumbs />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex-1 flex items-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-gradient-to-r from-brand-gold to-transparent" />
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-brand-gold">
                Discography
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-heading font-bold text-3xl xs:text-4xl sm:text-6xl md:text-7xl text-white leading-[0.95] mb-4"
            >
              Music &{" "}
              <span className="gradient-text">Media</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-zinc-400 max-w-lg"
            >
              From the hills of Fort Portal to stages across East Africa
              — explore the sounds, visuals, and stories of Xed 256.
            </motion.p>
          </div>

          {/* Floating music icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute right-8 bottom-16 hidden lg:flex"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl glass flex items-center justify-center glow-box"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#musicGrad)"
                strokeWidth="1.5"
              >
                <defs>
                  <linearGradient
                    id="musicGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#D4A843" />
                    <stop offset="100%" stopColor="#F5D77A" />
                  </linearGradient>
                </defs>
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== YOUTUBE MUSIC PLAYER ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        {/* Background decoration */}
        <div className="hidden sm:block absolute top-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px]" />
        <div className="hidden sm:block absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px]" />

        <div className="max-w-6xl mx-auto relative">
          <SectionHeading
            label="Listen Now"
            title="All Tracks"
            description="From Afrobeats to Amapiano, RnB to Hip-Hop -- every track tells a story from Fort Portal to the world."
          />

          <motion.div {...fadeUp}>
            {/* Main YouTube Player */}
            <div className="mb-8">
              <YouTubePlayer
                videoId={currentTrack.youtubeId}
                title={currentTrack.title}
                thumbnail={currentTrack.coverImage}
                className="shadow-2xl shadow-brand-gold/10"
              />
            </div>

            {/* Genre Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:overflow-visible sm:justify-center mb-6">
              {GENRE_FILTERS.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setGenreFilter(genre)}
                  className={`flex-shrink-0 px-4 py-2 text-xs font-heading font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    genreFilter === genre
                      ? "bg-brand-gold text-black"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Scrollable Playlist */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent">
                {filteredTracks.map((track, i) => {
                  const isActive = currentTrack.id === track.id;
                  const trackNumber = tracks.indexOf(track) + 1;

                  return (
                    <button
                      key={track.id}
                      onClick={() => setCurrentTrack(track)}
                      className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all duration-200 group ${
                        isActive
                          ? "bg-brand-gold/10 border-l-2 border-brand-gold"
                          : "hover:bg-white/5 border-l-2 border-transparent"
                      } ${i < filteredTracks.length - 1 ? "border-b border-white/5" : ""}`}
                    >
                      {/* Track Number */}
                      <span
                        className={`w-7 text-center text-xs font-mono shrink-0 ${
                          isActive
                            ? "text-brand-gold font-bold"
                            : "text-zinc-600 group-hover:text-zinc-400"
                        }`}
                      >
                        {isActive ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="inline"
                          >
                            <rect x="4" y="4" width="4" height="16" rx="1">
                              <animate
                                attributeName="height"
                                values="16;8;16"
                                dur="0.8s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="y"
                                values="4;8;4"
                                dur="0.8s"
                                repeatCount="indefinite"
                              />
                            </rect>
                            <rect x="10" y="4" width="4" height="16" rx="1">
                              <animate
                                attributeName="height"
                                values="16;12;16"
                                dur="0.6s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="y"
                                values="4;6;4"
                                dur="0.6s"
                                repeatCount="indefinite"
                              />
                            </rect>
                            <rect x="16" y="4" width="4" height="16" rx="1">
                              <animate
                                attributeName="height"
                                values="16;10;16"
                                dur="0.7s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="y"
                                values="4;7;4"
                                dur="0.7s"
                                repeatCount="indefinite"
                              />
                            </rect>
                          </svg>
                        ) : (
                          trackNumber
                        )}
                      </span>

                      {/* Cover Image Thumbnail */}
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={track.coverImage}
                          alt={track.title}
                          fill
                          className="object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-brand-gold/20" />
                        )}
                      </div>

                      {/* Title & Genre */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-heading font-semibold truncate ${
                            isActive
                              ? "text-brand-gold"
                              : "text-white group-hover:text-brand-gold-light"
                          }`}
                        >
                          {track.title}
                        </p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                          {track.genre} &middot; {track.year}
                        </p>
                      </div>

                      {/* Duration */}
                      <span
                        className={`text-xs font-mono shrink-0 ${
                          isActive ? "text-brand-gold" : "text-zinc-500"
                        }`}
                      >
                        {track.duration}
                      </span>
                    </button>
                  );
                })}

                {filteredTracks.length === 0 && (
                  <div className="py-12 text-center text-zinc-500 text-sm">
                    No tracks in this genre yet.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== MUSIC VIDEOS ========== */}
      <section className="section-padding relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            label="Watch"
            title="Music Videos"
            description="Official music videos and lyric videos from Xed 256."
          />

          {/* 1 large + 3 smaller grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large featured video */}
            {videos[0] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:row-span-2"
              >
                <YouTubePlayer
                  videoId={videos[0].youtubeId}
                  title={videos[0].title}
                  thumbnail={videos[0].thumbnail}
                />
                <div className="mt-3">
                  <h3 className="font-heading font-semibold text-white text-sm">
                    {videos[0].title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider">
                    Music Video &middot; {videos[0].date}
                  </p>
                </div>
              </motion.div>
            )}

            {/* 3 smaller videos */}
            {videos.slice(1, 4).map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1, duration: 0.6 }}
              >
                <YouTubePlayer
                  videoId={video.youtubeId}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
                <div className="mt-3">
                  <h3 className="font-heading font-semibold text-white text-sm">
                    {video.title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider">
                    Music Video &middot; {video.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LIVE PERFORMANCES ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            label="On Stage"
            title="Live Performances"
            description="Raw energy, real moments. Watch Xed 256 bring the music to life on stages across Uganda."
          />

          <motion.div {...fadeUp}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {performanceVideos.map((perf, i) => (
                <motion.div
                  key={perf.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <InstagramEmbed
                    url={perf.instagramUrl}
                    postId={perf.instagramId}
                    title={perf.title}
                    thumbnail={perf.thumbnail}
                    type={perf.type}
                  />
                  <div className="mt-2 px-1">
                    <p className="text-[10px] text-zinc-500">
                      {perf.venue} &middot; {perf.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== INTERVIEWS & PRESS ========== */}
      <section className="section-padding relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            label="Press"
            title="Interviews & Press"
            description="Conversations, features, and coverage from across media."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {item.type === "video" && item.youtubeId ? (
                  /* Video interview with embedded player */
                  <div className="rounded-2xl overflow-hidden bg-brand-card border border-white/5 card-hover">
                    <YouTubePlayer
                      videoId={item.youtubeId}
                      title={item.title}
                      thumbnail={item.thumbnail}
                    />
                    <div className="p-4">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-heading font-semibold uppercase tracking-wider rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-2">
                        Video Interview
                      </span>
                      <h3 className="font-heading font-semibold text-white text-sm leading-snug mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500">
                        {item.source}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Article / Radio card */
                  <div className="rounded-2xl overflow-hidden bg-brand-card border border-white/5 card-hover group">
                    <div className="relative h-48 overflow-hidden">
                      {item.thumbnail && (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/40 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-heading font-semibold uppercase tracking-wider rounded-full ${
                            item.type === "article"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                              : "bg-green-500/20 text-green-400 border border-green-500/20"
                          }`}
                        >
                          {item.type === "article" ? "Article" : "Radio"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-white text-sm leading-snug mb-1 group-hover:text-brand-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 mb-4">
                        {item.source}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-xs inline-flex items-center gap-2"
                      >
                        {item.type === "article" ? (
                          <>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Read Article
                          </>
                        ) : (
                          <>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M3 18v-6a9 9 0 0118 0v6" />
                              <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                            </svg>
                            Listen
                          </>
                        )}
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PHOTO GALLERY ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[200px]" />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            label="Gallery"
            title="Photo Gallery"
            description="Capturing the energy, the vibe, the movement. Moments from the journey of Xed 256."
          />

          <motion.div {...fadeUp}>
            <PhotoGallery images={galleryImages} />
          </motion.div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/images/xed-2076.jpg"
            alt="Xed 256"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp}>
            <span className="inline-block px-4 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-6">
              Stay Connected
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              More Music <span className="gradient-text">Coming Soon</span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-sm md:text-base">
              Follow Xed 256 on all platforms to be the first to hear new
              releases, see exclusive content, and stay part of the movement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.youtube.com/@xed256"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                YouTube
              </a>
              <a
                href="https://www.instagram.com/xed256"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@xeduganda"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-brand-gold-dark/30 hover:border-brand-gold-dark/60 hover:bg-brand-gold-dark/10"
              >
                TikTok
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
