/**
 * Vardhman Packaging — database seed
 *
 *   npm run seed          → wipes content collections, inserts the exact
 *                           data that was previously hard-coded in /lib
 *   npm run seed -- --keep-admin   → don't touch the admin users collection
 *
 * Admin login created:  ADMIN_EMAIL / ADMIN_PASSWORD  (see .env)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/* ---------- tiny .env loader (no dotenv dependency) ---------- */
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(root, file);
    if (!fs.existsSync(p)) continue;
    for (const rawLine of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const i = line.indexOf("=");
      if (i === -1) continue;
      const k = line.slice(0, i).trim();
      let v = line.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      )
        v = v.slice(1, -1);
      if (process.env[k] === undefined) process.env[k] = v;
    }
  }
}
loadEnv();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vardhman";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@vardhmanpackaging.com").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Vardhman@123";
const ADMIN_NAME = process.env.ADMIN_NAME || "Vardhman Admin";
const keepAdmin = process.argv.includes("--keep-admin");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "seed-data.json"), "utf8"));

/* ---------- schemas (loose — the app owns the strict ones) ---------- */
const loose = () => new mongoose.Schema({}, { strict: false, timestamps: true });
const Company = mongoose.model("Company", loose());
const Category = mongoose.model("Category", loose());
const Product = mongoose.model("Product", loose());
const Blog = mongoose.model("Blog", loose());
const Industry = mongoose.model("Industry", loose());
const Faq = mongoose.model("Faq", loose());
const Testimonial = mongoose.model("Testimonial", loose());
const Enquiry = mongoose.model("Enquiry", loose());
const AdminUser = mongoose.model("AdminUser", loose());

const log = (...a) => console.log("  ", ...a);

async function run() {
  console.log("\n→ connecting:", MONGODB_URI.replace(/\/\/([^@]*)@/, "//***@"));
  await mongoose.connect(MONGODB_URI);
  console.log("→ connected\n");

  console.log("→ clearing content collections");
  await Promise.all([
    Company.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Blog.deleteMany({}),
    Industry.deleteMany({}),
    Faq.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  console.log("→ inserting data");
  await Company.create(data.company);
  log("company           : 1");

  await Category.insertMany(data.categories);
  log("categories        :", data.categories.length);

  await Product.insertMany(data.products);
  log("products          :", data.products.length);

  await Blog.insertMany(data.blogs);
  log("blogs             :", data.blogs.length);

  await Industry.insertMany(data.industries);
  log("industries        :", data.industries.length);

  await Faq.insertMany(data.faqs);
  log("faqs              :", data.faqs.length);

  await Testimonial.insertMany(data.testimonials);
  log("testimonials      :", data.testimonials.length);

  const enquiryCount = await Enquiry.countDocuments();
  log("enquiries         :", enquiryCount, "(untouched)");

  /* ---------- admin user ---------- */
  if (!keepAdmin) {
    const existing = await AdminUser.findOne({ email: ADMIN_EMAIL });
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    if (existing) {
      await AdminUser.updateOne(
        { _id: existing._id },
        { $set: { passwordHash, name: ADMIN_NAME, role: "admin", active: true } }
      );
      log("admin user        : updated ->", ADMIN_EMAIL);
    } else {
      await AdminUser.create({
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        passwordHash,
        role: "admin",
        active: true,
      });
      log("admin user        : created ->", ADMIN_EMAIL);
    }
  } else {
    log("admin user        : skipped (--keep-admin)");
  }

  /* ---------- sanity: products pointing at a missing category ---------- */
  const catSlugs = new Set(data.categories.map((c) => c.slug));
  const orphans = [...new Set(data.products.map((p) => p.category))].filter(
    (c) => !catSlugs.has(c)
  );
  if (orphans.length) {
    console.log(
      "\n⚠  products reference categories that don't exist (same as the original static data):"
    );
    orphans.forEach((o) =>
      log("-", o, `(${data.products.filter((p) => p.category === o).length} products)`)
    );
    console.log("   create these categories in the admin panel to make those products reachable.");
  }

  console.log("\n✓ seed complete");
  console.log(`  admin panel : /admin/login`);
  console.log(`  email       : ${ADMIN_EMAIL}`);
  console.log(`  password    : ${keepAdmin ? "(unchanged)" : ADMIN_PASSWORD}\n`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (e) => {
  console.error("\n✗ seed failed:", e);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
