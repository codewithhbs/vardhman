import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Star, Quote } from "lucide-react";
import {
  getBlogs,
  getCategories,
  getCompany,
  getFeaturedProducts,
  getGeneralFaqs,
  getIndustries,
  getTestimonials,
} from "@/lib/data";
import { resolveImage } from "@/lib/types";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/Icon";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import EnquiryForm from "@/components/EnquiryForm";
import HeroHome from "@/components/HeroHome";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [company, categories, featured, industries, faqs, blogs, testimonials, heroProducts] =
    await Promise.all([
      getCompany(),
      getCategories(),
      getFeaturedProducts(6),
      getIndustries(),
      getGeneralFaqs(),
      getBlogs(),
      getTestimonials(),
      getFeaturedProducts(24),
    ]);

  const why = company.homepage?.why || [];
  const process = company.homepage?.process || [];
  const productCountStat =
    company.stats?.find((s) => /product/i.test(s.label))?.value ?? 60;

  return (
    <>
      {/* HERO */}
      <HeroHome products={heroProducts} certs={company.certificateImages || []} />

      {/* COMPANY OVERVIEW */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Image src="/product-img/3-inch-transparent.jpg" alt="Packaging materials" width={600} height={700} className="h-full w-full rounded-2xl object-cover" />
              <div className="grid gap-4">
                <Image src="/product-img/automotive-tapes.jpg" alt="Production line" width={600} height={340} className="w-full rounded-2xl object-cover" />
                <div className="flex flex-col justify-center rounded-2xl bg-brand-gradient p-6 text-white">
                  <div className="font-display text-4xl font-extrabold">
                    <Counter to={productCountStat} suffix="+" />
                  </div>
                  <div className="mt-1 text-sm text-white/85">Products in our range</div>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A trusted name in industrial tapes & packaging"
              subtitle={`${company.legalName} has been manufacturing and supplying quality-approved industrial tapes, foam and packaging materials since ${company.established}.`}
            />
            <Reveal delay={0.1}>
              <p className="mt-5 leading-relaxed text-black/60">
                From BOPP carton-sealing tapes and double-sided bonding solutions to EPE/EVA foam profiles, backer rods and LDPE sheeting, our products are made from finest-quality raw materials with adhesive coating and finishing that follow strict industry standards. We serve FMCG, retail, construction, automotive and export clients with a commitment to quality, competitive pricing and timely delivery.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Quality-proven product range", "Wide distribution network", "Custom & OEM manufacturing", "Vast industry experience"].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-black/70">
                    <CheckCircle2 className="h-5 w-5 flex-none text-brand-orange" /> {f}
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
      {why.length > 0 && (
        <section className="section bg-brand-gray">
          <div className="container-x">
            <SectionHeading center eyebrow="Why Vardhman" title="Why businesses choose us" subtitle="Reasons companies across India rely on Vardhman Packaging for their tape, foam and packaging needs." />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {why.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.05}>
                  <div className="card group h-full p-6 transition hover:-translate-y-1 hover:shadow-glow">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/15 text-brand-orange transition group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon name={w.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-brand-dark">{w.title}</h3>
                    <p className="mt-2 text-sm text-black/55">{w.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INDUSTRIES */}
      {industries.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading center eyebrow="Industries We Serve" title="Solutions for every sector" subtitle="Our packaging and tape solutions support a diverse range of industries across India and beyond." />
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {industries.map((ind, i) => (
                <Reveal key={ind.slug} delay={i * 0.03}>
                  <Link href="/industries" className="card group flex flex-col items-center gap-3 p-5 text-center transition hover:-translate-y-1 hover:shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gray text-brand-orange transition group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon name={ind.icon} className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-brand-dark">{ind.name}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="section bg-brand-gray">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Our Products" title="Featured products" subtitle="A snapshot of our best-selling tapes, foam and packaging solutions." />
              <Link href="/products" className="btn-outline flex-none">
                View all products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => {
                const cat = categories.find((c) => c.slug === p.category);
                return (
                  <Reveal key={p._id || p.slug} delay={i * 0.05}>
                    <ProductCard p={p} category={cat} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* MANUFACTURING PROCESS */}
      {process.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading center eyebrow="How We Work" title="Our manufacturing process" subtitle="From raw material to dispatch, every step is controlled for consistent quality." />
            <div className="mt-14 grid gap-8 md:grid-cols-5">
              {process.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient font-display text-xl font-bold text-white shadow-soft">
                      {i + 1}
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-brand-dark">{p.title}</h3>
                    <p className="mt-2 text-sm text-black/55">{p.desc}</p>
                  </div>
                  {i < process.length - 1 && (
                    <div className="absolute right-[-1rem] top-7 hidden h-0.5 w-8 bg-gradient-to-r from-brand-orange/40 to-transparent md:block" />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUALITY + STATS */}
      <section className="section bg-brand-dark text-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow !bg-white/10 !text-brand-yellow">Quality Assurance</span>
            <h2 className="h-title mt-3 text-3xl text-white sm:text-4xl">Uncompromising quality, every roll &amp; every sheet</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              Quality is engineered into every stage of our process. From incoming raw-material checks to in-process monitoring and final testing, our team ensures tack, thickness, adhesion and dimensional accuracy meet specification before dispatch.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Raw material inspection", "In-process monitoring", "Adhesion & tack testing", "Dimensional accuracy checks"].map((q) => (
                <div key={q} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 flex-none text-brand-yellow" />
                  <span className="text-sm text-white/80">{q}</span>
                </div>
              ))}
            </div>
            <Link href="/quality" className="btn mt-8 bg-brand-gradient text-white">
              Our Quality Process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Reveal className="grid grid-cols-2 gap-4">
            {(company.stats || []).map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="font-display text-4xl font-extrabold text-brand-yellow">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section bg-brand-gray">
          <div className="container-x">
            <SectionHeading center eyebrow="Testimonials" title="What our clients say" subtitle="Trusted by procurement teams, plant managers and operations leaders across industries." />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t._id || t.name} delay={i * 0.06}>
                  <div className="card h-full p-7">
                    <Quote className="h-8 w-8 text-brand-yellow" />
                    <p className="mt-4 text-sm leading-relaxed text-black/70">{t.text}</p>
                    <div className="mt-5 flex items-center gap-1 text-brand-yellow">
                      {[...Array(Math.max(0, Math.min(5, t.rating || 5)))].map((_, k) => (
                        <Star key={k} className="h-4 w-4" fill="currentColor" />
                      ))}
                    </div>
                    <div className="mt-4 border-t border-black/5 pt-4">
                      <div className="font-display font-bold text-brand-dark">{t.name}</div>
                      <div className="text-xs text-black/50">{t.designation}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LATEST BLOGS */}
      {blogs.length > 0 && (
        <section className="section">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Insights" title="Latest from our blog" subtitle="Guides and insights on packaging, tapes and protective materials." />
              <Link href="/blogs" className="btn-outline flex-none">
                All articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {blogs.slice(0, 3).map((b, i) => (
                <Reveal key={b.slug} delay={i * 0.06}>
                  <Link href={`/blogs/${b.slug}`} className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={resolveImage(b.image)} alt={b.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:768px) 100vw, 33vw" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-black/45">
                        <span className="chip">{b.category}</span>
                        <span>{b.readTime}</span>
                      </div>
                      <h3 className="mt-3 line-clamp-2 font-display font-bold text-brand-dark group-hover:text-brand-orange">{b.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-black/55">{b.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      {/* FAQ + ENQUIRY */}
      <section className="section bg-brand-gray">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="FAQ" title="Frequently asked questions" subtitle="Everything you need to know about our products and ordering." />
            <div className="mt-8">
              <FAQAccordion items={faqs} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Enquiry" title="Send us a quick enquiry" subtitle="Tell us your requirement and our team will respond promptly." />
            <div className="mt-8">
              <EnquiryForm compact whatsapp={company.whatsapp} />
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      {company.mapEmbed && (
        <section className="h-[420px] w-full">
          <iframe
            title={`${company.name} Location`}
            src={company.mapEmbed}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      )}
    </>
  );
}
