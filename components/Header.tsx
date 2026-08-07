"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Search, Mail } from "lucide-react";
import { company } from "@/lib/company";
import { categories } from "@/lib/products";
import { useQuoteModal } from "./QuoteModalContext";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", mega: true },
  { label: "Industries", href: "/industries" },
  // { label: "Infrastructure", href: "/infrastructure" },
  { label: "Quality", href: "/quality" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const [mProducts, setMProducts] = useState(false);
  const [search, setSearch] = useState(false);
  const pathname = usePathname();
  const { open: openQuote } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobile(false); setMega(false); }, [pathname]);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-brand-dark text-white md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span className="flex items-center gap-2 text-white/80"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-yellow" /> Manufacturer & Supplier of Industrial Tapes, Foam & Packaging Solutions</span>
          <div className="flex items-center gap-5">
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-brand-yellow"><Mail className="h-3.5 w-3.5" /> {company.email}</a>
            <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-1.5 hover:text-brand-yellow"><Phone className="h-3.5 w-3.5" /> {company.phone}</a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 shadow-card backdrop-blur-xl" : "bg-white"}`}>
        <div className="container-x flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.jpeg" alt="Vardhman Packaging Ltd" width={48} height={48} className="h-11 w-auto lg:h-12" priority />
            <span className="leading-tight">
              {/* <span className="block font-display text-base font-extrabold tracking-tight text-brand-dark lg:text-lg">VARDHMAN <span className="text-brand-orange">PACKAGING</span></span> */}
              <span className="block font-display font-extrabold tracking-tight text-brand-dark text-[13px] lg:text-[18px]">Vardhman Tapes & Packaging Pvt Ltd</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-black/45">Vardhman Enterprises</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.mega ? (
                <div key={item.href} className="group relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <Link href={item.href} className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${pathname.startsWith("/products") ? "text-brand-orange" : "text-brand-dark hover:text-brand-orange"}`}>
                    {item.label} <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                  </Link>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname === item.href ? "text-brand-orange" : "text-brand-dark hover:text-brand-orange"}`}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            {/* <button aria-label="Search" onClick={() => setSearch(true)} className="hidden h-10 w-10 items-center justify-center rounded-full text-brand-dark hover:bg-brand-gray sm:flex">
              <Search className="h-5 w-5" />
            </button> */}
            <button onClick={openQuote} className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex text-nowrap">Get a Quote</button>
            <button aria-label="Menu" onClick={() => setMobile(true)} className="flex h-10 w-10 items-center justify-center rounded-full text-brand-dark hover:bg-brand-gray lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          onMouseEnter={() => setMega(true)}
          onMouseLeave={() => setMega(false)}
          className={`absolute inset-x-0 top-full hidden origin-top border-t border-black/5 bg-white shadow-card transition-all duration-200 lg:block ${mega ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          <div className="container-x grid grid-cols-4 gap-x-6 gap-y-3 py-7">
            <div className="col-span-1 rounded-2xl bg-brand-gradient p-6 text-white">
              <h4 className="font-display text-lg font-bold">Our Product Range</h4>
              <p className="mt-2 text-sm text-white/85">60+ industrial tapes, foam profiles and packaging solutions — customised to your specification.</p>
              <Link href="/products" className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30">Browse all</Link>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-x-5 gap-y-2">
              {categories.map((c) => (
                <Link key={c.slug} href={`/products/${c.slug}`} className="group rounded-xl px-3 py-2 transition hover:bg-brand-gray">
                  <span className="block text-sm font-semibold text-brand-dark group-hover:text-brand-orange">{c.name}</span>
                  <span className="block text-xs text-black/45">{c.tagline}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {/* {search && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-6 pt-28 backdrop-blur-sm" onClick={() => setSearch(false)}>
          <div className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-glow" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-black/10 pb-3">
              <Search className="h-5 w-5 text-black/40" />
              <input autoFocus placeholder="Search products, e.g. BOPP tape, EPE foam..." className="w-full text-sm outline-none" />
              <button onClick={() => setSearch(false)}><X className="h-5 w-5 text-black/40" /></button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.slice(0, 8).map((c) => (
                <Link key={c.slug} href={`/products/${c.slug}`} onClick={() => setSearch(false)} className="chip">{c.name}</Link>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[70] lg:hidden ${mobile ? "" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${mobile ? "opacity-100" : "opacity-0"}`} onClick={() => setMobile(false)} />
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white transition-transform duration-300 ${mobile ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-black/5 p-5">
            <Image src="/images/logo.jpeg" alt="Vardhman" width={40} height={40} className="h-10 w-auto" />
            <button onClick={() => setMobile(false)}><X className="h-6 w-6 text-brand-dark" /></button>
          </div>
          <nav className="flex flex-col p-4">
            {nav.map((item) =>
              item.mega ? (
                <div key={item.href}>
                  <button onClick={() => setMProducts((s) => !s)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-medium text-brand-dark">
                    Products <ChevronDown className={`h-4 w-4 transition ${mProducts ? "rotate-180" : ""}`} />
                  </button>
                  {mProducts && (
                    <div className="ml-3 flex flex-col border-l border-black/10 pl-3">
                      <Link href="/products" className="py-2 text-sm font-semibold text-brand-orange">All Products</Link>
                      {categories.map((c) => (
                        <Link key={c.slug} href={`/products/${c.slug}`} className="py-2 text-sm text-black/60 hover:text-brand-orange">{c.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 font-medium text-brand-dark hover:bg-brand-gray">{item.label}</Link>
              )
            )}
            <Link href="/enquiry" className="btn-primary mt-4">Get a Quote</Link>
            <a href={`tel:${company.phoneRaw}`} className="btn-outline mt-3"><Phone className="h-4 w-4" /> {company.phone}</a>
          </nav>
        </div>
      </div>
    </>
  );
}
