import Image from "next/image";
import { ShieldCheck, Search, FlaskConical, Award, ClipboardCheck, Gauge, CheckCircle2 } from "lucide-react";
import { company } from "@/lib/company";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata = { title: "Quality Assurance", description: "Vardhman Packaging follows ISO-aligned quality processes — raw material inspection, in-process monitoring, adhesion & dimensional testing before dispatch." };

const steps = [
  { icon: Search, t: "Raw Material Inspection", d: "Every incoming batch of film, foam and adhesive is checked against specification before it enters production." },
  { icon: Gauge, t: "In-Process Monitoring", d: "Continuous checks during coating, extrusion and slitting catch deviations early and keep output consistent." },
  { icon: FlaskConical, t: "Performance Testing", d: "Tack, peel adhesion, thickness and elongation are tested to confirm real-world performance." },
  { icon: ClipboardCheck, t: "Final Inspection", d: "Finished rolls and sheets undergo dimensional and visual inspection before careful packing and dispatch." },
];

export default function Quality() {
  return (
    <>
      <PageHero title="Quality Assurance" subtitle="Quality is engineered into every stage of our process — from raw material to the moment your order leaves our facility." crumbs={[{ label: "Quality" }]} />

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-glow">
              <Image src="/product-img/about2.webp" alt="Quality testing" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our Commitment" title="Consistency you can rely on" />
            <p className="mt-5 text-black/60 leading-relaxed">Our products comply with industrial standards and are offered at the most competitive prices. Skilled quality analysts and technicians ensure every product is manufactured precisely to client specifications, so you receive the same dependable performance order after order.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["ISO-aligned quality system", "Skilled quality analysts", "Calibrated testing methods", "Full traceability & records"].map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-black/70"><CheckCircle2 className="h-5 w-5 flex-none text-brand-orange" /> {f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-brand-gray">
        <div className="container-x">
          <SectionHeading center eyebrow="Process" title="Our quality process" subtitle="A four-stage inspection framework that safeguards quality end to end." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white"><s.icon className="h-6 w-6" /></div>
                  <div className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-orange">Step {i + 1}</div>
                  <h3 className="mt-1 font-display text-lg font-bold text-brand-dark">{s.t}</h3>
                  <p className="mt-2 text-sm text-black/55">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="Certifications" title="Standards & certifications" />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {company.certificates.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-6 py-4 shadow-card">
                  {i % 2 === 0 ? <Award className="h-8 w-8 text-brand-orange" /> : <ShieldCheck className="h-8 w-8 text-brand-orange" />}
                  <span className="font-display font-semibold text-brand-dark">{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
