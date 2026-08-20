import PageHero from "@/components/PageHero";
import { getCompany } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = { title: "Terms & Conditions", description: "Terms & Conditions of Vardhman Packaging Ltd." };



export default async function Terms() {
  const company = await getCompany();
  const sections = [
  { h: "Acceptance of Terms", p: "By accessing and using this website, you accept and agree to be bound by these Terms & Conditions. If you do not agree, please do not use this website." },
  { h: "Use of Website", p: "This website and its content are provided for general information about our products and services. You agree to use it lawfully and not to misuse, disrupt or attempt unauthorised access to any part of it." },
  { h: "Product Information", p: "We make every effort to ensure product descriptions, specifications and images are accurate. However, minor variations may occur, and specifications are subject to change without notice. Final specifications are confirmed at the time of order." },
  { h: "Enquiries & Quotations", p: "Quotations provided are indicative and subject to confirmation. Orders are governed by mutually agreed terms of supply, including pricing, quantity, delivery and payment." },
  { h: "Intellectual Property", p: "All content on this website, including text, logos, graphics and images, is the property of Vardhman Packaging Ltd or its licensors and may not be reproduced without permission." },
  { h: "Limitation of Liability", p: "We shall not be liable for any indirect or consequential loss arising from the use of this website or reliance on its content, to the extent permitted by law." },
  { h: "Governing Law", p: "These terms are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts of Delhi." },
  { h: "Contact", p: `For questions regarding these terms, contact us at ${company.email} or ${company.phone}.` },
];

  return (
    <>
      <PageHero title="Terms & Conditions" crumbs={[{ label: "Terms & Conditions" }]} />
      <section className="section"><div className="container-x max-w-3xl space-y-8">
        <p className="text-sm text-black/45">Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
        {sections.map((s) => (
          <div key={s.h}><h2 className="font-display text-xl font-bold text-brand-dark">{s.h}</h2><p className="mt-2 text-black/60 leading-relaxed">{s.p}</p></div>
        ))}
      </div></section>
    </>
  );
}
