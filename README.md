# Xed 256 — Official Website

**FortPortal Ni Dubai**

Official artist portfolio and e-commerce website for **Xed 256** (Edward Muligirwa) — a genre-defying Ugandan artist from Fort Portal blending Amapiano, Afrobeats, RnB, Hip-Hop, and Pop.

![Xed 256](public/media/images/xed-2076.jpg)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Theme:** Dark afro-futuristic with neon/glassmorphism accents

## Features

- **Homepage** — Bold hero, featured music, events preview, store highlights, newsletter CTA
- **Music & Media** — Audio player with playlist, video gallery, photo gallery with lightbox
- **About** — Artist bio, achievement timeline, stats, social links
- **Events** — Upcoming & past shows with ticket CTAs
- **Store** — Product listing with category filters, product detail pages, cart with USD/UGX currency toggle, checkout flow
- **Blog/News** — Featured articles with full-content modal reader
- **Contact** — Booking form with event type selection, contact info, social links

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  page.tsx          # Homepage
  layout.tsx        # Root layout with SEO metadata
  loading.tsx       # Loading spinner
  not-found.tsx     # 404 page
  about/            # Artist bio & timeline
  music/            # Music player, videos, gallery
  events/           # Live shows & past events
  store/            # Product listing
  store/[id]/       # Product detail
  contact/          # Booking form
  blog/             # News & updates

components/
  Navbar.tsx        # Sticky navigation with cart badge
  Footer.tsx        # Footer with social links
  CartDrawer.tsx    # Slide-out cart panel
  LayoutClient.tsx  # Client-side layout wrapper
  MusicPlayer.tsx   # Audio player with playlist
  PhotoGallery.tsx  # Filterable gallery with lightbox
  MediaCard.tsx     # Reusable media card
  ProductCard.tsx   # Product card with add-to-cart
  EventCard.tsx     # Event listing card
  SectionHeading.tsx # Reusable section header

lib/
  cart-context.tsx  # Shopping cart state management
  utils.ts          # Utility functions

data/
  artist.ts         # Artist bio, achievements, contact info
  music.ts          # Tracks, videos, gallery images
  products.ts       # Merchandise & digital products
  events.ts         # Shows & events
  blog.ts           # Blog posts

types/
  index.ts          # TypeScript interfaces

public/media/
  images/           # Artist photos
```

## Customisation

- **Colors:** Edit `tailwind.config.ts` — brand colors under `theme.extend.colors.brand`
- **Content:** Edit files in `data/` directory
- **Images:** Replace files in `public/media/images/`
- **Metadata/SEO:** Edit `app/layout.tsx` metadata export

## Deployment

This project is ready to deploy on Vercel:

```bash
npx vercel
```

Or build and deploy to any Node.js hosting:

```bash
npm run build
npm start
```

## Contact

- **Artist:** Xed 256 (Edward Muligirwa)
- **Email:** muligirwaxed12@gmail.com
- **Phone:** +256751155990
- **Instagram:** [@xed256](https://www.instagram.com/xed256)
- **TikTok:** [@xeduganda](https://www.tiktok.com/@xeduganda)
- **X:** [@xed256](https://x.com/xed256)

---

*FortPortal Ni Dubai — Greatness knows no geography.*
