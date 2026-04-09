"use client";

import { motion } from "framer-motion";
import { PaymentMethod } from "@/types";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

const paymentMethods: {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    id: "visa",
    name: "Visa / Mastercard",
    description: "Credit or debit card",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    color: "#1A1F71",
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    description: "Direct bank payment",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
    color: "#0A6E5C",
  },
  {
    id: "mtn-momo",
    name: "MTN Mobile Money",
    description: "Pay with MTN MoMo",
    icon: (
      <div className="w-7 h-7 rounded-full bg-[#FFCC00] flex items-center justify-center">
        <span className="text-[10px] font-bold text-black leading-none">MTN</span>
      </div>
    ),
    color: "#FFCC00",
  },
  {
    id: "mtn-momo-code",
    name: "MTN MoMo Code",
    description: "Pay using MoMo pay code",
    icon: (
      <div className="w-7 h-7 rounded-md bg-[#FFCC00] flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="4" height="4" />
        </svg>
      </div>
    ),
    color: "#FFCC00",
  },
  {
    id: "airtel-pay",
    name: "Airtel Pay",
    description: "Airtel Money payment",
    icon: (
      <div className="w-7 h-7 rounded-full bg-[#ED1C24] flex items-center justify-center">
        <span className="text-[8px] font-bold text-white leading-none">AIR</span>
      </div>
    ),
    color: "#ED1C24",
  },
  {
    id: "airtel-money",
    name: "Airtel Money",
    description: "Airtel Money wallet",
    icon: (
      <div className="w-7 h-7 rounded-full bg-[#ED1C24]/90 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
    ),
    color: "#ED1C24",
  },
];

export default function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-3">
        Payment Method
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selected === method.id;
          return (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(method.id)}
              className={`relative flex items-center gap-3 p-3 sm:p-4 rounded-xl border text-left transition-all duration-300 ${
                isSelected
                  ? "border-brand-gold/50 bg-brand-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="payment-selected"
                  className="absolute inset-0 rounded-xl border border-brand-gold/50 bg-brand-gold/5"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <div className="relative z-10 flex-shrink-0 text-zinc-400">
                {method.icon}
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <p className={`text-sm font-heading font-semibold ${isSelected ? "text-white" : "text-zinc-300"}`}>
                  {method.name}
                </p>
                <p className="text-[10px] text-zinc-500">{method.description}</p>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative z-10 w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function PaymentDetailsForm({
  method,
  values,
  onChange,
  errors,
}: {
  method: PaymentMethod;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  errors: Record<string, string>;
}) {
  if (method === "visa") {
    return (
      <div className="space-y-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-zinc-500">Accepted:</span>
          {["Visa", "Mastercard", "Amex"].map((c) => (
            <span key={c} className="px-2 py-0.5 text-[10px] font-heading font-semibold rounded bg-white/5 text-zinc-400 border border-white/10">
              {c}
            </span>
          ))}
        </div>
        <Field label="Card Number" value={values.cardNumber || ""} onChange={(v) => onChange("cardNumber", formatCardNum(v))} error={errors.cardNumber} placeholder="4242 4242 4242 4242" maxLength={19} />
        <Field label="Name on Card" value={values.cardName || ""} onChange={(v) => onChange("cardName", v)} error={errors.cardName} placeholder="EDWARD MULIGIRWA" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Expiry" value={values.expiry || ""} onChange={(v) => onChange("expiry", formatExp(v))} error={errors.expiry} placeholder="MM/YY" maxLength={5} />
          <Field label="CVC" value={values.cvc || ""} onChange={(v) => onChange("cvc", v.replace(/\D/g, "").slice(0, 4))} error={errors.cvc} placeholder="123" maxLength={4} />
        </div>
      </div>
    );
  }

  if (method === "bank-transfer") {
    return (
      <div className="mt-4 glass rounded-xl p-4 border border-white/5 space-y-3">
        <p className="text-xs text-zinc-400 font-heading uppercase tracking-wider">Bank Details</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-zinc-500">Bank</span><span className="text-white font-medium">Stanbic Bank Uganda</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Account Name</span><span className="text-white font-medium">XED256 Entertainment</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Account No.</span><span className="text-white font-mono">9030005678901</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Branch</span><span className="text-white font-medium">Kampala Main</span></div>
        </div>
        <p className="text-[10px] text-zinc-600 mt-2">Upload payment confirmation or enter reference after transfer.</p>
        <Field label="Payment Reference" value={values.bankRef || ""} onChange={(v) => onChange("bankRef", v)} error={errors.bankRef} placeholder="Transaction reference number" />
      </div>
    );
  }

  if (method === "mtn-momo" || method === "airtel-money" || method === "airtel-pay") {
    const isMtn = method === "mtn-momo";
    const label = isMtn ? "MTN" : "Airtel";
    return (
      <div className="space-y-4 mt-4">
        <Field label={`${label} Phone Number`} value={values.mobilePhone || ""} onChange={(v) => onChange("mobilePhone", v)} error={errors.mobilePhone} placeholder={isMtn ? "0770 XXX XXX" : "0700 XXX XXX"} />
        <div className="glass rounded-xl p-4 border border-white/5">
          <p className="text-xs text-zinc-400 mb-2">A payment prompt will be sent to your phone. Enter your {label} PIN to complete the transaction.</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isMtn ? "bg-[#FFCC00]" : "bg-[#ED1C24]"} animate-pulse`} />
            <span className="text-[10px] text-zinc-500">Awaiting confirmation after payment</span>
          </div>
        </div>
      </div>
    );
  }

  if (method === "mtn-momo-code") {
    return (
      <div className="space-y-4 mt-4">
        <div className="glass rounded-xl p-4 border border-white/5 text-center">
          <p className="text-xs text-zinc-400 mb-3">Dial the code below on your MTN line to complete payment:</p>
          <div className="inline-block px-6 py-3 rounded-lg bg-[#FFCC00]/10 border border-[#FFCC00]/30">
            <p className="text-lg font-mono font-bold text-[#FFCC00]">*165*3*{Math.floor(Math.random() * 900000 + 100000)}#</p>
          </div>
          <p className="text-[10px] text-zinc-600 mt-3">Or enter your MTN number below and we&apos;ll send the prompt.</p>
        </div>
        <Field label="MTN Phone Number" value={values.mobilePhone || ""} onChange={(v) => onChange("mobilePhone", v)} error={errors.mobilePhone} placeholder="0770 XXX XXX" />
      </div>
    );
  }

  return null;
}

function Field({ label, value, onChange, error, placeholder, maxLength }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-400 mb-2">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-zinc-600 focus:outline-none transition-colors ${error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-brand-gold/50"}`}
      />
      {error && <p className="text-[11px] text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}

function formatCardNum(v: string) { const d = v.replace(/\D/g, "").slice(0, 16); return d.replace(/(\d{4})(?=\d)/g, "$1 "); }
function formatExp(v: string) { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; }
