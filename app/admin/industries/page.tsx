"use client";
import CrudPage, { Pill } from "@/components/admin/CrudPage";
import { Field, Input, Textarea, Toggle } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function IndustriesAdmin() {
  return (
    <CrudPage<any>
      title="Industries"
      subtitle="Sectors shown on the homepage grid and the /industries page."
      endpoint="/api/admin/industries"
      searchPlaceholder="Search industries…"
      columns={[
        {
          key: "name",
          label: "Industry",
          render: (r) => (
            <div>
              <div className="font-semibold text-slate-800">{r.name}</div>
              <div className="text-xs text-slate-400">/{r.slug}</div>
            </div>
          ),
        },
        { key: "icon", label: "Icon", className: "hidden md:table-cell w-32" },
        {
          key: "desc",
          label: "Description",
          className: "hidden lg:table-cell",
          render: (r) => <span className="line-clamp-2 text-slate-500">{r.desc}</span>,
        },
        { key: "order", label: "Order", className: "w-20" },
        { key: "active", label: "Status", className: "w-24", render: (r) => <Pill on={r.active} /> },
      ]}
      emptyItem={() => ({ name: "", slug: "", icon: "Factory", desc: "", order: 0, active: true })}
      beforeSave={(d) => (d.name?.trim() ? d : "Name is required")}
      form={(d, set) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name *">
              <Input value={d.name} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="Slug" hint="Leave blank to auto-generate.">
              <Input value={d.slug} onChange={(e) => set({ slug: e.target.value })} />
            </Field>
          </div>
          <Field label="Lucide icon name" hint="e.g. Utensils, Pill, Sprout, ShoppingBag, Car, Ship">
            <Input value={d.icon} onChange={(e) => set({ icon: e.target.value })} />
          </Field>
          <Field label="Description">
            <Textarea rows={3} value={d.desc} onChange={(e) => set({ desc: e.target.value })} />
          </Field>
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
