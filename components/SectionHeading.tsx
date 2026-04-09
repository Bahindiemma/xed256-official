"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-4">
          {label}
        </span>
      )}
      <h2 className="font-heading font-bold text-2xl xs:text-3xl md:text-4xl lg:text-5xl text-white text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
