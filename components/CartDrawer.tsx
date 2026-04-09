"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isOpen,
    totalPrice,
    currency,
    setCurrency,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
  } = useCart();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-brand-darker border-l border-white/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5">
              <h2 className="font-heading font-bold text-xl text-white">
                Your Cart
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex bg-white/5 rounded-full p-0.5">
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      currency === "USD"
                        ? "bg-brand-gold text-black"
                        : "text-zinc-400"
                    }`}
                  >
                    USD
                  </button>
                  <button
                    onClick={() => setCurrency("UGX")}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      currency === "UGX"
                        ? "bg-brand-gold text-black"
                        : "text-zinc-400"
                    }`}
                  >
                    UGX
                  </button>
                </div>
                <button
                  onClick={closeCart}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600">
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm">Your cart is empty</p>
                  <p className="text-zinc-600 text-xs mt-1">
                    Browse the store to find something you love
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">
                          {item.product.name}
                        </h4>
                        {item.size && (
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Size: {item.size}
                          </p>
                        )}
                        <p className="text-sm font-heading font-semibold gradient-text mt-1">
                          {formatPrice(
                            currency === "USD"
                              ? item.product.price
                              : item.product.priceUGX,
                            currency
                          )}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.size
                              )
                            }
                            className="w-8 h-8 sm:w-6 sm:h-6 rounded-md bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white text-xs"
                          >
                            -
                          </button>
                          <span className="text-sm text-white w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.size
                              )
                            }
                            className="w-8 h-8 sm:w-6 sm:h-6 rounded-md bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white text-xs"
                          >
                            +
                          </button>
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.size)
                            }
                            className="ml-auto text-zinc-600 hover:text-red-400 transition-colors"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Total</span>
                  <span className="text-xl font-heading font-bold gradient-text">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full text-center"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
