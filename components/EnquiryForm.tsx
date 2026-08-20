"use client";
import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

type Props = {
  compact?: boolean;
  product?: string;
  title?: string;
  whatsapp?: string;
};

export default function EnquiryForm({
  compact = false,
  product,
  title,
  whatsapp,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    country: "India",
    product: product || "",
    quantity: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) e.phone = "Valid phone required";
    if (!form.message.trim()) e.message = "Please add your requirement";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");

    // Build a readable message from the form data
    const lines = [
      "*New Enquiry*",
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.city && `City: ${form.city}`,
      form.country && `Country: ${form.country}`,
      form.product && `Product: ${form.product}`,
      form.quantity && `Quantity: ${form.quantity}`,
      `Message: ${form.message}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));

    // Must open synchronously inside the click handler, else popup blockers kick in
    // if (whatsapp) {
    //   window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank");
    // }

    // Save the lead in the database (and email it) regardless of WhatsApp
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "enquiry-form" }),
      });
    } catch (e) {
      /* lead already opened in WhatsApp — don't block the user */
      console.error("Error submitting enquiry:", e);
    }

    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-green-200 bg-green-50 px-6 py-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-display text-xl font-bold text-brand-dark">
          Thank you!
        </h3>
        <p className="mt-1 text-sm text-black/60">
          Your enquiry has been received. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ ...form, message: "", quantity: "" });
          }}
          className="btn-outline mt-6"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "card p-6 sm:p-8"}>
      {title && (
        <h3 className="mb-5 font-display text-xl font-bold text-brand-dark">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Name*</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="label">Company</label>
          <input
            className="input"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Company name"
          />
        </div>
        <div>
          <label className="label">Email*</label>
          <input
            className="input"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="label">Phone*</label>
          <input
            className="input"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 ..."
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
        {!compact && (
          <>
            <div>
              <label className="label">City</label>
              <input
                className="input"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="City"
              />
            </div>
            <div>
              <label className="label">Country</label>
              <input
                className="input"
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <label className="label">Product</label>
          <input
            className="input"
            value={form.product}
            onChange={(e) => set("product", e.target.value)}
            placeholder="Product of interest"
          />
        </div>
        <div>
          <label className="label">Quantity</label>
          <input
            className="input"
            value={form.quantity}
            onChange={(e) => set("quantity", e.target.value)}
            placeholder="e.g. 500 rolls"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Requirement / Message*</label>
          <textarea
            rows={compact ? 3 : 4}
            className="input resize-none"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us about your requirement..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>
      </div>
      <button
        onClick={submit}
        disabled={status === "loading"}
        className="btn-primary mt-5 w-full sm:w-auto"
      >
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
      <p className="mt-3 text-xs text-black/40">
        Protected against spam. We respect your privacy and never share your
        details.
      </p>
    </div>
  );
}
