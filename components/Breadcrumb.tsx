import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-black/50">
      <Link href="/" className="inline-flex items-center gap-1 hover:text-brand-orange"><Home className="h-4 w-4" /></Link>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-black/30" />
          {it.href ? <Link href={it.href} className="hover:text-brand-orange">{it.label}</Link> : <span className="font-medium text-brand-dark">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
