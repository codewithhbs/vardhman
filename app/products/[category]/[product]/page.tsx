import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Settings, Factory, ArrowRight, Layers } from "lucide-react";
import { getCategory, getCompany, getProduct, getRelatedProducts } from "@/lib/data";
import { productGallery } from "@/lib/types";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { category: string; product: string };
}) {
  const p = await getProduct(params.category, params.product);
  if (!p) return {};
  const title = p.seo?.title || p.name;
  const description = p.seo?.description || (p.blurb || "").slice(0, 155);
  return {
    title,
    description,
    keywords: p.seo?.keywords || [],
    openGraph: { title, description, images: p.image ? [p.image] : [] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { category: string; product: string };
}) {
  const [cat, p, company] = await Promise.all([
    getCategory(params.category),
    getProduct(params.category, params.product),
    getCompany(),
  ]);
  if (!cat || !p) return notFound();

  const related = await getRelatedProducts(cat.slug, p.slug, 3);
  const gallery = productGallery(p);
  const highlights =
    p.highlights && p.highlights.length > 0 ? p.highlights : cat.applications || [];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.blurb,
    image: gallery.map((g) => (g.startsWith("http") ? g : `${company.siteUrl}${g}`)),
    category: cat.name,
    brand: { "@type": "Brand", name: company.short || company.name },
    url: `${company.siteUrl}/products/${cat.slug}/${p.slug}`,
    ...(p.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: p.price.replace(/[^\d.]/g, ""),
            availability: "https://schema.org/InStock",
            url: `${company.siteUrl}/products/${cat.slug}/${p.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <PageHero
        title={p.name}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: cat.name, href: `/products/${cat.slug}` },
          { label: p.name },
        ]}
      />

      {/* Gallery + summary */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <ProductGallery images={gallery} name={p.name} badge={cat.name} />
          </Reveal>

          <div>
            <span className="eyebrow">Product Overview</span>
            <h2 className="h-title text-3xl">{p.name}</h2>

            <p className="mt-4 leading-relaxed text-black/60">
              {p.blurb} Manufactured by {company.short || company.name} to consistent quality
              standards, this product is available in custom specifications to suit your application.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(cat.features || []).map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-black/70">
                  <CheckCircle2 className="h-5 w-5 flex-none text-brand-orange" /> {f}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquiry" className="btn-primary">
                Quick Enquiry <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {p.sizes && p.sizes.length > 0 && (
              <div className="mt-8">
                <h3 className="flex items-center gap-2 font-display font-bold text-brand-dark">
                  <Layers className="h-5 w-5 text-brand-orange" /> Available Sizes
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.sizes.map((s) => (
                    <span key={s} className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-brand-dark">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specs + Applications + Benefits */}
      <section className="section bg-brand-gray">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <Reveal>
            <div className="card h-full p-6">
              <h3 className="flex items-center gap-2 font-display font-bold text-brand-dark">
                <Settings className="h-5 w-5 text-brand-orange" /> Technical Specifications
              </h3>
              <table className="mt-4 w-full text-sm">
                <tbody className="divide-y divide-black/5">
                  {(p.specs || []).map((s, i) => (
                    <tr key={`${s.k}-${i}`}>
                      <td className="py-2.5 font-medium text-black/50">{s.k}</td>
                      <td className="py-2.5 text-right font-semibold text-brand-dark">{s.v}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2.5 font-medium text-black/50">Category</td>
                    <td className="py-2.5 text-right font-semibold text-brand-dark">{cat.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-black/50">Customisation</td>
                    <td className="py-2.5 text-right font-semibold text-brand-dark">Available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="card h-full p-6">
              <h3 className="flex items-center gap-2 font-display font-bold text-brand-dark">
                <Factory className="h-5 w-5 text-brand-orange" /> Applications &amp; Highlights
              </h3>
              <ul className="mt-4 space-y-2.5">
                {highlights.map((a, i) => (
                  <li key={`${a}-${i}`} className="flex items-start gap-2 text-sm text-black/65">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-orange" /> {a}
                  </li>
                ))}
              </ul>
              <h4 className="mt-6 font-display font-semibold text-brand-dark">
                Industries using this product
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {(cat.industries || []).map((i) => (
                  <span key={i} className="chip">{i}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card h-full p-6">
              <h3 className="flex items-center gap-2 font-display font-bold text-brand-dark">
                <Package className="h-5 w-5 text-brand-orange" /> Benefits &amp; Packaging
              </h3>
              <ul className="mt-4 space-y-2.5">
                {(cat.features || []).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-black/65">
                    <CheckCircle2 className="h-4 w-4 flex-none text-brand-orange" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-brand-gray p-4 text-sm text-black/60">
                <strong className="text-brand-dark">Packaging Details:</strong> Supplied in protective
                cartons / rolls suited for safe transit. Custom packaging and private-label options
                available on request.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Customisation + FAQ */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Customisation"
              title="Made to your specification"
              subtitle="We tailor this product to your exact requirement — helping you get the right fit, finish and performance."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Custom widths & lengths",
                "Colour options",
                "Branded / printed variants",
                "Die-cut & routed profiles",
                "Special adhesive grades",
                "Bulk & OEM quantities",
              ].map((c) => (
                <div key={c} className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-black/70 shadow-card">
                  <CheckCircle2 className="h-4 w-4 flex-none text-brand-orange" /> {c}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="FAQ" title="Product FAQs" />
            <div className="mt-6">
              <FAQAccordion items={cat.faqs || []} />
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="section scroll-mt-24 bg-brand-gray">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Get a Quote"
              title={`Enquire about ${p.name}`}
              subtitle="Share your requirement and quantity — our team will respond with pricing and availability promptly."
            />
            <div className="mt-6 rounded-2xl bg-brand-dark p-6 text-white">
              <p className="text-sm text-white/70">
                Prefer to talk? Our sales team is happy to help you choose the right specification for
                your application.
              </p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-yellow">
                Contact details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <EnquiryForm product={p.name} whatsapp={company.whatsapp} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Related" title="Related products" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp, i) => (
                <Reveal key={rp._id || rp.slug} delay={i * 0.05}>
                  <ProductCard p={rp} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
