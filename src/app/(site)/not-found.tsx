import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-[#D4A843] font-semibold text-sm uppercase tracking-wider mb-3">404</p>
      <h1
        className="text-4xl font-bold text-[#1A1A2E] mb-4"
        style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
      >
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#1A1A2E] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1a3a6e] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
