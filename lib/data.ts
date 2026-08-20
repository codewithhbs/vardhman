import "server-only";
import { cache } from "react";
import dbConnect from "./db";
import {
  Company,
  Category as CategoryModel,
  Product as ProductModel,
  Blog as BlogModel,
  Industry as IndustryModel,
  Faq as FaqModel,
  Testimonial as TestimonialModel,
} from "@/models";
import type {
  Blog,
  Category,
  CompanyDoc,
  FAQ,
  Industry,
  Product,
  Testimonial,
} from "./types";

const plain = <T,>(v: any): T => JSON.parse(JSON.stringify(v));

/* Fallback so the app still renders (and `next build` never crashes)
   if Mongo is unreachable or not seeded yet. */
export const FALLBACK_COMPANY: CompanyDoc = {
  name: "Vardhman Packaging Ltd",
  legalName: "Vardhman Bhagwanshree Pvt. Ltd. (Vardhman Enterprises)",
  tagline: "Delivering Innovative Packaging & Tape Solutions with Precision and Excellence",
  short: "Vardhman Packaging",
  established: 1996,
  phone: "+919312706093",
  phone2: "+919899778199",
  phoneRaw: "+919312706093",
  landline: "+91 11 2358 6026",
  whatsapp: "919312706093",
  email: "sales@vardhmanpackaging.com",
  email2: "vardhmanbhagwanltd@gmail.com",
  address: {
    line1: "2074, Gali No.5, Chuna mandi",
    line2: "Pahar Ganj",
    city: "New Delhi",
    state: "Delhi",
    zip: "110055",
    country: "India",
  },
  footerAddress:
    "Ground Floor, Front Portion, Khasra No 71/1 Min, Alipur, Karnal Road, Central Delhi, New Delhi - 110036, Delhi, India",
  hours: "Mon – Sun: 24hrs",
  mapEmbed: "",
  logo: "/images/logo.jpeg",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.vardhmanpackagingltd.com",
  gtmId: "GTM-MH664578",
  socials: { facebook: "", linkedin: "", twitter: "", instagram: "" },
  stats: [],
  leadership: [],
  certificates: [],
  certificateImages: [],
  homepage: { why: [], process: [] },
  seo: { title: "", description: "", keywords: [] },
};

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    await dbConnect();
    return await fn();
  } catch (e) {
    console.error("[data] query failed:", (e as Error)?.message);
    return fallback;
  }
}

/* ------------------------------ company ------------------------------ */
export const getCompany = cache(async (): Promise<CompanyDoc> =>
  safe(async () => {
    const doc = await Company.findOne({}).lean();
    if (!doc) return FALLBACK_COMPANY;
    return { ...FALLBACK_COMPANY, ...plain<CompanyDoc>(doc) };
  }, FALLBACK_COMPANY)
);

export const getSiteUrl = cache(async () => (await getCompany()).siteUrl || FALLBACK_COMPANY.siteUrl);

/* ----------------------------- categories ---------------------------- */
export const getCategories = cache(async (): Promise<Category[]> =>
  safe(async () => {
    const rows = await CategoryModel.find({ active: true }).sort({ order: 1, name: 1 }).lean();
    return plain<Category[]>(rows);
  }, [])
);

export const getCategory = cache(async (slug: string): Promise<Category | null> =>
  safe(async () => {
    const row = await CategoryModel.findOne({ slug, active: true }).lean();
    return row ? plain<Category>(row) : null;
  }, null)
);

/* ------------------------------ products ----------------------------- */
export const getProducts = cache(async (): Promise<Product[]> =>
  safe(async () => {
    const rows = await ProductModel.find({ active: true }).sort({ order: 1, name: 1 }).lean();
    return plain<Product[]>(rows);
  }, [])
);

export const getProductsByCategory = cache(async (slug: string): Promise<Product[]> =>
  safe(async () => {
    const rows = await ProductModel.find({ category: slug, active: true })
      .sort({ order: 1, name: 1 })
      .lean();
    return plain<Product[]>(rows);
  }, [])
);

export const getProduct = cache(
  async (category: string, slug: string): Promise<Product | null> =>
    safe(async () => {
      const row = await ProductModel.findOne({ category, slug, active: true }).lean();
      return row ? plain<Product>(row) : null;
    }, null)
);

export const getRelatedProducts = cache(
  async (category: string, slug: string, n = 3): Promise<Product[]> =>
    safe(async () => {
      const rows = await ProductModel.find({ category, slug: { $ne: slug }, active: true })
        .sort({ order: 1 })
        .limit(n)
        .lean();
      return plain<Product[]>(rows);
    }, [])
);

/** One product per category (same behaviour as the old featuredProducts()). */
export const getFeaturedProducts = cache(async (n = 6): Promise<Product[]> =>
  safe(async () => {
    const flagged = await ProductModel.find({ featured: true, active: true })
      .sort({ order: 1 })
      .limit(n)
      .lean();
    if (flagged.length >= n) return plain<Product[]>(flagged);

    const cats = await getCategories();
    const out: any[] = [...flagged];
    const seen = new Set(out.map((p) => p.slug));
    for (const c of cats) {
      if (out.length >= n) break;
      const p = await ProductModel.findOne({ category: c.slug, active: true })
        .sort({ order: 1 })
        .lean();
      if (p && !seen.has((p as any).slug)) {
        seen.add((p as any).slug);
        out.push(p);
      }
    }
    return plain<Product[]>(out.slice(0, n));
  }, [])
);

/* ------------------------------- blogs ------------------------------- */
export const getBlogs = cache(async (): Promise<Blog[]> =>
  safe(async () => {
    const rows = await BlogModel.find({ published: true }).sort({ order: 1, date: -1 }).lean();
    return plain<Blog[]>(rows);
  }, [])
);

export const getBlog = cache(async (slug: string): Promise<Blog | null> =>
  safe(async () => {
    const row = await BlogModel.findOne({ slug, published: true }).lean();
    return row ? plain<Blog>(row) : null;
  }, null)
);

export const getBlogCategories = cache(async (): Promise<string[]> => {
  const blogs = await getBlogs();
  return ["All", ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)))];
});

/* ----------------------------- industries ---------------------------- */
export const getIndustries = cache(async (): Promise<Industry[]> =>
  safe(async () => {
    const rows = await IndustryModel.find({ active: true }).sort({ order: 1 }).lean();
    return plain<Industry[]>(rows);
  }, [])
);

/* -------------------------------- faqs ------------------------------- */
export const getGeneralFaqs = cache(async (): Promise<FAQ[]> =>
  safe(async () => {
    const rows = await FaqModel.find({ active: true }).sort({ order: 1 }).lean();
    return plain<FAQ[]>(rows).map((f: any) => ({ q: f.q, a: f.a }));
  }, [])
);

/* ---------------------------- testimonials --------------------------- */
export const getTestimonials = cache(async (): Promise<Testimonial[]> =>
  safe(async () => {
    const rows = await TestimonialModel.find({ active: true }).sort({ order: 1 }).lean();
    return plain<Testimonial[]>(rows);
  }, [])
);
