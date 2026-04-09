export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-gold border-r-brand-gold animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-brand-gold-dark border-l-brand-gold animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading font-bold text-sm gradient-text">X</span>
          </div>
        </div>
        <p className="text-xs text-zinc-600 font-heading uppercase tracking-[0.3em]">
          Loading
        </p>
      </div>
    </div>
  );
}
