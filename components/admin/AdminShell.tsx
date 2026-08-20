"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  Package,
  Newspaper,
  Factory,
  HelpCircle,
  Quote,
  Inbox,
  Building2,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { api } from "./ui";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/categories", label: "Categories", icon: Boxes },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/industries", label: "Industries", icon: Factory },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/company", label: "Company & Site", icon: Building2 },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isLogin) return;
    api<{ user: any }>("/api/admin/auth/me")
      .then((r) => setUser(r.user))
      .catch(() => {});
  }, [isLogin]);

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  if (isLogin) return <>{children}</>;

  const Sidebar = (
    <aside className="flex h-full w-64 flex-none flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient font-display text-sm font-extrabold text-white">
          V
        </div>
        <div className="leading-tight">
          <div className="font-display text-sm font-bold text-slate-900">Vardhman</div>
          <div className="text-[10px] uppercase tracking-widest text-slate-400">Admin Panel</div>
        </div>
        <button onClick={() => setOpen(false)} className="ml-auto text-slate-400 lg:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {nav.map((n) => {
          const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-brand-orange/10 text-brand-orange"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <n.icon className="h-[18px] w-[18px]" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <ExternalLink className="h-[18px] w-[18px]" /> View website
        </a>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-[18px] w-[18px]" /> Log out
        </button>
        {user && (
          <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2">
            <div className="truncate text-xs font-semibold text-slate-700">{user.name}</div>
            <div className="truncate text-[11px] text-slate-400">{user.email}</div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <div className="hidden lg:block">{Sidebar}</div>

      {open && (
        <div className="fixed inset-0 z-[120] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full">{Sidebar}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:hidden">
          <button onClick={() => setOpen(true)} className="text-slate-600">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-display font-bold text-slate-900">Vardhman Admin</span>
        </header>
        <main className="flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
