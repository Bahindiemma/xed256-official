export interface Track {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
  youtubeId: string;
  coverImage: string;
  featured?: boolean;
  year: number;
  genre: string;
  type?: "lyric-video" | "official-video" | "official-audio";
}

export interface PerformanceVideo {
  id: string;
  title: string;
  instagramUrl: string;
  instagramId: string;
  thumbnail: string;
  venue?: string;
  date: string;
  type: "reel" | "post";
}

export interface Interview {
  id: string;
  title: string;
  source: string;
  url: string;
  type: "video" | "article" | "radio";
  youtubeId?: string;
  thumbnail: string;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  type: "music-video" | "performance" | "interview";
  date: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "performance" | "portrait" | "behind-the-scenes";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUGX: number;
  image: string;
  images: string[];
  category: "merch" | "digital";
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  description: string;
  image: string;
  ticketUrl?: string;
  status: "upcoming" | "sold-out" | "past";
  tickets?: TicketTier[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export type PaymentMethod =
  | "visa"
  | "bank-transfer"
  | "mtn-momo"
  | "mtn-momo-code"
  | "airtel-pay"
  | "airtel-money";

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  priceUGX: number;
  description: string;
  perks: string[];
  available: number;
}

export interface TicketOrder {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  tier: TicketTier;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  currency: "USD" | "UGX";
  purchasedAt: string;
}
