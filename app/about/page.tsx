import Image from "next/image";
import { Target, Eye, Gem, History, Users, ShieldCheck, Microscope, Building2, CheckCircle2 } from "lucide-react";
import { getCompany } from "@/lib/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import CTASection from "@/components/CTASection";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us",
  description: "Learn about Vardhman Packaging Ltd — a trusted manufacturer of industrial tapes, foam and packaging solutions since 1996.",
};

const values = [
  { icon: Gem, t: "Quality First", d: "We never compromise on the quality of raw materials or finished products." },
  { icon: ShieldCheck, t: "Integrity", d: "Honest, transparent dealings that build long-term client relationships." },
  { icon: Users, t: "Customer Focus", d: "Solutions tailored to each client's exact specification and application." },
  { icon: History, t: "Reliability", d: "Consistent quality and on-time delivery, order after order." },
];

export default async function About() {
  const company = await getCompany();
  return (
    <>
      <PageHero title="About Vardhman Packaging" subtitle="A trusted manufacturer and supplier of industrial tapes, foam and packaging solutions since 1996." crumbs={[{ label: "About Us" }]} />

      {/* Overview */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-glow">
              <Image src="/product-img/about1.webp" alt="Vardhman manufacturing facility" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Company Overview" title="Engineering trust into every product" />
            <div className="mt-5 space-y-4 text-black/60 leading-relaxed">
              <p>Established in {company.established}, {company.name} — operating as {company.legalName} — is a prominent manufacturer, supplier, importer and wholesaler of a quality-approved range of industrial tapes, foam and packaging materials.</p>
              <p>All our products are made using finest-quality raw materials, adhesive coating and printing following industry standards. Our range is widely used across FMCG, retail, construction, automotive and export sectors, available in a variety of colours, textures, widths, lengths and thicknesses to suit each client's needs.</p>
              <p>Supported by a team of diligent professionals and modern infrastructure, we have earned the trust of a large base of loyal clients through timely delivery, a quality-proven range and a wide distribution network.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {(company.stats || []).slice(0, 3).map((s) => (
                <div key={s.label}><div className="font-display text-3xl font-extrabold text-brand-orange"><Counter to={s.value} suffix={s.suffix} /></div><div className="text-xs text-black/50">{s.label}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="section bg-brand-gray">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { icon: Eye, t: "Our Vision", d: "To be recognised as a leading, trusted brand in industrial tapes and packaging — delivering uncompromised quality at competitive value, while continuously innovating our products and processes." },
            { icon: Target, t: "Our Mission", d: "To provide durable, high-performance packaging and tape solutions that protect our clients' products, backed by responsive service, custom capability and on-time delivery." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08}>
              <div className="card h-full p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white"><b.icon className="h-7 w-7" /></div>
                <h3 className="mt-5 font-display text-2xl font-bold text-brand-dark">{b.t}</h3>
                <p className="mt-3 text-black/60 leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="Core Values" title="The principles that guide us" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.05}>
                <div className="card group h-full p-6 text-center transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/15 text-brand-orange transition group-hover:bg-brand-gradient group-hover:text-white"><v.icon className="h-6 w-6" /></div>
                  <h3 className="mt-4 font-display font-bold text-brand-dark">{v.t}</h3>
                  <p className="mt-2 text-sm text-black/55">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* R&D / Facility / Quality Policy */}
      <section className="section bg-brand-gray">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { icon: Building2, t: "Manufacturing Facility", d: "A well-equipped facility with modern coating, extrusion, slitting and finishing lines, segmented into specialised departments working in close coordination." },
            { icon: Microscope, t: "Research & Development", d: "Continuous improvement of formulations and profiles, developing custom solutions and new products to meet evolving industry demands." },
            { icon: ShieldCheck, t: "Quality Policy", d: "A firm commitment to delivering products that comply with industrial standards at the most affordable prices, meeting exact client specifications." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.06}>
              <div className="card h-full p-7">
                <b.icon className="h-9 w-9 text-brand-orange" />
                <h3 className="mt-4 font-display text-lg font-bold text-brand-dark">{b.t}</h3>
                <p className="mt-2 text-sm text-black/55 leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Leadership" title="Guided by experienced leadership" subtitle="Under the direction of our leadership, Vardhman has built a sophisticated niche in a competitive market." />
            <div className="mt-8 space-y-4">
              {(company.leadership || []).map((l) => (
                <div key={l.name} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-card">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient font-display text-lg font-bold text-white">{l.name.split(" ").map((n) => n[0]).join("")}</div>
                  <div><div className="font-display font-bold text-brand-dark">{l.name}</div><div className="text-sm text-black/50">{l.role}</div></div>
                </div>
              ))}
            </div>
          </div>
          <Reveal>
            <div className="rounded-3xl bg-brand-dark p-8 text-white sm:p-10">
              <h3 className="font-display text-xl font-bold text-brand-yellow">Why Choose Us</h3>
              <div className="mt-5 space-y-3">
                {["Timely delivery, order after order", "Quality-proven, tested product range", "Wide distribution network across India", "Custom & OEM manufacturing capability", `Vast industry experience since ${company.established}`].map((f) => (
                  <div key={f} className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 flex-none text-brand-yellow" /><span className="text-white/80">{f}</span></div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
