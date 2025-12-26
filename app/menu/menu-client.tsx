"use client";

import { cn } from "@/lib/utils";
import { MenuSection } from "@/types/menu";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import AutoHeight from "embla-carousel-auto-height";

interface MenuClientProps {
  sections: MenuSection[];
}

export function MenuClient({ sections }: MenuClientProps) {
  const validSections = sections.filter((section) => section.items.length > 0);
  const [api, setApi] = useState<CarouselApi>();
  const [tabsApi, setTabsApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDots, setShowDots] = useState(true);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrentIndex(newIndex);

      // Sync tabs carousel to center the active tab
      tabsApi?.scrollTo(newIndex);

      // Show dots on change, then hide after 2s
      setShowDots(true);
      const timer = setTimeout(() => setShowDots(false), 2000);
      return () => clearTimeout(timer);
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api, tabsApi]);

  // Global keyboard navigation
  useEffect(() => {
    if (!api) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        api.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        api.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [api]);

  const scrollToSection = (index: number) => {
    api?.scrollTo(index);
    tabsApi?.scrollTo(index);
  };

  return (
    <div className="relative min-h-screen">
      {/* Quick navigation circles - right side */}
      <nav className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {validSections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={cn(
              "group relative h-3 w-3 rounded-full transition-all duration-200",
              currentIndex === index
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

      {/* Professional header */}
      <header className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background/98 to-background/95 py-12 md:py-16">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0">
          <svg
            className="h-full w-full opacity-[0.04] dark:opacity-[0.015]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="cafe-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                {/* Coffee beans inspired organic shapes */}
                <ellipse
                  cx="20"
                  cy="20"
                  rx="3"
                  ry="5"
                  fill="black"
                  transform="rotate(45 20 20)"
                  className="dark:fill-white"
                />
                <ellipse
                  cx="80"
                  cy="40"
                  rx="3"
                  ry="5"
                  fill="black"
                  transform="rotate(-30 80 40)"
                  className="dark:fill-white"
                />
                <ellipse
                  cx="50"
                  cy="70"
                  rx="3"
                  ry="5"
                  fill="black"
                  transform="rotate(60 50 70)"
                  className="dark:fill-white"
                />
                <ellipse
                  cx="30"
                  cy="90"
                  rx="3"
                  ry="5"
                  fill="black"
                  transform="rotate(15 30 90)"
                  className="dark:fill-white"
                />
                <ellipse
                  cx="70"
                  cy="85"
                  rx="3"
                  ry="5"
                  fill="black"
                  transform="rotate(-45 70 85)"
                  className="dark:fill-white"
                />
                {/* Delicate connecting lines */}
                <path
                  d="M 20 20 Q 50 35 80 40"
                  stroke="black"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.3"
                  className="dark:stroke-white"
                />
                <circle
                  cx="50"
                  cy="35"
                  r="1"
                  fill="black"
                  opacity="0.4"
                  className="dark:fill-white"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cafe-pattern)" />
          </svg>
        </div>

        {/* Subtle decorative gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb,120,113,108)/0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(var(--primary-rgb,120,113,108)/0.02),transparent_50%)]" />

        <div className="relative mx-auto max-w-5xl px-4 md:px-6">
          {/* Brand name */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-linear-to-r from-transparent to-border" />
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
              Bahi Café
            </p>
            <div className="h-px w-8 bg-linear-to-l from-transparent to-border" />
          </div>

          {/* Main title */}
          <h1 className="text-center font-display text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Our Menu
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted-foreground md:text-base">
            Crafted with care, served with passion
          </p>
        </div>
      </header>

      {/* Section tabs carousel - center mode */}
      <div className="sticky top-0 z-10 border-b border-border/50 bg-secondary/60 backdrop-blur-md shadow-sm dark:bg-secondary/30">
        <div className="mx-auto max-w-5xl">
          <Carousel
            setApi={setTabsApi}
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {validSections.map((section, index) => (
                <CarouselItem key={section.id} className="basis-auto pl-1">
                  <button
                    onClick={() => scrollToSection(index)}
                    className={cn(
                      "group relative shrink-0 rounded-full px-4 py-2 transition-all duration-200",
                      currentIndex === index
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-medium whitespace-nowrap">
                        {section.titleEn}
                      </span>
                      {section.titleAr && (
                        <span
                          className="font-ar text-xs opacity-60 whitespace-nowrap"
                          dir="rtl"
                        >
                          {section.titleAr}
                        </span>
                      )}
                    </div>
                    {currentIndex === index && (
                      <div className="absolute bottom-0 left-1/2 h-0.5 w-3/4 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        plugins={[AutoHeight()]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 items-start">
          {validSections.map((section) => (
            <CarouselItem
              key={section.id}
              className="pl-2 md:pl-4 basis-[96%] md:basis-full self-start"
            >
              <div className="mx-auto w-full max-w-5xl px-2 py-8 md:px-6 md:py-12">
                {/* Section Title */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold font-display text-foreground md:text-4xl">
                    {section.titleEn}
                  </h2>
                  {section.titleAr && (
                    <p
                      className="mt-2 font-ar text-xl text-muted-foreground"
                      dir="rtl"
                    >
                      {section.titleAr}
                    </p>
                  )}
                  <div className="mx-auto mt-4 h-px w-16 bg-linear-to-r from-transparent via-border to-transparent" />
                </div>

                {/* Menu items - flat & minimal */}
                <div className="divide-y divide-border/70 rounded-lg border border-border/40 bg-background/90 p-6 backdrop-blur-sm md:p-8">
                  {section.items.map((item, idx) => {
                    const unavailable = !item.available;

                    return (
                      <article
                        key={`${section.id}-${item.nameEn}-${item.itemOrder}`}
                        className={cn(
                          "group/item -mx-2 -my-1 rounded-md px-2 py-6 transition-all duration-200",
                          "hover:bg-primary/3 hover:shadow-sm",
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
                                  <p className="leading-relaxed">
                                    {item.descEn}
                                  </p>
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

                {/* Footer - only show on last section */}
                {currentIndex === validSections.length - 1 && (
                  <footer className="mt-16 space-y-6 border-t border-border/40 pt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                      All prices in Jordanian Dinar · Ask our team about
                      allergens or dietary preferences
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Opening Hours</span>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>Saturday – Thursday: 7:00 AM – 11:30 PM</p>
                        <p>
                          Friday: 7:00 AM – prayer time · After prayer – 11:30
                          PM
                        </p>
                        <p>Sunday: 7:00 AM – 12:30 AM</p>
                      </div>
                    </div>
                  </footer>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Mobile dots indicator - auto-hide */}
      <div
        className={cn(
          "fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-background/80 px-3 py-2 shadow-lg backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          showDots ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {validSections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-200",
              currentIndex === index
                ? "bg-primary w-4"
                : "bg-border hover:bg-primary/50"
            )}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
