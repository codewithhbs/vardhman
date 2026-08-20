"use client";
import CrudPage, { Pill, Thumb } from "@/components/admin/CrudPage";
import { Field, ImageInput, Input, ListInput, Textarea, Toggle } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function BlogsAdmin() {
  return (
    <CrudPage<any>
      title="Blogs"
      subtitle="Articles shown on /blogs and the homepage insights section."
      endpoint="/api/admin/blogs"
      searchPlaceholder="Search articles…"
      wideModal
      labelOf={(r) => r.title}
      columns={[
        { key: "image", label: "", className: "w-14", render: (r) => <Thumb src={r.image} /> },
        {
          key: "title",
          label: "Title",
          render: (r) => (
            <div>
              <div className="line-clamp-1 font-semibold text-slate-800">{r.title}</div>
              <div className="text-xs text-slate-400">/{r.slug}</div>
            </div>
          ),
        },
        { key: "category", label: "Category", className: "hidden md:table-cell w-36" },
        { key: "date", label: "Date", className: "hidden lg:table-cell w-32" },
        {
          key: "published",
          label: "Status",
          className: "w-28",
          render: (r) => <Pill on={r.published} yes="Published" no="Draft" />,
        },
      ]}
      emptyItem={() => ({
        title: "",
        slug: "",
        excerpt: "",
        category: "",
        date: new Date().toISOString().slice(0, 10),
        readTime: "5 min read",
        image: "",
        content: [""],
        order: 0,
        published: true,
        seo: { title: "", description: "", keywords: [] },
      })}
      beforeSave={(d) => (d.title?.trim() ? d : "Title is required")}
      form={(d, set) => (
        <>
          <Field label="Title *">
            <Input value={d.title} onChange={(e) => set({ title: e.target.value })} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug" hint="Leave blank to auto-generate.">
              <Input value={d.slug} onChange={(e) => set({ slug: e.target.value })} />
            </Field>
            <Field label="Category" hint="Used for the filter chips on /blogs">
              <Input
                value={d.category}
                onChange={(e) => set({ category: e.target.value })}
                placeholder="Packaging"
              />
            </Field>
            <Field label="Date">
              <Input type="date" value={d.date} onChange={(e) => set({ date: e.target.value })} />
            </Field>
            <Field label="Read time">
              <Input value={d.readTime} onChange={(e) => set({ readTime: e.target.value })} />
            </Field>
          </div>

          <Field label="Excerpt">
            <Textarea rows={3} value={d.excerpt} onChange={(e) => set({ excerpt: e.target.value })} />
          </Field>

          <ImageInput label="Cover image" value={d.image} onChange={(v) => set({ image: v })} />

          <Field label="Body paragraphs" hint="One box per paragraph.">
            <ListInput
              value={d.content || []}
              onChange={(v) => set({ content: v })}
              placeholder="Paragraph text…"
              textarea
            />
          </Field>

          <div className="border-t border-slate-100 pt-4">
            <div className="mb-3 text-sm font-semibold text-slate-700">SEO</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="SEO title" hint="Falls back to the blog title.">
                <Input
                  value={d.seo?.title || ""}
                  onChange={(e) => set({ seo: { ...(d.seo || {}), title: e.target.value } })}
                />
              </Field>
              <Field label="SEO keywords">
                <ListInput
                  value={d.seo?.keywords || []}
                  onChange={(v) => set({ seo: { ...(d.seo || {}), keywords: v } })}
                  placeholder="e.g. packaging tips"
                />
              </Field>
            </div>
            <Field label="SEO description" hint="Falls back to the excerpt.">
              <Textarea
                rows={2}
                value={d.seo?.description || ""}
                onChange={(e) => set({ seo: { ...(d.seo || {}), description: e.target.value } })}
              />
            </Field>
          </div>

          <div className="flex items-center gap-6 border-t border-slate-100 pt-4">
            <Field label="Sort order" className="w-32">
              <Input
                type="number"
                value={d.order ?? 0}
                onChange={(e) => set({ order: Number(e.target.value) })}
              />
            </Field>
            <div className="pt-5">
              <Toggle checked={!!d.published} onChange={(v) => set({ published: v })} label="Published" />
            </div>
          </div>
        </>
      )}
    />
  );
}
