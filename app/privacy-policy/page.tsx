import PageHero from "@/components/PageHero";
import { company } from "@/lib/company";

export const metadata = { title: "Privacy Policy", description: "Privacy Policy of Vardhman Packaging Ltd." };

const sections = [
  { h: "Introduction", p: "Vardhman Packaging Ltd (\"we\", \"us\", \"our\") respects your privacy and is committed to protecting the personal information you share with us through this website. This policy explains what we collect and how we use it." },
  { h: "Information We Collect", p: "We collect information you voluntarily provide through enquiry and contact forms, such as your name, company, email, phone number, city, country and requirement details. We may also collect basic, non-identifying analytics data to improve our website." },
  { h: "How We Use Your Information", p: "Your information is used solely to respond to your enquiries, provide quotations, process orders and communicate relevant updates. We do not sell, rent or trade your personal information to third parties." },
  { h: "Data Security", p: "We implement reasonable administrative and technical measures to protect your information against unauthorised access, disclosure or misuse." },
  { h: "Cookies", p: "Our website may use cookies to enhance your browsing experience and understand site usage. You can control cookies through your browser settings." },
  { h: "Third-Party Links", p: "Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those websites." },
  { h: "Your Rights", p: "You may request access to, correction of, or deletion of your personal information by contacting us at the details below." },
  { h: "Contact", p: `For any privacy-related queries, contact us at ${company.email} or ${company.phone}.` },
];

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <section className="section"><div className="container-x max-w-3xl space-y-8">
        <p className="text-sm text-black/45">Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
        {sections.map((s) => (
          <div key={s.h}><h2 className="font-display text-xl font-bold text-brand-dark">{s.h}</h2><p className="mt-2 text-black/60 leading-relaxed">{s.p}</p></div>
        ))}
      </div></section>
    </>
  );
}
