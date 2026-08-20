import type { Metadata } from "next";
import "../globals.css";
import AdminShell from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Admin | Vardhman Packaging",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminShell>{children}</AdminShell>
    </ToastProvider>
  );
}
