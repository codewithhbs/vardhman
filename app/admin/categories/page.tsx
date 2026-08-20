"use client";
import CrudPage, { Pill, Thumb } from "@/components/admin/CrudPage";
import {
  Field,
  ImageInput,
  Input,
  ListInput,
  PairInput,
  Textarea,
  Toggle,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function CategoriesAdmin() {
  return (
    <CrudPage<any>
      title="Categories"
      subtitle="Product categories shown in the mega menu, /products page and footer."
      endpoint="/api/admin/categories"
      searchPlaceholder="Search categories…"
      wideModal
      columns={[
        { key: "image", label: "", className: "w-14", render: (r) => <Thumb src={r.image} /> },
        {
          key: "name",
          label: "Name",
          render: (r) => (
            <div>
              <div className="font-semibold text-slate-800">{r.name}</div>
              <div className="text-xs text-slate-400">/{r.slug}</div>
            </div>
          ),
        },
        { key: "tagline", label: "Tagline", className: "hidden md:table-cell" },
        { key: "order", label: "Order", className: "w-20" },
        { key: "active", label: "Status", className: "w-24", render: (r) => <Pill on={r.active} /> },
      ]}
      emptyItem={() => ({
        name: "",
        slug: "",
        icon: "Package",
        tagline: "",
        description: "",
        image: "",
        features: [],
        applications: [],
        industries: [],
        faqs: [],
        order: 0,
        active: true,
        seo: { title: "", description: "", keywords: [] },
      })}
      beforeSave={(d) => (d.name?.trim() ? d : "Name is required")}
      form={(d, set) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name *">
              <Input value={d.name} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="Slug" hint="Leave blank to auto-generate from the name.">
              <Input
                value={d.slug}
                onChange={(e) => set({ slug: e.target.value })}
                placeholder="packaging-tape"
              />
            </Field>
            <Field label="Tagline">
              <Input value={d.tagline} onChange={(e) => set({ tagline: e.target.value })} />
            </Field>
            <Field label="Lucide icon name" hint="e.g. Package, Layers, Printer, Zap, Car">
              <Input value={d.icon} onChange={(e) => set({ icon: e.target.value })} />
            </Field>
          </div>

          <Field label="Description">
            <Textarea rows={4} value={d.description} onChange={(e) => set({ description: e.target.value })} />
          </Field>

          <ImageInput label="Category image" value={d.image} onChange={(v) => set({ image: v })} />

          <Field label="Features">
            <ListInput value={d.features || []} onChange={(v) => set({ features: v })} placeholder="Feature" />
          </Field>

          <Field label="Applications">
            <ListInput
              value={d.applications || []}
              onChange={(v) => set({ applications: v })}
              placeholder="Application"
            />
          </Field>

          <Field label="Industries served">
            <ListInput
              value={d.industries || []}
              onChange={(v) => set({ industries: v })}
              placeholder="Industry"
            />
          </Field>

          <Field label="Category FAQs">
            <PairInput
              value={d.faqs || []}
              onChange={(v) => set({ faqs: v })}
              fields={[
                { key: "q", label: "Question" },
                { key: "a", label: "Answer", textarea: true },
              ]}
              addLabel="Add FAQ"
            />
          </Field>

          <div className="border-t border-slate-100 pt-4">
            <div className="mb-3 text-sm font-semibold text-slate-700">SEO</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="SEO title" hint="Falls back to category name.">
                <Input
                  value={d.seo?.title || ""}
                  onChange={(e) => set({ seo: { ...(d.seo || {}), title: e.target.value } })}
                />
              </Field>
              <Field label="SEO keywords">
                <ListInput
                  value={d.seo?.keywords || []}
                  onChange={(v) => set({ seo: { ...(d.seo || {}), keywords: v } })}
                  placeholder="e.g. bopp tape"
                />
              </Field>
            </div>
            <Field label="SEO description" hint="Falls back to the category description.">
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
              <Toggle checked={!!d.active} onChange={(v) => set({ active: v })} label="Visible on site" />
            </div>
          </div>
        </>
      )}
    />
  );
}
