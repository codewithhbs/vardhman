import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Company } from "@/models";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  let item = await Company.findOne({}).lean();
  if (!item) item = (await Company.create({})).toObject();
  return NextResponse.json({ ok: true, item });
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    delete body._id;
    delete body.createdAt;
    delete body.updatedAt;
    const existing = await Company.findOne({});
    const item = existing
      ? await Company.findByIdAndUpdate(existing._id, { $set: body }, { new: true }).lean()
      : (await Company.create(body)).toObject();
    return NextResponse.json({ ok: true, item });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Save failed" }, { status: 400 });
  }
}
