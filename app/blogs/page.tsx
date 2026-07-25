import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import CTASection from "@/components/CTASection";

export const metadata = { title: "Blogs", description: "Guides and insights on packaging tapes, protective foam, bonding and industrial materials from Vardhman Packaging." };

export default function Blogs() {
  return (
    <>
      <PageHero title="Insights & Blog" subtitle="Practical guides and industry insights on tapes, foam and packaging materials." crumbs={[{ label: "Blogs" }]} />
      <section className="section"><div className="container-x"><BlogList /></div></section>
      <CTASection />
    </>
  );
}
