"use client";
import { X } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";
import QuoteForm from "./QuoteForm";

export default function QuotePopup() {
  const { isOpen, close } = useQuoteModal();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10 backdrop-blur-sm sm:items-center"
      onClick={close}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={close}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gray text-brand-dark hover:bg-black/10"
        >
          <X className="h-5 w-5" />
        </button>
        <QuoteForm title="Get a Quote" />
      </div>
    </div>
  );
}
