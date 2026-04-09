"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PaymentMethodSelector, {
  PaymentDetailsForm,
} from "@/components/PaymentMethodSelector";
import { events } from "@/data/events";
import { formatPrice, formatDate } from "@/lib/utils";
import { generateTicketPDF, simulateEmailTicket } from "@/lib/generate-ticket-pdf";
import { PaymentMethod, TicketTier, TicketOrder } from "@/types";

type Step = "tickets" | "details" | "payment" | "processing";

export default function TicketPurchasePage() {
  const params = useParams();
  const router = useRouter();
  const event = events.find((e) => e.id === params.eventId);

  const [step, setStep] = useState<Step>("tickets");
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState<"USD" | "UGX">("UGX");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({});
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<TicketOrder | null>(null);

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [buyerErrors, setBuyerErrors] = useState<Record<string, string>>({});

  const totalPrice = useMemo(() => {
    if (!selectedTier) return 0;
    return (currency === "USD" ? selectedTier.price : selectedTier.priceUGX) * quantity;
  }, [selectedTier, quantity, currency]);

  if (!event || !event.tickets) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="font-heading font-bold text-3xl text-white mb-4">Event Not Found</h1>
          <p className="text-zinc-400 mb-8">This event doesn&apos;t have tickets available.</p>
          <Link href="/events" className="btn-primary">View All Events</Link>
        </div>
      </div>
    );
  }

  function validateBuyer(): boolean {
    const errors: Record<string, string> = {};
    if (!buyer.name.trim()) errors.name = "Name is required";
    if (!buyer.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) errors.email = "Invalid email";
    if (!buyer.phone.trim()) errors.phone = "Phone is required";
    setBuyerErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validatePayment(): boolean {
    const errors: Record<string, string> = {};
    if (!paymentMethod) { errors.method = "Select a payment method"; setPaymentErrors(errors); return false; }
    if (paymentMethod === "visa") {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.replace(/\s/g, "").length < 16) errors.cardNumber = "Valid card number required";
      if (!paymentDetails.cardName?.trim()) errors.cardName = "Name required";
      if (!paymentDetails.expiry || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)) errors.expiry = "MM/YY format";
      if (!paymentDetails.cvc || paymentDetails.cvc.length < 3) errors.cvc = "Valid CVC required";
    } else if (paymentMethod === "bank-transfer") {
      if (!paymentDetails.bankRef?.trim()) errors.bankRef = "Reference required";
    } else if (["mtn-momo", "mtn-momo-code", "airtel-pay", "airtel-money"].includes(paymentMethod)) {
      if (!paymentDetails.mobilePhone?.trim()) errors.mobilePhone = "Phone number required";
    }
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (step === "tickets") {
      if (!selectedTier) return;
      setStep("details");
    } else if (step === "details") {
      if (validateBuyer()) setStep("payment");
    } else if (step === "payment") {
      if (validatePayment()) handlePurchase();
    }
  }

  function handleBack() {
    if (step === "payment") setStep("details");
    else if (step === "details") setStep("tickets");
  }

  async function handlePurchase() {
    if (!selectedTier || !paymentMethod) return;
    setStep("processing");
    setIsProcessing(true);

    await new Promise((r) => setTimeout(r, 3000));

    const order: TicketOrder = {
      id: `XED-TKT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      eventId: event!.id,
      eventTitle: event!.title,
      eventDate: event!.date,
      eventTime: event!.time,
      venue: event!.venue,
      city: event!.city,
      tier: selectedTier,
      quantity,
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      buyerPhone: buyer.phone,
      paymentMethod,
      totalPrice,
      currency,
      purchasedAt: new Date().toISOString(),
    };

    await simulateEmailTicket(order);
    setOrderComplete(order);
    setIsProcessing(false);
  }

  // === ORDER COMPLETE VIEW ===
  if (orderComplete) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[200px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto text-center relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="mx-auto mb-8">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
            </div>
          </motion.div>

          <h1 className="font-heading font-bold text-3xl text-white mb-2">Ticket Confirmed!</h1>
          <p className="text-zinc-400 mb-1">Your ticket for <span className="text-white font-medium">{orderComplete.eventTitle}</span> is ready.</p>
          <p className="text-xs text-zinc-600 mb-8">A beautifully designed ticket has been sent to <span className="text-brand-gold">{orderComplete.buyerEmail}</span></p>

          {/* Order details card */}
          <div className="glass rounded-2xl p-6 border border-white/5 text-left space-y-3 mb-6">
            <div className="flex justify-between"><span className="text-xs text-zinc-500 uppercase tracking-wider">Order ID</span><span className="text-sm text-white font-mono">{orderComplete.id}</span></div>
            <div className="h-px bg-white/5" />
            <div className="flex justify-between"><span className="text-xs text-zinc-500 uppercase tracking-wider">Ticket</span><span className="text-sm text-white">{orderComplete.tier.name} × {orderComplete.quantity}</span></div>
            <div className="h-px bg-white/5" />
            <div className="flex justify-between"><span className="text-xs text-zinc-500 uppercase tracking-wider">Date</span><span className="text-sm text-white">{formatDate(orderComplete.eventDate)} • {orderComplete.eventTime}</span></div>
            <div className="h-px bg-white/5" />
            <div className="flex justify-between"><span className="text-xs text-zinc-500 uppercase tracking-wider">Venue</span><span className="text-sm text-white">{orderComplete.venue}</span></div>
            <div className="h-px bg-white/5" />
            <div className="flex justify-between"><span className="text-xs text-zinc-500 uppercase tracking-wider">Total Paid</span><span className="text-lg font-heading font-bold gradient-text">{formatPrice(orderComplete.totalPrice, orderComplete.currency)}</span></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => generateTicketPDF(orderComplete)} className="btn-primary flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              Download Ticket PDF
            </button>
            <Link href="/events" className="btn-outline">Back to Events</Link>
          </div>

          <p className="text-[10px] text-zinc-600 mt-6">Present this ticket (printed or on your phone) at the venue entrance.</p>
        </motion.div>
      </div>
    );
  }

  // === PROCESSING VIEW ===
  if (step === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-gold animate-spin" />
            <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-brand-gold-dark animate-spin [animation-direction:reverse] [animation-duration:0.7s]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading font-bold text-sm gradient-text">X</span>
            </div>
          </div>
          <p className="text-white font-heading font-semibold mb-1">Processing Payment...</p>
          <p className="text-xs text-zinc-500">Please don&apos;t close this page</p>
        </motion.div>
      </div>
    );
  }

  const stepLabels = ["Select Ticket", "Your Details", "Payment"];
  const stepIndex = step === "tickets" ? 0 : step === "details" ? 1 : 2;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header with event info */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
          <div className="relative w-full md:w-32 h-40 md:h-32 rounded-2xl overflow-hidden flex-shrink-0">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
          </div>
          <div>
            <Link href="/events" className="text-xs text-zinc-500 hover:text-brand-gold transition-colors mb-2 inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Events
            </Link>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                {formatDate(event.date)}
              </span>
              <span>{event.time}</span>
              <span>{event.venue}, {event.city}</span>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${i === stepIndex ? "bg-brand-gold/20 text-white border border-brand-gold/30" : i < stepIndex ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-white/5 text-zinc-500 border border-white/5"}`}>
                {i < stepIndex ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < stepLabels.length - 1 && <div className={`w-8 h-px ${i < stepIndex ? "bg-green-500/30" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* STEP 1: TICKET SELECTION */}
              {step === "tickets" && (
                <motion.div key="tickets" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-bold text-xl text-white">Select Your Ticket</h2>
                    <div className="flex bg-white/5 rounded-full p-0.5">
                      {(["UGX", "USD"] as const).map((c) => (
                        <button key={c} onClick={() => setCurrency(c)} className={`px-3 py-1 text-xs rounded-full transition-all ${currency === c ? "bg-brand-gold text-black" : "text-zinc-400"}`}>{c}</button>
                      ))}
                    </div>
                  </div>

                  {event.tickets.map((tier) => (
                    <motion.button key={tier.id} whileHover={{ scale: 1.01 }} onClick={() => setSelectedTier(tier)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${selectedTier?.id === tier.id ? "border-brand-gold/50 bg-brand-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]" : "border-white/5 bg-brand-card hover:border-white/10"}`}>
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
                        <div>
                          <h3 className="font-heading font-bold text-lg text-white">{tier.name}</h3>
                          <p className="text-xs text-zinc-500 mt-0.5">{tier.description}</p>
                        </div>
                        <div className="sm:text-right">
                          <p className="font-heading font-bold text-xl gradient-text">{formatPrice(currency === "USD" ? tier.price : tier.priceUGX, currency)}</p>
                          <p className="text-[10px] text-zinc-600">{tier.available} remaining</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tier.perks.map((perk) => (
                          <span key={perk} className="px-2.5 py-1 text-[9px] sm:text-[10px] rounded-full bg-white/5 text-zinc-400 border border-white/5">{perk}</span>
                        ))}
                      </div>
                    </motion.button>
                  ))}

                  {selectedTier && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5">
                      <span className="text-sm text-zinc-400">Quantity:</span>
                      <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/5 text-sm">-</button>
                        <span className="w-12 h-10 flex items-center justify-center text-white font-heading font-semibold border-x border-white/10">{quantity}</span>
                        <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/5 text-sm">+</button>
                      </div>
                      <span className="text-sm text-zinc-500 ml-auto">Max 10 per order</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: BUYER DETAILS */}
              {step === "details" && (
                <motion.div key="details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="font-heading font-bold text-xl text-white mb-6">Your Details</h2>
                  <div className="space-y-4 glass rounded-2xl p-6 border border-white/5">
                    <p className="text-xs text-zinc-500 mb-2">Your ticket will be sent to the email address below.</p>
                    <InputField label="Full Name" value={buyer.name} onChange={(v) => setBuyer({ ...buyer, name: v })} error={buyerErrors.name} placeholder="Edward Muligirwa" />
                    <InputField label="Email Address" value={buyer.email} onChange={(v) => setBuyer({ ...buyer, email: v })} error={buyerErrors.email} placeholder="your@email.com" type="email" />
                    <InputField label="Phone Number" value={buyer.phone} onChange={(v) => setBuyer({ ...buyer, phone: v })} error={buyerErrors.phone} placeholder="+256 7XX XXX XXX" type="tel" />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT */}
              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="font-heading font-bold text-xl text-white mb-6">Payment</h2>
                  <div className="glass rounded-2xl p-6 border border-white/5">
                    <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />
                    {paymentMethod && (
                      <PaymentDetailsForm method={paymentMethod} values={paymentDetails} onChange={(k, v) => setPaymentDetails((p) => ({ ...p, [k]: v }))} errors={paymentErrors} />
                    )}
                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                      <span className="text-[11px] text-zinc-500">Secured & encrypted. Your payment details are safe.</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8">
              {step !== "tickets" ? (
                <button onClick={handleBack} className="flex items-center gap-2 px-5 py-2.5 text-sm font-heading text-zinc-400 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Back
                </button>
              ) : (
                <Link href="/events" className="flex items-center gap-2 px-5 py-2.5 text-sm font-heading text-zinc-400 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Events
                </Link>
              )}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleNext}
                disabled={isProcessing || (step === "tickets" && !selectedTier)}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {step === "payment" ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                    Pay {formatPrice(totalPrice, currency)}
                  </>
                ) : (
                  <>
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="relative h-32 overflow-hidden">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-sm text-white mb-1">{event.title}</h3>
                <p className="text-[11px] text-zinc-500 mb-4">{formatDate(event.date)} • {event.time}</p>

                {selectedTier ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-zinc-500">{selectedTier.name} × {quantity}</span><span className="text-white">{formatPrice(totalPrice, currency)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-zinc-500">Service fee</span><span className="text-green-400">Free</span></div>
                    <div className="h-px bg-white/10" />
                    <div className="flex justify-between"><span className="text-sm font-heading font-semibold text-white">Total</span><span className="text-xl font-heading font-bold gradient-text">{formatPrice(totalPrice, currency)}</span></div>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-600 text-center py-4">Select a ticket tier to see pricing</p>
                )}
              </div>
              <div className="p-5 border-t border-white/5 space-y-2">
                {[
                  { icon: "M20 6L9 17l-5-5", text: "Instant ticket delivery" },
                  { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", text: "PDF ticket sent to email" },
                  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", text: "Secure payment" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400 flex-shrink-0"><path d={item.icon} /></svg>
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

function InputField({ label, value, onChange, error, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-zinc-600 focus:outline-none transition-colors ${error ? "border-red-500/50" : "border-white/10 focus:border-brand-gold/50"}`} />
      {error && <p className="text-[11px] text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}
