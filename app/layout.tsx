import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import Loader from "@/components/Loader";
import { company, SITE_URL } from "@/lib/company";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} | Industrial Tapes, Foam & Packaging Manufacturer`,
    template: `%s | ${company.name}`,
  },
  description:
    "Vardhman Packaging Ltd is a leading manufacturer & supplier of BOPP packaging tapes, double-sided & electrical tapes, EPE/EVA foam, backer rods and LDPE sheets. ISO-aligned quality, custom & OEM solutions across India.",
  keywords: ["packaging tape", "BOPP tape", "double sided tape", "EPE foam", "EVA foam", "backer rod", "electrical tape", "industrial tape manufacturer", "Delhi packaging company"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: company.name,
    title: `${company.name} | Industrial Tapes, Foam & Packaging`,
    description: "Premium industrial tapes, foam and packaging solutions — engineered for quality, delivered on time.",
    images: [{ url: "/images/logo.jpeg", width: 600, height: 600, alt: company.name }],
  },
  twitter: { card: "summary_large_image", title: company.name, description: "Industrial Tapes, Foam & Packaging Manufacturer" },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.jpeg`,
  foundingDate: String(company.established),
  contactPoint: { "@type": "ContactPoint", telephone: company.phone, contactType: "sales", areaServed: "IN" },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.line1}, ${company.address.line2}`,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
    rel="stylesheet"
  />
  {/* Google Tag Manager */}
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MH664578');`,
    }}
  />
</head>
      <body className="font-sans">
  {/* Google Tag Manager (noscript) */}
  <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-MH664578"
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  </noscript>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
  <Loader />
  <Header />
  <main>{children}</main>
  <Footer />
  <WhatsAppButton />
  <BackToTop />
</body>
    </html>
  );
}
