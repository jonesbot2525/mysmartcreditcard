import { createClient } from "@sanity/client";
import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/react";

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder").trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production").trim().toLowerCase() || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

// --- Types ---

export interface SanitySlug {
  current: string;
}

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Article {
  _id: string;
  _createdAt: string;
  title: string;
  slug: SanitySlug;
  category: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  heroImage?: SanityImageAsset;
  publishedAt?: string;
  affiliateLink?: string;
  affiliateLinkLabel?: string;
  affiliateCardName?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CardPick {
  _id: string;
  cardName: string;
  issuer: string;
  category?: string;
  tagline: string;
  affiliateLink: string;
  cardImage?: SanityImageAsset;
  featured?: boolean;
  order?: number;
}

// --- Queries ---

export const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  category,
  excerpt,
  heroImage,
  publishedAt,
  featured
}`;

export const FEATURED_ARTICLES_QUERY = `*[_type == "article" && featured == true] | order(publishedAt desc)[0...6] {
  _id,
  _createdAt,
  title,
  slug,
  category,
  excerpt,
  heroImage,
  publishedAt,
  featured
}`;

export const ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  slug,
  category,
  excerpt,
  body,
  heroImage,
  publishedAt,
  affiliateLink,
  affiliateLinkLabel,
  affiliateCardName,
  sourceTitle,
  sourceUrl,
  seoTitle,
  seoDescription
}`;

export const RELATED_ARTICLES_QUERY = `*[_type == "article" && category == $category && slug.current != $slug] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  category,
  excerpt,
  heroImage,
  publishedAt
}`;

export const CARD_PICKS_QUERY = `*[_type == "cardPick"] | order(order asc) {
  _id,
  cardName,
  issuer,
  category,
  tagline,
  affiliateLink,
  cardImage,
  featured,
  order
}`;

export const ARTICLE_SLUGS_QUERY = `*[_type == "article"]{ "slug": slug.current }`;

// --- Fetch helpers ---

export async function getArticles(): Promise<Article[]> {
  return client.fetch(ARTICLES_QUERY);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return client.fetch(FEATURED_ARTICLES_QUERY);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
}

export async function getRelatedArticles(
  category: string,
  slug: string
): Promise<Article[]> {
  return client.fetch(RELATED_ARTICLES_QUERY, { category, slug });
}

export async function getCardPicks(): Promise<CardPick[]> {
  return client.fetch(CARD_PICKS_QUERY);
}

export async function getArticleSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(ARTICLE_SLUGS_QUERY);
}
