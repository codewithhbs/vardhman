import { MapPin, Phone, Mail, Clock, Building2, Headphones, ShoppingCart } from "lucide-react";
import { company } from "@/lib/company";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata = { title: "Contact Us", description: "Get in touch with Vardhman Packaging Ltd — address, phone, email and enquiry form. We respond promptly to all packaging and tape requirements." };

const depts = [
  { icon: ShoppingCart, t: "Sales & Enquiries", d: company.email, extra: company.phone },
  { icon: Headphones, t: "Customer Support", d: company.email2, extra: company.phone2 },
  { icon: Building2, t: "Corporate Office", d: company.landline, extra: "Mon–Sat" },
];

export default function Contact() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="Have a requirement or a question? Reach out and our team will get back to you quickly." crumbs={[{ label: "Contact" }]} />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Get in touch" title="We'd love to hear from you" />
            <div className="mt-8 space-y-4">
              {[
                { icon: MapPin, t: "Address", v: `${company.address.line1}, ${company.address.line2}, ${company.address.city}, ${company.address.state} – ${company.address.zip}` },
                { icon: Phone, t: "Phone", v: `${company.phone} · ${company.phone2}` },
                { icon: Mail, t: "Email", v: company.email },
                { icon: Clock, t: "Working Hours", v: company.hours },
              ].map((c) => (
                <div key={c.t} className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-card">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-yellow/15 text-brand-orange"><c.icon className="h-5 w-5" /></div>
                  <div><div className="font-display font-bold text-brand-dark">{c.t}</div><div className="mt-0.5 text-sm text-black/60">{c.v}</div></div>
                </div>
              ))}
            </div>

            <h3 className="mt-10 font-display text-lg font-bold text-brand-dark">Department Contacts</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {depts.map((d) => (
                <div key={d.t} className="card p-4"><d.icon className="h-6 w-6 text-brand-orange" /><div className="mt-2 text-sm font-semibold text-brand-dark">{d.t}</div><div className="mt-1 text-xs text-black/55">{d.d}</div><div className="text-xs text-black/45">{d.extra}</div></div>
              ))}
            </div>
          </div>

          <Reveal>
            <EnquiryForm title="Send us a message" />
          </Reveal>
        </div>
      </section>

      <section className="h-[420px] w-full">
        <iframe title="Vardhman Packaging Location" src={company.mapEmbed} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
    </>
  );
}
