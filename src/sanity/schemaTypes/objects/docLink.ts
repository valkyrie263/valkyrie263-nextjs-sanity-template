import { defineField, defineType } from "sanity";
import localizedString from "./localizedString";

export default defineType({
  name: "docLink",
  title: "Document Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: localizedString.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "label.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isExternal",
      title: "Is External Link?",
      type: "boolean",
      initialValue: false,
      description:
        "If true, this link will point to an external URL instead of an internal document page.",
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => !parent?.isExternal,
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }).custom((url, context) => {
          const parent = context.parent as {
            isExternal?: boolean;
          };
          if (parent?.isExternal && !url) {
            return "External URL is required for external links.";
          }
          return true;
        }),
    }),
    defineField({
      name: "children",
      title: "Sub-links",
      type: "array",
      of: [{ type: "docLink" }],
      hidden: ({ parent }) => parent?.isExternal,
    }),
  ],
  preview: {
    select: {
      title: "label.en",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled",
        subtitle: subtitle ? `/${subtitle}` : "",
      };
    },
  },
});
