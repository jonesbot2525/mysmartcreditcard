import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Affiliate Disclaimer" },
];

const categories = [
  { href: "/articles?category=Travel", label: "Travel" },
  { href: "/articles?category=Rewards", label: "Rewards" },
  { href: "/articles?category=Beginners", label: "Beginners" },
  { href: "/articles?category=Delta", label: "Delta" },
  { href: "/articles?category=Couples", label: "Couples" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A2E] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <span className="text-[#D4A843] font-bold text-lg">mySmartCreditCard</span>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Expert guides and honest reviews to help you earn more points, travel smarter, and get the most from your credit card rewards.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#D4A843] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-400 hover:text-[#D4A843] transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclosure */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            <strong className="text-gray-400">Affiliate Disclosure:</strong> mySmartCreditCard.com is an independent, advertising-supported publisher. We may earn a commission when you apply for a credit card through links on this site. This compensation may impact how and where products appear on this site. We do not include all available credit card offers. Editorial opinions are our own and have not been reviewed, approved, or endorsed by any advertiser.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-gray-600">
              &copy; {year} mySmartCreditCard.com. All rights reserved.
            </p>
            <Link href="/disclaimer" className="text-xs text-gray-500 hover:text-[#D4A843] transition-colors">
              Full Disclaimer &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
