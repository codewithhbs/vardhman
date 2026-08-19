import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Award,
  Factory,
  Recycle,
  Headphones,
  CheckCircle2,
  Star,
  Quote,
} from "lucide-react";
import { company } from "@/lib/company";
import { categories, featuredProducts } from "@/lib/products";
import { industries } from "@/lib/industries";
import { generalFaqs } from "@/lib/faqs";
import { blogs, resolveImage } from "@/lib/blogs";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/Icon";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import EnquiryForm from "@/components/EnquiryForm";
import HeroHome from "@/components/HeroHome";
import CertificateSlider from "@/components/CertificateSlider";

const why = [
  {
    icon: Award,
    t: "30+ Years of Expertise",
    d: "Established in 1996, with deep manufacturing know-how across tapes, foam and packaging.",
  },
  {
    icon: ShieldCheck,
    t: "Consistent Quality",
    d: "ISO-aligned processes with in-house inspection ensure every batch meets specification.",
  },
  {
    icon: Factory,
    t: "In-House Manufacturing",
    d: "Complete control over production, slitting and finishing for reliable, repeatable output.",
  },
  {
    icon: Truck,
    t: "On-Time Delivery",
    d: "A responsive supply chain that keeps your dispatch and production lines running.",
  },
  {
    icon: Recycle,
    t: "Custom & OEM Solutions",
    d: "Bespoke widths, colours, printing and die-cut profiles tailored to your needs.",
  },
  {
    icon: Headphones,
    t: "Dedicated Support",
    d: "Technical guidance and prompt service from enquiry to after-sales.",
  },
];

const process = [
  {
    t: "Raw Material Sourcing",
    d: "Premium films, foams and adhesives sourced from trusted suppliers.",
  },
  {
    t: "Coating & Extrusion",
    d: "Precision adhesive coating and foam extrusion to exact specifications.",
  },
  {
    t: "Slitting & Cutting",
    d: "Accurate slitting, die-cutting and CNC routing to required sizes.",
  },
  {
    t: "Quality Inspection",
    d: "In-process and final testing for tack, thickness and performance.",
  },
  {
    t: "Packing & Dispatch",
    d: "Careful packing and timely dispatch across India and for export.",
  },
];

const testimonials = [
  {
    n: "Rajesh Mehta",
    c: "Procurement Head, FMCG",
    t: "Vardhman's BOPP tapes hold up perfectly on our high-speed lines. Consistent quality and reliable delivery every single time.",
  },
  {
    n: "Anita Sharma",
    c: "Operations, E-commerce",
    t: "Their EPE foam profiles cut our transit damage significantly. The custom C-sections fit our products exactly.",
  },
  {
    n: "Suresh Patel",
    c: "Plant Manager, Automotive",
    t: "The panel bonding and PE foam tapes perform brilliantly under heat and vibration. A dependable long-term partner.",
  },
];

export default function Home() {
  const featured = featuredProducts();
  return (
    <>
      {/* <section className="">
        <div className="container-x">
          <CertificateSlider />
        </div>
      </section> */}
      {/* HERO */}
      <HeroHome />

      {/* COMPANY OVERVIEW */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/product-img/3-inch-transparent.jpg"
                alt="Packaging materials"
                width={600}
                height={700}
                className="h-full w-full rounded-2xl object-cover"
              />
              <div className="grid gap-4">
                <Image
                  src="/product-img/automotive-tapes.jpg"
                  alt="Production line"
                  width={600}
                  height={340}
                  className="w-full rounded-2xl object-cover"
                />
                <div className="flex flex-col justify-center rounded-2xl bg-brand-gradient p-6 text-white">
                  <div className="font-display text-4xl font-extrabold">
                    <Counter to={60} suffix="+" />
                  </div>
                  <div className="mt-1 text-sm text-white/85">
                    Products in our range
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A trusted name in industrial tapes & packaging"
              subtitle="Vardhman Enterprises (Vardhman Bhagwanshree Pvt. Ltd.) has been manufacturing and supplying quality-approved industrial tapes, foam and packaging materials since 1996."
            />
            <Reveal delay={0.1}>
              <p className="mt-5 text-black/60 leading-relaxed">
                From BOPP carton-sealing tapes and double-sided bonding
                solutions to EPE/EVA foam profiles, backer rods and LDPE
                sheeting, our products are made from finest-quality raw
                materials with adhesive coating and finishing that follow strict
                industry standards. We serve FMCG, retail, construction,
                automotive and export clients with a commitment to quality,
                competitive pricing and timely delivery.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  "Quality-proven product range",
                  "Wide distribution network",
                  "Custom & OEM manufacturing",
                  "Vast industry experience",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2 text-sm text-black/70"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-none text-brand-orange" />{" "}
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-primary mt-8">
                Learn More About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-brand-gray">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Why Vardhman"
            title="Why businesses choose us"
            subtitle="Six reasons companies across India rely on Vardhman Packaging for their tape, foam and packaging needs."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.05}>
                <div className="card group h-full p-6 transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/15 text-brand-orange transition group-hover:bg-brand-gradient group-hover:text-white">
                    <w.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-dark">
                    {w.t}
                  </h3>
                  <p className="mt-2 text-sm text-black/55">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Industries We Serve"
            title="Solutions for every sector"
            subtitle="Our packaging and tape solutions support a diverse range of industries across India and beyond."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 0.03}>
                <Link
                  href="/industries"
                  className="card group flex flex-col items-center gap-3 p-5 text-center transition hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gray text-brand-orange transition group-hover:bg-brand-gradient group-hover:text-white">
                    <Icon name={ind.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-brand-dark">
                    {ind.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section bg-brand-gray">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our Products"
              title="Featured products"
              subtitle="A snapshot of our best-selling tapes, foam and packaging solutions."
            />
            <Link href="/products" className="btn-outline flex-none">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => {
              const cat = categories.find((c) => c.slug === p.category)!;
              return (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <ProductCard p={p} category={cat} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MANUFACTURING PROCESS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="How We Work"
            title="Our manufacturing process"
            subtitle="From raw material to dispatch, every step is controlled for consistent quality."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient font-display text-xl font-bold text-white shadow-soft">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-brand-dark">
                    {p.t}
                  </h3>
                  <p className="mt-2 text-sm text-black/55">{p.d}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="absolute right-[-1rem] top-7 hidden h-0.5 w-8 bg-gradient-to-r from-brand-orange/40 to-transparent md:block" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY + STRENGTHS split */}
      <section className="section bg-brand-dark text-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow !bg-white/10 !text-brand-yellow">
              Quality Assurance
            </span>
            <h2 className="h-title mt-3 text-3xl text-white sm:text-4xl">
              Uncompromising quality, every roll & every sheet
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Quality is engineered into every stage of our process. From
              incoming raw-material checks to in-process monitoring and final
              testing, our team ensures tack, thickness, adhesion and
              dimensional accuracy meet specification before dispatch.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Raw material inspection",
                "In-process monitoring",
                "Adhesion & tack testing",
                "Dimensional accuracy checks",
              ].map((q) => (
                <div
                  key={q}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 flex-none text-brand-yellow" />
                  <span className="text-sm text-white/80">{q}</span>
                </div>
              ))}
            </div>
            <Link
              href="/quality"
              className="btn bg-brand-gradient mt-8 text-white"
            >
              Our Quality Process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Reveal className="grid grid-cols-2 gap-4">
            {company.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <div className="font-display text-4xl font-extrabold text-brand-yellow">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATES */}
      {/* <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Certifications"
            title="Certified & compliant"
            subtitle="Our commitment to quality is backed by recognised standards and registrations."
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {company.certificates.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-6 py-4 shadow-card">
                  <Award className="h-8 w-8 text-brand-orange" />
                  <span className="font-display font-semibold text-brand-dark">{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <CertificateSlider />
        </div>
      </section> */}

      {/* TESTIMONIALS */}
      <section className="section bg-brand-gray">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Testimonials"
            title="What our clients say"
            subtitle="Trusted by procurement teams, plant managers and operations leaders across industries."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.n} delay={i * 0.06}>
                <div className="card h-full p-7">
                  <Quote className="h-8 w-8 text-brand-yellow" />
                  <p className="mt-4 text-sm leading-relaxed text-black/70">
                    {t.t}
                  </p>
                  <div className="mt-5 flex items-center gap-1 text-brand-yellow">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} className="h-4 w-4" fill="currentColor" />
                    ))}
                  </div>
                  <div className="mt-4 border-t border-black/5 pt-4">
                    <div className="font-display font-bold text-brand-dark">
                      {t.n}
                    </div>
                    <div className="text-xs text-black/50">{t.c}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST BLOGS */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Insights"
              title="Latest from our blog"
              subtitle="Guides and insights on packaging, tapes and protective materials."
            />
            <Link href="/blogs" className="btn-outline flex-none">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogs.slice(0, 3).map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.06}>
                <Link
                  href={`/blogs/${b.slug}`}
                  className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-glow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={resolveImage(b.image)}
                      alt={b.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-black/45">
                      <span className="chip">{b.category}</span>
                      <span>{b.readTime}</span>
                    </div>
                    <h3 className="mt-3 font-display font-bold text-brand-dark group-hover:text-brand-orange line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-black/55">
                      {b.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      {/* FAQ + ENQUIRY */}
      <section className="section bg-brand-gray">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              subtitle="Everything you need to know about our products and ordering."
            />
            <div className="mt-8">
              <FAQAccordion items={generalFaqs} />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Enquiry"
              title="Send us a quick enquiry"
              subtitle="Tell us your requirement and our team will respond promptly."
            />
            <div className="mt-8">
              <EnquiryForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="h-[420px] w-full">
        <iframe
          title="Vardhman Packaging Location"
          src={company.mapEmbed}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
