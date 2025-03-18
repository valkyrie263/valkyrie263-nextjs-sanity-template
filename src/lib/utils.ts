import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isAbsoluteUrl(url: string): boolean {
  return /^(?:[a-zA-Z][a-zA-Z\d+.-]*:|\/\/)/.test(
    url,
  );
}

export function getLocalizedUrl(
  url: string,
  lang: string,
): string {
  if (!url) return "";
  if (isAbsoluteUrl(url)) return url;

  if (
    url.startsWith(`/${lang}/`) ||
    url === `/${lang}`
  )
    return url;

  const normalized = url.startsWith("/")
    ? url.slice(1)
    : url;
  return `/${lang}/${normalized}`;
}

export function toIntlLocale(locale: string) {
  return locale.replace("_", "-");
}

export function toSanityLocale(locale: string) {
  return locale.replace("-", "_");
}
