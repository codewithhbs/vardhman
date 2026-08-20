"use client";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Plus, Trash2, Upload, GripVertical, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/* api helper                                                          */
/* ------------------------------------------------------------------ */
export async function api<T = any>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    headers: options.body instanceof FormData ? undefined : { "Content-Type": "application/json" },
    cache: "no-store",
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw new Error(data.error || `Request failed (${res.status})`);
  return data as T;
}

/* ------------------------------------------------------------------ */
/* toast                                                               */
/* ------------------------------------------------------------------ */
type Toast = { id: number; msg: string; type: "ok" | "err" };
const ToastCtx = createContext<(msg: string, type?: "ok" | "err") => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { id, msg, type }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3500);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
              t.type === "ok" ? "bg-emerald-600" : "bg-red-600"
            }`}
          >
            {t.type === "ok" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* form fields                                                         */
/* ------------------------------------------------------------------ */
export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className || ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} resize-y ${props.className || ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputCls} ${props.className || ""}`} />;
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 text-sm font-medium text-slate-700"
    >
      <span
        className={`relative h-6 w-11 flex-none rounded-full transition ${
          checked ? "bg-emerald-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
      {label}
    </button>
  );
}

export function Btn({
  variant = "primary",
  loading,
  children,
  className = "",
  ...rest
}: {
  variant?: "primary" | "ghost" | "danger" | "soft";
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: "bg-brand-orange text-white hover:brightness-110",
    soft: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    ghost: "border border-slate-200 bg-white text-slate-700 hover:border-slate-300",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  }[variant];
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* string list editor                                                  */
/* ------------------------------------------------------------------ */
export function ListInput({
  value = [],
  onChange,
  placeholder = "Add item",
  textarea = false,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  const set = (i: number, v: string) => onChange(value.map((x, k) => (k === i ? v : x)));
  const T: any = textarea ? Textarea : Input;
  return (
    <div className="space-y-2">
      {value.map((v, i) => (
        <div key={i} className="flex items-start gap-2">
          <T
            value={v}
            rows={textarea ? 3 : undefined}
            onChange={(e: any) => set(i, e.target.value)}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, k) => k !== i))}
            className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, ""])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500 hover:border-brand-orange hover:text-brand-orange"
      >
        <Plus className="h-3.5 w-3.5" /> Add
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* key/value pair editor (specs, faqs, stats...)                       */
/* ------------------------------------------------------------------ */
export function PairInput<T extends Record<string, any>>({
  value = [],
  onChange,
  fields,
  addLabel = "Add row",
}: {
  value: T[];
  onChange: (v: T[]) => void;
  fields: { key: keyof T & string; label: string; textarea?: boolean; type?: string }[];
  addLabel?: string;
}) {
  const set = (i: number, key: string, v: any) =>
    onChange(value.map((row, k) => (k === i ? { ...row, [key]: v } : row)));
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, f.type === "number" ? 0 : ""])) as T;
  return (
    <div className="space-y-3">
      {value.map((row, i) => (
        <div key={i} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
          <div className="grid flex-1 gap-2 sm:grid-cols-2">
            {fields.map((f) =>
              f.textarea ? (
                <Textarea
                  key={f.key}
                  rows={2}
                  className="sm:col-span-2"
                  placeholder={f.label}
                  value={(row as any)[f.key] ?? ""}
                  onChange={(e) => set(i, f.key, e.target.value)}
                />
              ) : (
                <Input
                  key={f.key}
                  type={f.type || "text"}
                  placeholder={f.label}
                  value={(row as any)[f.key] ?? ""}
                  onChange={(e) =>
                    set(i, f.key, f.type === "number" ? Number(e.target.value) : e.target.value)
                  }
                />
              )
            )}
          </div>
          <button
            type="button"
            onClick={() => onChange(value.filter((_, k) => k !== i))}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, blank()])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500 hover:border-brand-orange hover:text-brand-orange"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* image uploader — single                                             */
/* ------------------------------------------------------------------ */
export function ImageInput({
  value,
  onChange,
  label = "Image",
}: {
  value?: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  const ref = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await api<{ url: string }>("/api/admin/upload", { method: "POST", body: fd });
      onChange(r.url);
      toast("Image uploaded");
    } catch (e: any) {
      toast(e.message, "err");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label}>
      <div className="flex items-start gap-3">
        <div className="relative h-24 w-24 flex-none overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {value ? (
            <Image src={value} alt="" fill className="object-cover" sizes="96px" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
              No image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/product-img/example.jpg or https://..."
          />
          <input
            ref={ref}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
          <div className="flex gap-2">
            <Btn type="button" variant="soft" loading={busy} onClick={() => ref.current?.click()}>
              <Upload className="h-4 w-4" /> Upload
            </Btn>
            {value && (
              <Btn type="button" variant="danger" onClick={() => onChange("")}>
                Clear
              </Btn>
            )}
          </div>
        </div>
      </div>
    </Field>
  );
}

/* ------------------------------------------------------------------ */
/* image uploader — gallery (multiple)                                 */
/* ------------------------------------------------------------------ */
export function GalleryInput({
  value = [],
  onChange,
  label = "Gallery images",
  hint,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  label?: string;
  hint?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState("");
  const toast = useToast();
  const ref = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList) => {
    setBusy(true);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("files", f));
      const r = await api<{ urls: string[] }>("/api/admin/upload", { method: "POST", body: fd });
      onChange([...value, ...r.urls]);
      toast(`${r.urls.length} image(s) uploaded`);
    } catch (e: any) {
      toast(e.message, "err");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <Field label={label} hint={hint}>
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
        {value.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {value.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <Image src={src} alt="" fill className="object-cover" sizes="120px" unoptimized />
                {i === 0 && (
                  <span className="absolute left-1 top-1 rounded bg-brand-orange px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                    Main
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/60 p-1 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    className="px-1 text-xs text-white disabled:opacity-30"
                    disabled={i === 0}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(value.filter((_, k) => k !== i))}
                    className="px-1 text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    className="px-1 text-xs text-white disabled:opacity-30"
                    disabled={i === value.length - 1}
                  >
                    →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-4 text-center text-xs text-slate-400">No images yet</p>
        )}

        <input
          ref={ref}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => e.target.files?.length && upload(e.target.files)}
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Btn type="button" variant="soft" loading={busy} onClick={() => ref.current?.click()}>
            <Upload className="h-4 w-4" /> Upload images
          </Btn>
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="or paste an existing path e.g. /product-img/bopp.jpg"
            />
            <Btn
              type="button"
              variant="ghost"
              onClick={() => {
                if (!url.trim()) return;
                onChange([...value, url.trim()]);
                setUrl("");
              }}
            >
              <Plus className="h-4 w-4" /> Add
            </Btn>
          </div>
        </div>
      </div>
    </Field>
  );
}

/* ------------------------------------------------------------------ */
/* modal / drawer                                                      */
/* ------------------------------------------------------------------ */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", esc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 py-10 backdrop-blur-sm">
      <div
        className={`relative w-full rounded-2xl bg-white shadow-2xl ${wide ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-slate-100 bg-white px-6 py-4">
          <h2 className="font-display text-lg font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="sticky bottom-0 flex justify-end gap-2 rounded-b-2xl border-t border-slate-100 bg-white px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* confirm delete                                                      */
/* ------------------------------------------------------------------ */
export function useConfirm() {
  return (msg: string) => window.confirm(msg);
}

export function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-400">
      {label}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-20 text-slate-400">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}

export { GripVertical };
