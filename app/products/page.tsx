import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories, productsByCategory, resolveImage } from "@/lib/products";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Products",
  description: "Explore our full range of industrial tapes, BOPP packaging tapes, double-sided & electrical tapes, EPE/EVA foam, backer rods, LDPE sheets and specialty products.",
};

export default function Products() {
  return (
    <>
      <PageHero title="Our Products" subtitle="A complete range of industrial tapes, foam profiles and packaging solutions — organised by category, customisable to your specification." crumbs={[{ label: "Products" }]} />
      <section className="section">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const count = productsByCategory(c.slug).length;
            return (
              <Reveal key={c.slug} delay={(i % 3) * 0.05}>
                <Link href={`/products/${c.slug}`} className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={resolveImage(c.image)} alt={c.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-brand-orange backdrop-blur"><Icon name={c.icon} className="h-6 w-6" /></div>
                    <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark backdrop-blur">{count} products</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-brand-dark group-hover:text-brand-orange">{c.name}</h3>
                    <p className="mt-1.5 text-sm text-black/55">{c.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">Explore range <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      <CTASection />
    </>
  );
}
