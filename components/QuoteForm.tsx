"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";

export default function QuoteForm({ title }: { title?: string }) {
  const router = useRouter();
  const { close } = useQuoteModal();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [form, setForm] = useState({ name: "", number: "", email: "", product: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[0-9+\-\s]{8,}$/.test(form.number)) e.number = "Valid number required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Please add your requirement";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      close();
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="p-6 sm:p-8">
      {title && <h3 className="mb-5 font-display text-xl font-bold text-brand-dark">{title}</h3>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Name*</label>
          <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="label">Number*</label>
          <input className="input" value={form.number} onChange={(e) => set("number", e.target.value)} placeholder="+91 ..." />
          {errors.number && <p className="mt-1 text-xs text-red-500">{errors.number}</p>}
        </div>
        <div>
          <label className="label">Email*</label>
          <input className="input" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="label">Product</label>
          <input className="input" value={form.product} onChange={(e) => set("product", e.target.value)} placeholder="Product of interest" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Message*</label>
          <textarea rows={4} className="input resize-none" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about your requirement..." />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-500">Something went wrong. Please try again.</p>
      )}

      <button onClick={submit} disabled={status === "loading"} className="btn-primary mt-5 w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Submit Enquiry <Send className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-3 text-xs text-black/40">Protected against spam. We respect your privacy and never share your details.</p>
    </div>
  );
}
