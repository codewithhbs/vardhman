"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Boxes, Package, Newspaper, Factory, HelpCircle, Quote, Inbox, ArrowRight } from "lucide-react";
import { api, Spinner, useToast } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

type Stats = {
  categories: number;
  products: number;
  blogs: number;
  industries: number;
  faqs: number;
  testimonials: number;
  enquiries: number;
  newEnquiries: number;
};

export default function Dashboard() {
  const [data, setData] = useState<{ stats: Stats; byCategory: any[]; recent: any[] } | null>(null);
  const toast = useToast();

  useEffect(() => {
    api<any>("/api/admin/stats")
      .then(setData)
      .catch((e) => toast(e.message, "err"));
  }, [toast]);

  if (!data) return <Spinner />;
  const s = data.stats;

  const cards = [
    { label: "Products", value: s.products, icon: Package, href: "/admin/products" },
    { label: "Categories", value: s.categories, icon: Boxes, href: "/admin/categories" },
    { label: "Enquiries", value: s.enquiries, icon: Inbox, href: "/admin/enquiries", badge: s.newEnquiries },
    { label: "Blogs", value: s.blogs, icon: Newspaper, href: "/admin/blogs" },
    { label: "Industries", value: s.industries, icon: Factory, href: "/admin/industries" },
    { label: "FAQs", value: s.faqs, icon: HelpCircle, href: "/admin/faqs" },
    { label: "Testimonials", value: s.testimonials, icon: Quote, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Everything on the website is editable from here.</p>

      <div className="overflow-x-auto h-[83vh]">
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <c.icon className="h-5 w-5" />
              </div>
              {!!c.badge && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
                  {c.badge} new
                </span>
              )}
            </div>
            <div className="mt-4 font-display text-3xl font-extrabold text-slate-900">{c.value}</div>
            <div className="mt-0.5 text-sm text-slate-500">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display font-bold text-slate-900">Products per category</h2>
          <div className="mt-4 space-y-2.5">
            {data.byCategory.map((c) => {
              const max = Math.max(...data.byCategory.map((x) => x.count), 1);
              return (
                <div key={c._id} className="flex items-center gap-3">
                  <span className="w-44 flex-none truncate text-xs font-medium text-slate-600">
                    {c._id}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-gradient"
                      style={{ width: `${(c.count / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 flex-none text-right text-xs font-bold text-slate-700">
                    {c.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-slate-900">Recent enquiries</h2>
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {data.recent.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-400">No enquiries yet.</p>
            )}
            {data.recent.map((e: any) => (
              <div key={e._id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-semibold text-slate-800">{e.name}</span>
                  <span className="flex-none text-[11px] text-slate-400">
                    {new Date(e.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-xs text-slate-500">
                  {e.phone} · {e.email}
                </div>
                {e.product && (
                  <div className="mt-1 truncate text-xs text-brand-orange">{e.product}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
