import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { AdminUser } from "@/models";
import { AUTH_COOKIE, signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ ok: false, error: "Email and password required" }, { status: 400 });

    await dbConnect();
    const user: any = await AdminUser.findOne({ email: String(email).toLowerCase().trim(), active: true }).lean();
    if (!user) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    const match = await bcrypt.compare(password, user.passwordHash || "");
    if (!match) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    const token = await signToken({
      id: String(user._id),
      email: user.email,
      name: user.name || "Admin",
      role: user.role || "admin",
    });

    const res = NextResponse.json({
      ok: true,
      user: { email: user.email, name: user.name, role: user.role },
    });
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Login failed" }, { status: 500 });
  }
}
