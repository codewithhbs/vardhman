"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products, resolveImage } from "@/lib/products";
import { useQuoteModal } from "./QuoteModalContext";

export default function HeroHome() {
  const { open: openQuote } = useQuoteModal();
  const slides = useMemo(() => {
    const seen = new Set<string>();
    const first: typeof products = [];
    const rest: typeof products = [];
    for (const p of products) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        first.push(p);
      } else {
        rest.push(p);
      }
    }
    return [...first, ...rest];
  }, []);

  const [index, setIndex] = useState(0);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    openQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + total) % total);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 2600);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resume = () => {
    pause();
    timerRef.current = setInterval(() => go(1), 2600);
  };

  if (total === 0) return null;
  const active = slides[index];

  const visible = [-2, -1, 0, 1, 2].map((offset) => {
    const i = (index + offset + total) % total;
    return { offset, product: slides[i] };
  });

  return (
    <section
      className="relative overflow-hidden bg-[#5C0A0A]"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="h-2 w-full bg-[#17140F]" />

      <div className="relative flex w-full flex-col items-center gap-4 py-8 sm:py-10">
        <div className="relative flex w-full items-center justify-center">
          <button
            aria-label="Previous product"
            onClick={() => go(-1)}
            className="absolute left-3 z-30 flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-white/80 text-white transition-colors hover:bg-white hover:text-[#5C0A0A] sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* coverflow track */}
          <div className="relative flex h-[290px] w-full items-center justify-center overflow-hidden sm:h-[310px]">
            {visible.map(({ offset, product }) => {
              const abs = Math.abs(offset);
              const scale = offset === 0 ? 1 : abs === 1 ? 0.9 : 0.84;
              const translateX = offset * 218;
              const z = 10 - abs;
              const img = resolveImage(product.image);
              return (
                <Link
                  key={`${product.slug}-${offset}`}
                  href={`/products/${product.category}/${product.slug}`}
                  onClick={(e) => {
                    if (offset !== 0) {
                      e.preventDefault();
                      setIndex((index + offset + total) % total);
                    }
                  }}
                  className="absolute overflow-hidden border-[6px] border-white bg-white shadow-[0_6px_18px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out"
                  style={{
                    width: 232,
                    height: 268,
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex: z,
                  }}
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={product.name}
                      fill
                      sizes="232px"
                      className="object-cover"
                      priority={offset === 0}
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>

          <button
            aria-label="Next product"
            onClick={() => go(1)}
            className="absolute right-3 z-30 flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-white/80 text-white transition-colors hover:bg-white hover:text-[#5C0A0A] sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <Link
          href={`/products/${active.category}/${active.slug}`}
          className="font-display text-lg font-bold uppercase tracking-wide text-brand-yellow transition-colors hover:text-white sm:text-xl"
        >
          {active.name}
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-yellow px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#17140F] transition-colors hover:bg-white"
          >
            Explore All Products
          </Link>
          <button
            onClick={openQuote}
            className="inline-flex items-center gap-2 border border-white/50 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-[#5C0A0A]"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  );
}