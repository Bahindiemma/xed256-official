import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import JsonLd, { getWebsiteSchema, getArtistSchema } from "@/components/JsonLd";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xed256.com"),
  title: {
    default: "Xed 256 | FortPortal Ni Dubai — Official Website",
    template: "%s | Xed 256",
  },
  description:
    "Official website of Xed 256 (Edward Muligirwa) — genre-defying Ugandan artist from Fort Portal. Music, events, merch & more. FortPortal Ni Dubai.",
  keywords: [
    "Xed 256",
    "XED256",
    "Ugandan artist",
    "Fort Portal",
    "FortPortal Ni Dubai",
    "Afrobeats",
    "Amapiano",
    "Ugandan music",
    "East African music",
    "Edward Muligirwa",
    "Rutooro music",
    "Fort Portal musician",
    "Kampala live music",
  ],
  authors: [{ name: "Xed 256" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Xed 256",
    title: "Xed 256 | FortPortal Ni Dubai",
    description:
      "Official website of Xed 256 — genre-defying Ugandan artist. Music, events, merch & more.",
    images: [
      {
        url: "/media/images/xed-2076.jpg",
        width: 1200,
        height: 630,
        alt: "Xed 256 - FortPortal Ni Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xed 256 | FortPortal Ni Dubai",
    description: "Official website of Xed 256 — genre-defying Ugandan artist.",
    images: ["/media/images/xed-2076.jpg"],
    creator: "@xed256",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`antialiased ${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body bg-brand-dark text-zinc-200" suppressHydrationWarning>
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getArtistSchema()} />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
