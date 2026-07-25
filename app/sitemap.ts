import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { categories, products } from "@/lib/products";
import { blogs } from "@/lib/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/products", "/industries", "/infrastructure", "/quality", "/blogs", "/contact", "/enquiry", "/privacy-policy", "/terms", "/sitemap-page"].map((r) => ({
    url: `${SITE_URL}${r}`, lastModified: now, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.8,
  }));
  const catRoutes = categories.map((c) => ({ url: `${SITE_URL}/products/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }));
  const prodRoutes = products.map((p) => ({ url: `${SITE_URL}/products/${p.category}/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }));
  const blogRoutes = blogs.map((b) => ({ url: `${SITE_URL}/blogs/${b.slug}`, lastModified: new Date(b.date), changeFrequency: "yearly" as const, priority: 0.5 }));
  return [...staticRoutes, ...catRoutes, ...prodRoutes, ...blogRoutes];
}
