import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "@/components/AdBanner";
import ArticleCard from "@/components/ArticleCard";
import AffiliateButton from "@/components/AffiliateButton";
import {
  getFeaturedArticles,
  getCardPicks,
  type Article,
  type CardPick,
  urlForImage,
} from "@/lib/sanity";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "mySmartCreditCard — The Smarter Way to Travel with Rewards",
  description:
    "Expert guides and honest reviews to help you earn more points, travel smarter, and maximize your credit card rewards.",
  openGraph: {
    title: "mySmartCreditCard — The Smarter Way to Travel with Rewards",
    description:
      "Expert guides and honest reviews to help you earn more points, travel smarter, and maximize your credit card rewards.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Airplane flying over clouds",
      },
    ],
  },
};

const FALLBACK_ARTICLES: Article[] = [
  {
    _id: "1",
    _createdAt: "2024-01-15",
    title: "The Best Travel Credit Cards of 2024: Our Top Picks",
    slug: { current: "best-travel-credit-cards-2024" },
    category: "Travel",
    excerpt:
      "From sign-up bonuses to lounge access, we break down the top travel cards that will transform how you fly.",
    publishedAt: "2024-01-15",
    featured: true,
  },
  {
    _id: "2",
    _createdAt: "2024-01-10",
    title: "How to Maximize Your Chase Ultimate Rewards Points",
    slug: { current: "maximize-chase-ultimate-rewards" },
    category: "Rewards",
    excerpt:
      "Learn the insider strategies to get 2x, 3x, and even 5x value from your Chase points with transfer partners.",
    publishedAt: "2024-01-10",
    featured: true,
  },
  {
    _id: "3",
    _createdAt: "2024-01-05",
    title: "Credit Cards for Beginners: Where to Start",
    slug: { current: "credit-cards-for-beginners" },
    category: "Beginners",
    excerpt:
      "New to travel rewards? Here's the step-by-step guide to building your card portfolio the smart way.",
    publishedAt: "2024-01-05",
    featured: true,
  },
  {
    _id: "4",
    _createdAt: "2023-12-28",
    title: "Delta SkyMiles Cards: Which One Is Right for You?",
    slug: { current: "delta-skymiles-cards-comparison" },
    category: "Delta",
    excerpt:
      "The Gold, Platinum, and Reserve all have their place. Here's how to choose based on how often you fly Delta.",
    publishedAt: "2023-12-28",
    featured: true,
  },
  {
    _id: "5",
    _createdAt: "2023-12-20",
    title: "The Best Credit Cards for Couples Traveling Together",
    slug: { current: "best-credit-cards-for-couples" },
    category: "Couples",
    excerpt:
      "Two people, two cards, one amazing trip. Here's how to pair your credit cards to maximize every dollar you spend together.",
    publishedAt: "2023-12-20",
    featured: true,
  },
  {
    _id: "6",
    _createdAt: "2023-12-15",
    title: "Airport Lounge Access: The Complete Guide",
    slug: { current: "airport-lounge-access-guide" },
    category: "Travel",
    excerpt:
      "Priority Pass, Centurion Lounges, Delta Sky Club — which cards get you in, and is it worth the annual fee?",
    publishedAt: "2023-12-15",
    featured: true,
  },
];

const FALLBACK_CARD_PICKS: CardPick[] = [
  {
    _id: "cp1",
    cardName: "Chase Sapphire Preferred®",
    issuer: "Chase",
    category: "Travel",
    tagline: "60,000 bonus points after $4,000 in purchases in the first 3 months",
    affiliateLink: "#",
    featured: true,
    order: 1,
  },
  {
    _id: "cp2",
    cardName: "American Express Platinum",
    issuer: "American Express",
    category: "Travel",
    tagline: "80,000 Membership Rewards® points after $8,000 in purchases in first 6 months",
    affiliateLink: "#",
    featured: true,
    order: 2,
  },
  {
    _id: "cp3",
    cardName: "Capital One Venture X",
    issuer: "Capital One",
    category: "Travel",
    tagline: "75,000 bonus miles when you spend $4,000 in the first 3 months",
    affiliateLink: "#",
    featured: true,
    order: 3,
  },
  {
    _id: "cp4",
    cardName: "Citi Strata Premier℠",
    issuer: "Citi",
    category: "Rewards",
    tagline: "60,000 bonus points after $4,000 in purchases in the first 3 months",
    affiliateLink: "#",
    featured: false,
    order: 4,
  },
];

export default async function HomePage() {
  let articles: Article[] = [];
  let cardPicks: CardPick[] = [];

  try {
    [articles, cardPicks] = await Promise.all([
      getFeaturedArticles(),
      getCardPicks(),
    ]);
  } catch {
    // Sanity not yet configured — use fallback data
  }

  if (articles.length === 0) articles = FALLBACK_ARTICLES;
  if (cardPicks.length === 0) cardPicks = FALLBACK_CARD_PICKS;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0F1E3D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=700&fit=crop"
            alt="Airplane flying over clouds at sunset"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3D]/80 via-[#0F1E3D]/60 to-[#0F1E3D]/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/20 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-wide uppercase">
                Travel Rewards Expert
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              The Smarter Way to Travel with Rewards
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Expert guides, honest reviews, and insider strategies to help you earn more points, fly for less, and experience the world in style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0F1E3D] font-bold px-8 py-3.5 rounded-lg hover:bg-[#E8C97A] transition-colors shadow-lg"
              >
                Explore Articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/articles?category=Beginners"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                New to Points?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Leaderboard Ad */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <AdBanner zone="leaderboard" />
        </div>
      </div>

      {/* Top Card Picks */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-1">
                Editor&apos;s Picks
              </p>
              <h2
                className="text-3xl font-bold text-[#0F1E3D]"
                style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
              >
                Top Travel Cards Right Now
              </h2>
            </div>
            <Link
              href="/articles?category=Travel"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-[#C9A84C] font-semibold hover:underline"
            >
              View all picks
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
            {cardPicks.slice(0, 4).map((card) => (
              <CardPickCard key={card._id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-1">
                Latest Guides
              </p>
              <h2
                className="text-3xl font-bold text-[#0F1E3D]"
                style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
              >
                Featured Articles
              </h2>
            </div>
            <Link
              href="/articles"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-[#C9A84C] font-semibold hover:underline"
            >
              All articles
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 bg-[#0F1E3D] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#1a3a6e] transition-colors"
            >
              View All Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      <div className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <AdBanner zone="footer" />
        </div>
      </div>
    </>
  );
}

function CardPickCard({ card }: { card: CardPick }) {
  const imageUrl = card.cardImage
    ? urlForImage(card.cardImage).width(400).height(250).fit("crop").url()
    : null;

  return (
    <div className="snap-start shrink-0 w-72 sm:w-auto bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="relative h-40 bg-gradient-to-br from-[#0F1E3D] to-[#1a3a6e] flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={card.cardName}
            fill
            className="object-cover"
            sizes="300px"
          />
        ) : (
          <div className="text-center px-4">
            <div className="w-16 h-10 bg-[#C9A84C]/20 border border-[#C9A84C]/30 rounded-md mx-auto mb-2 flex items-center justify-center">
              <svg className="w-8 h-5 text-[#C9A84C]/60" viewBox="0 0 32 20" fill="currentColor">
                <rect width="32" height="20" rx="3" opacity="0.3" />
                <rect x="2" y="7" width="8" height="6" rx="1" opacity="0.6" />
              </svg>
            </div>
            <p className="text-white/70 text-xs font-medium">{card.issuer}</p>
          </div>
        )}
        {card.featured && (
          <div className="absolute top-2 right-2 bg-[#C9A84C] text-[#0F1E3D] text-xs font-bold px-2 py-0.5 rounded-full">
            Top Pick
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#0F1E3D] text-sm leading-tight mb-1">
          {card.cardName}
        </h3>
        <p className="text-xs text-gray-400 mb-3">{card.issuer}</p>
        <p className="text-xs text-gray-600 leading-relaxed flex-1 mb-4">
          {card.tagline}
        </p>
        <AffiliateButton
          href={card.affiliateLink}
          label="Learn More"
          className="[&>a]:w-full [&>p]:hidden"
        />
      </div>
    </div>
  );
}
