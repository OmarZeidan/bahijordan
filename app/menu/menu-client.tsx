"use client";

import { cn } from "@/lib/utils";
import { MenuSection } from "@/types/menu";
import { Clock } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MenuClientProps {
  sections: MenuSection[];
}

export function MenuClient({ sections }: MenuClientProps) {
  const validSections = sections.filter((section) => section.items.length > 0);
  const [activeTab, setActiveTab] = useState(validSections[0]?.id || "");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Scroll to top smoothly to show tabs and content
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="relative min-h-screen">
      {/* Quick navigation circles - right side */}
      <nav className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {validSections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleTabChange(section.id)}
            className={cn(
              "group relative h-3 w-3 rounded-full transition-all duration-200",
              activeTab === section.id
                ? "bg-primary ring-4 ring-primary/20"
                : "bg-border hover:bg-primary/50 hover:ring-2 hover:ring-primary/10"
            )}
            aria-label={`Go to ${section.titleEn}`}
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
              {section.titleEn}
            </span>
          </button>
        ))}
      </nav>

      {/* Minimal header */}
      <header className="relative border-b border-border/50 py-8">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <p className="mb-2 text-center text-xs uppercase tracking-widest text-muted-foreground">
            Bahi Café
          </p>
          <h1 className="text-center font-display text-3xl font-light tracking-tight text-foreground md:text-4xl">
            Menu
          </h1>
        </div>
      </header>

      {/* Tabs Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="sticky top-0 z-10 border-b border-border/50 bg-secondary/60 backdrop-blur-md shadow-sm dark:bg-secondary/30">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <TabsList className="inline-flex h-12 w-auto min-w-full items-center justify-start gap-0 bg-transparent md:w-full">
                {validSections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className={cn(
                      "relative shrink-0 flex-none border-b-2 border-transparent bg-transparent px-4 py-3",
                      "text-sm font-medium text-muted-foreground transition-colors",
                      "hover:text-foreground",
                      "data-[state=active]:border-primary data-[state=active]:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none"
                    )}
                  >
                    <span className="whitespace-nowrap">{section.titleEn}</span>
                    {section.titleAr && (
                      <span
                        className="ml-2 whitespace-nowrap font-ar text-xs opacity-60"
                        dir="rtl"
                      >
                        {section.titleAr}
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
        </div>

        <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-12">
          {validSections.map((section) => (
            <TabsContent
              key={section.id}
              value={section.id}
              className="mt-0 focus-visible:outline-none"
            >
              {/* Menu items - flat & minimal */}
              <div className="divide-y divide-border/70 rounded-lg border border-border/40 bg-background/90 p-6 backdrop-blur-sm md:p-8">
                {section.items.map((item, idx) => {
                  const unavailable = !item.available;

                  return (
                    <article
                      key={`${section.id}-${item.nameEn}-${item.itemOrder}`}
                      className={cn(
                        "group/item -mx-2 -my-1 rounded-md px-2 py-6 transition-all duration-200",
                        "hover:bg-primary/3  hover:shadow-sm",
                        unavailable && "opacity-50",
                        idx === 0 && "pt-0"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: Title & Description */}
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <h3 className="font-medium text-primary-600 dark:text-foreground">
                              {item.nameEn} -
                            </h3>
                            {item.nameAr && (
                              <span
                                className="font-ar text-sm text-foreground"
                                dir="rtl"
                              >
                                {item.nameAr}
                              </span>
                            )}
                            {item.badge && (
                              <span className="inline-flex items-center rounded-sm bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                                {item.badge}
                              </span>
                            )}
                            {unavailable && (
                              <span className="inline-flex items-center rounded-sm bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                Unavailable
                              </span>
                            )}
                          </div>

                          {(item.descEn || item.descAr) && (
                            <div className="space-y-6 text-sm text-muted-foreground mt-4">
                              {item.descEn && (
                                <p className="leading-relaxed">{item.descEn}</p>
                              )}
                              {item.descAr && (
                                <p
                                  className="font-ar leading-relaxed"
                                  dir="rtl"
                                >
                                  {item.descAr}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Right: Price */}
                        {item.price && (
                          <div className="shrink-0 text-right">
                            <p className="font-medium tabular-nums text-foreground">
                              {item.price}{" "}
                              <span className="text-xs text-muted-foreground">
                                JD
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </TabsContent>
          ))}

          {/* Footer */}
          <footer className="mt-16 space-y-6 border-t border-border/40 pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              All prices in Jordanian Dinar · Ask our team about allergens or
              dietary preferences
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Opening Hours</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Saturday – Thursday: 7:00 AM – 11:30 PM</p>
                <p>Friday: 7:00 AM – prayer time · After prayer – 11:30 PM</p>
                <p>Sunday: 7:00 AM – 12:30 AM</p>
              </div>
            </div>
          </footer>
        </main>
      </Tabs>
    </div>
  );
}
