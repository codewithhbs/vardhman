import React from 'react'
import Reveal from './Reveal'
import Link from 'next/link'
import { company } from '@/lib/company'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Stamp } from 'lucide-react'
import Counter from './Counter'

export default function HeroHome() {
  const yearsOfTrust = new Date().getFullYear() - company.established

  return (
    <section className="relative overflow-hidden bg-[#F3F0E8]">
      {/* cutting-mat grid ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#1F4D3F 1px, transparent 1px), linear-gradient(90deg, #1F4D3F 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#1F4D3F 1px, transparent 1px)',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ruler strip */}
      <div className="relative border-b border-[#17140F]/10">
        <div className="container-x flex h-6 items-end gap-[3px] overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className={`inline-block w-px bg-[#17140F]/25 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`}
            />
          ))}
        </div>
      </div>

      <div className="container-x relative grid grid-cols-1 items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
        <div className="min-w-0">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#17140F]/60">
              <span>Est. {company.established}</span>
              <span className="text-[#17140F]/25">/</span>
              <span>Tapes</span>
              <span className="text-[#17140F]/25">/</span>
              <span>EPE &amp; EVA Foam</span>
              <span className="text-[#17140F]/25">/</span>
              <span>Backer Rod</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display md:text-4xl text-3xl font-extrabold leading-[1.08] tracking-tight text-[#17140F] sm:text-5xl lg:text-[3.4rem]">
              Delivering{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="absolute inset-x-0 bottom-1 h-3 -skew-x-6 bg-[#FF5A1F]/25" />
                <span className="relative">precision-engineered</span>
              </span>{' '}
              packaging materials
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#17140F]/60">
              Premium industrial tapes, EPE &amp; EVA foam, backer rods and packaging
              materials — engineered for performance and trusted by businesses across India.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-[#FF5A1F] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#17140F]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%)' }}
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 border border-[#17140F]/25 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[#17140F] transition-colors hover:border-[#17140F] hover:bg-[#17140F] hover:text-white"
              >
                Get a Quote
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 grid max-w-lg grid-cols-3 border-t border-[#17140F]/15 pt-5">
              {company.stats.slice(0, 3).map((s, i) => (
                <div
                  key={s.label}
                  className={`px-4 first:pl-0 ${i !== 0 ? 'border-l border-[#17140F]/15' : ''}`}
                >
                  <div className="font-mono text-3xl font-bold tabular-nums text-[#17140F]">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#17140F]/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative min-w-0">
          <div className="relative mx-auto max-w-md">
            <div
              className="relative aspect-[4/5] overflow-hidden bg-[#17140F] sm:aspect-square"
              style={{ clipPath: 'polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80"
                alt="Industrial packaging manufacturing"
                fill
                className="object-cover opacity-95"
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17140F]/70 via-transparent to-transparent" />

              {/* barcode + spec strip */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-[#17140F]/80 px-4 py-3 backdrop-blur-sm">
                <div className="flex h-6 items-end gap-[2px]">
                  {[2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2].map((w, i) => (
                    <span key={i} style={{ width: w }} className="h-full bg-[#F4B400]" />
                  ))}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F3F0E8]/80">
                  QC · SP-{new Date().getFullYear()}
                </span>
              </div>
            </div>

            {/* stamp badge */}
            <div className="absolute -left-6 -top-6 flex h-24 w-24 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-dashed border-[#17140F]/70 bg-[#F3F0E8] text-center shadow-md">
              <Stamp className="h-4 w-4 text-[#FF5A1F]" />
              <div className="mt-1 font-mono text-[10px] font-bold uppercase leading-tight text-[#17140F]">
                {yearsOfTrust}+ Yrs
              </div>
              <div className="font-mono text-[8px] uppercase tracking-wide text-[#17140F]/50">
                of trust
              </div>
            </div>

            {/* hang tag */}
            <div
              className="absolute -bottom-5 -right-4 flex items-center gap-2 rotate-3 bg-white px-5 py-3 shadow-lg"
              style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 14% 100%, 0 50%)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#17140F]/30" />
              <ShieldCheck className="h-5 w-5 text-[#FF5A1F]" />
              <div>
                <div className="font-display text-xs font-bold text-[#17140F]">
                  ISO-Aligned Quality
                </div>
                <div className="font-mono text-[10px] text-[#17140F]/50">
                  Tested &amp; inspected
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}