"use client";
import { company } from "@/lib/company";
import { Phone } from "lucide-react";

export default function CallButton() {
  return (
    <a
      href={`tel:${company.phoneRaw}`}
      aria-label="Call us"
      className="group fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg transition-transform hover:scale-110"
    >
      <Phone className="h-7 w-7" fill="white" />
      <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-full bg-brand-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        Call us
      </span>
    </a>
  );
}
