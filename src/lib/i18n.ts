import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const i18n = {
  defaultLocale: "ja-JP",
  locales: ["ja-JP", "en-US", "ko-KR", "zh-TW"],
} as const;

export type Locale =
  (typeof i18n)["locales"][number];

export function getLocale(
  request: Request,
): Locale {
  const negotiatorHeaders: {
    [key: string]: string;
  } = {};
  request.headers.forEach(
    (value, key) =>
      (negotiatorHeaders[key] = value),
  );

  const locales = Array.from(i18n.locales);
  const languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  const locale = match(
    languages,
    locales,
    i18n.defaultLocale,
  );
  return locale as Locale;
}
