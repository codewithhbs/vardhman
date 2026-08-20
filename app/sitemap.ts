import type { MetadataRoute } from "next";
import { getBlogs, getCategories, getCompany, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [company, categories, products, blogs] = await Promise.all([
    getCompany(),
    getCategories(),
    getProducts(),
    getBlogs(),
  ]);
  const base = company.siteUrl;

  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/industries",
    "/infrastructure",
    "/quality",
    "/blogs",
    "/contact",
    "/enquiry",
    "/privacy-policy",
    "/terms",
    "/sitemap-page",
  ].map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));

  const catRoutes = categories.map((c) => ({
    url: `${base}/products/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const prodRoutes = products.map((p) => ({
    url: `${base}/products/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const blogRoutes = blogs.map((b) => ({
    url: `${base}/blogs/${b.slug}`,
    lastModified: b.date ? new Date(b.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...catRoutes, ...prodRoutes, ...blogRoutes];
}
