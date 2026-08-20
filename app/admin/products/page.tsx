"use client";
import { useEffect, useState } from "react";
import CrudPage, { Pill, Thumb } from "@/components/admin/CrudPage";
import {
  api,
  Field,
  GalleryInput,
  Input,
  ListInput,
  PairInput,
  Select,
  Textarea,
  Toggle,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function ProductsAdmin() {
  const [cats, setCats] = useState<any[]>([]);

  useEffect(() => {
    api<{ items: any[] }>("/api/admin/categories?limit=500")
      .then((r) => setCats(r.items || []))
      .catch(() => {});
  }, []);

  const catName = (slug: string) =>
    cats.find((c) => c.slug === slug)?.name || slug;

  return (
    <CrudPage<any>
      title="Products"
      subtitle="Each product supports a full image gallery — the first image is the thumbnail."
      endpoint="/api/admin/products"
      searchPlaceholder="Search products by name, category or description…"
      wideModal
      columns={[
        {
          key: "image",
          label: "",
          className: "w-14",
          render: (r) => <Thumb src={r.image} />,
        },
        {
          key: "name",
          label: "Product",
          render: (r) => (
            <div>
              <div className="font-semibold text-slate-800">{r.name}</div>
              <div className="text-xs text-slate-400">/{r.slug}</div>
            </div>
          ),
        },
        {
          key: "category",
          label: "Category",
          className: "hidden md:table-cell",
          render: (r) => (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              {catName(r.category)}
            </span>
          ),
        },
        {
          key: "images",
          label: "Images",
          className: "hidden lg:table-cell w-24",
          render: (r) => (
            <span className="text-xs font-semibold text-slate-500">
              {(r.images || []).length}
            </span>
          ),
        },
        // {
        //   key: "price",
        //   label: "Price",
        //   className: "hidden lg:table-cell w-28",
        // },
        {
          key: "active",
          label: "Status",
          className: "w-24",
          render: (r) => <Pill on={r.active} />,
        },
      ]}
      emptyItem={() => ({
        name: "",
        slug: "",
        category: cats[0]?.slug || "",
        blurb: "",
        specs: [],
        sizes: [],
        highlights: [],
        price: "",
        image: "",
        images: [],
        order: 0,
        featured: false,
        active: true,
        seo: { title: "", description: "", keywords: [] },
      })}
      beforeSave={(d) => {
        if (!d.name?.trim()) return "Product name is required";
        if (!d.category) return "Please pick a category";
        const images = (d.images || []).filter(Boolean);
        return { ...d, images, image: images[0] || d.image || "" };
      }}
      form={(d, set) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Product name *">
              <Input
                value={d.name}
                onChange={(e) => set({ name: e.target.value })}
              />
            </Field>
            <Field label="Slug" hint="Leave blank to auto-generate.">
              <Input
                value={d.slug}
                onChange={(e) => set({ slug: e.target.value })}
              />
            </Field>
            <Field label="Category *">
              <Select
                value={d.category}
                onChange={(e) => set({ category: e.target.value })}
              >
                <option value="">— select —</option>
                {cats.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Price" hint="Free text, e.g. ₹200 / Roll">
              <Input
                value={d.price}
                onChange={(e) => set({ price: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Short description (blurb)">
            <Textarea
              rows={3}
              value={d.blurb}
              onChange={(e) => set({ blurb: e.target.value })}
            />
          </Field>

          <GalleryInput
            label="Product images *"
            hint="Upload multiple images — all of them render in the gallery on the product page. First image = thumbnail."
            value={d.images || []}
            onChange={(v) => set({ images: v, image: v[0] || "" })}
          />

          <Field label="Technical specifications">
            <PairInput
              value={d.specs || []}
              onChange={(v) => set({ specs: v })}
              fields={[
                { key: "k", label: "Spec name (e.g. Tape Width)" },
                { key: "v", label: "Value (e.g. 48 mm)" },
              ]}
              addLabel="Add specification"
            />
          </Field>

          <Field label="Available sizes">
            <ListInput
              value={d.sizes || []}
              onChange={(v) => set({ sizes: v })}
              placeholder="e.g. 48mm"
            />
          </Field>

          <Field
            label="Applications / highlights"
            hint="Falls back to the category applications if left empty."
          >
            <ListInput
              value={d.highlights || []}
              onChange={(v) => set({ highlights: v })}
              placeholder="Highlight"
              textarea
            />
          </Field>

          <div className="border-t border-slate-100 pt-4">
            <div className="mb-3 text-sm font-semibold text-slate-700">SEO</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="SEO title" hint="Falls back to product name.">
                <Input
                  value={d.seo?.title || ""}
                  onChange={(e) => set({ seo: { ...(d.seo || {}), title: e.target.value } })}
                />
              </Field>
              <Field label="SEO keywords">
                <ListInput
                  value={d.seo?.keywords || []}
                  onChange={(v) => set({ seo: { ...(d.seo || {}), keywords: v } })}
                  placeholder="e.g. double sided tape"
                />
              </Field>
            </div>
            <Field label="SEO description" hint="Falls back to the blurb.">
              <Textarea
                rows={2}
                value={d.seo?.description || ""}
                onChange={(e) => set({ seo: { ...(d.seo || {}), description: e.target.value } })}
              />
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-slate-100 pt-4">
            <Field label="Sort order" className="w-32">
              <Input
                type="number"
                value={d.order ?? 0}
                onChange={(e) => set({ order: Number(e.target.value) })}
              />
            </Field>
            <div className="pt-5">
              <Toggle
                checked={!!d.featured}
                onChange={(v) => set({ featured: v })}
                label="Show in homepage featured"
              />
            </div>
            <div className="pt-5">
              <Toggle
                checked={!!d.active}
                onChange={(v) => set({ active: v })}
                label="Visible on site"
              />
            </div>
          </div>
        </>
      )}
    />
  );
}
