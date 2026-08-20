import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";
import type { Product } from "@/lib/types";
import { resolveImage } from "@/lib/types";

export default function ProductCard({
  p,
  category,
}: {
  p: Product;
  category?: { slug: string; name: string };
}) {
  const count = (p.images || []).length;
  return (
    <Link
      href={`/products/${p.category}/${p.slug}`}
      className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={resolveImage(p.image)}
          alt={p.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-orange backdrop-blur">
            {category.name}
          </span>
        )}
        {count > 1 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            <Images className="h-3 w-3" /> {count}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-brand-dark group-hover:text-brand-orange">
          {p.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-black/55">{p.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
          View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
