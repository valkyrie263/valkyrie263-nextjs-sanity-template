import {
  NextRequest,
  NextResponse,
} from "next/server";
// 国際化設定とロケール取得関数をlibからインポート
// これにより、i18n関連ロジックの一元管理とコードの重複排除を実現
import { i18n, getLocale } from "@/lib/i18n";

/**
 * ミドルウェア関数。
 * リクエストのパスにロケールが含まれていない場合、最適なロケールを付与してリダイレクトします。
 * これにより、国際化されたルーティングが自動的に処理されます。
 * @param request NextRequestオブジェクト
 * @returns NextResponseオブジェクト（リダイレクトまたは続行）
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // i18n設定からロケールリストを取得
  const locales = i18n.locales;
  // パスが既にロケールを含んでいるかチェック
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}`,
  );

  // ロケールが既に存在する場合は何もしない
  if (pathnameHasLocale) return;

  // 最適なロケールを決定し、パスに付与してリダイレクト
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// ミドルウェアが適用されるパスを設定
export const config = {
  matcher: ["/((?!_next).*)"], // _nextディレクトリを除く全てのパスに適用
};
