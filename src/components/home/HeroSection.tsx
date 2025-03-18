import { Suspense } from "react";
import { HeroSliderClient } from "@/components/home/HeroSliderClient";
import { urlForImage } from "@/sanity/lib/image";
import {
  HeroSlide,
  HomePage,
} from "@/types/sanity";
import { getLocalizedUrl } from "@/lib/utils";

interface HeroSectionProps {
  heroSlides: HomePage["heroSlides"];
  lang: string;
}

/**
 * ヒーロースライダーセクションのServer Component。
 * Client ComponentであるHeroSliderClientをラップし、データ変換とSuspenseによるPPRを管理します。
 * 静的なシェルを即座に表示し、動的なスライダーコンテンツはストリーミングでロードされます。
 */
export async function HeroSection({
  heroSlides,
  lang,
}: HeroSectionProps) {
  // HeroSliderClientに渡すデータをサーバー側で整形
  const slidesForClient = heroSlides.map(
    (slide: HeroSlide) => ({
      imageUrl: slide.image?.asset
        ? urlForImage(slide.image).url()
        : "",
      titleLine1: slide.titleLine1[lang] || "",
      titleLine2: slide.titleLine2?.[lang],
      buttonLabel:
        slide.buttonUrl?.label?.[lang] || "",
      buttonUrl: getLocalizedUrl(
        slide.buttonUrl?.url,
        lang,
      ),
      buttonIsExternal:
        slide.buttonUrl?.isExternal,
    }),
  );

  return (
    // PPRを有効にするため、SuspenseでClient Componentをラップ
    // スライダーの画像ロードやインタラクティブ要素のハイドレーション中に表示されるフォールバックUI
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full w-full text-white">
          Loading hero content...
        </div>
      }
    >
      <section className="relative h-[calc(100vh-theme(spacing.16))] mt-[72px] flex items-center justify-center overflow-hidden">
        <HeroSliderClient
          slides={slidesForClient}
        />
      </section>
    </Suspense>
  );
}
