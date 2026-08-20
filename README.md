# Vardhman Packaging — Dynamic Website + Admin Panel

Next.js 14 (App Router) + MongoDB (Mongoose) + Tailwind CSS.
Everything that used to be hard-coded in `/lib` is now stored in MongoDB and editable from the admin panel at `/admin`.

---

## 1. Setup

```bash
npm install
cp .env.example .env      # then edit .env
```

`.env` values:

| Key | What it does |
|---|---|
| `MONGODB_URI` | Mongo connection string. Local: `mongodb://127.0.0.1:27017/vardhman` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Used by `npm run seed` to create the admin login |
| `JWT_SECRET` | **Change this in production.** Signs the admin session cookie |
| `SMTP_*` | Enquiry email delivery (unchanged from before) |

---

## 2. Seed the database

This inserts **exactly** the data the old static site had — same categories, same 99 products, same blogs, industries, FAQs, company details, certificates and testimonials.

```bash
npm run seed
```

Output:

```
categories        : 15
products          : 99
blogs             : 4
industries        : 12
faqs              : 6
testimonials      : 3
admin user        : created -> admin@vardhmanpackaging.com
```

Options:

```bash
npm run seed -- --keep-admin    # re-seed content but leave admin users alone
```

**Note:** `seed` wipes and re-inserts the content collections (company, categories, products, blogs, industries, faqs, testimonials). It never touches the `enquiries` collection, so leads are safe.

### One known data quirk

Four products in the original site pointed at categories that were never defined:

- `eva-foam` — 3 products
- `silicone-sealant` — 1 product

The seed keeps this as-is (data is identical to the original) and prints a warning. Create those two categories in **Admin → Categories** and those products become reachable. Also `plastic-rods` currently has 0 products.

---

## 3. Run

```bash
npm run dev      # http://localhost:3013
npm run build
npm start
```

Admin panel: **http://localhost:3013/admin**

---

## 4. What's editable in the admin panel

| Section | Controls |
|---|---|
| **Dashboard** | Counts, products-per-category chart, recent enquiries |
| **Enquiries** | All website leads, status (new / contacted / closed), CSV export |
| **Categories** | Name, slug, icon, tagline, description, image, features, applications, industries, category FAQs, order, visibility |
| **Products** | Name, slug, category, price, blurb, **multi-image gallery**, specs, sizes, highlights, featured flag, order, visibility |
| **Blogs** | Title, slug, category, date, read time, cover image, paragraph-by-paragraph body, published flag |
| **Industries** | Name, icon, description, order |
| **FAQs** | Homepage FAQ accordion items |
| **Testimonials** | Client name, designation, quote, rating |
| **Company & Site** | Contact numbers, emails, addresses, map embed, logo, socials, counter stats, leadership, certificate names + images, homepage "Why choose us" cards, manufacturing process steps, SEO defaults, GTM ID |

Icons anywhere in the panel accept any **Lucide** icon name (`Package`, `Layers`, `Zap`, `Car`, `Ship`, ...).

---

## 5. Product multi-image gallery

Every product has an `images: string[]` array.

- Admin -> Products -> *Product images* — upload several files at once, reorder with the arrow buttons, delete individually.
- The **first image is the thumbnail** (used on cards, hero slider, mega menu).
- The product page renders a full gallery: main image, thumbnail strip, prev/next arrows, image counter, and a click-to-zoom lightbox with keyboard navigation.
- Product cards show an image-count badge when a product has more than one image.
- Product JSON-LD includes every gallery image.

Uploads are written to `public/uploads/` and served from `/uploads/...`. Max 6 MB per file; jpeg / png / webp / avif / gif.

> On a VPS, make sure `public/uploads` is writable by the PM2 user and is **not** wiped on deploy. If you deploy by replacing the folder, keep `public/uploads` on a persistent path and symlink it.

---

## 6. Enquiries

Both forms now save to MongoDB **and** email:

- `POST /api/quote` — the "Get a Quote" popup
- `POST /api/enquiry` — the main enquiry form (also opens WhatsApp, as before)

The lead is saved to the database first, so a failing SMTP config never loses an enquiry. View them all in Admin -> Enquiries.

---

## 7. Structure

```
app/
  admin/                          admin panel pages (protected by middleware)
  api/admin/                      admin CRUD + auth + upload APIs
  api/quote, api/enquiry          public form endpoints
  products/[category]/[product]/  product detail with gallery
components/
  admin/ui.tsx                    form primitives, uploader, modal, toasts
  admin/CrudPage.tsx              generic list + create/edit/delete screen
  admin/AdminShell.tsx            sidebar layout
  ProductGallery.tsx              multi-image gallery + lightbox
lib/
  db.ts                           cached mongoose connection
  data.ts                         server-side data fetchers (safe fallbacks)
  types.ts                        shared types + image helpers
  auth.ts                         JWT sign/verify (jose)
  crud.ts                         generic CRUD route factory
models/index.ts                   all mongoose schemas
scripts/seed.mjs                  seeder
scripts/seed-data.json            the exact original site data
middleware.ts                     protects /admin and /api/admin
```

---

## 8. Notes

- All public pages use `dynamic = "force-dynamic"`, so admin edits appear immediately with no rebuild.
- If MongoDB is unreachable, pages still render using a built-in fallback instead of crashing — useful during deploys and CI builds.
- Admin session is a 7-day httpOnly JWT cookie. `/admin` and `/api/admin/*` are blocked without it.
- `robots.txt` disallows `/admin` and `/api/`.
