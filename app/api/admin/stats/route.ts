import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Blog, Category, Enquiry, Faq, Industry, Product, Testimonial } from "@/models";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const [categories, products, blogs, industries, faqs, testimonials, enquiries, newEnquiries, recent] =
    await Promise.all([
      Category.countDocuments(),
      Product.countDocuments(),
      Blog.countDocuments(),
      Industry.countDocuments(),
      Faq.countDocuments(),
      Testimonial.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "new" }),
      Enquiry.find({}).sort({ createdAt: -1 }).limit(6).lean(),
    ]);

  const byCategory = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  return NextResponse.json({
    ok: true,
    stats: { categories, products, blogs, industries, faqs, testimonials, enquiries, newEnquiries },
    byCategory,
    recent,
  });
}
