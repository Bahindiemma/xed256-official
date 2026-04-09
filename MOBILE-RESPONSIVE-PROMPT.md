# XED 256 WEBSITE — MOBILE RESPONSIVENESS UPGRADE PROMPT

> Copy and paste this entire prompt to make the Xed 256 website at `Desktop/xed-256` fully mobile responsive with an excellent touch-first experience across all screen sizes (320px to 428px and up).

---

You are a senior frontend engineer specialising in mobile-first responsive design and touch-optimised interfaces.

Your task is to make the existing Xed 256 website at `Desktop/xed-256` **fully mobile responsive** with a best-in-class experience on phones (320px–428px), tablets (768px–1024px), and desktops (1280px+). The project uses Next.js 15, TypeScript, and Tailwind CSS.

**Do NOT rebuild pages from scratch.** Edit the existing files to fix responsiveness issues. Every change must be surgical — modify only the CSS classes and layout structure that need fixing.

---

## GLOBAL FIXES (Apply First — Affects Every Page)

### Fix 1: Button Sizing — CRITICAL

The `.btn-primary` and `.btn-outline` classes in `app/globals.css` use `px-8 py-3` which makes buttons too wide on mobile. Text inside buttons gets cramped or forces horizontal scroll.

**File:** `app/globals.css`

**Current:**
```css
.btn-primary {
  @apply relative px-8 py-3 font-heading font-semibold text-black rounded-full overflow-hidden transition-all duration-300;
}
.btn-outline {
  @apply relative px-8 py-3 font-heading font-semibold text-white rounded-full overflow-hidden transition-all duration-300 border border-white/20;
}
```

**Change to:**
```css
.btn-primary {
  @apply relative px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-heading font-semibold text-black rounded-full overflow-hidden transition-all duration-300;
}
.btn-outline {
  @apply relative px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-heading font-semibold text-white rounded-full overflow-hidden transition-all duration-300 border border-white/20;
}
```

This ensures:
- Buttons fit within 320px screens without overflow
- Text remains readable at `text-sm` on mobile, `text-base` on desktop
- Padding scales up on larger screens
- Touch target meets the 44px minimum height with py-2.5

### Fix 2: Section Padding — Reduce Vertical Space on Mobile

**File:** `app/globals.css`

**Current:**
```css
.section-padding {
  @apply py-20 md:py-32 px-4 md:px-8;
}
```

**Change to:**
```css
.section-padding {
  @apply py-12 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8;
}
```

This reduces vertical padding from 80px to 48px on mobile, preventing excessive whitespace.

### Fix 3: Card Hover Effects — Reduce on Mobile

**File:** `app/globals.css`

**Current:**
```css
.card-hover:hover {
  transform: translateY(-8px);
}
```

**Change to:**
```css
.card-hover:hover {
  transform: translateY(-4px);
}
@media (min-width: 640px) {
  .card-hover:hover {
    transform: translateY(-8px);
  }
}
```

Mobile hover effects should be subtler since they primarily trigger on tap.

---

## PAGE-BY-PAGE FIXES

### Homepage (`app/page.tsx`)

1. **Hero heading** — Find the `<h1>` with classes like `text-5xl sm:text-6xl md:text-7xl lg:text-8xl`. Change the base size:
   - **From:** `text-5xl sm:text-6xl md:text-7xl lg:text-8xl`
   - **To:** `text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl`

2. **Hero CTA buttons** — Find the flex container with the three buttons (Listen Now / Shop Merch / Book Xed). Add `w-full sm:w-auto` to each button so they stack full-width on mobile:
   - **From:** `<div className="flex flex-wrap gap-4">`
   - **To:** `<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">`
   - Add `w-full sm:w-auto text-center` to each `<Link>` button inside

3. **Decorative animated rings** — Find the two `<motion.div>` elements with `w-[800px]` and `w-[600px]`. Add `hidden sm:block` to both to hide them on mobile (they cause invisible overflow):
   - **From:** `className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border..."`
   - **To:** `className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border... hidden sm:block"`

4. **Featured products grid** — Find `grid grid-cols-2 lg:grid-cols-4`. Change to:
   - **To:** `grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4`
   - This makes products single-column on tiny phones (320px) and 2-col on normal phones

5. **About preview section** — The stats grid with "Tracks / Shows / Genres". Find `grid grid-cols-3`. On very small screens this gets cramped:
   - Keep `grid grid-cols-3` but reduce the stat value text size:
   - **From:** `text-2xl` on stat values
   - **To:** `text-xl sm:text-2xl`

6. **Newsletter input row** — Find `flex flex-col sm:flex-row gap-3`. This is correct. But the input should be:
   - **From:** `flex-1 px-5 py-3`
   - **To:** `flex-1 px-4 sm:px-5 py-3 text-sm`

### Music Page (`app/music/page.tsx`)

1. **Hero heading** — Same fix as homepage: reduce base size to `text-3xl sm:text-5xl md:text-6xl lg:text-7xl`

2. **Genre filter tabs** — The filter buttons use `flex flex-wrap gap-2`. On 320px, too many tabs cause messy wrapping. Fix:
   - Add `overflow-x-auto` and `flex-nowrap` with `scrollbar-hide` (or `overflow-x-auto scrollbar-none`) so tabs scroll horizontally on mobile:
   - **To:** `<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:overflow-visible sm:justify-center">`
   - Add `flex-shrink-0` to each button so they don't collapse

3. **Playlist items** — Each track row shows number, image, title, genre, type badge, and duration. On 320px this overflows:
   - Hide the type badge on mobile: add `hidden md:inline-block` to the type badge span
   - Hide the genre badge on very small screens: add `hidden sm:inline-block`
   - Reduce the track number width: `w-4 sm:w-6`

4. **Music videos grid** — If using a complex grid (1 large + 3 small), simplify on mobile:
   - On mobile: `grid-cols-1` (stack all videos vertically)
   - On tablet: `grid-cols-2`
   - On desktop: keep the cinema layout

5. **Instagram performance videos grid** — Ensure `grid-cols-2` on mobile with smaller gap:
   - **To:** `grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4`

6. **Decorative animated orbs** — Add `hidden sm:block` to background blur elements with fixed pixel sizes

### About Page (`app/about/page.tsx`)

1. **Hero heading** — Reduce base: `text-3xl sm:text-4xl md:text-5xl lg:text-7xl`

2. **Bio section grid** — If using `lg:grid-cols-5` or similar with sticky sidebar, ensure mobile is single column:
   - Mobile: full width stacked
   - Desktop: side-by-side with sticky

3. **Timeline section** — Achievement timeline with alternating cards:
   - On mobile: all cards should be left-aligned (not alternating left/right)
   - The connecting line should be on the left edge, not centered
   - Ensure timeline cards don't overflow: add `max-w-full` and `overflow-hidden`

4. **Stats grid** — If using `grid-cols-2 sm:grid-cols-4`:
   - Keep `grid-cols-2` on mobile but reduce inner padding
   - Stat numbers: `text-2xl sm:text-3xl`

### Events Page (`app/events/page.tsx`)

1. **Hero stats row** — If showing "X upcoming / 50+ shows / 5+ cities" in a row:
   - **From:** `flex items-center gap-8`
   - **To:** `flex flex-wrap items-center gap-4 sm:gap-8`
   - Reduce stat number sizes on mobile

2. **EventCard layout** — The card uses `flex flex-col md:flex-row`. This is correct. But verify:
   - The image section: `w-full md:w-64 h-48 md:h-auto` — ensure `h-48` is not too tall on 320px. Consider `h-40 sm:h-48`
   - The "Get Tickets" button should be full width on mobile:
   - Add `w-full sm:w-auto` to the ticket link

3. **Event metadata** — Location/time info row: ensure it wraps:
   - **To:** `flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs`

### Store Page (`app/store/page.tsx`)

1. **Product grid** — Find `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4`:
   - This is tight on 320px. Products at 160px wide are cramped.
   - **To:** `grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6`

2. **Category filter + currency toggle row** — Ensure these wrap:
   - **To:** `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`

3. **ProductCard** — The card price and "Add to Cart" button row:
   - On 320px with 2-column grid, the button text gets cut off
   - Change "Add to Cart" button on mobile to an icon-only cart button:
   - Or: make the price and button stack vertically on small cards:
   - **To:** `<div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">`

### Store Product Detail (`app/store/[id]/page.tsx`)

1. **Breadcrumb** — Ensure it doesn't overflow: add `overflow-hidden` and `truncate` on long product names

2. **Product layout** — `grid lg:grid-cols-2 gap-10 lg:gap-16`:
   - Good on mobile (single column). But verify the image aspect ratio works on small screens.

3. **Size selector** — Buttons should wrap: `flex flex-wrap gap-2`

4. **Add to Cart button** — Uses `w-full sm:w-auto`. Good. But the button text "Add to Cart - $XX.XX" can be long:
   - On mobile, shorten: show just "Add to Cart" with price on a line above
   - Or reduce font size on mobile: `text-xs sm:text-sm`

5. **Currency toggle** — Ensure it doesn't overlap the price on narrow screens

### Checkout Page (`app/checkout/page.tsx`)

1. **Step indicator** — The 3-step bar can overflow on 320px:
   - Hide step text on mobile, show only numbers:
   - The `hidden sm:inline` on step labels is correct. Verify it's applied.

2. **Order summary sidebar** — `lg:grid-cols-5` with `lg:col-span-3` and `lg:col-span-2`:
   - On mobile this stacks correctly. But the sticky sidebar should NOT be sticky on mobile:
   - **From:** `sticky top-28`
   - **To:** `lg:sticky lg:top-28` (only sticky on desktop)

3. **Cart item cards** — Each item shows image, name, size, price, quantity controls, and delete button:
   - The quantity controls row: ensure `flex-wrap` if needed
   - Item image: `w-20 sm:w-24 h-24 sm:h-28` — reduce on mobile

4. **Payment method grid** — `grid grid-cols-1 sm:grid-cols-2`:
   - Good. On mobile, full-width payment method cards.

5. **Promo code input** — `flex gap-2` — ensure the input doesn't shrink too small

### Event Tickets Page (`app/events/tickets/[eventId]/page.tsx`)

1. **Event header** — Image + text layout with `flex-col md:flex-row`:
   - Good pattern. Verify the image is not too tall on mobile.

2. **Ticket tier cards** — Each card shows tier name, description, price, perks:
   - On 320px, the title/price row may overflow. Use:
   - **To:** `flex flex-col sm:flex-row items-start sm:items-start justify-between gap-2 sm:gap-0`

3. **Quantity selector** — Ensure the row wraps: `flex flex-wrap items-center gap-3 sm:gap-4`

4. **Order summary sidebar** — Same fix as checkout: `lg:sticky lg:top-28` (not sticky on mobile)

5. **Perks badges** — `flex flex-wrap gap-2` — reduce badge text size on mobile: `text-[9px] sm:text-[10px]`

### Contact Page (`app/contact/page.tsx`)

1. **Form grid** — If using `lg:grid-cols-5` for form + sidebar:
   - Correct mobile stacking. But verify form fields have enough spacing.

2. **Name fields grid** — `grid-cols-1 sm:grid-cols-2` — verify this collapses to 1 column on mobile

3. **Social media links grid** — Ensure icon buttons have minimum 44×44px touch targets

4. **Contact info cards** — Phone/email text: ensure it wraps or truncates on 320px

### Blog Page (`app/blog/page.tsx`)

1. **Featured post** — If using a 2-column layout (image + content):
   - **To:** `grid grid-cols-1 md:grid-cols-2`

2. **Post grid** — `grid sm:grid-cols-2 lg:grid-cols-3` — good. But on 320px, single column cards should have smaller image heights.

3. **Blog modal** — When reading a post in the modal:
   - Ensure the modal is `w-full max-w-3xl mx-2 sm:mx-4` (tighter margins on tiny phones)
   - The close button should be easily reachable (top-right, not hidden behind content)
   - Post content text: `text-sm sm:text-base` for comfortable reading
   - Add padding inside modal content: `p-4 sm:p-6 md:p-8`

### Links Page (`app/links/page.tsx`)

1. **Profile image** — Circular image: ensure it's not too large on mobile:
   - `w-24 h-24 sm:w-28 sm:h-28`

2. **Link buttons** — Full-width glass cards. Ensure:
   - Text doesn't overflow: add `truncate` or `min-w-0` to text container
   - Icon + text alignment works on 320px
   - Touch targets: minimum `py-4` for comfortable tapping

### Press Kit Page (`app/press-kit/page.tsx`)

1. **Bio copy cards** — The "Copy" button should not overlap the bio text:
   - Position it below the text on mobile, or as a small icon button

2. **Key facts grid** — `grid-cols-2 sm:grid-cols-3`:
   - On 320px, 2-column may be too tight. Consider `grid-cols-1 xs:grid-cols-2 sm:grid-cols-3`

3. **Press photos grid** — Download buttons must be large enough to tap

---

## COMPONENT FIXES

### Navbar (`components/Navbar.tsx`)

1. **Cart button touch target** — Currently `p-2` (total ~36×36px). Too small for mobile touch:
   - **To:** `p-2.5 sm:p-2` or better: `min-w-[44px] min-h-[44px] flex items-center justify-center`

2. **Mobile menu button** — `w-10 h-10` is okay (40×40px). Increase to `w-11 h-11` for safer touch.

3. **Logo text** — `text-xl` may be fine. But ensure logo + text doesn't overlap cart button on 320px screens.

### Footer (`components/Footer.tsx`)

1. **COTE TECHNOLOGIES credit line** — The `text-[11px]` line with company, name, email, phone:
   - On 320px this is a long line that wraps awkwardly
   - **To:** Stack on mobile:
   ```tsx
   <p className="text-[11px] text-zinc-600 text-center leading-relaxed">
     Built & managed by <a>COTE TECHNOLOGIES</a>
     <br className="sm:hidden" />
     {" | "}<span>Eng. Emmanuel Bahindi</span>
     <br className="sm:hidden" />
     <a>ebahindi@gmail.com</a> <a>+256773165989</a>
   </p>
   ```

2. **Social icons** — Ensure `gap-3` is comfortable. Icons at `w-10 h-10` are fine for touch.

3. **Footer grid** — `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`:
   - On mobile, ensure single column with comfortable spacing

### CartDrawer (`components/CartDrawer.tsx`)

1. **Drawer width** — `w-full max-w-md`:
   - On phones <428px, `max-w-md` (448px) means the drawer is full width anyway. This is fine.
   - But add padding safety: ensure inner content has `px-4 sm:px-6`

2. **Cart item layout** — Image (w-20) + content:
   - On 320px with px-6 drawer padding, content area is only ~200px
   - Reduce item image: `w-16 sm:w-20 h-16 sm:h-20`

3. **Quantity buttons** — `w-6 h-6` is too small for touch (24×24px):
   - **To:** `w-8 h-8 sm:w-6 sm:h-6` with larger text

4. **Checkout button** — Full width. Good. Ensure text is readable.

### MusicPlayer (`components/MusicPlayer.tsx`)

1. **Playlist track rows** — On mobile, each row shows too many elements:
   - Hide genre badge: `hidden sm:inline`
   - Hide type badge: `hidden md:inline-flex`
   - Reduce track number width: `w-4 sm:w-6`
   - Track image: `w-8 h-8 sm:w-10 sm:h-10`

2. **Player controls** — Play/pause button should be easily tappable:
   - Minimum `w-12 h-12 sm:w-14 sm:h-14`

### EventCard (`components/EventCard.tsx`)

1. **Get Tickets button** — Should be `w-full sm:w-auto` on mobile

2. **Metadata row** — Location/time icons + text:
   - **To:** `flex flex-col sm:flex-row flex-wrap gap-1.5 sm:gap-4 text-[11px] sm:text-xs`

### ProductCard (`components/ProductCard.tsx`)

1. **Price + Add to Cart row** — On 2-column mobile grid, this row is only ~145px wide:
   - Stack vertically on smallest screens:
   - **To:** `<div className="flex flex-col gap-2">`
   - Show price first (full width), then button (full width) on mobile:
   - Button text: change from "Add to Cart" to shorter "Add" on tiny screens, or use `text-[10px] sm:text-xs`

### PaymentMethodSelector (`components/PaymentMethodSelector.tsx`)

1. **Grid** — `grid grid-cols-1 sm:grid-cols-2`:
   - Good. Full-width cards on mobile.

2. **Card inner layout** — `flex items-center gap-3 p-4`:
   - Reduce padding on mobile: `p-3 sm:p-4`
   - Ensure the checkmark doesn't overlap text

### PhotoGallery (`components/PhotoGallery.tsx`)

1. **Grid** — `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4`:
   - Good for mobile. But `gap-3 md:gap-4` could be reduced:
   - **To:** `gap-2 sm:gap-3 md:gap-4`

2. **Filter buttons** — Same scrollable fix as music genre tabs on mobile

3. **Lightbox modal** — Ensure `max-h-[85vh]` works on mobile with bottom browser chrome:
   - Reduce to `max-h-[80vh]` and add `p-2 sm:p-4`

### InstagramEmbed (`components/InstagramEmbed.tsx`)

1. **Card height** — `max-h-[350px]`:
   - **To:** `max-h-[280px] sm:max-h-[350px]`

2. **Modal iframe** — `height="550"`:
   - On mobile, this may be too tall. Use responsive:
   - **To:** `height={typeof window !== 'undefined' && window.innerWidth < 640 ? 450 : 550}`
   - Or better: use CSS `h-[450px] sm:h-[550px]` on the iframe container

---

## TAILWIND CONFIGURATION

### Add Custom Breakpoint for Very Small Phones

**File:** `tailwind.config.ts`

Add an `xs` breakpoint for 360px screens (most Android phones):

```ts
theme: {
  screens: {
    xs: "360px",
    // sm, md, lg, xl remain default
  },
  extend: { ... }
}
```

This enables classes like `xs:grid-cols-2`, `xs:text-4xl`, `xs:px-6` for fine-grained control between 320px and 640px.

---

## TOUCH TARGET REQUIREMENTS

Every interactive element MUST meet these minimums:
- **Minimum size:** 44×44px (Apple HIG) or 48×48dp (Material Design)
- **Minimum spacing between targets:** 8px
- **Buttons:** min-height 44px with adequate padding
- **Links in lists:** min-height 44px per row
- **Icon buttons:** min-width and min-height 44px
- **Form inputs:** min-height 44px (py-3 on standard text = ~46px, good)

Audit every button, link, and interactive element across all pages and components. If any element is smaller than 44×44px, increase its padding or dimensions.

---

## TESTING CHECKLIST

After implementing all fixes, verify the following on a 320px viewport (iPhone SE) and 390px viewport (iPhone 14):

- [ ] No horizontal scrollbar on any page
- [ ] All text is readable without zooming
- [ ] All buttons show their full text (no truncation)
- [ ] All buttons are easily tappable (44px+ touch targets)
- [ ] Navigation hamburger menu works and covers full screen
- [ ] Cart drawer opens and items are manageable
- [ ] Product cards show properly in single or 2-column grid
- [ ] Checkout flow works with all 6 payment methods
- [ ] Ticket purchase flow works on mobile
- [ ] Blog post modal is readable and closeable
- [ ] Photo gallery lightbox works on mobile
- [ ] YouTube player is responsive (16:9 aspect ratio maintained)
- [ ] Instagram embeds fit within screen width
- [ ] Footer credit line wraps gracefully
- [ ] Forms are fillable with mobile keyboard open
- [ ] No text overlaps any other text
- [ ] No images overflow their containers

---

## CONSTRAINTS

- Do NOT change the design, colors, or branding — only fix responsiveness
- Do NOT remove any features or content
- Do NOT add new dependencies
- Only modify CSS classes (Tailwind utilities) and minimal JSX structure changes
- Maintain the existing dark gold-on-black theme
- Ensure `npm run build` passes with zero errors after every change
- Test at 320px, 375px, 390px, 428px, 768px, 1024px, and 1440px viewports
