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

interface DefaultSectionProps
  extends CustomSection {
  lang: Locale;
  dictionary: {
    seo_description_default: string;
  };
}

export function DefaultSection({
  title,
  description,
  image,
  links,
  lang,
  dictionary,
}: DefaultSectionProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
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
              {image && (
                <div className="mb-6">
                  <Image
                    src={urlForImage(image).url()}
                    alt={
                      (image.alt?.[
                        lang_key as keyof typeof image.alt
                      ] as string | undefined) ||
                      dictionary.seo_description_default
                    }
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
              )}
              {links && links.length > 0 && (
                <div className="flex flex-wrap gap-4">
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
            </>
          );
        })()}
      </div>
    </div>
  );
}
