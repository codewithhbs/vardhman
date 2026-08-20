"use client";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import {
  api,
  Btn,
  Field,
  GalleryInput,
  ImageInput,
  Input,
  ListInput,
  PairInput,
  Spinner,
  Textarea,
  useToast,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const TABS = [
  { id: "general", label: "General" },
  { id: "contact", label: "Contact & Address" },
  { id: "stats", label: "Stats & Leadership" },
  { id: "certs", label: "Certifications" },
  { id: "homepage", label: "Homepage Blocks" },
  { id: "seo", label: "SEO & Scripts" },
];

export default function CompanyAdmin() {
  const [d, setD] = useState<any>(null);
  const [tab, setTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    api<{ item: any }>("/api/admin/company")
      .then((r) =>
        setD({
          address: {},
          socials: {},
          stats: [],
          leadership: [],
          certificates: [],
          certificateImages: [],
          homepage: { why: [], process: [] },
          seo: { keywords: [] },
          ...r.item,
        })
      )
      .catch((e) => toast(e.message, "err"));
  }, [toast]);

  if (!d) return <Spinner />;

  const set = (patch: any) => setD((s: any) => ({ ...s, ...patch }));
  const setIn = (key: string, patch: any) =>
    setD((s: any) => ({ ...s, [key]: { ...(s[key] || {}), ...patch } }));

  const save = async () => {
    setSaving(true);
    try {
      await api("/api/admin/company", { method: "PUT", body: JSON.stringify(d) });
      toast("Saved — the website is updated");
    } catch (e: any) {
      toast(e.message, "err");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Company &amp; Site</h1>
          <p className="mt-1 text-sm text-slate-500">
            Contact details, stats, certifications and homepage content used across the whole website.
          </p>
        </div>
        <Btn onClick={save} loading={saving}>
          <Save className="h-4 w-4" /> Save changes
        </Btn>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === t.id
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        {tab === "general" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Display name">
                <Input value={d.name || ""} onChange={(e) => set({ name: e.target.value })} />
              </Field>
              <Field label="Legal name">
                <Input value={d.legalName || ""} onChange={(e) => set({ legalName: e.target.value })} />
              </Field>
              <Field label="Short name">
                <Input value={d.short || ""} onChange={(e) => set({ short: e.target.value })} />
              </Field>
              <Field label="Established year">
                <Input
                  type="number"
                  value={d.established || 1996}
                  onChange={(e) => set({ established: Number(e.target.value) })}
                />
              </Field>
            </div>
            <Field label="Tagline">
              <Textarea rows={2} value={d.tagline || ""} onChange={(e) => set({ tagline: e.target.value })} />
            </Field>
            <ImageInput label="Logo" value={d.logo} onChange={(v) => set({ logo: v })} />
            <Field label="Website URL" hint="Used for canonical links, sitemap and structured data.">
              <Input value={d.siteUrl || ""} onChange={(e) => set({ siteUrl: e.target.value })} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Facebook">
                <Input
                  value={d.socials?.facebook || ""}
                  onChange={(e) => setIn("socials", { facebook: e.target.value })}
                />
              </Field>
              <Field label="LinkedIn">
                <Input
                  value={d.socials?.linkedin || ""}
                  onChange={(e) => setIn("socials", { linkedin: e.target.value })}
                />
              </Field>
              <Field label="Twitter / X">
                <Input
                  value={d.socials?.twitter || ""}
                  onChange={(e) => setIn("socials", { twitter: e.target.value })}
                />
              </Field>
              <Field label="Instagram">
                <Input
                  value={d.socials?.instagram || ""}
                  onChange={(e) => setIn("socials", { instagram: e.target.value })}
                />
              </Field>
            </div>
          </>
        )}

        {tab === "contact" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Primary phone (display)">
                <Input value={d.phone || ""} onChange={(e) => set({ phone: e.target.value })} />
              </Field>
              <Field label="Secondary phone">
                <Input value={d.phone2 || ""} onChange={(e) => set({ phone2: e.target.value })} />
              </Field>
              <Field label="Phone for tel: links" hint="No spaces, e.g. +919312706093">
                <Input value={d.phoneRaw || ""} onChange={(e) => set({ phoneRaw: e.target.value })} />
              </Field>
              <Field label="WhatsApp number" hint="Country code, no + or spaces, e.g. 919312706093">
                <Input value={d.whatsapp || ""} onChange={(e) => set({ whatsapp: e.target.value })} />
              </Field>
              <Field label="Landline">
                <Input value={d.landline || ""} onChange={(e) => set({ landline: e.target.value })} />
              </Field>
              <Field label="Working hours">
                <Input value={d.hours || ""} onChange={(e) => set({ hours: e.target.value })} />
              </Field>
              <Field label="Primary email">
                <Input value={d.email || ""} onChange={(e) => set({ email: e.target.value })} />
              </Field>
              <Field label="Secondary email">
                <Input value={d.email2 || ""} onChange={(e) => set({ email2: e.target.value })} />
              </Field>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                Registered address (structured data)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Address line 1">
                  <Input
                    value={d.address?.line1 || ""}
                    onChange={(e) => setIn("address", { line1: e.target.value })}
                  />
                </Field>
                <Field label="Address line 2">
                  <Input
                    value={d.address?.line2 || ""}
                    onChange={(e) => setIn("address", { line2: e.target.value })}
                  />
                </Field>
                <Field label="City">
                  <Input
                    value={d.address?.city || ""}
                    onChange={(e) => setIn("address", { city: e.target.value })}
                  />
                </Field>
                <Field label="State">
                  <Input
                    value={d.address?.state || ""}
                    onChange={(e) => setIn("address", { state: e.target.value })}
                  />
                </Field>
                <Field label="PIN code">
                  <Input
                    value={d.address?.zip || ""}
                    onChange={(e) => setIn("address", { zip: e.target.value })}
                  />
                </Field>
                <Field label="Country">
                  <Input
                    value={d.address?.country || ""}
                    onChange={(e) => setIn("address", { country: e.target.value })}
                  />
                </Field>
              </div>
            </div>

            <Field
              label="Displayed address"
              hint="Shown in the footer and on the contact page."
            >
              <Textarea
                rows={3}
                value={d.footerAddress || ""}
                onChange={(e) => set({ footerAddress: e.target.value })}
              />
            </Field>

            <Field label="Google Maps embed URL" hint="The src value from the Maps → Share → Embed iframe.">
              <Textarea rows={3} value={d.mapEmbed || ""} onChange={(e) => set({ mapEmbed: e.target.value })} />
            </Field>
          </>
        )}

        {tab === "stats" && (
          <>
            <Field label="Counter stats" hint="Shown on the homepage and about page.">
              <PairInput
                value={d.stats || []}
                onChange={(v) => set({ stats: v })}
                fields={[
                  { key: "label", label: "Label (e.g. Years of Experience)" },
                  { key: "value", label: "Number", type: "number" },
                  { key: "suffix", label: "Suffix (e.g. +)" },
                ]}
                addLabel="Add stat"
              />
            </Field>
            <Field label="Leadership team">
              <PairInput
                value={d.leadership || []}
                onChange={(v) => set({ leadership: v })}
                fields={[
                  { key: "name", label: "Name" },
                  { key: "role", label: "Role" },
                ]}
                addLabel="Add member"
              />
            </Field>
          </>
        )}

        {tab === "certs" && (
          <>
            <Field label="Certification names" hint="Text badges on the quality page.">
              <ListInput
                value={d.certificates || []}
                onChange={(v) => set({ certificates: v })}
                placeholder="ISO 9001:2015"
              />
            </Field>
            <GalleryInput
              label="Certificate images"
              hint="The scrolling certificate strip in the hero. Upload or paste paths."
              value={(d.certificateImages || []).map((c: any) => c.src)}
              onChange={(urls) =>
                set({
                  certificateImages: urls.map((src, i) => ({
                    src,
                    alt: d.certificateImages?.[i]?.alt || "Certificate",
                  })),
                })
              }
            />
            <Field label="Certificate alt texts" hint="Same order as the images above.">
              <ListInput
                value={(d.certificateImages || []).map((c: any) => c.alt || "")}
                onChange={(alts) =>
                  set({
                    certificateImages: (d.certificateImages || []).map((c: any, i: number) => ({
                      ...c,
                      alt: alts[i] ?? c.alt,
                    })),
                  })
                }
                placeholder="ISO 9001 Quality Assurance"
              />
            </Field>
          </>
        )}

        {tab === "homepage" && (
          <>
            <Field label="“Why choose us” cards" hint="Icon = any Lucide icon name (Award, ShieldCheck, Factory, Truck, Recycle, Headphones).">
              <PairInput
                value={d.homepage?.why || []}
                onChange={(v) => setIn("homepage", { why: v })}
                fields={[
                  { key: "icon", label: "Lucide icon" },
                  { key: "title", label: "Title" },
                  { key: "desc", label: "Description", textarea: true },
                ]}
                addLabel="Add card"
              />
            </Field>
            <Field label="Manufacturing process steps">
              <PairInput
                value={d.homepage?.process || []}
                onChange={(v) => setIn("homepage", { process: v })}
                fields={[
                  { key: "title", label: "Step title" },
                  { key: "desc", label: "Description", textarea: true },
                ]}
                addLabel="Add step"
              />
            </Field>
          </>
        )}

        {tab === "seo" && (
          <>
            <Field label="Default meta title">
              <Input value={d.seo?.title || ""} onChange={(e) => setIn("seo", { title: e.target.value })} />
            </Field>
            <Field label="Default meta description">
              <Textarea
                rows={3}
                value={d.seo?.description || ""}
                onChange={(e) => setIn("seo", { description: e.target.value })}
              />
            </Field>
            <Field label="Meta keywords">
              <ListInput
                value={d.seo?.keywords || []}
                onChange={(v) => setIn("seo", { keywords: v })}
                placeholder="packaging tape"
              />
            </Field>
            <Field label="Google Tag Manager ID" hint="Leave blank to disable GTM. e.g. GTM-MH664578">
              <Input value={d.gtmId || ""} onChange={(e) => set({ gtmId: e.target.value })} />
            </Field>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Btn onClick={save} loading={saving}>
          <Save className="h-4 w-4" /> Save changes
        </Btn>
      </div>
    </div>
  );
}
