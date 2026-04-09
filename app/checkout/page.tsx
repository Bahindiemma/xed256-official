"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import PaymentMethodSelector, { PaymentDetailsForm } from "@/components/PaymentMethodSelector";
import { PaymentMethod } from "@/types";

type Step = "review" | "shipping" | "payment";

const steps: { key: Step; label: string; number: number }[] = [
  { key: "review", label: "Order Review", number: 1 },
  { key: "shipping", label: "Shipping", number: 2 },
  { key: "payment", label: "Payment", number: 3 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    totalPrice,
    totalItems,
    currency,
    setCurrency,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const [currentStep, setCurrentStep] = useState<Step>("review");
  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping form
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Uganda",
    zip: "",
  });

  // Payment form
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentValues, setPaymentValues] = useState<Record<string, string>>({});

  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  const hasDigitalOnly = items.every((i) => i.product.category === "digital");
  const shippingCost = hasDigitalOnly || totalPrice > (currency === "USD" ? 100 : 370000) ? 0 : currency === "USD" ? 10 : 37000;
  const orderTotal = totalPrice + shippingCost;

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  function validateShipping(): boolean {
    const errors: Record<string, string> = {};
    if (!shipping.firstName.trim()) errors.firstName = "First name is required";
    if (!shipping.lastName.trim()) errors.lastName = "Last name is required";
    if (!shipping.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email))
      errors.email = "Invalid email address";
    if (!shipping.phone.trim()) errors.phone = "Phone is required";
    if (!hasDigitalOnly) {
      if (!shipping.address.trim()) errors.address = "Address is required";
      if (!shipping.city.trim()) errors.city = "City is required";
    }
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validatePayment(): boolean {
    const errors: Record<string, string> = {};
    if (!paymentMethod) {
      errors.method = "Select a payment method";
      setPaymentErrors(errors);
      return false;
    }
    if (paymentMethod === "visa") {
      if (!paymentValues.cardNumber || paymentValues.cardNumber.replace(/\s/g, "").length < 16) errors.cardNumber = "Valid card number required";
      if (!paymentValues.cardName?.trim()) errors.cardName = "Name required";
      if (!paymentValues.expiry || !/^\d{2}\/\d{2}$/.test(paymentValues.expiry)) errors.expiry = "MM/YY format";
      if (!paymentValues.cvc || paymentValues.cvc.length < 3) errors.cvc = "Valid CVC required";
    } else if (paymentMethod === "bank-transfer") {
      if (!paymentValues.bankRef?.trim()) errors.bankRef = "Reference required";
    } else if (["mtn-momo", "mtn-momo-code", "airtel-pay", "airtel-money"].includes(paymentMethod)) {
      if (!paymentValues.mobilePhone?.trim()) errors.mobilePhone = "Phone number required";
    }
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (currentStep === "review") {
      if (items.length === 0) return;
      setCurrentStep(hasDigitalOnly ? "payment" : "shipping");
    } else if (currentStep === "shipping") {
      if (validateShipping()) setCurrentStep("payment");
    } else if (currentStep === "payment") {
      if (!hasDigitalOnly && !shipping.firstName) {
        setCurrentStep("shipping");
        return;
      }
      if (validatePayment()) handlePlaceOrder();
    }
  }

  function handleBack() {
    if (currentStep === "payment") {
      setCurrentStep(hasDigitalOnly ? "review" : "shipping");
    } else if (currentStep === "shipping") {
      setCurrentStep("review");
    }
  }

  async function handlePlaceOrder() {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));
    clearCart();
    router.push("/checkout/success");
  }

  // formatCardNumber and formatExpiry now handled by PaymentDetailsForm

  if (items.length === 0 && currentStep !== "payment") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-2xl text-white mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-zinc-500 text-sm mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link href="/store" className="btn-primary">
            Browse Store
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-2">
            Checkout
          </h1>
          <p className="text-zinc-500 text-sm">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your order
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          {steps
            .filter((s) => !(hasDigitalOnly && s.key === "shipping"))
            .map((step, i, arr) => {
              const isActive = step.key === currentStep;
              const isPast = currentStepIndex > steps.findIndex((s) => s.key === step.key);
              return (
                <div key={step.key} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-brand-gold/20 text-white border border-brand-gold/30"
                        : isPast
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-white/5 text-zinc-500 border border-white/5"
                    }`}
                  >
                    {isPast ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <span>{i + 1}</span>
                    )}
                    <span className="hidden sm:inline">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`w-8 h-px ${isPast ? "bg-green-500/30" : "bg-white/10"}`} />
                  )}
                </div>
              );
            })}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* ===== STEP 1: ORDER REVIEW ===== */}
              {currentStep === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-bold text-xl text-white">
                      Your Items
                    </h2>
                    <div className="flex bg-white/5 rounded-full p-0.5">
                      {(["USD", "UGX"] as const).map((c) => (
                        <button
                          key={c}
                          onClick={() => setCurrency(c)}
                          className={`px-3 py-1 text-xs rounded-full transition-all ${
                            currency === c
                              ? "bg-brand-gold text-white"
                              : "text-zinc-400"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {items.map((item) => {
                    const itemPrice =
                      currency === "USD"
                        ? item.product.price
                        : item.product.priceUGX;
                    return (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        layout
                        className="flex gap-4 p-4 rounded-2xl glass border border-white/5"
                      >
                        <div className="relative w-20 sm:w-24 h-24 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-heading font-semibold text-white truncate">
                            {item.product.name}
                          </h3>
                          {item.size && (
                            <p className="text-xs text-zinc-500 mt-0.5">
                              Size: {item.size}
                            </p>
                          )}
                          <p className="text-xs text-zinc-500 mt-0.5 capitalize">
                            {item.product.category === "digital"
                              ? "Digital Download"
                              : "Merchandise"}
                          </p>
                          <p className="text-sm font-heading font-bold gradient-text mt-2">
                            {formatPrice(itemPrice, currency)}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.size
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-sm"
                              >
                                -
                              </button>
                              <span className="w-8 h-8 flex items-center justify-center text-sm text-white border-x border-white/10">
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
                                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-sm"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs text-zinc-500">
                              Subtotal:{" "}
                              <span className="text-white">
                                {formatPrice(itemPrice * item.quantity, currency)}
                              </span>
                            </span>
                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.size)
                              }
                              className="ml-auto p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
                              aria-label="Remove item"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* ===== STEP 2: SHIPPING ===== */}
              {currentStep === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-heading font-bold text-xl text-white mb-6">
                    Shipping Information
                  </h2>
                  <div className="space-y-5 glass rounded-2xl p-6 border border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        label="First Name"
                        value={shipping.firstName}
                        onChange={(v) =>
                          setShipping({ ...shipping, firstName: v })
                        }
                        error={shippingErrors.firstName}
                        placeholder="Edward"
                      />
                      <InputField
                        label="Last Name"
                        value={shipping.lastName}
                        onChange={(v) =>
                          setShipping({ ...shipping, lastName: v })
                        }
                        error={shippingErrors.lastName}
                        placeholder="Muligirwa"
                      />
                    </div>
                    <InputField
                      label="Email"
                      type="email"
                      value={shipping.email}
                      onChange={(v) => setShipping({ ...shipping, email: v })}
                      error={shippingErrors.email}
                      placeholder="your@email.com"
                    />
                    <InputField
                      label="Phone"
                      type="tel"
                      value={shipping.phone}
                      onChange={(v) => setShipping({ ...shipping, phone: v })}
                      error={shippingErrors.phone}
                      placeholder="+256 7XX XXX XXX"
                    />
                    <InputField
                      label="Street Address"
                      value={shipping.address}
                      onChange={(v) => setShipping({ ...shipping, address: v })}
                      error={shippingErrors.address}
                      placeholder="Plot 12, Kampala Road"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <InputField
                        label="City"
                        value={shipping.city}
                        onChange={(v) => setShipping({ ...shipping, city: v })}
                        error={shippingErrors.city}
                        placeholder="Kampala"
                      />
                      <InputField
                        label="Country"
                        value={shipping.country}
                        onChange={(v) =>
                          setShipping({ ...shipping, country: v })
                        }
                        placeholder="Uganda"
                      />
                      <InputField
                        label="ZIP / Postal Code"
                        value={shipping.zip}
                        onChange={(v) => setShipping({ ...shipping, zip: v })}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ===== STEP 3: PAYMENT ===== */}
              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-heading font-bold text-xl text-white mb-6">
                    Payment
                  </h2>
                  <div className="glass rounded-2xl p-6 border border-white/5">
                    <PaymentMethodSelector
                      selected={paymentMethod}
                      onSelect={setPaymentMethod}
                    />
                    {paymentMethod && (
                      <PaymentDetailsForm
                        method={paymentMethod}
                        values={paymentValues}
                        onChange={(k, v) =>
                          setPaymentValues((p) => ({ ...p, [k]: v }))
                        }
                        errors={paymentErrors}
                      />
                    )}
                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400 flex-shrink-0">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <span className="text-[11px] text-zinc-500">
                        Secured & encrypted. Your payment details are safe.
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              {currentStep !== "review" ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-heading text-zinc-400 hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              ) : (
                <Link
                  href="/store"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-heading text-zinc-400 hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={isProcessing || items.length === 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : currentStep === "payment" ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    Pay {formatPrice(orderTotal, currency)}
                  </>
                ) : (
                  <>
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* ===== ORDER SUMMARY SIDEBAR ===== */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/5">
                <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Order Summary
                </h3>
              </div>

              <div className="p-5 space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold text-white text-[10px] flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">
                        {item.product.name}
                      </p>
                      {item.size && (
                        <p className="text-[10px] text-zinc-600">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 font-heading">
                      {formatPrice(
                        (currency === "USD"
                          ? item.product.price
                          : item.product.priceUGX) * item.quantity,
                        currency
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="text-white">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="text-white">
                    {shippingCost === 0 ? (
                      <span className="text-green-400">Free</span>
                    ) : (
                      formatPrice(shippingCost, currency)
                    )}
                  </span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-heading font-semibold text-white">
                    Total
                  </span>
                  <span className="text-xl font-heading font-bold gradient-text">
                    {formatPrice(orderTotal, currency)}
                  </span>
                </div>
              </div>

              {/* Promo code */}
              <div className="p-5 border-t border-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-brand-gold/50 transition-colors"
                  />
                  <button className="px-4 py-2 text-xs font-heading font-semibold rounded-lg bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all">
                    Apply
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-5 border-t border-white/5 space-y-3">
                {[
                  { icon: "M20 6L9 17l-5-5", text: "Secure checkout" },
                  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", text: "Buyer protection" },
                  { icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", text: "Free returns within 30 days" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400 flex-shrink-0">
                      <path d={item.icon} />
                    </svg>
                    <span className="text-[11px] text-zinc-500">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Reusable Input Field ===== */
function InputField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-zinc-600 focus:outline-none transition-colors ${
          error
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 focus:border-brand-gold/50"
        }`}
      />
      {error && (
        <p className="text-[11px] text-red-400 mt-1.5">{error}</p>
      )}
    </div>
  );
}
