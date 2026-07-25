import Link from "next/link";
import { categories, productsByCategory } from "@/lib/products";
import { blogs } from "@/lib/blogs";
import PageHero from "@/components/PageHero";

export const metadata = { title: "Sitemap", description: "Complete sitemap of Vardhman Packaging Ltd website." };

const pages = [["Home", "/"], ["About Us", "/about"], ["Products", "/products"], ["Industries", "/industries"], ["Infrastructure", "/infrastructure"], ["Quality", "/quality"], ["Blogs", "/blogs"], ["Contact", "/contact"], ["Enquiry", "/enquiry"], ["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms"]];

export default function SitemapPage() {
  return (
    <>
      <PageHero title="Sitemap" crumbs={[{ label: "Sitemap" }]} />
      <section className="section"><div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg font-bold text-brand-dark">Main Pages</h2>
          <ul className="mt-4 space-y-2">{pages.map(([l, h]) => <li key={h}><Link href={h} className="text-sm text-black/60 hover:text-brand-orange">{l}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-brand-dark">Product Categories</h2>
          <ul className="mt-4 space-y-2">{categories.map((c) => <li key={c.slug}><Link href={`/products/${c.slug}`} className="text-sm text-black/60 hover:text-brand-orange">{c.name}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-brand-dark">Blog Articles</h2>
          <ul className="mt-4 space-y-2">{blogs.map((b) => <li key={b.slug}><Link href={`/blogs/${b.slug}`} className="text-sm text-black/60 hover:text-brand-orange">{b.title}</Link></li>)}</ul>
        </div>
      </div></section>
    </>
  );
}
