import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import {
  SiteSettings,
  HomePage,
  DocPage,
  Image as SanityImage,
} from "@/types/sanity.d";

export const client = createClient({
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-03-20",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source).url();
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0]{
    siteTitle,
    seoTitle,
    seoDescription,
    headerNav[]{
      _key,
      label,
      url,
      isExternal,
      hasIcon,
      children[]{
        _key,
        label,
        url,
        isExternal,
        hasIcon
      }
    },
    footerNavTutorialsTitle,
    footerNavTutorials[]{
      _key,
      label,
      url,
      isExternal,
      hasIcon
    },
    footerNavCommunityTitle,
    footerNavCommunity[]{
      _key,
      label,
      url,
      isExternal,
      hasIcon
    },
    footerNavExtrasTitle,
    footerNavExtras[]{
      _key,
      label,
      url,
      isExternal,
      hasIcon
    },
    copyrightText
  }`;
  return client.fetch(query);
}

export async function getHomePage(): Promise<HomePage | null> {
  const query = `*[_type == "homePage"][0]{
    title,
    slug,
    seoTitle,
    seoDescription,
    heroSlides[]{
      _key,
      image{
        asset->{
          _id,
          url
        },
        alt
      },
      titleLine1,
      titleLine2,
      buttonLabel,
      buttonUrl
    },
    joinServerButtonLabel,
    joinServerButtonUrl,
    differencesSectionTitle,
    featureCards[]{
      _key,
      image{
        asset->{
          _id,
          url
        },
        alt
      },
      title,
      description
    },
    sections[]{
      sectionType,
      title,
      description{
        ja_JP,
        en_US,
        ko_KR,
        zh_TW
      },
      image{
        asset->{
          _id,
          url
        },
        alt
      },
      links[]{
        _key,
        label,
        url,
        isExternal,
        hasIcon
      }
    }
  }`;
  return client.fetch(query);
}

export async function getDocPage(
  slug: string,
): Promise<DocPage | null> {
  const query = `*[_type == "docPage" && slug.current == $slug][0]{
    title,
    slug,
    seoTitle,
    seoDescription,
    sidebarSections[]{
      _key,
      title,
      isCollapsible,
      links[]{
        _key,
        label,
        slug,
        isExternal,
        externalUrl,
        children[]{
          _key,
          label,
          slug,
          isExternal,
          externalUrl
        }
      }
    },
    mainContentImage{
      asset->{
        _id,
        url
      },
      alt
    },
    mainContentIntro,
    mainContent,
    statsTable[]{
      label,
      value
    },
    whyLikeItTitle,
    whyLikeItPoints[]{
      strongText,
      description,
      link{
        _key,
        label,
        url,
        isExternal,
        hasIcon
      }
    },
    drawbacksTitle,
    drawbacksPoints[]{
      strongText,
      description
    },
    prevPageLink{
      _key,
      label,
      url,
      isExternal,
      hasIcon
    },
    nextPageLink{
      _key,
      label,
      url,
      isExternal,
      hasIcon
    }
  }`;
  return client.fetch(query, { slug });
}

export async function getAllDocPageSlugs(): Promise<
  Array<{ slug: string }>
> {
  const query = `*[_type == "docPage"]{
    "slug": slug.current
  }`;

  const slugs = await client.fetch(query);
  return slugs;
}
