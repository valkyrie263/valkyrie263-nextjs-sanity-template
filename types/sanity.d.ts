import { Image as SanityImage } from "sanity";

export type Locale =
  | "ja-JP"
  | "en-US"
  | "ko-KR"
  | "zh-TW";

export type LocalizedString = {
  [key in
    | "ja-JP"
    | "en-US"
    | "ko-KR"
    | "zh-TW"]?: string;
};

export interface Link {
  _key: string;
  label: LocalizedString;
  url: string;
  isExternal?: boolean;
  hasIcon?: boolean;
  children?: Link[];
}

export interface HeroSlide {
  _key: string;
  image: SanityImage;
  titleLine1: LocalizedString;
  titleLine2?: LocalizedString;
  buttonLabel: LocalizedString;
  buttonUrl: string;
}

export interface FeatureCard {
  _key: string;
  icon: string;
  iconColor: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface DocLink {
  _key: string;
  label: LocalizedString;
  slug: { current: string };
  isExternal?: boolean;
  externalUrl?: string;
  children?: DocLink[];
}

export interface DocSection {
  _key: string;
  title: LocalizedString;
  isCollapsible?: boolean;
  links: DocLink[];
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  siteTitle: LocalizedString;
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  headerNav?: Link[];
  footerNavTutorialsTitle?: LocalizedString;
  footerNavTutorials?: Link[];
  footerNavCommunityTitle?: LocalizedString;
  footerNavCommunity?: Link[];
  footerNavExtrasTitle?: LocalizedString;
  footerNavExtras?: Link[];
  copyrightText?: LocalizedString;
}

export interface HomePage {
  _id: string;
  _type: "homePage";
  title: LocalizedString;
  slug: { current: string };
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  heroSlides: HeroSlide[];
  joinServerButtonLabel: LocalizedString;
  joinServerButtonUrl: string;
  differencesSectionTitle: LocalizedString;
  featureCards: FeatureCard[];
  earthMapSectionTitle: LocalizedString;
  earthMapDescription: LocalizedString;
  earthMapImage: SanityImage;
  earthMapLinks?: Link[];
  protectionSectionTitle: LocalizedString;
  protectionDescription: LocalizedString;
  protectionPoints: LocalizedString[];
  protectionImage: SanityImage;
}

export interface DocPage {
  _id: string;
  _type: "docPage";
  title: LocalizedString;
  slug: { current: string };
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  sidebarSections?: DocSection[];
  mainContentImage?: SanityImage;
  mainContentIntro?: LocalizedString;
  statsTable?: {
    label: LocalizedString;
    value: LocalizedString;
  }[];
  whyLikeItTitle?: LocalizedString;
  whyLikeItPoints?: {
    strongText: LocalizedString;
    description: LocalizedString;
    link?: Link;
  }[];
  drawbacksTitle?: LocalizedString;
  drawbacksPoints?: {
    strongText: LocalizedString;
    description: LocalizedString;
  }[];
  prevPageLink?: Link;
  nextPageLink?: Link;
}
