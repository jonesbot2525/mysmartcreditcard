interface AdBannerProps {
  zone: "leaderboard" | "rectangle" | "footer";
  className?: string;
}

const zoneConfig = {
  leaderboard: {
    width: 728,
    height: 90,
    label: "Advertisement — 728×90",
    responsive: "w-full max-w-[728px] h-[90px]",
  },
  rectangle: {
    width: 300,
    height: 250,
    label: "Advertisement — 300×250",
    responsive: "w-[300px] h-[250px]",
  },
  footer: {
    width: 728,
    height: 90,
    label: "Advertisement — 728×90",
    responsive: "w-full max-w-[728px] h-[90px]",
  },
};

export default function AdBanner({ zone, className = "" }: AdBannerProps) {
  const config = zoneConfig[zone];

  return (
    <div
      className={`mx-auto flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded ${config.responsive} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <div className="text-center">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Advertisement
        </p>
        <p className="text-xs text-gray-300 mt-0.5">
          {config.width}×{config.height}
        </p>
      </div>
    </div>
  );
}
