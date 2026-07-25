import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { company } from "@/lib/company";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-black/10" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">Need reliable packaging & tape solutions for your business?</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">Get a fast quotation from our team. Custom sizes, printing and OEM orders welcome.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/enquiry" className="btn bg-white text-brand-orange hover:bg-brand-dark hover:text-white">Get a Quote <ArrowRight className="h-4 w-4" /></Link>
                <a href={`tel:${company.phoneRaw}`} className="btn border border-white/40 text-white hover:bg-white/10"><Phone className="h-4 w-4" /> {company.phone}</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
