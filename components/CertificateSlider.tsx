"use client";
import Image from "next/image";

export default function CertificateSlider({
  certs = [],
}: {
  certs: { src: string; alt: string }[];
}) {
  if (!certs.length) return null;
  const loop = [...certs, ...certs]; // seamless loop

  return (
    <div className="relative mt-10 overflow-hidden">
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((c, i) => (
          <div
            key={i}
            className="flex h-24 w-24 flex-none items-center justify-center rounded-2xl border border-black/5 bg-white p-3 shadow-card sm:h-28 sm:w-28"
          >
            <Image src={c.src} alt={c.alt} width={90} height={90} className="h-full w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
