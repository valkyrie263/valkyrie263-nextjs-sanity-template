import { defineField, defineType } from "sanity";
import localizedString from "./localizedString";
import localizedPortableTextBlock from "./localizedPortableTextBlock";

export default defineType({
  name: "featureCard",
  title: "Feature Card",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Feature card image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: localizedString.name,
          title: "Alternative text",
          description:
            "Important for SEO and accessibility.",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: localizedString.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: localizedPortableTextBlock.name,
      validation: (Rule) => Rule.required(),
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
        title: title || "Untitled Feature Card",
        media,
      };
    },
  },
});
