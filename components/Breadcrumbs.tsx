"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const routeLabels: Record<string, string> = {
  about: "About",
  music: "Music & Media",
  events: "Events",
  store: "Store",
  blog: "News",
  contact: "Contact",
  checkout: "Checkout",
  "press-kit": "Press Kit",
  links: "Links",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-24 pb-2"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-xs font-heading text-zinc-500">
          <li>
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Home
            </Link>
          </li>
          {segments.map((seg, i) => {
            const href = "/" + segments.slice(0, i + 1).join("/");
            const isLast = i === segments.length - 1;
            const label = routeLabels[seg] || decodeURIComponent(seg);
            return (
              <li key={href} className="flex items-center gap-2">
                <span className="text-zinc-700">/</span>
                {isLast ? (
                  <span className="text-zinc-300 truncate max-w-[200px]">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-brand-gold transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
}
