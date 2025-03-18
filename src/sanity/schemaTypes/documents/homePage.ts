import { defineField, defineType } from "sanity";
import localizedString from "../objects/localizedString";
import heroSlide from "../objects/heroSlide";
import featureCard from "../objects/featureCard";
import link from "../objects/link";
import localizedPortableTextBlock from "../objects/localizedPortableTextBlock";

export default defineType({
  name: "homePage",
  title: "Home Page",
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
        "Specific SEO title for the home page. Overrides site settings.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: localizedString.name,
      description:
        "Specific SEO description for the home page. Overrides site settings.",
    }),
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [{ type: heroSlide.name }],
      validation: (Rule) =>
        Rule.required().min(1),
    }),
    defineField({
      name: "joinServerButtonUrl",
      title: "Join Server Button Link",
      type: "link",
      description:
        "ボタンのリンク。相対パスまたは絶対パス、外部/内部リンク、ラベル等を指定可能。",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "differencesSectionTitle",
      title: "Differences Section Title",
      type: localizedString.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featureCards",
      title: "Feature Cards",
      type: "array",
      of: [{ type: featureCard.name }],
      validation: (Rule) =>
        Rule.required().min(1),
    }),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "sectionType",
              title: "Section Type",
              type: "string",
              options: {
                list: [
                  {
                    title: "Right Image Section",
                    value: "rightImage",
                  },
                  {
                    title: "Left Image Section",
                    value: "leftImage",
                  },
                  {
                    title: "Gallery Section",
                    value: "gallery",
                  },
                  {
                    title: "Default Section",
                    value: "default",
                  },
                ],
              },
              validation: (Rule) =>
                Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: localizedString.name,
            }),
            defineField({
              name: "description",
              title: "Description",
              type: localizedPortableTextBlock.name,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alternative Text",
                  type: localizedString.name,
                }),
              ],
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: link.name }],
            }),
          ],
          preview: {
            select: {
              title: "title.ja_JP",
              media: "image",
            },
            prepare(selection) {
              const { title, media } = selection;
              return {
                title:
                  title || "Untitled Section",
                media: media,
              };
            },
          },
        },
      ],
      description: "汎用的なセクション",
    }),
  ],
});
