"use client";
import { company } from "@/lib/company";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const href = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Hello Vardhman Packaging, I would like an enquiry / quotation.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-brand-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
