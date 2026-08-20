"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Search, Trash2, Mail, Phone, Eye, Download } from "lucide-react";
import { api, Btn, Empty, Modal, Select, Spinner, useToast } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

type Enq = {
  _id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  product?: string;
  quantity?: string;
  message: string;
  source?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  new: "bg-amber-50 text-amber-700 border-amber-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  closed: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function EnquiriesAdmin() {
  const [items, setItems] = useState<Enq[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<Enq | null>(null);
  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api<{ items: Enq[] }>("/api/admin/enquiries?limit=500");
      setItems(r.items || []);
    } catch (e: any) {
      toast(e.message, "err");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== "all") list = list.filter((i) => i.status === filter);
    if (q.trim()) {
      const n = q.toLowerCase();
      list = list.filter((i) => JSON.stringify(i).toLowerCase().includes(n));
    }
    return list;
  }, [items, q, filter]);

  const setStatus = async (row: Enq, status: string) => {
    setItems((s) => s.map((i) => (i._id === row._id ? { ...i, status: status as any } : i)));
    try {
      await api(`/api/admin/enquiries/${row._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
    } catch (e: any) {
      toast(e.message, "err");
      load();
    }
  };

  const remove = async (row: Enq) => {
    if (!window.confirm(`Delete the enquiry from "${row.name}"?`)) return;
    try {
      await api(`/api/admin/enquiries/${row._id}`, { method: "DELETE" });
      toast("Deleted");
      load();
    } catch (e: any) {
      toast(e.message, "err");
    }
  };

  const exportCsv = () => {
    const head = [
      "Date",
      "Name",
      "Company",
      "Email",
      "Phone",
      "City",
      "Country",
      "Product",
      "Quantity",
      "Message",
      "Source",
      "Status",
    ];
    const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = filtered.map((e) =>
      [
        new Date(e.createdAt).toLocaleString("en-IN"),
        e.name,
        e.company,
        e.email,
        e.phone,
        e.city,
        e.country,
        e.product,
        e.quantity,
        e.message,
        e.source,
        e.status,
      ]
        .map(esc)
        .join(",")
    );
    const blob = new Blob([[head.join(","), ...rows].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="mt-1 text-sm text-slate-500">
            Every quote request and enquiry submitted from the website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="ghost" onClick={load}>
            <RefreshCw className="h-4 w-4" />
          </Btn>
          <Btn variant="soft" onClick={exportCsv}>
            <Download className="h-4 w-4" /> Export CSV
          </Btn>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 flex-none text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, email, phone, product…"
            className="w-full text-sm outline-none"
          />
        </div>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="!w-40">
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </Select>
        <span className="text-xs font-medium text-slate-400">{filtered.length} items</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <Empty label="No enquiries yet." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                  {["Date", "Contact", "Product", "Message", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((e) => (
                  <tr key={e._id} className="transition hover:bg-slate-50/60">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                      {new Date(e.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      <div className="text-[11px] text-slate-400">
                        {new Date(e.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{e.name}</div>
                      {e.company && <div className="text-xs text-slate-400">{e.company}</div>}
                      <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        <a
                          href={`tel:${e.phone}`}
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-orange"
                        >
                          <Phone className="h-3 w-3" /> {e.phone}
                        </a>
                        <a
                          href={`mailto:${e.email}`}
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-orange"
                        >
                          <Mail className="h-3 w-3" /> {e.email}
                        </a>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                      {e.product || "—"}
                      {e.quantity && <div className="text-xs text-slate-400">Qty: {e.quantity}</div>}
                    </td>
                    <td className="hidden max-w-xs px-4 py-3 lg:table-cell">
                      <span className="line-clamp-2 text-slate-500">{e.message}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={e.status}
                        onChange={(ev) => setStatus(e, ev.target.value)}
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold outline-none ${statusStyles[e.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setView(e)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-orange"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => remove(e)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
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
        open={!!view}
        onClose={() => setView(null)}
        title="Enquiry details"
        footer={
          view && (
            <>
              <a href={`tel:${view.phone}`} className="btn-admin-ghost">
                <Btn variant="ghost">
                  <Phone className="h-4 w-4" /> Call
                </Btn>
              </a>
              <a href={`mailto:${view.email}`}>
                <Btn>
                  <Mail className="h-4 w-4" /> Reply
                </Btn>
              </a>
            </>
          )
        }
      >
        {view && (
          <dl className="space-y-3 text-sm">
            {[
              ["Name", view.name],
              ["Company", view.company],
              ["Email", view.email],
              ["Phone", view.phone],
              ["City", view.city],
              ["Country", view.country],
              ["Product", view.product],
              ["Quantity", view.quantity],
              ["Source", view.source],
              ["Received", new Date(view.createdAt).toLocaleString("en-IN")],
            ].map(([k, v]) => (
              <div key={k as string} className="flex gap-4 border-b border-slate-50 pb-2">
                <dt className="w-28 flex-none text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {k}
                </dt>
                <dd className="text-slate-700">{v || "—"}</dd>
              </div>
            ))}
            <div>
              <dt className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Message
              </dt>
              <dd className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 leading-relaxed text-slate-700">
                {view.message}
              </dd>
            </div>
          </dl>
        )}
      </Modal>
    </div>
  );
}
