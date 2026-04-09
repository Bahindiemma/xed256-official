"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem, currency, setCurrency } = useCart();

  const product = products.find((p) => p.id === params.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[1] ?? product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-bold text-4xl text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-zinc-400 mb-8">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link href="/store" className="btn-primary">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const price =
    currency === "USD" ? product.price : product.priceUGX;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      {/* ========== BREADCRUMB ========== */}
      <div className="pt-28 pb-4 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-heading text-zinc-500"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/store"
              className="hover:text-white transition-colors"
            >
              Store
            </Link>
            <span>/</span>
            <span className="text-zinc-300 truncate max-w-[200px]">
              {product.name}
            </span>
          </motion.nav>
        </div>
      </div>

      {/* ========== PRODUCT DETAIL ========== */}
      <section className="section-padding pt-8 md:pt-12 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ---- IMAGE GALLERY ---- */}
            <motion.div {...fadeUp}>
              {/* Main image */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glow-border mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Category badge */}
                {product.category === "digital" && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full bg-brand-gold/20 backdrop-blur-sm text-brand-gold border border-brand-gold/30">
                      Digital Download
                    </span>
                  </div>
                )}

                {product.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full bg-brand-gold/80 backdrop-blur-sm text-black">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === i
                          ? "border-brand-gold/60 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                          : "border-white/5 opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ---- PRODUCT INFO ---- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Category label */}
              <span className="inline-block w-fit px-4 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-5">
                {product.category === "merch" ? "Merchandise" : "Digital Release"}
              </span>

              {/* Product name */}
              <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price + currency toggle */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl md:text-4xl font-heading font-bold gradient-text">
                  {formatPrice(price, currency)}
                </span>

                {/* Currency toggle */}
                <div className="flex items-center gap-1 p-1 rounded-full glass border border-white/5">
                  {(["USD", "UGX"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                        currency === c
                          ? "bg-brand-gold/20 text-white border border-brand-gold/30"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed mb-8 text-sm md:text-base">
                {product.description}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative px-5 py-2.5 text-sm font-heading font-semibold rounded-xl border transition-all duration-300 ${
                          selectedSize === size
                            ? "border-brand-gold/50 bg-brand-gold/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                            : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                        }`}
                      >
                        {selectedSize === size && (
                          <motion.div
                            layoutId="activeSize"
                            className="absolute inset-0 rounded-xl border border-brand-gold/50 bg-brand-gold/10"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.5,
                            }}
                          />
                        )}
                        <span className="relative z-10">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="mb-8">
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                  Quantity
                </label>
                <div className="inline-flex items-center gap-0 rounded-xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/5 transition-colors text-lg font-heading"
                  >
                    -
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center text-white font-heading font-semibold border-x border-white/10 bg-white/[0.02]">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/5 transition-colors text-lg font-heading"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full sm:w-auto px-10 py-4 rounded-full font-heading font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  product.inStock
                    ? addedToCart
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_25px_rgba(34,197,94,0.2)]"
                      : "btn-primary"
                    : "bg-white/5 text-zinc-600 cursor-not-allowed border border-white/5"
                }`}
              >
                {!product.inStock
                  ? "Out of Stock"
                  : addedToCart
                  ? "Added to Cart!"
                  : `Add to Cart - ${formatPrice(price * quantity, currency)}`}
              </motion.button>

              {/* Shipping note */}
              <div className="mt-6 flex items-start gap-3 p-4 rounded-xl glass border border-white/5">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {product.category === "digital"
                    ? "Instant digital delivery. Download links sent to your email after purchase."
                    : "Free shipping on orders over $100. Delivery within 7-14 business days."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== RELATED PRODUCTS ========== */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-brand-darker relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 text-center"
            >
              <span className="inline-block px-4 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.2em] rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-4">
                More to Explore
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white">
                Related Products
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/store" className="btn-outline">
                View All Products
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
