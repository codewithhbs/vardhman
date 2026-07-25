import Breadcrumb from "./Breadcrumb";
import Reveal from "./Reveal";

export default function PageHero({
  title, subtitle, crumbs,
}: { title: string; subtitle?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="relative overflow-hidden border-b border-black/5 bg-brand-radial">
      <div className="dotgrid absolute inset-0 opacity-50" />
      <div className="container-x relative py-14 lg:py-20">
        <Reveal><Breadcrumb items={crumbs} /></Reveal>
        <Reveal delay={0.05}>
          <h1 className="h-title mt-4 text-4xl sm:text-5xl">{title}</h1>
        </Reveal>
        {subtitle && <Reveal delay={0.1}><p className="mt-4 max-w-2xl text-lg text-black/60">{subtitle}</p></Reveal>}
      </div>
    </section>
  );
}
