import { defineField, defineType } from "sanity";
import localizedString from "../objects/localizedString";
import link from "../objects/link";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: localizedString.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: localizedString.name,
      description:
        "Default SEO title for the site.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: localizedString.name,
      description:
        "Default SEO description for the site.",
    }),
    defineField({
      name: "headerNav",
      title: "Header Navigation",
      type: "array",
      of: [{ type: link.name }],
      description:
        "Links displayed in the main header navigation.",
    }),
    defineField({
      name: "footerNavTutorialsTitle",
      title: "Footer Tutorials Section Title",
      type: localizedString.name,
    }),
    defineField({
      name: "footerNavTutorials",
      title: "Footer Tutorials Links",
      type: "array",
      of: [{ type: link.name }],
    }),
    defineField({
      name: "footerNavCommunityTitle",
      title: "Footer Community Section Title",
      type: localizedString.name,
    }),
    defineField({
      name: "footerNavCommunity",
      title: "Footer Community Links",
      type: "array",
      of: [{ type: link.name }],
    }),
    defineField({
      name: "footerNavExtrasTitle",
      title: "Footer Extras Section Title",
      type: localizedString.name,
    }),
    defineField({
      name: "footerNavExtras",
      title: "Footer Extras Links",
      type: "array",
      of: [{ type: link.name }],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: localizedString.name,
      description:
        'e.g., "&copy; 2025 Valkyrie263. Built with Love"',
    }),
  ],
});
