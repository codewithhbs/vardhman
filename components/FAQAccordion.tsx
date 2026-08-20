"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQ } from "@/lib/types";

export default function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items?.length) return null;
  return (
    <div className="divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white">
      {items.map((f, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
          >
            <span className="font-display font-semibold text-brand-dark">{f.q}</span>
            <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full transition ${open === i ? "bg-brand-gradient text-white" : "bg-brand-yellow/15 text-brand-orange"}`}>
              {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-sm leading-relaxed text-black/60 sm:px-6">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
