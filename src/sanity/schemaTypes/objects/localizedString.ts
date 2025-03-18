import { defineField, defineType } from "sanity";

export default defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({
      name: "ja_JP",
      title: "Japanese",
      type: "string",
    }),
    defineField({
      name: "en_US",
      title: "English",
      type: "string",
    }),
    defineField({
      name: "ko_KR",
      title: "Korean",
      type: "string",
    }),
    defineField({
      name: "zh_TW",
      title: "Chinese (Taiwan)",
      type: "string",
    }),
  ],
});
