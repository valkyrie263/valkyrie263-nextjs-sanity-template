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

interface LeftImageSectionProps
  extends CustomSection {
  lang: Locale;
  dictionary: {
    seo_description_default: string;
  };
}

export function LeftImageSection({
  title,
  description,
  image,
  links,
  lang,
  dictionary,
}: LeftImageSectionProps) {
  return (
    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
      <div className="lg:w-1/2 flex justify-center order-2 lg:order-1">
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
              <Image
                src={urlForImage(image).url()}
                alt={altText}
                width={800}
                height={400}
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            );
          })()}
      </div>
      <div className="lg:w-1/2 order-1 lg:order-2">
        {(() => {
          const lang_key = toSanityLocale(
            lang,
          ) as keyof typeof description;
          return (
            <>
              <h2 className="text-3xl font-bold mb-4">
                {
                  title[
                    lang_key as keyof typeof title
                  ]
                }
              </h2>
              <div className="card-text-light mb-6 leading-relaxed">
                {Array.isArray(
                  description?.[lang_key],
                ) &&
                description[lang_key]?.length ? (
                  <PortableText
                    value={description[lang_key]!}
                  />
                ) : null}
              </div>
              <div className="flex flex-wrap gap-4">
                {links?.map((linkItem, idx) => (
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
            </>
          );
        })()}
      </div>
    </div>
  );
}
