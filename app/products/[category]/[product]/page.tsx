import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  Package,
  Layers,
  Settings,
  Factory,
  ArrowRight,
} from "lucide-react";
import {
  products,
  getCategory,
  getProduct,
  relatedProducts,
  resolveImage,
  resolveGallery, // ← naya import
} from "@/lib/products";
import { SITE_URL } from "@/lib/company";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; product: string };
}) {
  const p = getProduct(params.category, params.product);
  if (!p) return {};
  return { title: p.name, description: p.blurb.slice(0, 155) };
}

export default function ProductDetail({
  params,
}: {
  params: { category: string; product: string };
}) {
  const cat = getCategory(params.category);
  const p = getProduct(params.category, params.product);
  if (!cat || !p) return notFound();
  const related = relatedProducts(cat.slug, p.slug, 3);
  const highlights =
    p.highlights && p.highlights.length > 0 ? p.highlights : cat.applications;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.blurb,
    image: p.image,
    category: cat.name,
    brand: { "@type": "Brand", name: "Vardhman Packaging" },
    url: `${SITE_URL}/products/${cat.slug}/${p.slug}`,
    ...(p.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: p.price.replace(/[^\d.]/g, ""),
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/products/${cat.slug}/${p.slug}`,
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

      {/* Banner + summary */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-glow">
              <Image
                src={resolveGallery(p, 1)[0]}
                alt={p.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-orange backdrop-blur">
                {cat.name}
              </span>
            </div>
            {/* <div className="mt-4 grid grid-cols-3 gap-4">
              {resolveGallery(p, 3).map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-xl border border-black/5"
                >
                  <Image
                    src={src}
                    alt={`${p.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="15vw"
                  />
                </div>
              ))}
            </div> */}
          </Reveal>

          <div>
            <span className="eyebrow">Product Overview</span>
            <h2 className="h-title text-3xl">{p.name}</h2>

            {/* Price */}
            {/* {p.price && (
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-brand-orange">
                  {p.price}
                </span>
                <span className="text-sm text-black/45">(approx.)</span>
              </div>
            )} */}

            <p className="mt-4 text-black/60 leading-relaxed">
              {p.blurb} Manufactured by Vardhman Packaging to consistent quality
              standards, this product is available in custom specifications to
              suit your application.
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

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquiry" className="btn-primary">
                Quick Enquiry <ArrowRight className="h-4 w-4" />
              </a>
              {/* <a href="#" className="btn-outline">
                <Download className="h-4 w-4" /> Download Brochure
              </a> */}
            </div>

            {/* Available sizes */}
            {/*
            <div className="mt-8">
              <h3 className="flex items-center gap-2 font-display font-bold text-brand-dark">
                <Layers className="h-5 w-5 text-brand-orange" /> Available Sizes
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-brand-dark"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* Specs + Applications + Benefits */}
      <section className="section bg-brand-gray">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <Reveal>
            <div className="card h-full p-6">
              <h3 className="flex items-center gap-2 font-display font-bold text-brand-dark">
                <Settings className="h-5 w-5 text-brand-orange" /> Technical
                Specifications
              </h3>
              <table className="mt-4 w-full text-sm">
                <tbody className="divide-y divide-black/5">
                  {p.specs.map((s) => (
                    <tr key={s.k}>
                      <td className="py-2.5 font-medium text-black/50">
                        {s.k}
                      </td>
                      <td className="py-2.5 text-right font-semibold text-brand-dark">
                        {s.v}
                      </td>
                    </tr>
                  ))}
                  {/* {p.price && (
                    <tr>
                      <td className="py-2.5 font-medium text-black/50">
                        Price
                      </td>
                      <td className="py-2.5 text-right font-semibold text-brand-dark">
                        {p.price} <span className="font-normal text-black/40">(approx.)</span>
                      </td>
                    </tr>
                  )} */}
                  <tr>
                    <td className="py-2.5 font-medium text-black/50">
                      Category
                    </td>
                    <td className="py-2.5 text-right font-semibold text-brand-dark">
                      {cat.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium text-black/50">
                      Customisation
                    </td>
                    <td className="py-2.5 text-right font-semibold text-brand-dark">
                      Available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="card h-full p-6">
              <h3 className="flex items-center gap-2 font-display font-bold text-brand-dark">
                <Factory className="h-5 w-5 text-brand-orange" /> Applications
                &amp; Highlights
              </h3>
              <ul className="mt-4 space-y-2.5">
                {highlights.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 text-sm text-black/65"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-orange" />{" "}
                    {a}
                  </li>
                ))}
              </ul>
              <h4 className="mt-6 font-display font-semibold text-brand-dark">
                Industries using this product
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.industries.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-6">
              <h3 className="flex items-center gap-2 font-display font-bold text-brand-dark">
                <Package className="h-5 w-5 text-brand-orange" /> Benefits &
                Packaging
              </h3>
              <ul className="mt-4 space-y-2.5">
                {cat.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-black/65"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-none text-brand-orange" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-brand-gray p-4 text-sm text-black/60">
                <strong className="text-brand-dark">Packaging Details:</strong>{" "}
                Supplied in protective cartons / rolls suited for safe transit.
                Custom packaging and private-label options available on request.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Customization + FAQ */}
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
                <div
                  key={c}
                  className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-black/70 shadow-card"
                >
                  <CheckCircle2 className="h-4 w-4 flex-none text-brand-orange" />{" "}
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="FAQ" title="Product FAQs" />
            <div className="mt-6">
              <FAQAccordion items={cat.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="section bg-brand-gray scroll-mt-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Get a Quote"
              title={`Enquire about ${p.name}`}
              subtitle="Share your requirement and quantity — our team will respond with pricing and availability promptly."
            />
            <div className="mt-6 rounded-2xl bg-brand-dark p-6 text-white">
              <p className="text-sm text-white/70">
                Prefer to talk? Our sales team is happy to help you choose the
                right specification for your application.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-yellow"
              >
                Contact details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <EnquiryForm product={p.name} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Related" title="Related products" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp, i) => (
                <Reveal key={rp.slug} delay={i * 0.05}>
                  <ProductCard p={{ ...rp, image: resolveImage(rp.image) }} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
