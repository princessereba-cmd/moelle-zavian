// Site content and small helper functions.
// Product data lives in catalog.js (generated); everything hand-written lives here.
import { collections, categories, products } from "./catalog.js";

export { collections, categories, products };

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
  archiveInBloomVideo: "/videos/archive-in-bloom.mp4",
  archiveInBloomPoster: "/images/posters/archive-in-bloom-poster.webp"
};

/* ---------- Helpers ---------- */

// Path for an image file. All media is local (in /public), so the path is used as-is.
// Callers still pass a width (left over from the Shopify CDN, which resized on the fly);
// it is ignored.
export function imageUrl(file) {
  return file;
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
  { title: "Dresses", handle: "dresses", image: "/images/categories/dresses.webp" },
  { title: "Coords", handle: "coord", image: "/images/categories/coord.webp" },
  { title: "Jump Suits", handle: "jump-suit", image: "/images/categories/jump-suit.webp" }
];

export const TESTIMONIALS = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => `/images/testimonials/testimonial-${n}.webp`
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
  "/images/size-guide/size-guide-1.webp",
  "/images/size-guide/size-guide-2.webp"
];
