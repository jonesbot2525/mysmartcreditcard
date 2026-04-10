import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import AdBanner from "@/components/AdBanner";
import AffiliateButton from "@/components/AffiliateButton";
import ArticleCard from "@/components/ArticleCard";
import SourceCredit from "@/components/SourceCredit";
import {
  getArticleBySlug,
  getRelatedArticles,
  getArticleSlugs,
  urlForImage,
  type Article,
} from "@/lib/sanity";

export const revalidate = 3600;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getArticleSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);
    if (!article) return { title: "Article Not Found" };

    const imageUrl = article.heroImage
      ? urlForImage(article.heroImage).width(1200).height(630).fit("crop").url()
      : undefined;

    return {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      openGraph: {
        title: article.seoTitle ?? article.title,
        description: article.seoDescription ?? article.excerpt,
        type: "article",
        publishedTime: article.publishedAt,
        ...(imageUrl && {
          images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: article.seoTitle ?? article.title,
        description: article.seoDescription ?? article.excerpt,
      },
    };
  } catch {
    return { title: "Article" };
  }
}

const categoryColors: Record<string, string> = {
  Travel: "bg-blue-100 text-blue-800",
  Rewards: "bg-purple-100 text-purple-800",
  Beginners: "bg-green-100 text-green-800",
  Delta: "bg-red-100 text-red-800",
  Couples: "bg-pink-100 text-pink-800",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Portable Text components
const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3>{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul>{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: {
        asset?: { _ref: string };
        alt?: string;
        caption?: string;
      };
    }) => {
      if (!value?.asset) return null;
      const imageUrl = urlForImage(value).width(800).url();
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-gray-400 text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// Split body into before/after first 2 paragraphs for mid-article ad
function splitBody(body: PortableTextBlock[]): [PortableTextBlock[], PortableTextBlock[]] {
  if (!body || body.length <= 2) return [body ?? [], []];
  return [body.slice(0, 2), body.slice(2)];
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article: Article | null = null;
  let related: Article[] = [];

  try {
    article = await getArticleBySlug(slug);
    if (article) {
      related = await getRelatedArticles(article.category, slug);
    }
  } catch {
    // Sanity not configured
  }

  if (!article) {
    notFound();
  }

  const heroImageUrl = article.heroImage
    ? urlForImage(article.heroImage).width(1200).height(540).fit("crop").url()
    : null;

  const badgeClass =
    categoryColors[article.category] ?? "bg-gray-100 text-gray-700";

  const body = (article.body ?? []) as PortableTextBlock[];
  const [bodyBefore, bodyAfter] = splitBody(body);

  return (
    <div className="min-h-screen bg-white">
      {/* Top leaderboard */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <AdBanner zone="leaderboard" />
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          {/* Article content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <Link href="/" className="hover:text-[#D4A843] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/articles" className="hover:text-[#D4A843] transition-colors">Articles</Link>
              <span>/</span>
              <span className="text-gray-600 truncate">{article.title}</span>
            </nav>

            {/* Category + date */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}>
                {article.category}
              </span>
              {article.publishedAt && (
                <span className="text-sm text-gray-400">
                  {formatDate(article.publishedAt)}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg text-gray-500 leading-relaxed mb-8 border-l-4 border-[#D4A843] pl-4">
                {article.excerpt}
              </p>
            )}

            {/* Hero image */}
            {heroImageUrl && (
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 shadow-md">
                <Image
                  src={heroImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
            )}

            {/* Body — first 2 paragraphs */}
            {bodyBefore.length > 0 && (
              <div className="prose-article">
                <PortableText value={bodyBefore} components={ptComponents} />
              </div>
            )}

            {/* Mid-article ad */}
            <div className="my-8 flex justify-center">
              <AdBanner zone="rectangle" />
            </div>

            {/* Body — rest */}
            {bodyAfter.length > 0 && (
              <div className="prose-article">
                <PortableText value={bodyAfter} components={ptComponents} />
              </div>
            )}

            {/* No body — show excerpt as body */}
            {body.length === 0 && article.excerpt && (
              <div className="prose-article">
                <p>{article.excerpt}</p>
                <p className="text-gray-400 italic text-sm mt-4">
                  Full article content will appear here once published in the CMS.
                </p>
              </div>
            )}

            {/* Affiliate CTA */}
            {article.affiliateLink && (
              <div className="mt-10 bg-[#1A1A2E] rounded-xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[#D4A843] text-xs font-semibold uppercase tracking-wider mb-1">
                      Recommended Card
                    </p>
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
                    >
                      {article.affiliateCardName ?? "Top Pick"}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Ready to earn more points on your next trip?
                    </p>
                  </div>
                  <AffiliateButton
                    href={article.affiliateLink}
                    label={article.affiliateLinkLabel ?? "Apply Now"}
                    cardName={article.affiliateCardName}
                    className="shrink-0 [&>p]:text-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Source credit */}
            <SourceCredit
              sourceTitle={article.sourceTitle}
              sourceUrl={article.sourceUrl}
            />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-24 space-y-6">
              <AdBanner zone="rectangle" />

              {/* Related quick links */}
              {related.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                  <h3 className="font-bold text-[#1A1A2E] text-sm uppercase tracking-wider mb-4">
                    Related Articles
                  </h3>
                  <ul className="space-y-3">
                    {related.map((rel) => (
                      <li key={rel._id}>
                        <Link
                          href={`/articles/${rel.slug.current}`}
                          className="text-sm text-gray-600 hover:text-[#D4A843] transition-colors leading-snug block"
                        >
                          {rel.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* More Articles */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-100">
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-6"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              More {article.category} Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 3).map((rel) => (
                <ArticleCard key={rel._id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Footer ad */}
      <div className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <AdBanner zone="footer" />
        </div>
      </div>
    </div>
  );
}
