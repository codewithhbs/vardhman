import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import CTASection from "@/components/CTASection";
import { getBlogCategories, getBlogs } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blogs",
  description:
    "Guides and insights on packaging tapes, protective foam, bonding and industrial materials from Vardhman Packaging.",
};

export default async function Blogs() {
  const [blogs, categories] = await Promise.all([getBlogs(), getBlogCategories()]);
  return (
    <>
      <PageHero
        title="Insights & Blog"
        subtitle="Practical guides and industry insights on tapes, foam and packaging materials."
        crumbs={[{ label: "Blogs" }]}
      />
      <section className="section">
        <div className="container-x">
          <BlogList blogs={blogs} categories={categories} />
        </div>
      </section>
      <CTASection />
    </>
  );
}
