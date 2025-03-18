import { Suspense } from "react";
import { DifferencesSection } from "@/components/sections/DifferencesSection";
import { HomePage } from "@/types/sanity";

interface DifferencesSectionWrapperProps {
  differencesSectionTitle: HomePage["differencesSectionTitle"];
  featureCards: HomePage["featureCards"];
  lang: string;
}

/**
 * 差別化セクションのServer Componentラッパー。
 * Client Componentではないが、データフェッチやレンダリングに時間がかかる可能性があるため、
 * SuspenseでラップしてPPRとStreamingの恩恵を受けます。
 * これにより、ページの静的な部分が先に表示され、このセクションは非同期でロードされます。
 */
export async function DifferencesSectionWrapper({
  differencesSectionTitle,
  featureCards,
  lang,
}: DifferencesSectionWrapperProps) {
  return (
    // PPRを有効にするため、Suspenseでラップ
    // データフェッチ中に表示されるフォールバックUI
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16 text-gray-500">
          Loading differences section...
        </div>
      }
    >
      <DifferencesSection
        differencesSectionTitle={
          differencesSectionTitle
        }
        featureCards={featureCards}
        langKey={lang}
      />
    </Suspense>
  );
}
