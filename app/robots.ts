import type { MetadataRoute } from "next";
import { getCompany } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const company = await getCompany();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${company.siteUrl}/sitemap.xml`,
  };
}
