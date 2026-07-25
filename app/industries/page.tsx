import { industries } from "@/lib/industries";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";

export const metadata = { title: "Industries We Serve", description: "Vardhman Packaging serves Food, Pharma, FMCG, Retail, Automotive, Construction, Electrical and Export industries with tailored tape and packaging solutions." };

export default function Industries() {
  return (
    <>
      <PageHero title="Industries We Serve" subtitle="Our tapes, foam and packaging solutions support a broad spectrum of industries — each with its own performance and compliance needs." crumbs={[{ label: "Industries" }]} />
      <section className="section">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 0.05}>
              <div className="card group h-full p-7 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow/15 text-brand-orange transition group-hover:bg-brand-gradient group-hover:text-white"><Icon name={ind.icon} className="h-7 w-7" /></div>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-dark">{ind.name}</h3>
                <p className="mt-2 text-sm text-black/55 leading-relaxed">{ind.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
