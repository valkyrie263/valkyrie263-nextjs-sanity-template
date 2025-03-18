import { defineField, defineType } from "sanity";
import localizedString from "./localizedString";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: localizedString.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      description:
        "相対パスまたは絶対パス（http(s)://, mailto:, tel: など）を指定できます。相対パスの場合は自動的に言語パスが付与されます。",
      validation: (Rule) =>
        Rule.required().custom((url) => {
          if (!url) return "URLは必須です";

          if (
            /^(?:[a-zA-Z][a-zA-Z\d+.-]*:|\/\/)/.test(
              url,
            )
          )
            return true;

          if (url.startsWith("/")) return true;

          return true;
        }),
    }),
    defineField({
      name: "isExternal",
      title: "Open in new tab?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "hasIcon",
      title: "Has External Link Icon?",
      type: "boolean",
      initialValue: false,
      description:
        "Set to true if this link should display an external link icon (e.g., for Discord, YouTube, X, GitHub, RSS, Status, ArtMC).",
    }),
  ],
});
