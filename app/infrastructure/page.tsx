import Image from "next/image";
import {
  Cog,
  Printer,
  Layers,
  Scissors,
  FlaskConical,
  Warehouse,
  Gauge,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Infrastructure",
  description:
    "Explore Vardhman Packaging's modern manufacturing infrastructure — coating, printing, lamination, slitting, foam extrusion, quality lab and warehousing.",
};

const caps = [
  {
    icon: Cog,
    t: "Coating & Extrusion",
    d: "Precision adhesive coating and foam extrusion lines for consistent quality.",
  },
  {
    icon: Printer,
    t: "Printing",
    d: "Multi-colour printing for branded tapes and custom messaging.",
  },
  {
    icon: Layers,
    t: "Lamination",
    d: "Film lamination for premium finishes and enhanced performance.",
  },
  {
    icon: Scissors,
    t: "Slitting & Cutting",
    d: "Accurate slitting, die-cutting and CNC routing to required sizes.",
  },
  {
    icon: FlaskConical,
    t: "Quality Lab",
    d: "In-house testing for tack, adhesion, thickness and dimensional accuracy.",
  },
  {
    icon: Warehouse,
    t: "Warehouse",
    d: "Organised stock and dispatch for fast, reliable order fulfilment.",
  },
];

const gallery = [
  "/product-img/about1.webp",
  // "/product-img/about2.webp",
  "/product-img/about3.webp",
  "/product-img/about4.webp",
  // "/product-img/about1.webp",
  // "/product-img/about1.webp",
];

export default function Infrastructure() {
  return (
    <>
      <PageHero
        title="Our Infrastructure"
        subtitle="A well-equipped, modern facility segmented into specialised departments — working in close coordination to deliver quality on time."
        crumbs={[{ label: "Infrastructure" }]}
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Capabilities"
            title="End-to-end manufacturing capabilities"
            subtitle="From raw material to finished product, our infrastructure keeps every process in-house for reliable, repeatable output."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {caps.map((c, i) => (
              <Reveal key={c.t} delay={(i % 3) * 0.05}>
                <div className="card group h-full p-6 transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-dark">
                    {c.t}
                  </h3>
                  <p className="mt-2 text-sm text-black/55">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-dark text-white">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: 60, s: "+", l: "Products Manufactured" },
              { v: 12, s: "+", l: "Industries Served" },
              { v: 30, s: "+", l: "Years of Operation" },
              { v: 100, s: "%", l: "In-House Production" },
            ].map((x, i) => (
              <Reveal key={x.l} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center">
                  <div className="flex items-center justify-center gap-2 text-brand-yellow">
                    <Gauge className="h-6 w-6" />
                    <span className="font-display text-4xl font-extrabold">
                      <Counter to={x.v} suffix={x.s} />
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-white/60">{x.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Facility"
            title="Inside our facility"
            subtitle="A glimpse of our production floor, machinery and warehousing."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((id, i) => (
              <Reveal key={id} delay={(i % 3) * 0.05}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={id}
                    alt={`Facility ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width:768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
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
