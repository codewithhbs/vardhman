import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import { company } from "@/lib/company";
import { categories } from "@/lib/products";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-dark text-white/80">
      {/* Newsletter strip */}
      {/* <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-5 py-8 md:flex-row">
          <div>
            <h3 className="font-display text-xl font-bold text-white">Stay updated with Vardhman</h3>
            <p className="text-sm text-white/60">Product launches, industry insights and offers — straight to your inbox.</p>
          </div>
          <div className="flex w-full max-w-md items-center gap-2">
            <input placeholder="Enter your email" className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-brand-yellow" />
            <button className="btn-primary flex-none !px-5"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div> */}

      <div className="container-x grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.jpeg" alt="Vardhman Packaging" width={48} height={48} className="h-12 w-auto rounded-lg bg-white p-1" />
            <span className="font-display text-lg font-extrabold text-white">VARDHMAN <span className="text-brand-yellow">PACKAGING</span></span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Since {company.established}, a trusted manufacturer and supplier of industrial tapes, EPE/EVA foam, backer rods and packaging solutions — engineered for quality, delivered on time.
          </p>
          {/* <div className="mt-5 flex gap-3">
            {[["Facebook", company.socials.facebook, Facebook], ["LinkedIn", company.socials.linkedin, Linkedin], ["Twitter", company.socials.twitter, Twitter], ["Instagram", company.socials.instagram, Instagram]].map(([n, href, Icon]: any) => (
              <a key={n} href={href} aria-label={n} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand-gradient hover:text-white">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div> */}
        </div>

        <div>
          <h4 className="font-display font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[["About Us", "/about"], ["Products", "/products"], ["Industries", "/industries"], ["Infrastructure", "/infrastructure"], ["Quality Assurance", "/quality"], ["Blogs", "/blogs"], ["Contact Us", "/contact"], ["Get a Quote", "/enquiry"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-white/60 transition hover:text-brand-yellow">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white">Our Products</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.slice(0, 8).map((c) => (
              <li key={c.slug}><Link href={`/products/${c.slug}`} className="text-white/60 transition hover:text-brand-yellow">{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-3"><MapPin className="h-5 w-5 flex-none text-brand-yellow" /><span className="text-white/60">{company.address.line1}, {company.address.line2}, {company.address.city}, {company.address.state} – {company.address.zip}</span></li>
            <li className="flex gap-3"><Phone className="h-5 w-5 flex-none text-brand-yellow" /><a href={`tel:${company.phoneRaw}`} className="text-white/60 hover:text-brand-yellow">{company.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-5 w-5 flex-none text-brand-yellow" /><a href={`mailto:${company.email}`} className="text-white/60 hover:text-brand-yellow">{company.email}</a></li>
            <li className="flex gap-3"><Clock className="h-5 w-5 flex-none text-brand-yellow" /><span className="text-white/60">{company.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 md:flex-row">
          <p>© {year} {company.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-brand-yellow">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-yellow">Terms &amp; Conditions</Link>
            <Link href="/sitemap-page" className="hover:text-brand-yellow">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
