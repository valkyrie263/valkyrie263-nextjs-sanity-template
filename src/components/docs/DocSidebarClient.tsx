"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { DocSection } from "@/types/sanity.d";
import { Locale } from "@/lib/i18n";

interface DocSidebarClientProps {
  sidebarNavigation: DocSection[];
  lang: Locale;
}

export function DocSidebarClient({
  sidebarNavigation,
  lang,
}: DocSidebarClientProps) {
  const [
    collapsedSections,
    setCollapsedSections,
  ] = useState<Record<string, boolean>>({});

  const toggleSection = (titleKey: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [titleKey]: !prev[titleKey],
    }));
  };

  return (
    <>
      {sidebarNavigation.map(
        (section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="mb-6"
          >
            <h3
              className={`sidebar-section-title ${section.isCollapsible ? "collapsible" : ""} ${
                collapsedSections[
                  section.title.en || ""
                ]
                  ? "collapsed"
                  : ""
              }`}
              onClick={() =>
                section.isCollapsible &&
                toggleSection(
                  section.title.en || "",
                )
              }
            >
              {section.title[lang] || ""}
              {section.isCollapsible && (
                <ChevronDown className="lucide lucide-chevron-down ml-auto arrow-icon" />
              )}
            </h3>

            <ul
              className={`space-y-1 submenu ${collapsedSections[section.title.en || ""] ? "hidden" : ""}`}
            >
              {section.links.map(
                (linkItem, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={`/${lang}/docs/${linkItem.slug.current}`}
                      className="sidebar-link sidebar-link-sub hover:bg-sidebar-link-hover-bg transition-colors duration-200"
                    >
                      {linkItem.label[lang] || ""}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ),
      )}
    </>
  );
}
