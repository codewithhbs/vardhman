"use client";

export default function WhatsAppButton({ whatsapp, name }: { whatsapp: string; name: string }) {
  if (!whatsapp) return null;
  const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Hello ${name}, I would like an enquiry / quotation.`
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="white" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.36.655 4.566 1.796 6.452L4 29l7.72-1.755A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.997 16.987c-.297.836-1.47 1.53-2.404 1.73-.64.135-1.475.243-4.29-.92-3.6-1.49-5.916-5.135-6.098-5.372-.176-.237-1.46-1.944-1.46-3.71 0-1.766.918-2.635 1.245-2.997.297-.328.65-.41.865-.41.216 0 .432.002.62.012.2.01.468-.076.732.558.297.71.986 2.47 1.072 2.65.086.18.144.39.028.626-.116.235-.176.38-.35.585-.174.203-.365.454-.522.61-.174.174-.356.362-.153.71.203.347.905 1.492 1.943 2.417 1.335 1.19 2.46 1.56 2.808 1.735.35.174.554.147.758-.088.203-.235.874-1.02 1.108-1.37.234-.35.468-.29.79-.174.323.116 2.05.966 2.402 1.14.35.176.585.263.67.41.088.148.088.85-.21 1.686Z" />
      </svg>
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-brand-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
