import { defineField, defineType } from "sanity";
import localizedString from "./localizedString";

export default defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: [
                      "http",
                      "https",
                      "mailto",
                      "tel",
                    ],
                  }),
              }),
              defineField({
                name: "isExternal",
                title: "Open in new tab?",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    },
    defineField({
      name: "image",
      title: "Image",
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
  ],
});
