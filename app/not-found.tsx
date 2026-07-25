import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-brand-radial">
      <div className="dotgrid absolute inset-0 opacity-50" />
      <div className="container-x relative text-center">
        <div className="mx-auto max-w-lg">
          <div className="font-display text-[7rem] font-extrabold leading-none">
            <span className="bg-brand-gradient bg-clip-text text-transparent">404</span>
          </div>
          <h1 className="h-title mt-2 text-3xl">Page not found</h1>
          <p className="mt-4 text-black/60">The page you're looking for doesn't exist or may have been moved. Let's get you back on track.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary"><Home className="h-4 w-4" /> Back to Home</Link>
            <Link href="/products" className="btn-outline"><Search className="h-4 w-4" /> Browse Products</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
