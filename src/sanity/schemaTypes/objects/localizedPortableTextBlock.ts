import { defineField, defineType } from "sanity";
import richText from "./richText";

export default defineType({
  name: "localizedPortableTextBlock",
  title: "Localized Portable Text Block",
  type: "object",
  fields: [
    defineField({
      name: "ja_JP",
      title: "Japanese",
      type: richText.name,
    }),
    defineField({
      name: "en_US",
      title: "English",
      type: richText.name,
    }),
    defineField({
      name: "ko_KR",
      title: "Korean",
      type: richText.name,
    }),
    defineField({
      name: "zh_TW",
      title: "Chinese (Taiwan)",
      type: richText.name,
    }),
  ],
});
