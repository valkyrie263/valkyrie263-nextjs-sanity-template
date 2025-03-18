import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
  PortableTextBlock,
  PortableTextReactComponents,
} from "@portabletext/react";
import {
  Image as SanityImage,
  CodeBlock,
  TableBlock,
  TableRow,
  TableCell,
  LinkMark,
} from "@/types/sanity.d";
import { Locale } from "@/lib/i18n";
import { getLocalizedUrl } from "@/lib/utils";

/**
 * PortableTextのカスタムコンポーネントを定義する関数。
 * Sanity CMSから取得したリッチテキストコンテンツをレンダリングする際に使用されます。
 * 画像、コードブロック、テーブル、各種見出し、リスト、リンクなどの表示をカスタマイズします。
 * @param lang 現在のロケール（言語）
 * @returns PortableTextReactComponentsの部分的な実装
 */
export const getPortableTextComponents = (
  lang: Locale,
): Partial<PortableTextReactComponents> => ({
  // カスタムタイプ（画像、コードブロック、テーブルなど）のレンダリングルール
  types: {
    /**
     * 画像ブロックのレンダリング。
     * Next.jsのImageコンポーネントを使用し、最適化された画像表示を提供します。
     */
    image: ({
      value,
    }: PortableTextComponentProps<SanityImage>) => {
      const imageUrl = value.asset.url;
      const altText =
        value.alt?.[lang] || "Image";
      return (
        <Image
          src={imageUrl}
          alt={altText}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 800px"
          style={{
            width: "100%",
            height: "auto",
          }}
          className="my-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          priority
        />
      );
    },
    /**
     * コードブロックのレンダリング。
     * 整形済みテキストとしてコードを表示し、スクロール可能にします。
     */
    codeBlock: ({
      value,
    }: PortableTextComponentProps<CodeBlock>) => (
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 shadow-lg">
        <code>{value.code}</code>
      </pre>
    ),
    /**
     * テーブルブロックのレンダリング。
     * 各セル内のコンテンツもPortableTextとして再帰的にレンダリングします。
     * @bugfix テーブルセル内のコンテンツが正しくレンダリングされるように修正
     */
    tableBlock: ({
      value,
    }: PortableTextComponentProps<TableBlock>) => {
      return (
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left border-collapse card-bg shadow-md rounded-lg overflow-hidden">
            <tbody>
              {value.rows.map(
                (
                  row: TableRow,
                  rowIndex: number,
                ) => (
                  <tr
                    key={rowIndex}
                    className="border-b card-border"
                  >
                    {row.cells.map(
                      (
                        cell: TableCell,
                        cellIndex: number,
                      ) => (
                        <td
                          key={cellIndex}
                          className="p-4"
                        >
                          {/* 各セル内のchildrenを直接PortableTextでレンダリングする */}
                          <PortableText
                            value={
                              cell.children as PortableTextBlock[]
                            }
                          />
                        </td>
                      ),
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      );
    },
  },
  // ブロック要素（見出し、段落、引用など）のレンダリングルール
  block: {
    h1: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-4xl font-bold mb-6 text-foreground">
        {children}
      </h1>
    ),
    h2: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-3xl font-bold mb-5 text-foreground">
        {children}
      </h2>
    ),
    h3: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-bold mb-4 text-foreground">
        {children}
      </h3>
    ),
    h4: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <h4 className="text-xl font-bold mb-3 text-foreground">
        {children}
      </h4>
    ),
    normal: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mb-4 card-text-light leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 card-text-light bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  // リスト要素のレンダリングルール
  list: {
    bullet: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="list-disc list-inside space-y-2 card-text-light my-4 leading-relaxed">
        {children}
      </ul>
    ),
    number: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="list-decimal list-inside space-y-2 card-text-light my-4 leading-relaxed">
        {children}
      </ol>
    ),
  },
  // リストアイテムのレンダリングルール
  listItem: ({
    children,
  }: PortableTextComponentProps<PortableTextBlock>) => (
    <li className="mb-2">{children}</li>
  ),
  // マーク（リンクなど）のレンダリングルール
  marks: {
    /**
     * リンクマークのレンダリング。
     * 内部リンクと外部リンクを区別し、適切なNext.js Linkコンポーネントと属性を適用します。
     */
    link: ({
      value,
      children,
    }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = value?.href;
      if (!href) return <>{children}</>;

      const localizedHref = getLocalizedUrl(
        href,
        lang,
      );
      const isExternal = href.startsWith("http");
      return (
        <Link
          href={localizedHref}
          target={isExternal ? "_blank" : "_self"}
          rel={
            isExternal
              ? "noopener noreferrer"
              : undefined
          }
          className="text-blue-600 hover:underline transition-colors duration-200"
        >
          {children}
        </Link>
      );
    },
  },
});
