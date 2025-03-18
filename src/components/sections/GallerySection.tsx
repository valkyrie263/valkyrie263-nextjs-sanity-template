import { CustomSection } from "@/types/sanity";
import { Locale } from "@/lib/i18n";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  getLocalizedUrl,
  toSanityLocale,
} from "@/lib/utils";

interface GallerySectionProps
  extends CustomSection {
  lang: Locale;
  dictionary: {
    seo_description_default: string;
  };
}

export function GallerySection({
  title,
  description,
  image,
  links,
  lang,
  dictionary,
}: GallerySectionProps) {
  const lang_key = toSanityLocale(
    lang,
  ) as keyof typeof description;
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        {(() => {
          return (
            <>
              <h2 className="text-3xl font-bold mb-4">
                {
                  title[
                    lang_key as keyof typeof title
                  ]
                }
              </h2>
              <div className="card-text-light mb-6 leading-relaxed max-w-2xl mx-auto">
                {Array.isArray(
                  description?.[lang_key],
                ) &&
                description[lang_key]?.length ? (
                  <PortableText
                    value={description[lang_key]!}
                  />
                ) : null}
              </div>
            </>
          );
        })()}
      </div>
      {image &&
        (() => {
          const lang_key = toSanityLocale(
            lang,
          ) as keyof NonNullable<
            typeof image.alt
          >;
          const altText =
            image.alt?.[lang_key] ??
            dictionary.seo_description_default;
          return (
            <div className="flex justify-center mb-8">
              <Image
                src={urlForImage(image).url()}
                alt={altText}
                width={1200}
                height={600}
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          );
        })()}
      {links && links.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {links.map((linkItem, idx) => (
            <Link
              key={idx}
              href={getLocalizedUrl(
                linkItem.url,
                lang,
              )}
              target={
                linkItem.isExternal
                  ? "_blank"
                  : "_self"
              }
              rel={
                linkItem.isExternal
                  ? "noopener noreferrer"
                  : undefined
              }
              className="text-blue-600 hover:underline transition-colors duration-200"
            >
              {
                linkItem.label[
                  lang_key as keyof typeof linkItem.label
                ]
              }
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
