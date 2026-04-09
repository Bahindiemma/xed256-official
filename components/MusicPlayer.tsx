"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import YouTubePlayer from "@/components/YouTubePlayer";
import { Track } from "@/types";

interface MusicPlayerProps {
  tracks: Track[];
}

function getTypeBadgeLabel(type?: Track["type"]): string {
  switch (type) {
    case "lyric-video":
      return "Lyric Video";
    case "official-video":
      return "Official Video";
    case "official-audio":
      return "Audio";
    default:
      return "Audio";
  }
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="glass rounded-3xl overflow-hidden glow-box">
      {/* Now Playing Header */}
      <div className="px-6 pt-6 pb-3 md:px-8 md:pt-8">
        <p className="text-xs text-brand-gold font-heading uppercase tracking-wider mb-1">
          Now Playing
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
          >
            <h3 className="font-heading font-bold text-xl md:text-2xl text-white truncate">
              {currentTrack.title}
            </h3>
            <p className="text-sm text-zinc-400 mt-0.5">
              Xed 256 &bull; {currentTrack.genre} &bull; {currentTrack.year}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* YouTube Player */}
      <div className="px-4 md:px-6">
        <YouTubePlayer
          videoId={currentTrack.youtubeId}
          title={currentTrack.title}
          thumbnail={currentTrack.coverImage}
          autoplay={isPlaying}
          className="rounded-2xl"
        />
      </div>

      {/* Playlist */}
      <div className="p-4 md:p-6 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-heading uppercase tracking-wider text-zinc-500">
            Playlist
          </h4>
          <span className="text-[10px] text-zinc-600 font-mono">
            {tracks.length} tracks
          </span>
        </div>

        <div className="max-h-[400px] overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent">
          {tracks.map((track, i) => {
            const isActive = currentTrack.id === track.id;

            return (
              <motion.button
                key={track.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15, ease: "easeOut" as const }}
                onClick={() => handleTrackSelect(track)}
                className={`w-full flex items-center gap-3 md:gap-4 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-brand-gold/10 border border-brand-gold/20"
                    : "border border-transparent hover:bg-white/[0.03]"
                }`}
              >
                {/* Track Number */}
                <span className="text-xs text-zinc-600 w-4 sm:w-6 text-right font-mono flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Cover Image */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={track.coverImage}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                  {isActive && isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex gap-0.5 items-end h-3">
                        {[1, 2, 3].map((bar) => (
                          <motion.div
                            key={bar}
                            className="w-0.5 bg-brand-gold rounded-full"
                            animate={{ height: ["4px", "12px", "4px"] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: bar * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & Genre */}
                <div className="flex-1 text-left min-w-0">
                  <p
                    className={`text-sm truncate ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-zinc-300"
                    }`}
                  >
                    {track.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-block text-[9px] uppercase tracking-wider font-heading text-brand-gold/70 bg-brand-gold/10 px-1.5 py-0.5 rounded">
                      {track.genre}
                    </span>
                  </div>
                </div>

                {/* Type Badge */}
                <span
                  className={`hidden sm:inline-block text-[9px] uppercase tracking-wider font-heading px-2 py-0.5 rounded-full flex-shrink-0 ${
                    track.type === "official-video"
                      ? "text-brand-gold bg-brand-gold/15 border border-brand-gold/20"
                      : track.type === "lyric-video"
                        ? "text-brand-gold-light bg-brand-gold-light/10 border border-brand-gold-light/15"
                        : "text-zinc-400 bg-zinc-800 border border-zinc-700/50"
                  }`}
                >
                  {getTypeBadgeLabel(track.type)}
                </span>

                {/* Duration */}
                <span className="text-xs text-zinc-600 font-mono flex-shrink-0">
                  {track.duration}
                </span>

                {/* Play indicator for active track */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" as const }}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-dark flex items-center justify-center flex-shrink-0 shadow-sm shadow-brand-gold/20"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
