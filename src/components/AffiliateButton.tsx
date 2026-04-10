interface AffiliateButtonProps {
  href: string;
  label: string;
  cardName?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function AffiliateButton({
  href,
  label,
  cardName,
  variant = "primary",
  className = "",
}: AffiliateButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg px-6 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles = {
    primary:
      "bg-[#C9A84C] text-[#0F1E3D] hover:bg-[#E8C97A] focus:ring-[#C9A84C] shadow-md hover:shadow-lg",
    secondary:
      "border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0F1E3D] focus:ring-[#C9A84C]",
  };

  return (
    <div className={`${className}`}>
      {cardName && (
        <p className="text-xs text-gray-500 mb-2 text-center">{cardName}</p>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`${base} ${styles[variant]}`}
        aria-label={`${label}${cardName ? ` for ${cardName}` : ""} (opens in new tab)`}
      >
        {label}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
