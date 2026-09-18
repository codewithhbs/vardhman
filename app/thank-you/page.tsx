import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, ArrowRight, Phone, Home as HomeIcon } from "lucide-react";
import { getCompany } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Thank You",
  description: "Your enquiry has been received. Our team will get back to you shortly.",
};

export default async function ThankYou() {
  const company = await getCompany();
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm-thankyou" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MH664578');`}
      </Script>
      {/* End Google Tag Manager */}

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MH664578"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}

      <section className="section">
        <div className="container-x flex flex-col items-center py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            Thank you!
          </h1>
          <p className="mt-3 max-w-md text-black/60">
            Your enquiry has been sent successfully. Our team will get back to you shortly.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn-primary">
              <HomeIcon className="h-4 w-4" /> Back to Home
            </Link>
            <Link href="/products" className="btn-outline">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <a href={`tel:${company.phoneRaw}`} className="mt-6 flex items-center gap-2 text-sm text-black/50 hover:text-brand-orange">
            <Phone className="h-4 w-4" /> Or call us at {company.phone}
          </a>
        </div>
      </section>
    </>
  );
}