import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow, title, subtitle, center = false, light = false,
}: { eyebrow?: string; title: string; subtitle?: string; center?: boolean; light?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`h-title text-3xl sm:text-4xl ${light ? "text-white" : ""}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/70" : "text-black/60"}`}>{subtitle}</p>}
    </Reveal>
  );
}
