import {
  Image as SanityBaseImage,
  PortableTextBlock as SanityBasePortableTextBlock,
} from "sanity";

export interface LocalizedString {
  [key: string]: string | undefined;
}

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
  imageUrl: string;
  titleLine1: LocalizedString;
  titleLine2?: LocalizedString;
  buttonUrl: Link;
}

export interface FeatureCard {
  _key: string;
  image: Image;
  title: LocalizedString;
  description: LocalizedPortableTextBlock;
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
  joinServerButtonUrl: Link;
  differencesSectionTitle: LocalizedString;
  featureCards: FeatureCard[];
  sections?: CustomSection[];
}

export interface DocPage {
  _id: string;
  _type: "docPage";
  title: LocalizedString;
  slug: { current: string };
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  sidebarSections?: DocSection[];
  mainContentImage?: Image;
  mainContentIntro?: LocalizedString;
  mainContent?: PortableTextBlock[] | undefined;
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

export interface PortableTextBlock
  extends SanityBasePortableTextBlock {
  _type: "block";
  children?: PortableTextChild[];
}

export type Block = PortableTextBlock;

export interface PortableTextChild {
  _key: string;
  _type: string;
  marks?: string[];
  text?: LocalizedString;
}

export type Image = SanityBaseImage & {
  asset: {
    _ref: string;
    _type: "reference";
    url: string;
  };
  alt?: LocalizedString;
};

export interface PortableTextObject {
  _key?: string;
  _type: string;
}

export interface CodeBlock {
  _key: string;
  _type: "codeBlock";
  code: string;
  language?: string;
  filename?: string;
}

export interface TableCell {
  _key: string;
  _type: "block";
  children: PortableTextBlock["children"];
}

export interface TableRow {
  _key: string;
  _type: "tableRow";
  cells: TableCell[];
}

export interface TableBlock {
  _key: string;
  _type: "tableBlock";
  rows: TableRow[];
}

export interface LinkMark {
  _key: string;
  _type: "link";
  href: string;
}

export interface LocalizedPortableTextBlock {
  ja_JP?: PortableTextBlock[];
  en_US?: PortableTextBlock[];
  ko_KR?: PortableTextBlock[];
  zh_TW?: PortableTextBlock[];
}

export interface CustomSection {
  sectionType: string;
  title: LocalizedString;
  description: LocalizedPortableTextBlock;
  image?: Image;
  links?: Link[];
}
