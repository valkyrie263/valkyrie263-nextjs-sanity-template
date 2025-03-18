import { defineField, defineType } from "sanity";
import localizedString from "./localizedString";

export default defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
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
      name: "titleLine1",
      title: "Title Line 1",
      type: localizedString.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleLine2",
      title: "Title Line 2",
      type: localizedString.name,
    }),
    defineField({
      name: "buttonUrl",
      title: "Button Link",
      type: "link",
      description:
        "ボタンのリンク。相対パスまたは絶対パス、外部/内部リンク、ラベル等を指定可能。",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "titleLine1.ja_JP",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || "Untitled Slide",
        media: media,
      };
    },
  },
});
