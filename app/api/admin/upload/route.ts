import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif", "image/jpg"];
const MAX = 6 * 1024 * 1024; // 6 MB

const clean = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "file";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const files = form.getAll("files").filter(Boolean) as File[];
    const single = form.get("file") as File | null;
    if (single) files.push(single);

    if (!files.length)
      return NextResponse.json({ ok: false, error: "No file uploaded" }, { status: 400 });

    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });

    const urls: string[] = [];
    for (const file of files) {
      if (!ALLOWED.includes(file.type))
        return NextResponse.json(
          { ok: false, error: `Unsupported type: ${file.type}` },
          { status: 400 }
        );
      if (file.size > MAX)
        return NextResponse.json(
          { ok: false, error: `${file.name} is larger than 6MB` },
          { status: 400 }
        );

      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const name = `${clean(file.name)}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
      const buf = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(dir, name), buf);
      urls.push(`/uploads/${name}`);
    }

    return NextResponse.json({ ok: true, urls, url: urls[0] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Upload failed" }, { status: 500 });
  }
}
