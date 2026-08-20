export type Spec = { k: string; v: string };
export type FAQ = { q: string; a: string };
export type SEO = { title?: string; description?: string; keywords?: string[] };

export type Product = {
  _id?: string;
  slug: string;
  name: string;
  category: string; // category slug
  blurb: string;
  specs: Spec[];
  sizes: string[];
  highlights?: string[];
  price?: string;
  image: string;
  images?: string[];
  order?: number;
  featured?: boolean;
  active?: boolean;
  seo?: SEO;
};

export type Category = {
  _id?: string;
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
  industries: string[];
  faqs: FAQ[];
  order?: number;
  active?: boolean;
  seo?: SEO;
};

export type Blog = {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  order?: number;
  published?: boolean;
  seo?: SEO;
};

export type Industry = {
  _id?: string;
  slug: string;
  name: string;
  icon: string;
  desc: string;
  order?: number;
  active?: boolean;
};

export type Testimonial = {
  _id?: string;
  name: string;
  designation: string;
  text: string;
  rating: number;
  order?: number;
  active?: boolean;
};

export type CompanyDoc = {
  _id?: string;
  name: string;
  legalName: string;
  tagline: string;
  short: string;
  established: number;
  phone: string;
  phone2: string;
  phoneRaw: string;
  landline: string;
  whatsapp: string;
  email: string;
  email2: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  footerAddress: string;
  hours: string;
  mapEmbed: string;
  logo: string;
  siteUrl: string;
  gtmId: string;
  socials: { facebook: string; linkedin: string; twitter: string; instagram: string };
  stats: { label: string; value: number; suffix: string }[];
  leadership: { name: string; role: string }[];
  certificates: string[];
  certificateImages: { src: string; alt: string }[];
  homepage: {
    why: { icon: string; title: string; desc: string }[];
    process: { title: string; desc: string }[];
  };
  seo: { title: string; description: string; keywords: string[] };
};

/* -------- image helpers (same behaviour as before) -------- */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const resolveImage = (image?: string) => {
  if (!image) return "";
  if (image.startsWith("/") || image.startsWith("http")) return image;
  return unsplash(image);
};

/**
 * Full resolved gallery for a product. Uses p.images when present,
 * else falls back to [p.image]. Never returns empty strings.
 */
export const productGallery = (p: Pick<Product, "image" | "images">) => {
  const raw = (p.images && p.images.length > 0 ? p.images : [p.image]).filter(Boolean);
  const out = raw.map(resolveImage).filter(Boolean);
  return out.length > 0 ? out : [""];
};

/** Padded gallery of fixed length (legacy resolveGallery behaviour). */
export const resolveGallery = (p: Pick<Product, "image" | "images">, count = 3) => {
  const resolved = productGallery(p);
  const out = [...resolved];
  while (out.length < count) out.push(out[0] ?? "");
  return out.slice(0, count);
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
