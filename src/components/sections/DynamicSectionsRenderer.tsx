import { Suspense } from "react";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/types/i18n.d";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import {
  RightImageSection,
  LeftImageSection,
  GallerySection,
  DefaultSection,
} from "@/components/sections";
import { CustomSection } from "@/types/sanity";

interface DynamicSectionsRendererProps {
  sections: CustomSection[];
  lang: Locale;
  dictionary: Dictionary;
}

/**
 * 動的セクションレンダラーコンポーネント。
 * Sanityから取得したセクションデータに基づいて、異なるタイプのセクションコンポーネントを動的にレンダリングします。
 * 各セクションはScrollAnimationWrapperでラップされ、アニメーション効果を提供します。
 * PPR (Partial Prerendering) の恩恵を受けるため、このコンポーネント全体もSuspenseでラップされています。
 */
export function DynamicSectionsRenderer({
  sections,
  lang,
  dictionary,
}: DynamicSectionsRendererProps) {
  return (
    // PPRを有効にするため、Suspenseでラップ
    // セクションのロード中に表示されるフォールバックUI
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16 text-gray-500">
          Loading dynamic sections...
        </div>
      }
    >
      {sections?.map((section, index) => {
        // 各セクションに共通のpropsを渡す
        const sectionProps = {
          ...section,
          lang,
          dictionary,
        };

        return (
          // 各セクションをスクロールアニメーションラッパーで囲む
          <ScrollAnimationWrapper key={index}>
            <section
              className="py-16"
              style={{
                // セクションの背景色を交互に設定
                backgroundColor:
                  index % 2 === 0
                    ? "var(--card)"
                    : "var(--background)",
              }}
            >
              {/* セクションタイプに基づいて適切なコンポーネントをレンダリング */}
              {(() => {
                switch (section.sectionType) {
                  case "rightImage":
                    return (
                      <RightImageSection
                        {...sectionProps}
                      />
                    );
                  case "leftImage":
                    return (
                      <LeftImageSection
                        {...sectionProps}
                      />
                    );
                  case "gallery":
                    return (
                      <GallerySection
                        {...sectionProps}
                      />
                    );
                  default:
                    return (
                      <DefaultSection
                        {...sectionProps}
                      />
                    );
                }
              })()}
            </section>
          </ScrollAnimationWrapper>
        );
      })}
    </Suspense>
  );
}
