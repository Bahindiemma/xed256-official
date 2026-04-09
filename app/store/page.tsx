"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import { products } from "@/data/products";

type Category = "all" | "merch" | "digital";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "merch", label: "Merchandise" },
  { key: "digital", label: "Digital" },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { currency, setCurrency } = useCart();

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/media/images/xed-2066.jpg"
            alt="Xed 256 Store"
            fill
            priority
            className="object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/80 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 via-transparent to-brand-gold/5" />
        </div>

        {/* Decorative rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block absolute -top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full border border-brand-gold/5"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full border border-brand-gold/5"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-gold" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Xed 256
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-brand-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-6"
          >
            Official{" "}
            <span className="gradient-text">Store</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto mb-4"
          >
            Wear the movement. FortPortal Ni Dubai merch and exclusive digital releases.
          </motion.p>
        </div>
      </section>

      {/* ========== FILTERS & GRID ========== */}
      <section className="section-padding -mt-8">
        <div className="max-w-7xl mx-auto">
          {/* Controls row */}
          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12"
          >
            {/* Category tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full glass border border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative px-5 py-2 text-xs font-heading font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {activeCategory === cat.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold opacity-20"
                      style={{ borderRadius: 9999 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Currency toggle */}
            <div className="flex items-center gap-2 p-1.5 rounded-full glass border border-white/5">
              {(["USD", "UGX"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`relative px-5 py-2 text-xs font-heading font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    currency === c
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {currency === c && (
                    <motion.div
                      layoutId="currencyTab"
                      className="absolute inset-0 rounded-full bg-brand-gold/20 border border-brand-gold/30"
                      style={{ borderRadius: 9999 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">
                    {c === "USD" ? "$ USD" : "UGX"}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product count */}
          <motion.p
            {...fadeUp}
            className="text-xs text-zinc-500 font-heading uppercase tracking-wider mb-6"
          >
            Showing {filtered.length} product{filtered.length !== 1 && "s"}
          </motion.p>

          {/* Product grid */}
          <motion.div layout className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-zinc-500 font-heading text-lg">
                No products found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="section-padding bg-brand-darker relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp}>
            <SectionHeading
              label="FortPortal Ni Dubai"
              title="Represent The Movement"
              description="Every piece tells a story. From the streets of Fort Portal to the stages of the world — wear your identity."
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
