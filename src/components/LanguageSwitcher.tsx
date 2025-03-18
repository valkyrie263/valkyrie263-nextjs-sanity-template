"use client";

import * as React from "react";
import { Globe, ChevronDown } from "lucide-react";
import {
  useRouter,
  usePathname,
} from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  currentLang: string;
}

export function LanguageSwitcher({
  currentLang,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "ja-JP", name: "日本語" },
    { code: "en-US", name: "English" },
    { code: "ko-KR", name: "한국어" },
    { code: "zh-TW", name: "繁體中文" },
  ];

  const handleLanguageChange = (lang: string) => {
    const newPath = `/${lang}${pathname.substring(6)}`;
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center w-fit header-text hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <Globe className="mr-1 h-[1.2rem] w-[1.2rem]" />
          <span id="current-lang">
            {currentLang.toUpperCase()}
          </span>
          <ChevronDown className="ml-1 h-4 w-4" />
          <span className="sr-only">
            Toggle language
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="card-bg border card-border"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() =>
              handleLanguageChange(lang.code)
            }
            className={`${currentLang === lang.code ? "font-bold" : ""} card-text-light hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
