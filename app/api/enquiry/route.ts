import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db";
import { Enquiry } from "@/models";
import { getCompany } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    try {
      await dbConnect();
      await Enquiry.create({
        name,
        company: body.company || "",
        email,
        phone,
        city: body.city || "",
        country: body.country || "",
        product: body.product || "",
        quantity: body.quantity || "",
        message,
        source: body.source || "enquiry-form",
      });
    } catch (dbErr) {
      console.error("Enquiry save error:", dbErr);
    }

    try {
      const co = await getCompany();
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"${co.name || "Vardhman Website"}" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `New Enquiry from ${name}`,
        html: `
        <h2>New Website Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Company:</b> ${body.company || "-"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>City:</b> ${body.city || "-"}</p>
        <p><b>Country:</b> ${body.country || "-"}</p>
        <p><b>Product:</b> ${body.product || "-"}</p>
        <p><b>Quantity:</b> ${body.quantity || "-"}</p>
        <p><b>Message:</b><br/>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
      });
    } catch (mailErr) {
      console.error("Enquiry mail error:", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to submit enquiry" }, { status: 500 });
  }
}
