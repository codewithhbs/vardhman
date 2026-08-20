"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CallButton from "@/components/CallButton";
import BackToTop from "@/components/BackToTop";
import QuotePopup from "@/components/QuotePopup";

export default function SiteChrome({
  company,
  categories,
  children,
}: {
  company: any;
  categories: any;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header company={company} categories={categories} />
      <main>{children}</main>
      <Footer company={company} categories={categories} />
      <WhatsAppButton whatsapp={company.whatsapp} name={company.name} />
      <CallButton phoneRaw={company.phoneRaw} />
      <BackToTop />
      <QuotePopup />
    </>
  );
}
