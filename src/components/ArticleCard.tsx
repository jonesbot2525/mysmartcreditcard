import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity";

interface ArticleCardProps {
  article: Article;
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
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.heroImage
    ? urlForImage(article.heroImage).width(600).height(340).fit("crop").url()
    : null;

  const badgeClass =
    categoryColors[article.category] ?? "bg-gray-100 text-gray-700";

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image */}
      <Link href={`/articles/${article.slug.current}`} className="block relative aspect-[16/9] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1E3D] to-[#1a3a6e] flex items-center justify-center">
            <svg className="w-12 h-12 text-[#C9A84C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
            {article.category}
          </span>
          {article.publishedAt && (
            <span className="text-xs text-gray-400">
              {formatDate(article.publishedAt)}
            </span>
          )}
        </div>

        <Link href={`/articles/${article.slug.current}`} className="flex-1">
          <h3 className="font-bold text-[#0F1E3D] text-base leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </Link>

        <Link
          href={`/articles/${article.slug.current}`}
          className="mt-4 text-sm font-semibold text-[#C9A84C] hover:text-[#0F1E3D] transition-colors flex items-center gap-1"
        >
          Read more
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
