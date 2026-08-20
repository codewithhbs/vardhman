import type { Metadata } from "next";
import "./globals.css";
import Loader from "@/components/Loader";
import SiteChrome from "@/components/SiteChrome";
import { QuoteModalProvider } from "@/components/QuoteModalContext";
import QuotePopup from "@/components/QuotePopup";
import { getCategories, getCompany } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany();
  const url = company.siteUrl;
  const title =
    company.seo?.title || `${company.name} | Industrial Tapes, Foam & Packaging Manufacturer`;
  const description =
    company.seo?.description ||
    "Manufacturer & supplier of BOPP packaging tapes, double-sided & electrical tapes, EPE/EVA foam, backer rods and LDPE sheets.";

  return {
    metadataBase: new URL(url),
    title: { default: title, template: `%s | ${company.name}` },
    description,
    keywords: company.seo?.keywords || [],
    openGraph: {
      type: "website",
      url,
      siteName: company.name,
      title,
      description,
      images: [{ url: company.logo || "/images/logo.jpeg", width: 600, height: 600, alt: company.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: company.name,
      description: "Industrial Tapes, Foam & Packaging Manufacturer",
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [company, categories] = await Promise.all([getCompany(), getCategories()]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.siteUrl,
    logo: `${company.siteUrl}${company.logo || "/images/logo.jpeg"}`,
    foundingDate: String(company.established),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      contactType: "sales",
      areaServed: "IN",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${company.address?.line1 || ""}, ${company.address?.line2 || ""}`,
      addressLocality: company.address?.city,
      addressRegion: company.address?.state,
      postalCode: company.address?.zip,
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {company.gtmId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${company.gtmId}');`,
            }}
          />
        ) : null}
      </head>
      <body className="font-sans">
        {company.gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${company.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <QuoteModalProvider>
          <Loader />
          <SiteChrome company={company} categories={categories}>
            {children}
          </SiteChrome>
        </QuoteModalProvider>
      </body>
    </html>
  );
}
