import type { Metadata } from "next";
import { Suspense } from "react";
import ArticleCard from "@/components/ArticleCard";
import AdBanner from "@/components/AdBanner";
import { getArticles, type Article } from "@/lib/sanity";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Articles — Travel Credit Card Guides & Reviews",
  description:
    "Browse our complete library of travel credit card guides, rewards strategies, and expert reviews. Filter by category to find exactly what you need.",
};

const CATEGORIES = ["All", "Travel", "Rewards", "Beginners", "Delta", "Couples"] as const;

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
      "Two people, two cards, one amazing trip. Pair your cards to maximize every dollar you spend together.",
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
  {
    _id: "7",
    _createdAt: "2023-12-10",
    title: "Amex Membership Rewards: A Complete Transfer Partner Guide",
    slug: { current: "amex-membership-rewards-transfer-partners" },
    category: "Rewards",
    excerpt:
      "Not all transfer partners are created equal. Here's how to pick the right ones for outsized value on your Amex points.",
    publishedAt: "2023-12-10",
    featured: false,
  },
  {
    _id: "8",
    _createdAt: "2023-12-05",
    title: "How to Book International Business Class Using Points",
    slug: { current: "book-international-business-class-with-points" },
    category: "Travel",
    excerpt:
      "Business class doesn't have to cost $8,000. Here's the playbook for using miles to fly flat-bed across the Atlantic.",
    publishedAt: "2023-12-05",
    featured: false,
  },
  {
    _id: "9",
    _createdAt: "2023-11-28",
    title: "The 5/24 Rule Explained: What Chase Cardholders Need to Know",
    slug: { current: "chase-5-24-rule-explained" },
    category: "Beginners",
    excerpt:
      "Chase's infamous 5/24 rule can derail your points strategy. Here's everything you need to know to plan around it.",
    publishedAt: "2023-11-28",
    featured: false,
  },
];

interface ArticlesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { category } = await searchParams;
  const activeCategory = category ?? "All";

  let articles: Article[] = [];

  try {
    articles = await getArticles();
  } catch {
    // Sanity not configured — use fallback
  }

  if (articles.length === 0) articles = FALLBACK_ARTICLES;

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-[#1A1A2E] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4A843] text-sm font-semibold uppercase tracking-wider mb-2">
            Knowledge Base
          </p>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
          >
            Articles &amp; Guides
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Expert strategies to help you earn more points, fly smarter, and get the most from your credit cards.
          </p>
        </div>
      </div>

      {/* Top Leaderboard Ad */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <AdBanner zone="leaderboard" />
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href={cat === "All" ? "/articles" : `/articles?category=${cat}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    activeCategory === cat
                      ? "bg-[#1A1A2E] text-white border-[#1A1A2E]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#D4A843] hover:text-[#D4A843]"
                  }`}
                >
                  {cat}
                </a>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-6">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            </p>

            {/* Articles grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filtered.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No articles found in this category yet.</p>
                <a href="/articles" className="mt-4 inline-block text-[#D4A843] font-semibold hover:underline">
                  View all articles
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-24 space-y-6">
              <AdBanner zone="rectangle" />

              {/* Browse by category */}
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1A1A2E] text-sm uppercase tracking-wider mb-4">
                  Browse by Category
                </h3>
                <ul className="space-y-2">
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => {
                    const count = articles.filter((a) => a.category === cat).length;
                    return (
                      <li key={cat}>
                        <a
                          href={`/articles?category=${cat}`}
                          className="flex items-center justify-between text-sm text-gray-600 hover:text-[#D4A843] transition-colors py-1"
                        >
                          <span>{cat}</span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {count}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer Ad */}
      <div className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <AdBanner zone="footer" />
        </div>
      </div>
    </div>
  );
}
