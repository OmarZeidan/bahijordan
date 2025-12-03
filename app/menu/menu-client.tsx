"use client";

import { cn } from "@/lib/utils";
import { MenuSection } from "@/types/menu";
import { useState, useEffect } from "react";

interface MenuClientProps {
  sections: MenuSection[];
}

export function MenuClient({ sections }: MenuClientProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      const scrollPosition = window.scrollY + 150;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Simplified clean background */}
      <div className="fixed inset-0 -z-10 bg-background" />

      {/* Floating Dot Navigation - Desktop only */}
      <nav className="fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col gap-3">
          {sections.filter(section => section.items.length > 0).map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center"
              aria-label={`Go to ${section.titleEn}`}
            >
              {/* Dot */}
              <div
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  activeSection === section.id
                    ? "bg-accent ring-4 ring-accent/20"
                    : "bg-border hover:bg-accent/50"
                )}
              />

              {/* Tooltip */}
              <div
                className={cn(
                  "pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg bg-card px-3 py-1.5 text-sm font-medium text-foreground opacity-0 shadow-lg ring-1 ring-border transition-opacity duration-200 group-hover:opacity-100",
                )}
              >
                {section.titleEn}
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation Bar - Mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/40 bg-card/95 backdrop-blur-md lg:hidden">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
          {sections.filter(section => section.items.length > 0).map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                activeSection === section.id
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "bg-secondary/50 text-muted-foreground"
              )}
            >
              <span className="whitespace-nowrap">{section.titleEn}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative mx-auto max-w-5xl px-4 pb-24 pt-12 md:px-6 lg:pb-32 lg:px-8">
        {/* Hero header - Simplified */}
        <header className="mb-16 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="eyebrow-small mb-4 text-center">Bahi Café</div>

            <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-primary md:text-6xl">
              Our Menu
            </h1>

            <p className="text-lg leading-relaxed text-muted-foreground">
              Experience authentic flavors crafted with passion. Our menu is
              carefully curated to bring you the finest selection of beverages
              and treats.
            </p>
          </div>
        </header>

        {/* Menu Sections */}
        <div className="space-y-20">
          {sections.filter(section => section.items.length > 0).map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-32"
            >
              {/* Section container with background */}
              <div className="rounded-3xl bg-[#f5f0eb] p-6 shadow-sm ring-1 ring-border/50 md:p-8 dark:bg-[#2f2727]">
                {/* Section header - Cleaner design */}
                <div className="mb-8">
                  {section.eyebrowEn && (
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span className="eyebrow-small">{section.eyebrowEn}</span>
                      {section.eyebrowAr && (
                        <span className="eyebrow-small" dir="rtl">
                          {section.eyebrowAr}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mb-4 flex items-center justify-between gap-6">
                    <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                      {section.titleEn}
                    </h2>
                    {section.titleAr && (
                      <h2
                        className="font-ar-bold text-3xl text-foreground md:text-4xl"
                        dir="rtl"
                      >
                        {section.titleAr}
                      </h2>
                    )}
                  </div>

                  <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
                </div>

                {/* Menu items - Simpler design */}
                <div className="space-y-5">
                  {section.items.map((item) => {
                    const unavailable = !item.available;

                    return (
                      <article
                        key={`${section.id}-${item.nameEn}-${item.itemOrder}`}
                        className={cn(
                          "group/item rounded-xl p-5 transition-all duration-300 md:p-6",
                          unavailable
                            ? "opacity-60"
                            : "hover:bg-white/50 hover:shadow-sm dark:hover:bg-black/20",
                          item.isSmaller && "py-4 md:py-4"
                        )}
                      >
                      <div className="flex flex-col gap-3">
                        {/* Names and badges */}
                        <div className="space-y-2">
                          {/* English name and badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={cn(
                                "font-bold leading-tight text-foreground transition-colors group-hover/item:text-primary",
                                item.isSmaller ? "text-base" : "text-lg md:text-xl"
                              )}
                            >
                              {item.nameEn}
                            </h3>

                            {item.badge && (
                              <span className="inline-flex items-center rounded-full border border-accent/50 bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                                {item.badge}
                              </span>
                            )}

                            {unavailable && (
                              <span className="inline-flex items-center rounded-full border border-muted-foreground/30 bg-muted/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Sold Out
                              </span>
                            )}
                          </div>

                          {/* Arabic name */}
                          {item.nameAr && (
                            <h3
                              className={cn(
                                "font-ar-bold leading-tight text-foreground/90",
                                item.isSmaller ? "text-base" : "text-lg md:text-xl"
                              )}
                              dir="rtl"
                            >
                              {item.nameAr}
                            </h3>
                          )}
                        </div>

                        {/* Descriptions */}
                        {(item.descEn || item.descAr) && (
                          <div className="space-y-2">
                            {item.descEn && (
                              <p
                                className={cn(
                                  "leading-relaxed text-muted-foreground",
                                  item.isSmaller ? "text-xs" : "text-sm"
                                )}
                              >
                                {item.descEn}
                              </p>
                            )}

                            {item.descAr && (
                              <p
                                className={cn(
                                  "leading-relaxed text-muted-foreground",
                                  item.isSmaller ? "text-xs" : "text-sm"
                                )}
                                dir="rtl"
                              >
                                {item.descAr}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Price - Bottom aligned with dashed line */}
                        {item.price && (
                          <div className="flex items-center gap-3 pt-2">
                            <div className="h-px flex-1 border-b border-dashed border-border/60" />
                            <div className="flex items-center gap-1.5 rounded-lg bg-accent/5 px-3 py-1.5 dark:bg-accent/10">
                              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                JD
                              </span>
                              <span className="text-xl font-bold tabular-nums text-accent">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-24 text-center">
          <p className="text-sm text-muted-foreground">
            All prices are in Jordanian Dinar (JD)
          </p>
        </div>
      </main>
    </div>
  );
}
