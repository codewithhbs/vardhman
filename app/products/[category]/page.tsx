import { notFound } from "next/navigation";
import Image from "next/image";
import {
  categories,
  getCategory,
  productsByCategory,
  resolveImage,
} from "@/lib/products";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const c = getCategory(params.category);
  if (!c) return {};
  return { title: c.name, description: c.description.slice(0, 155) };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = getCategory(params.category);
  if (!cat) return notFound();
  const items = productsByCategory(cat.slug);

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
              <Image
                src={resolveImage(cat.image)}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Overview"
              title={`About our ${cat.name.toLowerCase()}`}
            />
            <p className="mt-5 text-black/60 leading-relaxed">
              {cat.description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {cat.features.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-2 text-sm text-black/70"
                >
                  <CheckCircle2 className="h-5 w-5 flex-none text-brand-orange" />{" "}
                  {f}
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                <ProductCard p={{ ...p, image: resolveImage(p.image) }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Applications"
              title="Where these products are used"
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {cat.applications.map((a) => (
                <span key={a} className="chip !text-sm">
                  {a}
                </span>
              ))}
            </div>
            <h3 className="mt-8 font-display font-bold text-brand-dark">
              Industries served
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {cat.industries.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-brand-dark px-3 py-1 text-xs font-medium text-white"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="FAQ" title="Common questions" />
            <div className="mt-6">
              <FAQAccordion items={cat.faqs} />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
