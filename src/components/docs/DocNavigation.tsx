import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { getLocalizedUrl } from "@/lib/utils";
import { Dictionary } from "@/types/i18n.d";
import { Link as SanityLink } from "@/types/sanity.d";

interface DocNavigationProps {
  prevPageLink?: SanityLink | null;
  nextPageLink?: SanityLink | null;
  lang: Locale;
  dictionary: Dictionary;
}

/**
 * ドキュメントページの前後ナビゲーションリンクを表示するServer Component。
 * PPRとStreamingの活用のため、メインコンテンツとは別に静的な部分としてレンダリングされます。
 * @param prevPageLink 前のページへのリンクデータ
 * @param nextPageLink 次のページへのリンクデータ
 * @param lang 現在のロケール
 * @param dictionary 辞書データ
 */
export function DocNavigation({
  prevPageLink,
  nextPageLink,
  lang,
  dictionary,
}: DocNavigationProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-12">
      {/* 前のページへのリンク */}
      {prevPageLink && (
        <Link
          href={getLocalizedUrl(
            `/docs/${prevPageLink.url}`,
            lang,
          )}
          className="nav-button p-4 rounded-lg border shadow-md flex flex-col items-start hover:shadow-lg transition-all duration-300"
        >
          <span className="text-sm opacity-75">
            {dictionary.prev_label}
          </span>
          <div className="flex items-center text-xl font-semibold">
            {/* 左矢印アイコン */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left mr-2"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span>
              {prevPageLink.label?.[lang]}
            </span>
          </div>
        </Link>
      )}

      {/* 次のページへのリンク */}
      {nextPageLink && (
        <Link
          href={getLocalizedUrl(
            `/docs/${nextPageLink.url}`,
            lang,
          )}
          className="nav-button p-4 rounded-lg border shadow-md flex flex-col items-end hover:shadow-lg transition-all duration-300"
        >
          <span className="text-sm opacity-75">
            {dictionary.next_label}
          </span>
          <div className="flex items-center text-xl font-semibold">
            <span>
              {nextPageLink.label?.[lang]}
            </span>
            {/* 右矢印アイコン */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </Link>
      )}
    </div>
  );
}
