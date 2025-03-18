import { defineField, defineType } from "sanity";
import localizedString from "./localizedString";
import docLink from "./docLink";

export default defineType({
  name: "docSection",
  title: "Document Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: localizedString.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isCollapsible",
      title: "Is Collapsible?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: docLink.name }],
      validation: (Rule) =>
        Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title.ja_JP",
      collapsible: "isCollapsible",
    },
    prepare(selection) {
      const { title, collapsible } = selection;
      return {
        title: title || "Untitled Section",
        subtitle: collapsible
          ? "Collapsible"
          : "Static",
      };
    },
  },
});
