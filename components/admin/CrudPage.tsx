"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, RefreshCw } from "lucide-react";
import { api, Btn, Empty, Input, Modal, Spinner, useToast } from "./ui";

export type Column<T> = {
  key: string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export default function CrudPage<T extends Record<string, any>>({
  title,
  subtitle,
  endpoint,
  columns,
  emptyItem,
  form,
  searchPlaceholder = "Search…",
  labelOf,
  wideModal,
  extraFilter,
  beforeSave,
}: {
  title: string;
  subtitle?: string;
  endpoint: string;
  columns: Column<T>[];
  emptyItem: () => T;
  form: (draft: T, set: (patch: Partial<T>) => void) => React.ReactNode;
  searchPlaceholder?: string;
  labelOf?: (row: T) => string;
  wideModal?: boolean;
  extraFilter?: React.ReactNode;
  beforeSave?: (draft: T) => T | string; // return string = validation error
}) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<T | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api<{ items: T[] }>(`${endpoint}?limit=500`);
      setItems(r.items || []);
    } catch (e: any) {
      toast(e.message, "err");
    } finally {
      setLoading(false);
    }
  }, [endpoint, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const needle = q.toLowerCase();
    return items.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(needle)
    );
  }, [items, q]);

  const set = (patch: Partial<T>) => setDraft((d) => ({ ...(d as T), ...patch }));

  const openNew = () => {
    setDraft(emptyItem());
    setOpen(true);
  };
  const openEdit = (row: T) => {
    setDraft(JSON.parse(JSON.stringify(row)));
    setOpen(true);
  };

  const save = async () => {
    if (!draft) return;
    let payload: T = draft;
    if (beforeSave) {
      const res = beforeSave(draft);
      if (typeof res === "string") return toast(res, "err");
      payload = res;
    }
    setSaving(true);
    try {
      const isEdit = Boolean((payload as any)._id);
      await api(isEdit ? `${endpoint}/${(payload as any)._id}` : endpoint, {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      toast(isEdit ? "Updated" : "Created");
      setOpen(false);
      setDraft(null);
      load();
    } catch (e: any) {
      toast(e.message, "err");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: T) => {
    const label = labelOf ? labelOf(row) : (row as any).name || (row as any).title || "this item";
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      await api(`${endpoint}/${(row as any)._id}`, { method: "DELETE" });
      toast("Deleted");
      load();
    } catch (e: any) {
      toast(e.message, "err");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="ghost" onClick={load}>
            <RefreshCw className="h-4 w-4" />
          </Btn>
          <Btn onClick={openNew}>
            <Plus className="h-4 w-4" /> New
          </Btn>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 flex-none text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full text-sm outline-none"
          />
        </div>
        {extraFilter}
        <span className="text-xs font-medium text-slate-400">{filtered.length} items</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <Empty label="Nothing here yet." />
        ) : (
          <div className="overflow-x-auto h-[73vh]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${c.className || ""}`}
                    >
                      {c.label}
                    </th>
                  ))}
                  <th className="w-24 px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((row) => (
                  <tr key={(row as any)._id} className="transition hover:bg-slate-50/60">
                    {columns.map((c) => (
                      <td key={c.key} className={`px-4 py-3 align-middle text-slate-700 ${c.className || ""}`}>
                        {c.render ? c.render(row) : String((row as any)[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => openEdit(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-orange"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => remove(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={open}
        wide={wideModal}
        onClose={() => setOpen(false)}
        title={(draft as any)?._id ? `Edit ${title.replace(/s$/, "")}` : `New ${title.replace(/s$/, "")}`}
        footer={
          <>
            <Btn variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Btn>
            <Btn onClick={save} loading={saving}>
              Save
            </Btn>
          </>
        }
      >
        {draft && <div className="space-y-4">{form(draft, set)}</div>}
      </Modal>
    </div>
  );
}

/* small helper cell renderers */
export const Thumb = ({ src }: { src?: string }) =>
  src ? (
    <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-200">
      <Image src={src} alt="" fill className="object-cover" sizes="40px" unoptimized />
    </div>
  ) : (
    <div className="h-10 w-10 rounded-lg bg-slate-100" />
  );

export const Pill = ({ on, yes = "Active", no = "Hidden" }: { on: boolean; yes?: string; no?: string }) => (
  <span
    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
      on ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
    }`}
  >
    {on ? yes : no}
  </span>
);
