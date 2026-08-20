"use client";
import CrudPage, { Pill } from "@/components/admin/CrudPage";
import { Field, Input, Textarea, Toggle } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function FaqsAdmin() {
  return (
    <CrudPage<any>
      title="FAQs"
      subtitle="General questions shown on the homepage FAQ accordion."
      endpoint="/api/admin/faqs"
      searchPlaceholder="Search FAQs…"
      labelOf={(r) => r.q}
      columns={[
        {
          key: "q",
          label: "Question",
          render: (r) => <span className="font-semibold text-slate-800">{r.q}</span>,
        },
        {
          key: "a",
          label: "Answer",
          className: "hidden lg:table-cell",
          render: (r) => <span className="line-clamp-2 text-slate-500">{r.a}</span>,
        },
        { key: "order", label: "Order", className: "w-20" },
        { key: "active", label: "Status", className: "w-24", render: (r) => <Pill on={r.active} /> },
      ]}
      emptyItem={() => ({ q: "", a: "", order: 0, active: true })}
      beforeSave={(d) => (d.q?.trim() ? d : "Question is required")}
      form={(d, set) => (
        <>
          <Field label="Question *">
            <Input value={d.q} onChange={(e) => set({ q: e.target.value })} />
          </Field>
          <Field label="Answer">
            <Textarea rows={4} value={d.a} onChange={(e) => set({ a: e.target.value })} />
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
