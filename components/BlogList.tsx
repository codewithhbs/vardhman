"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { blogs, blogCategories } from "@/lib/blogs";

export default function BlogList() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return blogs.filter((b) => (cat === "All" || b.category === cat) && (b.title.toLowerCase().includes(q.toLowerCase()) || b.excerpt.toLowerCase().includes(q.toLowerCase())));
  }, [cat, q]);

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "bg-brand-gradient text-white shadow-soft" : "border border-black/10 bg-white text-brand-dark hover:border-brand-orange"}`}>{c}</button>
          ))}
        </div>
        <div className="flex w-full items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 sm:w-64">
          <Search className="h-4 w-4 text-black/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="w-full text-sm outline-none" />
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filtered.map((b) => (
          <Link key={b.slug} href={`/blogs/${b.slug}`} className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={b.image} alt={b.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:768px) 100vw, 33vw" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-orange backdrop-blur">{b.category}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-black/45"><Calendar className="h-3.5 w-3.5" /> {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {b.readTime}</div>
              <h3 className="mt-2 font-display font-bold text-brand-dark group-hover:text-brand-orange line-clamp-2">{b.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-black/55">{b.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-10 text-center text-black/50">No articles found. Try a different search or category.</p>}
    </div>
  );
}
