import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";
import { LocalizedString } from "@/types/sanity";
import { ExternalLink } from "lucide-react";
import { getLocalizedUrl } from "@/lib/utils";

interface FooterProps {
  lang: Locale;
}

export async function Footer({
  lang,
}: FooterProps) {
  const settings = await getSiteSettings();

  const footerNavTutorials =
    settings?.footerNavTutorials || [];
  const footerNavCommunity =
    settings?.footerNavCommunity || [];
  const footerNavExtras =
    settings?.footerNavExtras || [];

  return (
    <footer className="footer-bg footer-text py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-bold text-lg mb-4">
            {
              settings?.footerNavTutorialsTitle?.[
                lang as keyof LocalizedString
              ]
            }
          </h3>
          <ul className="space-y-2">
            {footerNavTutorials.map(
              (linkItem) => (
                <li key={linkItem._key}>
                  <Link
                    href={linkItem.url}
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
                    className="footer-link-text hover:text-blue-400 flex items-center transition-colors duration-200"
                  >
                    {
                      linkItem.label[
                        lang as keyof LocalizedString
                      ]
                    }
                    {linkItem.hasIcon && (
                      <ExternalLink className="ml-1 h-4 w-4" />
                    )}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">
            {
              settings?.footerNavCommunityTitle?.[
                lang as keyof LocalizedString
              ]
            }
          </h3>
          <ul className="space-y-2">
            {footerNavCommunity.map(
              (linkItem) => (
                <li key={linkItem._key}>
                  <Link
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
                    className="footer-link-text hover:text-blue-400 flex items-center transition-colors duration-200"
                  >
                    {
                      linkItem.label[
                        lang as keyof LocalizedString
                      ]
                    }
                    {linkItem.hasIcon && (
                      <ExternalLink className="ml-1 h-4 w-4" />
                    )}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">
            {
              settings?.footerNavExtrasTitle?.[
                lang as keyof LocalizedString
              ]
            }
          </h3>
          <ul className="space-y-2">
            {footerNavExtras.map((linkItem) => (
              <li key={linkItem._key}>
                <Link
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
                  className="footer-link-text hover:text-blue-400 flex items-center transition-colors duration-200"
                >
                  {
                    linkItem.label[
                      lang as keyof LocalizedString
                    ]
                  }
                  {linkItem.hasIcon && (
                    <ExternalLink className="ml-1 h-4 w-4" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center mt-8 text-sm">
        <p className="footer-text">
          {
            settings?.copyrightText?.[
              lang as keyof LocalizedString
            ]
          }
        </p>
      </div>
    </footer>
  );
}
