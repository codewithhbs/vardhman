import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    const dir = path.join(process.cwd(), "private-uploads");
    const filePath = path.join(dir, filename);

    if (!filePath.startsWith(dir)) {
      return new NextResponse("Invalid path", { status: 400 });
    }

    const buf = await fs.readFile(filePath);
    const ext = (filename.split(".").pop() || "").toLowerCase();
    const type = TYPES[ext] || "application/octet-stream";

    return new NextResponse(buf, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
