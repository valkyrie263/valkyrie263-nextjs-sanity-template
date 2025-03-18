import { Locale } from "@/lib/i18n";
import {
  FeatureCard,
  LocalizedString,
} from "@/types/sanity";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

interface DifferencesSectionProps {
  differencesSectionTitle: LocalizedString;
  featureCards: FeatureCard[];
  langKey: string; // 現在の言語キー
}

/**
 * 差別化セクションコンポーネント。
 * サイトの主要な差別化要因を特徴カードとして表示します。
 * Server Componentとして動作し、静的なコンテンツをレンダリングします。
 */
export function DifferencesSection({
  differencesSectionTitle,
  featureCards,
  langKey,
}: DifferencesSectionProps) {
  return (
    // スクロールアニメーションを適用するためのラッパー
    <ScrollAnimationWrapper>
      <section
        className="py-16"
        style={{
          backgroundColor: "var(--background)", // CSS変数から背景色を設定
        }}
      >
        <div className="container mx-auto px-4 text-center">
          {/* セクションタイトル */}
          <h2 className="text-3xl font-bold mb-12">
            {differencesSectionTitle?.[langKey]}
          </h2>
          {/* 特徴カードのグリッドレイアウト */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards?.map(
              (
                card: FeatureCard,
                index: number,
              ) => (
                // 各特徴カード
                <div
                  key={index}
                  className="card-bg p-6 rounded-lg shadow-md card-border border hover:shadow-lg transition-shadow duration-300"
                >
                  {/* カード画像 */}
                  <div className="relative w-12 h-12 mx-auto mb-4">
                    <Image
                      src={urlForImage(
                        card.image,
                      ).url()}
                      alt={
                        card.image.alt?.[
                          langKey as keyof typeof card.image.alt
                        ] || ""
                      }
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  {/* カードタイトル */}
                  <h3 className="text-xl font-semibold mb-2">
                    {card.title[langKey]}
                  </h3>
                  {/* カード説明文 (PortableTextでリッチテキストをレンダリング) */}
                  <div className="card-text-light text-sm leading-relaxed text-left">
                    <PortableText
                      value={
                        card.description?.[
                          langKey as keyof typeof card.description
                        ] || []
                      }
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
}
