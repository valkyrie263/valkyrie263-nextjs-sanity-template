import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./theme-toggle";
import { Locale } from "@/lib/i18n";
import {
  Link as SanityLink,
  LocalizedString,
} from "@/types/sanity";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { getLocalizedUrl } from "@/lib/utils";

interface HeaderProps {
  lang: Locale;
}

export async function Header({
  lang,
}: HeaderProps) {
  const settings = await getSiteSettings();

  const headerNav = settings?.headerNav || [];

  return (
    <header className="header-bg shadow-md fixed top-0 left-0 right-0 z-20 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link
          href={`/${lang}`}
          className="header-text text-2xl font-bold hover:opacity-80 transition-opacity duration-200"
        >
          Valkyrie263
        </Link>
        <div className="flex items-center space-x-4">
          {headerNav.map((linkItem) =>
            linkItem.children &&
            linkItem.children.length > 0 ? (
              <DropdownMenu key={linkItem._key}>
                <DropdownMenuTrigger asChild>
                  <button className="header-text hover:text-gray-600 dark:hover:text-gray-300 flex items-center rounded-md transition-colors duration-200">
                    {
                      linkItem.label[
                        lang as keyof LocalizedString
                      ]
                    }
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-32 card-bg rounded-md shadow-lg border card-border"
                >
                  {linkItem.children.map(
                    (subLink: SanityLink) => (
                      <DropdownMenuItem
                        key={subLink._key}
                        asChild
                      >
                        <Link
                          href={getLocalizedUrl(
                            subLink.url,
                            lang,
                          )}
                          target={
                            subLink.isExternal
                              ? "_blank"
                              : "_self"
                          }
                          rel={
                            subLink.isExternal
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="block px-4 py-2 text-sm card-text-light dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
                        >
                          {
                            subLink.label[
                              lang as keyof LocalizedString
                            ]
                          }
                        </Link>
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={linkItem._key}
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
                className="header-text hover:text-gray-600 dark:hover:text-gray-300 rounded-md transition-colors duration-200"
              >
                {
                  linkItem.label[
                    lang as keyof LocalizedString
                  ]
                }
              </Link>
            ),
          )}
          <ThemeToggle />
          <LanguageSwitcher currentLang={lang} />
        </div>
      </nav>
    </header>
  );
}
