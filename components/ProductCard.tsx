"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, currency } = useCart();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden bg-brand-card border border-white/5 card-hover"
    >
      <Link href={`/store/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full bg-brand-gold/80 backdrop-blur-sm text-black">
                Featured
              </span>
            </div>
          )}

          {product.category === "digital" && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full bg-brand-gold/20 backdrop-blur-sm text-brand-gold border border-brand-gold/30">
                Digital
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link href={`/store/${product.id}`}>
          <h3 className="font-heading font-semibold text-white text-sm truncate group-hover:gradient-text transition-all">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
          <span className="text-lg font-heading font-bold gradient-text">
            {formatPrice(
              currency === "USD" ? product.price : product.priceUGX,
              currency
            )}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addItem(product, product.sizes?.[1])}
            className="w-full xs:w-auto text-center px-4 py-2 text-xs font-heading font-semibold rounded-full bg-white/10 text-white border border-white/10 hover:border-brand-gold/50 hover:bg-brand-gold/10 transition-all duration-300"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
