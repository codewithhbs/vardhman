import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { getBlog, getBlogs } from "@/lib/data";
import { resolveImage } from "@/lib/types";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const b = await getBlog(params.slug);
  if (!b) return {};
  const title = b.seo?.title || b.title;
  const description = b.seo?.description || b.excerpt;
  return {
    title,
    description,
    keywords: b.seo?.keywords || [],
    openGraph: { title, description, images: b.image ? [b.image] : [] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const b = await getBlog(params.slug);
  if (!b) return notFound();
  const all = await getBlogs();
  const more = all.filter((x) => x.slug !== b.slug).slice(0, 3);

  return (
    <>
      <PageHero title={b.title} crumbs={[{ label: "Blogs", href: "/blogs" }, { label: b.category }]} />
      <article className="section">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-4 text-sm text-black/50">
              <span className="chip">{b.category}</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />{" "}
                {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {b.readTime}</span>
            </div>
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl shadow-glow">
              <Image src={resolveImage(b.image)} alt={b.title} fill className="object-cover" priority sizes="(max-width:768px) 100vw, 768px" />
            </div>
          </Reveal>
          <div className="prose prose-lg mt-10 max-w-none">
            {b.content.map((para, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <p className="mb-5 leading-relaxed text-black/70">{para}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 border-t border-black/10 pt-6">
            <Link href="/blogs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section bg-brand-gray">
          <div className="container-x">
            <h2 className="h-title text-2xl">More articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {more.map((m) => (
                <Link key={m.slug} href={`/blogs/${m.slug}`} className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={resolveImage(m.image)} alt={m.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 font-display font-bold text-brand-dark group-hover:text-brand-orange">{m.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                      Read <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
