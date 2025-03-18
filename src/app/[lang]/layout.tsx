import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Locale, i18n } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/sanity";
import { getDictionary } from "./dictionaries";
import { toSanityLocale } from "@/lib/utils";

// Google FontsのInterフォントをロード
const inter = Inter({ subsets: ["latin"] });

/**
 * 静的パスを生成します。
 * アプリケーションがサポートする全てのロケール（言語）に対して、静的なルートレイアウトを生成します。
 * これにより、ビルド時に各言語のページが生成され、初回ロードパフォーマンスが向上します（SSG）。
 * @returns 各言語のパラメータを持つオブジェクトの配列
 */
export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

/**
 * メタデータを生成します。
 * ページのSEOタイトルとディスクリプションを動的に設定します。
 * Sanity CMSからサイト設定を取得し、ローカライズされたSEO情報を適用します。
 * @param params URLパラメータ（言語）
 * @returns Next.jsのMetadataオブジェクト
 */
export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const { lang } = await params;
  const lang_key = toSanityLocale(lang);
  const settings = await getSiteSettings(); // サイト設定を非同期で取得
  const dictionary = await getDictionary(lang); // 辞書データを非同期で取得

  // SEOタイトルとディスクリプションをローカライズされたデータから取得、なければデフォルトを使用
  const seoTitle =
    settings?.seoTitle?.[lang] ||
    dictionary.seo_title_default;
  const seoDescription =
    settings?.seoDescription?.[lang] ||
    dictionary.seo_description_default;

  return {
    title: seoTitle,
    description: seoDescription,
  };
}

/**
 * ルートレイアウトコンポーネント。
 * 全てのページに共通の構造（HTML, Body, ThemeProvider, Header, Footer）を提供します。
 * Server Componentとして動作し、クライアントサイドでの再レンダリングを最小限に抑えます。
 * @param children 子コンポーネント（ページコンテンツ）
 * @param params URLパラメータ（言語）
 */
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        {/* テーマプロバイダー: アプリケーション全体でテーマ（ライト/ダークモードなど）を管理 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* ヘッダーコンポーネント */}
          <Header lang={lang as Locale} />
          {/* メインコンテンツエリア: flex-growで利用可能なスペースを埋める */}
          <main className="flex-grow">
            {children}
          </main>
          {/* フッターコンポーネント */}
          <Footer lang={lang as Locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
