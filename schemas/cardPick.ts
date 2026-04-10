import { defineType, defineField } from "sanity";

export default defineType({
  name: "cardPick",
  title: "Card Pick",
  type: "document",
  fields: [
    defineField({
      name: "cardName",
      title: "Card Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuer",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Travel", value: "Travel" },
          { title: "Rewards", value: "Rewards" },
          { title: "Beginners", value: "Beginners" },
          { title: "Delta", value: "Delta" },
          { title: "Couples", value: "Couples" },
          { title: "Cash Back", value: "Cash Back" },
          { title: "Business", value: "Business" },
        ],
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "affiliateLink",
      title: "Affiliate Link",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "cardName",
      subtitle: "issuer",
      media: "cardImage",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
