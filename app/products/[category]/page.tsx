import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getCategory, getProductsByCategory } from "@/lib/data";
import { resolveImage } from "@/lib/types";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { category: string } }) {
  const c = await getCategory(params.category);
  if (!c) return {};
  const title = c.seo?.title || c.name;
  const description = c.seo?.description || (c.description || "").slice(0, 155);
  return {
    title,
    description,
    keywords: c.seo?.keywords || [],
    openGraph: { title, description, images: c.image ? [c.image] : [] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const cat = await getCategory(params.category);
  if (!cat) return notFound();
  const items = await getProductsByCategory(cat.slug);

  return (
    <>
      <PageHero
        title={cat.name}
        subtitle={cat.tagline}
        crumbs={[{ label: "Products", href: "/products" }, { label: cat.name }]}
      />

      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-glow">
              <Image src={resolveImage(cat.image)} alt={cat.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Overview" title={`About our ${cat.name.toLowerCase()}`} />
            <p className="mt-5 leading-relaxed text-black/60">{cat.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(cat.features || []).map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-black/70">
                  <CheckCircle2 className="h-5 w-5 flex-none text-brand-orange" /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-brand-gray">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Range"
            title={`${cat.name} products`}
            subtitle="Every product includes a quick enquiry option. Click any product for full details and specifications."
          />
          {items.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal key={p._id || p.slug} delay={(i % 3) * 0.05}>
                  <ProductCard p={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-black/50">
              Products for this category are coming soon. Please send us an enquiry for details.
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Applications" title="Where these products are used" />
            <div className="mt-6 flex flex-wrap gap-2">
              {(cat.applications || []).map((a) => (
                <span key={a} className="chip !text-sm">{a}</span>
              ))}
            </div>
            <h3 className="mt-8 font-display font-bold text-brand-dark">Industries served</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {(cat.industries || []).map((a) => (
                <span key={a} className="rounded-full bg-brand-dark px-3 py-1 text-xs font-medium text-white">{a}</span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="FAQ" title="Common questions" />
            <div className="mt-6">
              <FAQAccordion items={cat.faqs || []} />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
