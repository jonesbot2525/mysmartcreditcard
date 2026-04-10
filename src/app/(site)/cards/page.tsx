import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import AffiliateButton from "@/components/AffiliateButton";
import { getCardPicks, type CardPick } from "@/lib/sanity";
import { FALLBACK_CARD_PICKS } from "@/lib/fallback-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Credit Card Offers — Top Travel Cards Compared",
  description:
    "Compare the best travel credit cards available today. Find the right card for flights, hotels, dining, and everyday spending.",
};

const categoryColors: Record<string, string> = {
  Travel:    "bg-blue-100 text-blue-700",
  Rewards:   "bg-purple-100 text-purple-700",
  Beginners: "bg-green-100 text-green-700",
  Delta:     "bg-red-100 text-red-700",
  Couples:   "bg-pink-100 text-pink-700",
};

const issuerColors: Record<string, string> = {
  Chase:              "border-l-[#0052B4]",
  "American Express": "border-l-[#007BC1]",
  "Capital One":      "border-l-[#D4161C]",
  Citibank:           "border-l-[#003A8C]",
  Discover:           "border-l-[#F76D01]",
};

export default async function CardsPage() {
  let cards: CardPick[] = [];

  try {
    cards = await getCardPicks();
  } catch { /* Sanity not configured */ }

  if (cards.length === 0) cards = FALLBACK_CARD_PICKS as CardPick[];

  const featured = cards.filter((c) => c.featured);
  const rest = cards.filter((c) => !c.featured);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-[#1A1A2E] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4A843] text-sm font-semibold uppercase tracking-wider mb-2">
            Card Offers
          </p>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
          >
            Best Credit Card Offers
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Our top picks for travel rewards, cash back, and sign-up bonuses. Updated regularly with the latest offers.
          </p>
        </div>
      </div>

      {/* Top leaderboard ad */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <AdBanner zone="leaderboard" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Affiliate disclosure */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-10 text-xs text-amber-800">
          <strong>Advertiser Disclosure:</strong> Some links on this page are affiliate links. We may earn a commission if you apply and are approved for a card. This does not affect our editorial opinions.{" "}
          <Link href="/disclaimer" className="underline hover:text-amber-900">Full disclaimer →</Link>
        </div>

        {/* Featured cards */}
        {featured.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-6"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              ⭐ Editor&apos;s Top Picks
            </h2>
            <div className="space-y-4">
              {featured.map((card) => (
                <CardRow key={card._id} card={card} featured />
              ))}
            </div>
          </section>
        )}

        {/* All other cards */}
        {rest.length > 0 && (
          <section>
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-6"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              More Great Cards
            </h2>
            <div className="space-y-4">
              {rest.map((card) => (
                <CardRow key={card._id} card={card} />
              ))}
            </div>
          </section>
        )}

        {/* Mid-page ad */}
        <div className="my-12 flex justify-center">
          <AdBanner zone="rectangle" />
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#1A1A2E] rounded-2xl p-8 text-white text-center mt-8">
          <h3
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
          >
            Not sure which card is right for you?
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Read our in-depth guides to learn which cards work best for your travel style, spending habits, and goals.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 bg-[#2D7DD2] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#1A5FA8] transition-colors"
          >
            Browse Articles →
          </Link>
        </div>
      </div>

      {/* Footer ad */}
      <div className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <AdBanner zone="footer" />
        </div>
      </div>
    </div>
  );
}

function CardRow({ card, featured = false }: { card: CardPick; featured?: boolean }) {
  const borderColor = issuerColors[card.issuer] ?? "border-l-[#2D7DD2]";
  const catColor = categoryColors[card.category ?? "Travel"] ?? "bg-gray-100 text-gray-700";

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow border-l-4 ${borderColor} p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6`}
    >
      {/* Card info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-bold text-[#1A1A2E] text-lg leading-snug">{card.cardName}</h3>
          {featured && (
            <span className="text-xs bg-[#D4A843] text-[#1A1A2E] font-bold px-2 py-0.5 rounded-full">
              Top Pick
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-400 font-medium">{card.issuer}</span>
          {card.category && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColor}`}>
              {card.category}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{card.tagline}</p>
      </div>

      {/* CTA */}
      <div className="shrink-0">
        <AffiliateButton
          href={card.affiliateLink ?? "#"}
          label="Apply Now"
          cardName={card.cardName}
        />
      </div>
    </div>
  );
}
