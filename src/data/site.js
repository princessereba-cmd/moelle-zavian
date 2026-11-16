// Site content and small helper functions.
// Product data lives in catalog.js (generated); everything hand-written lives here.
import { CDN, collections, categories, products } from "./catalog.js";

export { collections, categories, products };

// Images hosted on the reference store (not yet downloaded locally)
const STORE = "https://moellezavian.com/cdn/shop/files/";

/* ---------- Local media (files in /public) ---------- */
export const MEDIA = {
  logoBlack: "/images/logo-black.svg",
  logoWhite: "/images/logo-white.svg",
  heroVideo: "/videos/homePage-video.mp4",
  heroPoster: "/images/hero-poster image.webp",
  aboutImage: "/images/About-us (1).jpg",
  artOfBecomingVideo: "/videos/artOfBecoming-video.mp4",
  // First frame of artOfBecoming-video.mp4 (same frame the reference uses)
  artOfBecomingPoster: "/images/artOfBecoming-poster.jpg",
  // Not downloaded yet — streams from the reference store's CDN
  archiveInBloomVideo:
    "https://moellezavian.com/cdn/shop/videos/c/vp/bc2ea6ec83824a50aed9e70e99ea2d3b/bc2ea6ec83824a50aed9e70e99ea2d3b.HD-1080p-7.2Mbps-86213653.mp4",
  archiveInBloomPoster:
    STORE + "preview_images/bc2ea6ec83824a50aed9e70e99ea2d3b.thumbnail.0000000000_800x.jpg?v=1781122955"
};

/* ---------- Helpers ---------- */

// Build an image URL at a given width (Shopify CDN resizes on the fly)
export function imageUrl(file, width = 800) {
  const url = file.startsWith("http") || file.startsWith("/") ? file : CDN + file;
  if (url.startsWith("/")) return url; // local file — no resizing
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
}

// 413000 -> "₦413,000.00"
export function formatPrice(amount) {
  return (
    "₦" +
    amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}

export function getProduct(handle) {
  return products[handle];
}

// Works for both collections and categories
export function getCollection(handle) {
  const found = [...collections, ...categories].find((c) => c.handle === handle);
  if (!found) return null;
  return { ...found, items: found.products.map((h) => products[h]) };
}

export function getProducts(handles) {
  return handles.map((h) => products[h]).filter(Boolean);
}

/* ---------- Homepage content ---------- */
export const HOME_COLLECTIONS = {
  lifeWellDressed: {
    title: "A life well dressed",
    handle: "a-life-well-dressed",
    products: [
      "kinder-magenta-purple-pant-set",
      "odessa-3-piece",
      "vivienne",
      "monroe-red-aso-oke-set",
      "cairo-white-chiffon-top-and-skirt",
      "imani"
    ]
  },
  artOfBecoming: {
    title: "Art of Becoming",
    handle: "art-of-becoming",
    products: ["elowen", "mariselle", "hope", "evolve"]
  },
  archiveInBloom: {
    title: "Archive in Bloom",
    handle: "archive-in-bloom",
    products: ["amina", "magnolia", "hope-2-0", "laraba"]
  }
};

export const CATEGORY_TILES = [
  { title: "Dresses", handle: "dresses", image: STORE + "Dresses.jpg?v=1777842854" },
  { title: "Coords", handle: "coord", image: STORE + "Coord_set.jpg?v=1777842855" },
  { title: "Jump Suits", handle: "jump-suit", image: STORE + "Jumpsuit.jpg?v=1777842853" }
];

export const TESTIMONIALS = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => `${STORE}Testimonial_${n}.png?v=1778484730`
);

/* ---------- Brand copy (from the reference site) ---------- */
export const BRAND = {
  aboutTitle: "The Moelle Zavian",
  about:
    "Founded on craftsmanship, femininity, and intentional design, Moelle Zavian creates premium made-to-order pieces for women who embrace elegance with confidence. From intricate hand-beading to sculptural silhouettes, each design is thoughtfully crafted to celebrate beauty, transformation, and individuality. Rooted in modern African luxury, our pieces are designed to make every woman feel unforgettable.",
  manifestoTitle: "Designed to Celebrate Becoming",
  manifesto:
    "At Moelle Zavian, we believe fashion should feel transformative, intentional, and unforgettable. We create premium made-to-order pieces that merge refined craftsmanship with modern femininity, designing elevated silhouettes that inspire confidence, elegance, and individuality for every woman stepping into her becoming.",
  footerAbout:
    "Moelle Zavian is a made-to-order clothing brand rooted in timeless design and refined craftsmanship. Each piece is tailored for fit, form, and individuality."
};

export const FEATURES = [
  {
    icon: "delivery",
    title: "Fast Delivery, No Delays",
    text: "Orders are processed quickly and delivered with care"
  },
  {
    icon: "quality",
    title: "Quality You Can Trust",
    text: "Every piece is crafted with attention to detail and premium finishing."
  },
  {
    icon: "support",
    title: "Dedicated Support",
    text: "Our team is available to assist you via WhatsApp and email."
  },
  {
    icon: "secure",
    title: "Secure payments",
    text: "All transactions are protected with trusted and encrypted systems"
  }
];

export const SOCIAL = {
  instagram: "https://www.instagram.com/moellezavian",
  // NOTE: the reference shows "+234 906 184 8970" but links to this number — confirm with the client
  whatsapp: "https://wa.me/2349122636343"
};

/* ---------- Product page content ---------- */
export const DELIVERY_INFO = [
  "All pieces are made to order. Processing takes 6–12 business days.",
  "Lagos: delivered the next business day after processing.",
  "Within Nigeria (DHL): 1–3 business days.",
  "United Kingdom (DHL): 2–3 business days.",
  "Other international (DHL): 3–5 business days.",
  "Expedited processing is available for ₦30,000 / $30 / £25."
];

export const SIZE_GUIDE_IMAGES = [
  CDN + "IMG_1827.jpg?v=1775424587",
  CDN + "fb96fc85-2aa6-4c06-9902-af2d1ca98514.jpg?v=1775424678"
];
