import { NextRequest, NextResponse } from "next/server";
import dbConnect from "./db";

type Opts = {
  model: any;
  sort?: Record<string, 1 | -1>;
  searchFields?: string[];
  /** mutate/validate body before create or update */
  transform?: (body: any) => any;
};

const err = (e: any) => {
  const msg = e?.code === 11000 ? "Duplicate value — slug already exists" : e?.message || "Error";
  return NextResponse.json({ ok: false, error: msg }, { status: 400 });
};

export function listHandlers({ model, sort = { order: 1 }, searchFields = [], transform }: Opts) {
  const GET = async (req: NextRequest) => {
    try {
      await dbConnect();
      const sp = req.nextUrl.searchParams;
      const q = sp.get("q")?.trim();
      const category = sp.get("category")?.trim();
      const page = Math.max(1, Number(sp.get("page") || 1));
      const limit = Math.min(500, Number(sp.get("limit") || 200));

      const filter: any = {};
      if (q && searchFields.length) {
        filter.$or = searchFields.map((f) => ({ [f]: { $regex: q, $options: "i" } }));
      }
      if (category) filter.category = category;

      const [items, total] = await Promise.all([
        model
          .find(filter)
          .sort(sort)
          .skip((page - 1) * limit)
          .limit(limit)
          .lean(),
        model.countDocuments(filter),
      ]);
      return NextResponse.json({ ok: true, items, total, page, limit });
    } catch (e) {
      return err(e);
    }
  };

  const POST = async (req: NextRequest) => {
    try {
      await dbConnect();
      let body = await req.json();
      if (transform) body = transform(body);
      delete body._id;
      const doc = await model.create(body);
      return NextResponse.json({ ok: true, item: doc.toObject() });
    } catch (e) {
      return err(e);
    }
  };

  return { GET, POST };
}

export function itemHandlers({ model, transform }: Opts) {
  const GET = async (_req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await dbConnect();
      const item = await model.findById(params.id).lean();
      if (!item) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
      return NextResponse.json({ ok: true, item });
    } catch (e) {
      return err(e);
    }
  };

  const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await dbConnect();
      let body = await req.json();
      if (transform) body = transform(body);
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      const item = await model.findByIdAndUpdate(params.id, { $set: body }, { new: true, runValidators: true }).lean();
      if (!item) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
      return NextResponse.json({ ok: true, item });
    } catch (e) {
      return err(e);
    }
  };

  const DELETE = async (_req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      await dbConnect();
      const item = await model.findByIdAndDelete(params.id).lean();
      if (!item) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    } catch (e) {
      return err(e);
    }
  };

  return { GET, PUT, DELETE };
}
