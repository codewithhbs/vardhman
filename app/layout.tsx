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
      </head>
      <body className="font-sans">
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
