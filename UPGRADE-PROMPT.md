# XED 256 WEBSITE — UPGRADE & OPTIMIZATION PROMPT

> Copy and paste this entire prompt to a senior full-stack AI engineer to upgrade the Xed 256 official website located at `Desktop/xed-256`.

---

You are a senior full-stack engineer, UI/UX designer, SEO strategist, and web performance specialist.

Your task is to **upgrade and optimize** the existing Xed 256 artist portfolio and e-commerce website at `Desktop/xed-256`. This is a Next.js 15 App Router project with TypeScript, Tailwind CSS, and Framer Motion. Do NOT rebuild from scratch — improve what exists.

---

## CURRENT STATE SUMMARY

The website is functional with 12 routes: Homepage, Music, About, Events, Store, Store/[id], Blog, Contact, Checkout, Checkout/Success, Loading, and 404. It uses a gold-on-dark color scheme (#D4AF37 gold, #0A0A0F dark), glassmorphism effects, Framer Motion animations, and a cart system with USD/UGX currency toggle. All content is in static TypeScript data files under `/data`. Images are in `/public/media/images/` (11 JPGs, 1-2MB each, unoptimized).

### IMPORTANT: Additional content and assets that MUST be integrated (see Part 6 below):
- 8 performance videos from Instagram (must autoplay on click)
- 3 interviews/press features with embeddable links
- 9 music tracks with YouTube links (must play directly from YouTube)
- Additional artist photos from Google Drive (must be downloaded and used — no duplicates)

---

## PART 1: UI/UX DESIGN UPGRADES

### 1.1 — Homepage Hero Overhaul
- Replace the single static hero image with a **cinematic hero** that combines:
  - A fullscreen background video loop (or auto-crossfading image slideshow cycling through all 11 artist photos with Ken Burns zoom effect)
  - A **typed text animation** on the tagline "FortPortal Ni Dubai" that types out letter by letter, then pauses
  - Floating **3D particle system** (gold dust particles drifting upward) behind the text using CSS or a lightweight canvas library
  - The CTA buttons should have a **shimmer/shine animation** that sweeps across them periodically to draw attention
- Add a **persistent "Now Playing" mini-bar** at the bottom of the viewport (above the footer) showing the currently selected track with play/pause, track name, and progress — visible site-wide, not just on the Music page

### 1.2 — Navigation Upgrades
- Add a **mega menu** dropdown for the "Music" nav item showing the 3 latest tracks with album art thumbnails, and a "View All" link
- Add a **search overlay** (triggered by a search icon in the navbar) that searches across tracks, products, events, and blog posts with instant results
- Add **breadcrumbs** to all interior pages (About, Music, Events, Store, Blog, Contact) for navigation context
- The mobile hamburger menu should show a **fullscreen overlay** with the artist's profile image as a faded background, not just a side panel

### 1.3 — Music Page Transformation
- Replace the current basic playlist with a **waveform audio visualizer** — when a track plays, show an animated waveform bar that responds to the audio (use Web Audio API or mock a visual effect)
- Add a **lyrics display panel** that slides in from the right when a "Lyrics" button is clicked on each track
- Add **genre filter tabs** above the playlist (Afrobeats, Amapiano, RnB, Hip-Hop, Pop, All) with animated filtering
- Each track card should show a **play count** badge (mock data) and a **share button** (copy link to clipboard)
- The video section should display in a **cinema-style grid** — one large featured video at the top, smaller ones below in a 2x2 grid

### 1.4 — Store & E-Commerce UX
- Add a **"Quick View" modal** — hovering over a product card shows a quick-view button that opens a modal with product details, size selector, and Add to Cart without navigating away
- Add **product image zoom** on the product detail page — hover over the main image to see a magnified view
- Add a **"Wishlist" feature** — heart icon on each product card to save favourites (persist in localStorage)
- Add a **size guide modal** on product detail pages with a measurement chart
- Add **"You May Also Like"** recommendations at the bottom of product detail pages based on category
- Show **stock indicators** — "Only 3 left!" urgency messaging when stock is low
- Add a **floating cart summary widget** in the bottom-right corner showing total items and total price (separate from the cart drawer)
- Checkout page: add an **animated progress bar** at the top showing percentage completion across steps
- Add **order tracking** — after checkout, generate a mock tracking page with shipment status timeline

### 1.5 — About Page Storytelling
- Transform the timeline into a **scroll-triggered cinematic experience** — as the user scrolls, each achievement fades in with a parallax image background that shifts, creating a documentary-style narrative
- Add an **"In the Press"** section with logos/names of publications that have featured Xed 256 (Daily Monitor, Ugandan Boy Talk Show, MCI Radio) displayed as a logo carousel
- Add a **video intro** section — embed or reference the Ugandan Boy Talk Show interview at the top of the page as a featured video

### 1.6 — Events Page Upgrades
- Add a **countdown timer** to the next upcoming event — large, animated countdown showing days, hours, minutes, seconds
- Add a **map integration** — show venue locations on an interactive map (or a styled static map image with pin markers)
- Add **"Set Reminder"** functionality — button that generates an .ics calendar file for download
- Past events should show a **photo recap gallery** (reuse existing gallery images)

### 1.7 — Blog/News Page
- Add **estimated reading time** progress bar at the top of each blog post when reading in the modal
- Add **social share buttons** (Twitter/X, Instagram, WhatsApp, Copy Link) at the end of each blog post
- Add **"Related Posts"** at the bottom of each post modal
- Add a **category sidebar/filter** on the blog listing page
- Implement a **newsletter subscription** popup that appears after the user scrolls 50% on any blog post

### 1.8 — Contact Page
- Add a **FAQ accordion** section with common booking questions (pricing, availability, travel, technical requirements)
- Show an **interactive availability calendar** — a simple month view showing available/booked dates (mock data)
- Add **WhatsApp direct message** button alongside email/phone
- Show **response time estimate** — "We typically respond within 24 hours"

### 1.9 — Global UI Polish
- Add a **custom cursor** — a small gold dot cursor with a trailing circle that scales up when hovering over interactive elements
- Add **page transition animations** — smooth crossfade or slide between routes using Framer Motion's `AnimatePresence` at the layout level
- Add a **"Back to Top" button** that appears after scrolling past the first viewport — smooth scroll to top with a gold arrow icon
- Add **skeleton loading screens** for each page instead of the generic spinner — show placeholder shapes that match the actual content layout
- Add a **dark/light mode toggle** in the navbar (light mode: cream/ivory background, dark gold text, warm tones)
- Add **micro-interactions**: button ripple effects, input focus glow animations, card tilt on hover (3D perspective transform)
- Implement **scroll-triggered counter animations** on stats (10+ Years, 50+ Shows, etc.) — numbers should count up from 0 when they scroll into view

---

## PART 2: WEBSITE STRUCTURE & BUSINESS STRATEGY

### 2.1 — New Pages to Add
- **`/merch`** — Dedicated merchandise landing page (separate from digital store) with lifestyle imagery, size guide, shipping info, and a "New Arrivals" section
- **`/press-kit`** — Downloadable EPK (Electronic Press Kit) page with:
  - High-res artist photos (downloadable)
  - Official bio (short and long versions, copyable)
  - Technical rider (mock)
  - Booking contact form specifically for media/press
  - Embeddable player widget code for blogs/media
- **`/links`** — A Linktree-style page (clean, single-column) with links to all streaming platforms, social media, latest release, store, and booking — optimized for sharing as a bio link on Instagram/TikTok
- **`/live`** — Live streaming page (placeholder for future YouTube/Instagram live embeds) with a countdown to next live session and chat integration placeholder

### 2.2 — Conversion Optimization
- Add **exit-intent popup** — when user moves cursor toward browser address bar, show a popup: "Don't miss out! Get 10% off your first order" with email capture
- Add **social proof notifications** — small toast notifications that pop up periodically: "Someone from Kampala just purchased the XED 256 Hoodie" (mock data, randomized)
- Add a **sticky "Shop Now" banner** on the Music page — "Love the music? Wear the brand" with link to store
- Add **upsell/cross-sell** on the checkout page — "Complete your look" section showing complementary products
- All CTA buttons should use **action-oriented, first-person language**: "Get My Tickets" instead of "Get Tickets", "Start Listening" instead of "Listen Now"

### 2.3 — Content Strategy Enhancements
- Add a **"Fan Wall"** section on the homepage — testimonials/comments from fans (mock data with names, locations, and short quotes)
- Add **streaming platform links** for each track — Spotify, Apple Music, YouTube Music, Audiomack, Boomplay icons next to each song
- Add a **discography section** on the Music page organized by year with album/single artwork
- The blog should support **image galleries within posts** — not just a single hero image

---

## PART 3: SEO OPTIMIZATION

### 3.1 — Technical SEO
- Add a **`/sitemap.xml`** route using Next.js `generateSitemaps()` — include all pages, product pages, and blog posts with `lastmod`, `changefreq`, and `priority` values
- Add a **`/robots.txt`** route that allows all crawlers, points to sitemap, and disallows `/checkout` and `/api` paths
- Add **structured data (JSON-LD)** to every page:
  - Homepage: `Organization` + `WebSite` schema with `sitelinks` searchbox
  - About: `Person` schema for the artist (name, description, image, sameAs social links)
  - Music: `MusicGroup` schema + `MusicRecording` for each track
  - Events: `Event` schema for each event (name, startDate, location, offers)
  - Store: `Product` schema for each product (name, price, currency, availability, image)
  - Blog: `Article` schema (headline, datePublished, author, image)
  - Contact: `ContactPage` schema with contact info
- Add **canonical URLs** to all pages to prevent duplicate content issues
- Add **`hreflang` tags** if supporting multiple languages in the future (prepare the structure)
- Add **per-page metadata** — each page should have a unique, keyword-rich `title` and `description`:
  - Music: "Xed 256 Music — Stream Afrobeats, Amapiano & RnB from Fort Portal | FortPortal Ni Dubai"
  - Store: "Official Xed 256 Merch — Hoodies, Tees & Digital Music | Shop Now"
  - Events: "Xed 256 Live Shows & Concerts — Upcoming Events in Uganda & Beyond"
  - About: "About Xed 256 — Edward Muligirwa, Fort Portal's Genre-Defying Artist"
  - Blog: "Xed 256 News — Behind The Scenes, Press Features & Tour Updates"
  - Contact: "Book Xed 256 — Booking Enquiries, Press & Management Contact"

### 3.2 — Content SEO
- Add **alt text** to every image that includes the artist name and relevant keywords (e.g., "Xed 256 performing live at Kwegonza Avenue, Kampala — Ugandan Afrobeats artist")
- Add **heading hierarchy** audit — ensure every page has exactly one `<h1>`, followed by logical `<h2>` → `<h3>` structure
- Add **internal linking strategy** — every page should link to at least 2-3 other pages contextually (e.g., the About page mentions tracks, link them to /music; the Music page mentions events, link to /events)
- Blog posts should be **long-form** (800+ words) with headers, lists, and embedded media for better search ranking
- Add a **FAQ section** using `FAQPage` schema on the Contact page

### 3.3 — Local & Music-Specific SEO
- Target **local Uganda/Fort Portal keywords**: "Fort Portal musician", "Ugandan Afrobeats artist", "Kampala live music"
- Target **music-specific long-tail keywords**: "Rutooro music artist", "East African Amapiano", "Uganda Hip-Hop artist Fort Portal"
- Add **Open Graph audio tags** for music pages: `og:audio`, `og:audio:type`
- Ensure all social media profile URLs use `sameAs` in the JSON-LD Person schema

---

## PART 4: PERFORMANCE OPTIMIZATION

### 4.1 — Image Optimization
- **Convert all 11 JPG images** in `/public/media/images/` to optimized WebP format with quality 80. Keep originals as fallbacks. Current images are 1-2MB each — target under 200KB each
- Add **`sizes` attribute** to all `<Image>` components specifying responsive breakpoints to prevent downloading full-size images on mobile: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Add **blur placeholder** to all images using `placeholder="blur"` with `blurDataURL` generated as base64 thumbnails — this shows a blurred preview while the full image loads
- Add a **favicon set**: favicon.ico (32x32), apple-touch-icon.png (180x180), and a web manifest with theme color #D4AF37
- Use `priority` prop ONLY on above-the-fold hero images — remove it from all other images to allow lazy loading

### 4.2 — Bundle Optimization
- **Audit Framer Motion usage** — the full framer-motion bundle is ~45KB gzipped. Use `LazyMotion` with `domAnimation` features to reduce this to ~15KB:
  ```tsx
  import { LazyMotion, domAnimation } from "framer-motion";
  <LazyMotion features={domAnimation} strict>...</LazyMotion>
  ```
- **Remove the `lucide-react` dependency** if only a few icons are used — replace with inline SVGs (which already exist in most components) to save ~25KB
- Add **dynamic imports** for heavy components that aren't above the fold:
  - `MusicPlayer` — dynamically import on the Music page
  - `PhotoGallery` — dynamically import on the Music page
  - `CartDrawer` — dynamically import in LayoutClient
  - `CheckoutPage` — already route-split, but ensure no heavy deps are in the shared bundle
- Move **Google Fonts** from CSS `@import` to Next.js `next/font` for self-hosting — this eliminates the render-blocking font request to Google:
  ```tsx
  import { Space_Grotesk, Inter } from "next/font/google";
  ```

### 4.3 — Runtime Performance
- Add **`will-change: transform`** to elements with hover transforms to promote them to GPU layers
- **Debounce the scroll handler** in the Navbar (currently fires on every pixel scroll)
- Wrap expensive computed values in `useMemo`:
  - `totalPrice` in cart context
  - Filtered products/events/images in listing pages
- Use **`React.memo`** on ProductCard, MediaCard, EventCard since they receive stable props from arrays
- **Reduce animation complexity** on mobile: detect mobile viewport and disable parallax scrolling, rotating rings, and particle effects — replace with simple fade-in animations to save CPU/GPU
- Add **`loading="lazy"`** to iframes (video embeds) and offscreen images

### 4.4 — Caching & Delivery
- Add **Cache-Control headers** in `next.config.ts` for static assets:
  ```ts
  headers: async () => [
    { source: "/media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }
  ]
  ```
- Enable **ISR (Incremental Static Regeneration)** on the blog and events pages if they connect to a CMS in the future — add `revalidate: 3600` to page configs
- Add a **service worker** for offline support — cache the homepage, CSS, and fonts so returning visitors get instant loads even on slow connections

### 4.5 — Core Web Vitals Targets
After all optimizations, the website should achieve:
- **LCP (Largest Contentful Paint)**: < 2.5s — hero image loads fast with priority + blur placeholder
- **FID (First Input Delay)**: < 100ms — minimal JS on first load, lazy-loaded interactions
- **CLS (Cumulative Layout Shift)**: < 0.1 — all images have explicit dimensions, fonts preloaded
- **TTFB (Time to First Byte)**: < 200ms — static generation for most pages
- **Bundle size target**: First Load JS shared < 80KB (down from current 102KB)

---

## PART 5: ACCESSIBILITY IMPROVEMENTS

- Add **`aria-labels`** to all icon-only buttons (some are missing)
- Add **keyboard navigation** support — all interactive elements must be reachable via Tab key with visible focus rings
- Add **`role="navigation"`** and **`role="main"`** landmarks
- Ensure **colour contrast** meets WCAG AA — gold (#D4AF37) on dark (#0A0A0F) has a ratio of ~8.5:1 (good), but verify all text/zinc combinations
- Add **skip-to-content link** as the first focusable element on the page
- Music player should be **keyboard-accessible** — Space to play/pause, Arrow keys for next/previous
- All form inputs should have **associated `<label>` elements** (some use placeholder text only)

---

## PART 6: MEDIA CONTENT INTEGRATION (CRITICAL — DO THIS FIRST)

This section contains real artist content that MUST be integrated into the website. These are actual links and data — not placeholders.

### 6.1 — Performance Videos (Instagram Reels)

Add a dedicated **"Performance Videos"** section on the Music page (and optionally as a carousel on the Homepage). Each video must:
- Open in an **embedded Instagram player** or a modal when clicked
- **Autoplay** immediately once clicked (with sound)
- Display a thumbnail, title, and venue/event name
- Use Instagram's oEmbed API or direct `<iframe>` embeds with `allow="autoplay"` attribute
- Fall back to opening the Instagram link in a new tab on mobile if embedding fails

Here are the 8 performance videos — add ALL of them to the `/data/music.ts` videos array with type `"performance"`:

| # | Title | Instagram URL |
|---|-------|--------------|
| 1 | Kwegonza Avenue Performance | https://www.instagram.com/reel/Cvhn6mxq73P/?igsh=MXQzNHJ4bDJyaGNhNg== |
| 2 | Batooro Kwegonza | https://www.instagram.com/reel/C0JAExZK9nd/?igsh=bTV2aTFwczhzMm5v |
| 3 | Misuwa Music Premier | https://www.instagram.com/reel/C8Ho81tqN0E/?igsh=MTQxa2s1cXRvNDRiZQ== |
| 4 | MOTIV Music Showcase | https://www.instagram.com/reel/C8Ho81tqN0E/?igsh=MTQxa2s1cXRvNDRiZQ== |
| 5 | Olive Live Performance | https://www.instagram.com/reel/CsyaldtKebr/?igsh=YTR6MHg4b3psdm14 |
| 6 | Media Challenge Initiative Performance | https://www.instagram.com/p/CqPxH6kqRtq/?igsh=MWgxamVnYWxhNWR4cw== |
| 7 | International University of East Africa Cultural Gala | https://www.instagram.com/reel/CqBHkasKVBl/?igsh=ZHVrMGo0OHNtMmwy |
| 8 | XED Live In Concert 2025 | https://www.instagram.com/reel/DQ6-gBHjM6R/?igsh=MTkxbGo0cWl2ZW5iMA== |

**Implementation approach for Instagram embeds:**
```tsx
// Use Instagram's oEmbed endpoint or direct iframe
<iframe
  src={`https://www.instagram.com/reel/${reelId}/embed/`}
  width="100%"
  height="500"
  frameBorder="0"
  scrolling="no"
  allow="autoplay; encrypted-media"
  allowFullScreen
  loading="lazy"
/>
```
- Extract the reel/post ID from each URL (e.g., `Cvhn6mxq73P` from the first URL)
- Create a reusable `<InstagramEmbed>` component in `/components/InstagramEmbed.tsx`
- On the Music page, display these in a responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)
- Add a section heading: "Live Performances" with a subheading: "Experience the raw energy of Xed 256 on stage"

### 6.2 — Interviews & Press Features

Add an **"Interviews & Press"** section on the About page and link to it from the Music page. These are real press features:

| # | Title | Source | Link/Embed |
|---|-------|--------|------------|
| 1 | "XED256 Opens Up About Losing His Mom, Music & Life Beyond Fame" | Ugandan Boy Talk Show (YouTube) | Search YouTube for this exact title and embed the video |
| 2 | "XED 256 and the case of regional artistes breaking into Kampala" | Daily Monitor | Link to Daily Monitor article (external link, opens in new tab) |
| 3 | "Xed's Enchanted Melody — A Magical Tale of Music" | MCI Radio | https://mciradio.live/xeds-enchanted-melody-a-magical-tale-of-music/ |

**Implementation:**
- Create an `interviews` array in `/data/music.ts` or `/data/artist.ts` with type `Interview`:
  ```ts
  interface Interview {
    id: string;
    title: string;
    source: string;
    url: string;
    type: "video" | "article" | "radio";
    thumbnail: string;
  }
  ```
- Display interviews as horizontal cards with the source logo/name, title, and "Watch" / "Read" / "Listen" CTA buttons
- Video interviews should open in an embedded YouTube player modal (autoplay on open)
- Article/radio links should open in a new tab
- Add `MusicGroup` and `Article` JSON-LD schema for press mentions

### 6.3 — Music Player with YouTube Integration (CRITICAL)

The current music player uses mock audio. **Replace it with actual YouTube playback.** Each track must play its real YouTube video/audio when selected.

Here are the 9 tracks with their YouTube search titles (use these to find and embed the correct YouTube videos):

| # | Track Title | YouTube Search Title | Type |
|---|-------------|---------------------|------|
| 1 | Energy | ENERGY-XED256(Lyric Video) | Lyric Video |
| 2 | Ayee ft. Geno Rapper | AYEE FT GENO RAPPER-XED256(OFFICIAL LYRICS VIDEO) | Lyrics Video |
| 3 | Ninkugonza | Ninkugonza by Xed256 | Audio |
| 4 | Libido | LIBIDO-XED256(Official Audio) | Official Audio |
| 5 | Niiwe | NIIWE-XED256(LYRIC VIDEO) | Lyric Video |
| 6 | Adyeeri | Adyeeri-XeD256(Audio) | Audio |
| 7 | Eddie Beibe | EDDIE BEIBE(OMWANA OMULABYE-XED256 (OFFICIAL VIDEO) | Official Video |
| 8 | Kumba | KUMBA - XED256 (AUDIO) | Audio |
| 9 | Misuwa | MISUWA-XED256(OFFICIAL AUDIO) | Official Audio |

**Implementation requirements:**
- Use the **YouTube IFrame Player API** (`<iframe>` with `enablejsapi=1`) to embed and control playback
- Create a `<YouTubePlayer>` component in `/components/YouTubePlayer.tsx` that:
  - Accepts a YouTube video ID
  - Renders an iframe embed with `allow="autoplay; encrypted-media"`
  - Provides play/pause/seek controls styled to match the site's gold-on-dark theme
  - Autoplays when a track is selected from the playlist
- Update the `MusicPlayer` component:
  - When a track is clicked in the playlist, load its YouTube video in the player area
  - Show the YouTube video (for lyric/official videos) or just the audio with the cover art (for audio-only tracks)
  - The progress bar should sync with YouTube playback progress
  - Play/pause button should control the YouTube player
- Update the `Track` type in `/types/index.ts` to include `youtubeVideoId: string` (the actual YouTube video ID, not just a placeholder)
- **You must search YouTube** for each track title listed above, find the correct video by Xed256/XED256, and extract the real YouTube video ID (the `v=` parameter or the 11-character ID)
- The persistent "Now Playing" bar (from Part 1.1) should also control this YouTube player globally

### 6.4 — Additional Artist Images from Google Drive

Download images from this Google Drive folder and integrate them into the website:
**https://drive.google.com/drive/folders/1s_XcCkkHmclddsb6670yi45Dr1G7EQ_A**

**Implementation requirements:**
- Download ALL images from that Google Drive folder
- Save them to `/public/media/images/` with clean, descriptive filenames (e.g., `xed-studio-1.jpg`, `xed-portrait-3.jpg`, `xed-stage-2.jpg`)
- **CRITICAL: Avoid duplicate usage** — each image should be used in only ONE primary location:
  - Assign each new image a specific purpose (hero slideshow, product background, event card, gallery, about page, blog post, etc.)
  - Create a mapping in a comment or data file showing which image is used where
  - Do NOT reuse the same image across multiple product cards, event cards, or sections
- Update the `galleryImages` array in `/data/music.ts` to include ALL new images with proper categories
- Use the best/most striking new images for:
  - The homepage hero slideshow (if implementing the Ken Burns carousel from Part 1.1)
  - The About page hero and bio section
  - Event card backgrounds (assign different images to different events)
  - Store product lifestyle imagery
  - Blog post hero images (assign different images to different posts)
- Optimize all downloaded images:
  - Resize to max 1920px wide
  - Compress to WebP format, quality 80
  - Generate blur placeholder data URLs for each
- The existing 11 images should also be redistributed to avoid the current heavy reuse of the same images across products, events, and gallery

---

## EXECUTION PRIORITIES

Implement in this order for maximum impact:

1. **Media Content Integration** (Part 6) — YouTube music player, Instagram performance videos, interviews, Google Drive images — this is the FOUNDATION; real content must work before anything else
2. **Performance** (Part 4) — image optimization, font loading, bundle reduction — instant measurable improvement
3. **SEO** (Part 3) — sitemap, JSON-LD, metadata, structured data — improves discoverability immediately
4. **Business Strategy** (Part 2) — press kit page, links page, conversion features — drives revenue
5. **UI/UX** (Part 1) — visual upgrades, micro-interactions, new features — enhances engagement
6. **Accessibility** (Part 5) — compliance and inclusivity — professional standard

---

## CONSTRAINTS

- Do NOT rebuild from scratch — improve the existing codebase incrementally
- Do NOT add a database or backend — keep using static data files for now (JSON/TS)
- Do NOT add heavy dependencies — prefer native CSS, inline SVGs, and lightweight solutions
- Maintain the gold-on-dark brand identity throughout all changes
- All new pages must follow the existing folder structure: `/app/[page]/page.tsx`
- All new components must go in `/components/`
- Ensure `npm run build` passes with zero errors after every change
- The site must remain fully responsive (mobile, tablet, desktop)
- Keep total First Load JS under 85KB for the shared bundle
- **YouTube videos MUST play directly on the website** — do NOT redirect users to YouTube. Use iframe embeds with the YouTube IFrame Player API
- **Instagram reels MUST autoplay when clicked** — use Instagram oEmbed iframes or open in a modal. If embedding fails on certain browsers, fall back to opening the Instagram URL in a new tab
- **Every image from Google Drive must be used exactly ONCE** — create an image assignment map and do not duplicate any image across multiple sections
- **All 9 music tracks must link to their real YouTube videos** — search YouTube for each title, verify it's the correct Xed256 track, and extract the video ID
- **Performance videos must be prominently featured** — they should appear on both the Music page AND as a highlight section on the Homepage
