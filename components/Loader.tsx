"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 700);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity">
      <div className="animate-floaty">
        <Image src="/images/logo.jpeg" alt="Vardhman Packaging" width={72} height={72} className="h-16 w-auto" priority />
      </div>
    </div>
  );
}
