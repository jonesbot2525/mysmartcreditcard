import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "mySmartCreditCard",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Articles")
              .child(
                S.documentList()
                  .title("Articles")
                  .filter('_type == "article"')
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),
            S.listItem()
              .title("Top Card Picks")
              .child(
                S.documentList()
                  .title("Top Card Picks")
                  .filter('_type == "cardPick"')
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
          ]),
    }),
    visionTool(),
  ],
});
