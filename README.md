# Vardhman Packaging Ltd — Corporate Website

Premium, SEO-friendly corporate website for Vardhman Packaging Ltd, built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + lucide-react**.

## Quick start
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Tech
- Next.js 14 App Router, TypeScript, Tailwind CSS
- Framer Motion (scroll reveals, animated counters)
- lucide-react icons
- Google Fonts via next/font (Inter + Poppins)

## Structure
```
app/
  page.tsx                         Home (all sections)
  about/ industries/ infrastructure/ quality/ contact/ enquiry/
  privacy-policy/ terms/ sitemap-page/
  products/page.tsx                All categories
  products/[category]/page.tsx     Category page
  products/[category]/[product]/   Product detail (enquiry + specs + related)
  blogs/page.tsx  blogs/[slug]/     Blog list + detail
  not-found.tsx  sitemap.ts  robots.ts
components/   Header (mega menu), Footer, EnquiryForm, ProductCard, FAQAccordion, etc.
lib/         company.ts, products.ts, industries.ts, blogs.ts, faqs.ts   <-- EDIT DATA HERE
public/images/logo.jpeg
```

## CMS-ready
All dynamic content lives in `lib/*.ts` (products, categories, blogs, industries, FAQs).
Product & blog pages are generated from this data via dynamic routes + `generateStaticParams`.
To connect a CMS (Sanity/Strapi/Contentful), replace the arrays in `lib/` with fetch calls — the UI stays unchanged.

## Forms
`components/EnquiryForm.tsx` has validation + success state. It is **email/CMS integration ready**:
find the `// Email/CMS integration ready` comment in the `submit()` function and POST to your `/api/enquiry` route or service.

## Images
Hero/section/product images use Unsplash placeholders (industrial/packaging). Replace the
Unsplash URLs in `lib/products.ts`, `lib/blogs.ts` and page files with your own factory/product
photos (drop them in `public/images/` and reference `/images/your-file.jpg`).

## SEO
- Per-page metadata (title/description/OG/Twitter) via Next Metadata API
- JSON-LD Organization + Product schema
- Dynamic `sitemap.xml` and `robots.txt`
- Canonical URLs; update `SITE_URL` in `lib/company.ts`

## Brand colors
Yellow `#F4C300`, Orange `#D85A1A`, White, Light Gray `#F7F7F7`, Dark Gray `#333333`
(configured in `tailwind.config.ts`).
