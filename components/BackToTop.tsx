"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-brand-orange shadow-card transition hover:bg-brand-orange hover:text-white"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
