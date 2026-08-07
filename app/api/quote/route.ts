import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, number, email, product, message } = await req.json();

    if (!name || !number || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Vardhman Website" <${process.env.SMTP_USER}>`,
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote mail error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send enquiry" }, { status: 500 });
  }
}
