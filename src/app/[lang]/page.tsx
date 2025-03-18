/**
 * ホームページコンポーネント。
 * Server Componentとして動作し、初期データフェッチと静的なコンテンツのレンダリングを担当します。
 * PPR (Partial Prerendering) を活用し、動的なセクション（ヒーロースライダー、差別化セクション）は
 * Suspenseでラップされ、静的なシェルが即座に表示されるようにします。
 */
import { Suspense } from "react";
import { getHomePage } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/types/i18n.d";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { HeroSection } from "@/components/home/HeroSection"; // 新しいHeroSectionをインポート
import { DifferencesSectionWrapper } from "@/components/sections/DifferencesSectionWrapper"; // 新しいDifferencesSectionWrapperをインポート
import { DynamicSectionsRenderer } from "@/components/sections/DynamicSectionsRenderer";
import { toSanityLocale } from "@/lib/utils";

interface HomePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function HomePage({
  params,
}: HomePageProps) {
  // URLパラメータから言語を取得
  const { lang } = await params;
  const lang_key = toSanityLocale(lang);
  // ホームページデータを非同期で取得
  const homePageData = await getHomePage();

  // データが見つからない場合の表示
  if (!homePageData) {
    return <div>No home page data found.</div>;
  }

  // 取得したデータから必要な情報を分割代入
  const {
    heroSlides,
    differencesSectionTitle,
    featureCards,
    sections,
  } = homePageData;

  // 辞書データを非同期で取得
  const dictionary: Dictionary =
    await getDictionary(lang);

  return (
    <div className="min-h-screen">
      {/* ヒーロースライダーセクション: 抽出したServer Componentを使用 */}
      {/* PPR (Partial Prerendering) を活用し、静的なシェルが即座に表示され、動的なコンテンツはサーバーからストリーミングされます。 */}
      <HeroSection
        heroSlides={heroSlides}
        lang={lang_key}
      />

      {/* 差別化セクション: 抽出したServer Componentを使用 */}
      {/* PPR (Partial Prerendering) を活用し、静的なシェルが即座に表示され、動的なコンテンツはサーバーからストリーミングされます。 */}
      <DifferencesSectionWrapper
        differencesSectionTitle={
          differencesSectionTitle
        }
        featureCards={featureCards}
        lang={lang_key}
      />

      {/* 動的セクションレンダラー: PPRの恩恵を受けるため、必要に応じて内部でSuspenseを使用 */}
      <DynamicSectionsRenderer
        sections={sections || []}
        lang={
          lang_key as
            | "ja-JP"
            | "en-US"
            | "ko-KR"
            | "zh-TW"
        }
        dictionary={dictionary}
      />
    </div>
  );
}
