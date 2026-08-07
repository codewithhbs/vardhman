import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone, Home as HomeIcon } from "lucide-react";
import { company } from "@/lib/company";

export const metadata = {
  title: "Thank You",
  description: "Your enquiry has been received. Our team will get back to you shortly.",
};

export default function ThankYou() {
  return (
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
  );
}
