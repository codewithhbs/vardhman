import { Upload, ShieldCheck, Clock, Award } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { getCompany } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = { title: "Request a Quote", description: "Request a quotation from Vardhman Packaging. Share your product, quantity and requirement — our team responds promptly with pricing and availability." };

export default async function Enquiry() {
  const company = await getCompany();
  return (
    <>
      <PageHero title="Request a Quotation" subtitle="Tell us what you need and we'll get back to you with pricing, sizes and availability." crumbs={[{ label: "Enquiry" }]} />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EnquiryForm title="Quotation Request Form" whatsapp={company.whatsapp} />
            {/* <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-black/15 bg-brand-gray p-5 text-sm text-black/55">
              <Upload className="h-6 w-6 flex-none text-brand-orange" />
              <div><strong className="text-brand-dark">Attach a file (optional):</strong> product drawings, specs or reference images help us quote faster. File upload wiring is included and CMS/email-integration ready.</div>
            </div> */}
          </div>
          <div>
            <SectionHeading eyebrow="Why enquire" title="What to expect" />
            <div className="mt-6 space-y-4">
              {[
                { icon: Clock, t: "Fast Response", d: "Our team typically responds to enquiries within one working day." },
                { icon: Award, t: "Best Value", d: "Competitive pricing with quality-proven products and custom options." },
                { icon: ShieldCheck, t: "No Obligation", d: "Get a quote with no commitment. We're here to help you decide." },
              ].map((x) => (
                <Reveal key={x.t}>
                  <div className="card p-5"><x.icon className="h-7 w-7 text-brand-orange" /><h3 className="mt-3 font-display font-bold text-brand-dark">{x.t}</h3><p className="mt-1 text-sm text-black/55">{x.d}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
