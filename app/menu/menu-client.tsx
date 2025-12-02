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

      const scrollPosition = window.scrollY + 200;

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
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-secondary/80 via-card/80 to-card text-foreground">
      {/* Layered background design */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-secondary/80 via-card/80 to-card" />

        {/* Soft wash for depth */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-card to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-secondary to-transparent" />

        {/* Minimal light streak */}
        <div className="absolute inset-x-0 top-16 h-24 bg-linear-to-b from-white/40 to-transparent opacity-70" />
      </div>

      {/* Sticky Side Navigation - Hidden on mobile, visible on lg+ */}
      <aside className="fixed left-10 top-1/2 z-20 hidden -translate-y-1/2 lg:block w-[220px]">
        <nav className="flex flex-col gap-2 rounded-[28px] border border-secondary/40 bg-card/90 p-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex w-full items-center gap-3 rounded-[20px] border px-4 py-3 text-left text-sm font-semibold tracking-wide transition duration-200 ${
                activeSection === section.id
                  ? "border-accent/70 bg-accent/10 text-foreground"
                  : "border-transparent text-muted-foreground hover:border-accent/30 hover:text-foreground"
              }`}
            >
              {/* Active indicator */}
              {activeSection === section.id && (
                <span className="h-6 w-1 rounded-full bg-accent" />
              )}

              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold">{section.titleEn}</span>
                {section.titleAr && (
                  <span className="text-[10px] opacity-60" dir="rtl">
                    {section.titleAr}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>
      </aside>

      <main className="relative mx-auto max-w-4xl px-4 pb-24 pt-24 md:px-6 lg:px-8 ">
        {/* Hero header */}
        <header className="mb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow-small mb-3 text-center">Bahi Café</div>

            <h1 className="section-heading mb-4 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
              Our Menu
            </h1>

            <p className="section-description mx-auto text-muted-foreground">
              Experience authentic flavors crafted with passion. Our menu is
              carefully curated to bring you the finest selection of beverages
              and treats.
            </p>
          </div>
        </header>

        {/* All Sections - with nice background container */}
        <div className="rounded-[40px] border border-border/60 bg-linear-to-b from-card/90 via-card/80 to-secondary/80 p-6 backdrop-blur-md md:p-10">
          <div className="space-y-16">
            {sections.map((section, sectionIndex) => (
              <section
                key={section.id}
                id={section.id}
                className="animate-fade-in-up scroll-mt-24"
                style={{ animationDelay: `${sectionIndex * 100}ms` }}
              >
                {/* Section header */}
                <div className="mb-6">
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

                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                      {section.titleEn}
                    </h2>
                    {section.titleAr && (
                      <h2
                        className="font-ar-bold text-3xl tracking-tight text-foreground"
                        dir="rtl"
                      >
                        {section.titleAr}
                      </h2>
                    )}
                  </div>

                  <div className="mt-4 h-px bg-linear-to-r from-transparent via-border to-transparent" />
                </div>

                {/* Menu items */}
                <div className="space-y-4">
                  {section.items.map((item) => {
                    const unavailable = !item.available;

                    return (
                      <article
                        key={`${section.id}-${item.nameEn}-${item.itemOrder}`}
                        className={cn(
                          "group/item -mx-4 rounded-[28px] px-4 py-4 transition duration-300",
                          unavailable
                            ? "opacity-60"
                            : "hover:bg-linear-to-r hover:from-secondary/50 hover:via-card/70 hover:to-accent/20",
                          item.isSmaller ? "text-xs" : "text-base"
                        )}
                      >
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1.8fr)_auto_minmax(0,1.8fr)] md:items-start md:gap-6">
                          {/* LEFT: English */}
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-bold text-foreground/90 transition-colors group-hover/item:text-primary">
                                {item.nameEn}
                              </h3>

                              {item.badge && (
                                <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                                  {item.badge}
                                </span>
                              )}

                              {unavailable && (
                                <span className="inline-flex items-center rounded-full border border-muted-foreground/30 bg-muted/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                  Sold Out
                                </span>
                              )}
                            </div>

                            {item.descEn && (
                              <p className="text-xs leading-relaxed text-muted-foreground/80">
                                {item.descEn}
                              </p>
                            )}
                          </div>

                          {/* MIDDLE: Price - Minimal */}
                          <div className="flex items-center justify-center">
                            {item.price && (
                              <p className="font-semibold tabular-nums tracking-widest text-foreground/90">
                                {item.price}
                              </p>
                            )}
                          </div>

                          {/* RIGHT: Arabic */}
                          <div className="space-y-2 text-right" dir="rtl">
                            {item.nameAr && (
                              <h3 className="font-ar-bold text-foreground/90">
                                {item.nameAr}
                              </h3>
                            )}

                            {item.descAr && (
                              <p className="text-xs leading-relaxed text-muted-foreground/80">
                                {item.descAr}
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">
            All prices are in Jordanian Dinar (JD)
          </p>
        </div>
      </main>
    </div>
  );
}
