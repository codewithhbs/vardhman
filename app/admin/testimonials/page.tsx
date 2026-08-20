"use client";
import CrudPage, { Pill } from "@/components/admin/CrudPage";
import { Field, Input, Textarea, Toggle } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function TestimonialsAdmin() {
  return (
    <CrudPage<any>
      title="Testimonials"
      subtitle="Client quotes shown on the homepage."
      endpoint="/api/admin/testimonials"
      searchPlaceholder="Search testimonials…"
      columns={[
        {
          key: "name",
          label: "Client",
          render: (r) => (
            <div>
              <div className="font-semibold text-slate-800">{r.name}</div>
              <div className="text-xs text-slate-400">{r.designation}</div>
            </div>
          ),
        },
        {
          key: "text",
          label: "Quote",
          className: "hidden lg:table-cell",
          render: (r) => <span className="line-clamp-2 text-slate-500">{r.text}</span>,
        },
        { key: "rating", label: "Rating", className: "w-20" },
        { key: "active", label: "Status", className: "w-24", render: (r) => <Pill on={r.active} /> },
      ]}
      emptyItem={() => ({ name: "", designation: "", text: "", rating: 5, order: 0, active: true })}
      beforeSave={(d) => (d.name?.trim() ? d : "Client name is required")}
      form={(d, set) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Client name *">
              <Input value={d.name} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="Designation / company">
              <Input value={d.designation} onChange={(e) => set({ designation: e.target.value })} />
            </Field>
          </div>
          <Field label="Quote">
            <Textarea rows={4} value={d.text} onChange={(e) => set({ text: e.target.value })} />
          </Field>
          <div className="flex flex-wrap items-center gap-6 border-t border-slate-100 pt-4">
            <Field label="Rating (1-5)" className="w-32">
              <Input
                type="number"
                min={1}
                max={5}
                value={d.rating ?? 5}
                onChange={(e) => set({ rating: Number(e.target.value) })}
              />
            </Field>
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
