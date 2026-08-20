import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db";
import { Enquiry } from "@/models";
import { getCompany } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, number, email, product, message } = await req.json();

    if (!name || !number || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // 1. always persist the lead
    try {
      await dbConnect();
      await Enquiry.create({
        name,
        phone: number,
        email,
        product: product || "",
        message,
        source: "quote-popup",
      });
    } catch (dbErr) {
      console.error("Quote save error:", dbErr);
    }

    // 2. then try to mail it (failure here must not lose the lead)
    try {
      const company = await getCompany();
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"${company.name || "Vardhman Website"}" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `New Quote Enquiry from ${name}`,
        html: `
        <h2>New Quote Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Number:</b> ${number}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Product:</b> ${product || "-"}</p>
        <p><b>Message:</b><br/>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
      });
    } catch (mailErr) {
      console.error("Quote mail error:", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send enquiry" }, { status: 500 });
  }
}
