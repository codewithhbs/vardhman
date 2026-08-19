"use client";
import Image from "next/image";

const certs = [
  { src: "/certificates/iso-9001-qa.jpeg", alt: "ISO 9001 Quality Assurance" },
  { src: "/certificates/ascc.jpeg", alt: "ASCC Certified" },
  { src: "/certificates/irqs-nabcb.jpeg", alt: "ISO 13485 IRQS NABCB" },
  { src: "/certificates/aqsr-usac.jpeg", alt: "AQSR USAC ISO 9001" },
  { src: "/certificates/jas-anz.jpeg", alt: "JAS-ANZ" },
  { src: "/certificates/iso-9001-global.jpeg", alt: "ISO 9001" },
  { src: "/certificates/ags.jpeg", alt: "American Global Standards" },
];

export default function CertificateSlider() {
  const loop = [...certs, ...certs]; // seamless loop ke liye duplicate

  return (
    <div className="relative mt-10 overflow-hidden">
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" /> */}

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