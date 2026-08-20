import mongoose, { Schema, models, model } from "mongoose";

/* ---------------- Company (single document) ---------------- */
const CompanySchema = new Schema(
  {
    name: { type: String, default: "" },
    legalName: { type: String, default: "" },
    tagline: { type: String, default: "" },
    short: { type: String, default: "" },
    established: { type: Number, default: 1996 },
    phone: { type: String, default: "" },
    phone2: { type: String, default: "" },
    phoneRaw: { type: String, default: "" },
    landline: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    email: { type: String, default: "" },
    email2: { type: String, default: "" },
    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    footerAddress: { type: String, default: "" },
    hours: { type: String, default: "" },
    mapEmbed: { type: String, default: "" },
    logo: { type: String, default: "/images/logo.jpeg" },
    siteUrl: { type: String, default: "" },
    gtmId: { type: String, default: "" },
    socials: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    stats: [{ label: String, value: Number, suffix: String }],
    leadership: [{ name: String, role: String }],
    certificates: [String],
    certificateImages: [{ src: String, alt: String }],
    homepage: {
      why: [{ icon: String, title: String, desc: String }],
      process: [{ title: String, desc: String }],
    },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: [String],
    },
  },
  { timestamps: true, minimize: false }
);

/* ---------------- Category ---------------- */
const CategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    icon: { type: String, default: "Package" },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    features: [String],
    applications: [String],
    industries: [String],
    faqs: [{ q: String, a: String }],
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: [String],
    },
  },
  { timestamps: true }
);

/* ---------------- Product ---------------- */
const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true }, // category slug
    blurb: { type: String, default: "" },
    specs: [{ k: String, v: String }],
    sizes: [String],
    highlights: [String],
    price: { type: String, default: "" },
    image: { type: String, default: "" }, // primary/thumbnail
    images: [String], // gallery — multiple images
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: [String],
    },
  },
  { timestamps: true }
);
ProductSchema.index({ category: 1, slug: 1 }, { unique: true });

/* ---------------- Blog ---------------- */
const BlogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    category: { type: String, default: "" },
    date: { type: String, default: "" },
    readTime: { type: String, default: "" },
    image: { type: String, default: "" },
    content: [String],
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: [String],
    },
  },
  { timestamps: true }
);

/* ---------------- Industry ---------------- */
const IndustrySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    icon: { type: String, default: "Factory" },
    desc: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* ---------------- FAQ (general) ---------------- */
const FaqSchema = new Schema(
  {
    q: { type: String, required: true },
    a: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* ---------------- Testimonial ---------------- */
const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, default: "" },
    text: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* ---------------- Enquiry ---------------- */
const EnquirySchema = new Schema(
  {
    name: { type: String, default: "" },
    company: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    product: { type: String, default: "" },
    quantity: { type: String, default: "" },
    message: { type: String, default: "" },
    source: { type: String, default: "website" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

/* ---------------- Admin user ---------------- */
const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, default: "Admin" },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Company = models.Company || model("Company", CompanySchema);
export const Category = models.Category || model("Category", CategorySchema);
export const Product = models.Product || model("Product", ProductSchema);
export const Blog = models.Blog || model("Blog", BlogSchema);
export const Industry = models.Industry || model("Industry", IndustrySchema);
export const Faq = models.Faq || model("Faq", FaqSchema);
export const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
export const Enquiry = models.Enquiry || model("Enquiry", EnquirySchema);
export const AdminUser = models.AdminUser || model("AdminUser", AdminUserSchema);

export default mongoose;
