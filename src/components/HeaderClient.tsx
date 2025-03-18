"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Locale } from "@/lib/i18n";
import {
  Link as SanityLink,
  LocalizedString,
} from "@/types/sanity";
import { getLocalizedUrl } from "@/lib/utils";

interface HeaderClientProps {
  headerNav: SanityLink[];
  lang: Locale;
}

/**
 * ヘッダーナビゲーションのクライアントサイド部分をレンダリングするClient Component。
 * ドロップダウンメニューのようなインタラクティブな要素をカプセル化し、
 * Server ComponentであるHeaderから分離することで、Client Componentの範囲を最小化します。
 * @param headerNav ヘッダーナビゲーションのリンクデータ
 * @param lang 現在のロケール
 */
export function HeaderClient({
  headerNav,
  lang,
}: HeaderClientProps) {
  return (
    <>
      {headerNav.map((linkItem) =>
        linkItem.children &&
        linkItem.children.length > 0 ? (
          // ドロップダウンメニューを持つリンクアイテム
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
          // 通常のリンクアイテム
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
    </>
  );
}
