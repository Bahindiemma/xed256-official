import { Track, Product, Event, BlogPost } from "@/types";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Xed 256",
    alternateName: "XED256",
    url: "https://xed256.com",
    description:
      "Official website of Xed 256 (Edward Muligirwa) — genre-defying Ugandan artist from Fort Portal. Music, events, merch & more.",
    publisher: {
      "@type": "Person",
      name: "Xed 256",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://xed256.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function getArtistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Xed 256",
    alternateName: "Edward Muligirwa",
    url: "https://xed256.com",
    image: "https://xed256.com/media/images/xed-2325.jpg",
    description:
      "Genre-defying Ugandan artist from Fort Portal. Blending Amapiano, Afrobeats, RnB & Hip-Hop with Rutooro, English, and Luganda. FortPortal Ni Dubai.",
    birthPlace: {
      "@type": "Place",
      name: "Fort Portal, Uganda",
    },
    nationality: {
      "@type": "Country",
      name: "Uganda",
    },
    jobTitle: "Musician",
    knowsAbout: [
      "Afrobeats",
      "Amapiano",
      "RnB",
      "Hip-Hop",
      "Music Production",
    ],
    sameAs: [
      "https://www.instagram.com/xed256",
      "https://www.tiktok.com/@xeduganda",
      "https://x.com/xed256",
      "https://www.youtube.com/@xed256",
    ],
    email: "muligirwaxed12@gmail.com",
    telephone: "+256751155990",
  };
}

export function getMusicSchema(track: Track) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    duration: `PT${track.duration.replace(":", "M")}S`,
    genre: track.genre,
    datePublished: `${track.year}`,
    byArtist: {
      "@type": "Person",
      name: "Xed 256",
      url: "https://xed256.com",
    },
    image: `https://xed256.com${track.coverImage}`,
    url: `https://www.youtube.com/watch?v=${track.youtubeId}`,
  };
}

export function getProductSchema(product: Product, currency: string = "USD") {
  const price = currency === "UGX" ? product.priceUGX : product.price;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://xed256.com${product.image}`,
    url: `https://xed256.com/store/${product.id}`,
    brand: {
      "@type": "Brand",
      name: "Xed 256",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://xed256.com/store/${product.id}`,
    },
  };
}

export function getEventSchema(event: Event) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: event.title,
    startDate: `${event.date}T${convertTo24Hour(event.time)}`,
    description: event.description,
    image: `https://xed256.com${event.image}`,
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
      },
    },
    performer: {
      "@type": "Person",
      name: "Xed 256",
      url: "https://xed256.com",
    },
    eventStatus:
      event.status === "past"
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.ticketUrl && {
      offers: {
        "@type": "Offer",
        url: event.ticketUrl,
        availability: event.status === "sold-out"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      },
    }),
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://xed256.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Xed 256",
      url: "https://xed256.com",
    },
    publisher: {
      "@type": "Person",
      name: "Xed 256",
      url: "https://xed256.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://xed256.com/blog/${post.id}`,
    },
    articleSection: post.category,
  };
}

function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  const [rawHours, minutes] = time.split(":");
  let hours = parseInt(rawHours, 10);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
}
