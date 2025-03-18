import { defineField, defineType } from "sanity";
import localizedPortableTextBlock from "../objects/localizedPortableTextBlock";
import localizedString from "../objects/localizedString";
import docSection from "../objects/docSection";
import link from "../objects/link";

export default defineType({
  name: "docPage",
  title: "Document Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: localizedString.name,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: localizedString.name,
      description:
        "ドキュメントページ固有のSEOタイトル。サイト設定を上書きします。",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: localizedString.name,
      description:
        "ドキュメントページ固有のSEOディスクリプション。サイト設定を上書きします。",
    }),

    defineField({
      name: "sidebarSections",
      title: "Sidebar Sections",
      type: "array",
      of: [{ type: docSection.name }],
      description:
        "ドキュメントサイドバーのセクションとリンク。",
    }),

    defineField({
      name: "mainContentImage",
      title: "Main Content Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: localizedString.name,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "mainContentIntro",
      title: "Main Content Introduction",
      type: localizedString.name,
      description:
        "メインコンテンツエリアの短い導入テキスト。",
    }),

    defineField({
      name: "mainContent",
      title: "Main Content",
      type: localizedPortableTextBlock.name,
      description:
        "ドキュメントページの主要なコンテンツ。",
    }),

    defineField({
      name: "statsTable",
      title: "Stats Table",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: localizedString.name,
              validation: (Rule) =>
                Rule.required(),
            }),
            defineField({
              name: "value",
              type: localizedString.name,
              validation: (Rule) =>
                Rule.required(),
            }),
          ],
        },
      ],
      description:
        "テーブル形式で表示される主要な統計情報。",
    }),

    defineField({
      name: "whyLikeItTitle",
      title: "Why You Might Like It Here Title",
      type: localizedString.name,
    }),

    defineField({
      name: "whyLikeItPoints",
      title: "Why You Might Like It Here Points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "strongText",
              type: localizedString.name,
              validation: (Rule) =>
                Rule.required(),
            }),
            defineField({
              name: "description",
              type: localizedString.name,
              validation: (Rule) =>
                Rule.required(),
            }),
            defineField({
              name: "link",
              type: link.name,
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "drawbacksTitle",
      title: "Honest List of Drawbacks Title",
      type: localizedString.name,
    }),

    defineField({
      name: "drawbacksPoints",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "strongText",
              type: localizedString.name,
              validation: (Rule) =>
                Rule.required(),
            }),
            defineField({
              name: "description",
              type: localizedString.name,
              validation: (Rule) =>
                Rule.required(),
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "prevPageLink",
      title: "Previous Page Link",
      type: link.name,
    }),

    defineField({
      name: "nextPageLink",
      title: "Next Page Link",
      type: link.name,
    }),
  ],
});
