import "server-only";
import { Dictionary } from "@/types/i18n";

const dictionaries = {
  "ja-JP": () =>
    import("@/dictionaries/ja-JP.json").then(
      (module) => module.default,
    ),
  "en-US": () =>
    import("@/dictionaries/en-US.json").then(
      (module) => module.default,
    ),
  "ko-KR": () =>
    import("@/dictionaries/ko-KR.json").then(
      (module) => module.default,
    ),
  "zh-TW": () =>
    import("@/dictionaries/zh-TW.json").then(
      (module) => module.default,
    ),
};

export const getDictionary = async (
  locale: "en-US" | "ja-JP" | "ko-KR" | "zh-TW",
) =>
  dictionaries[locale]() as Promise<Dictionary>;
