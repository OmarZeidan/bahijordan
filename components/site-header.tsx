"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data.nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileMenu from "./mobile-menu";
import { NavLink } from "./nav-item";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMenuPage = pathname === "/menu";
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // check if top sentinel is visible
        const topEntry = entries.find(
          (entry) => entry.target.id === "top-sentinel" && entry.isIntersecting
        );
        if (topEntry) {
          requestAnimationFrame(() => setActiveId(null));
          return;
        }

        // pick the most visible section to avoid rapid toggling
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const nextId = visible?.target.id || null;

        // prevent unnecessary state updates
        if (nextId && nextId !== activeId) {
          requestAnimationFrame(() =>
            setActiveId((prev) => (prev === nextId ? prev : nextId))
          );
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]); // don't include activeId to keep observer stable

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-primary-600/0 via-primary-600/50 to-primary-600/0"
      />
      <div className="container-inner py-3">
        <div className="flex items-center gap-4 rounded-2xl border border-primary-200/70 bg-background/80 px-4 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.65)] backdrop-blur-xl dark:border-white/10 dark:bg-[#14110f]/80">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-full px-2 py-1 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary/60"
              aria-label="Bahi Café — Home"
              onClick={() => setActiveId(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-bahi.svg"
                alt="Bahi Café"
                className="h-auto w-12 md:w-14"
              />
              <span className="sr-only">Bahi Café</span>
            </Link>
            <div className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-900/70 dark:text-primary-100/70 sm:flex">
              <span className="h-px w-6 bg-current/50" aria-hidden="true" />
              <span>Amman</span>
            </div>
          </div>

          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center gap-1 rounded-full bg-primary-50/60 px-2 py-1 md:flex dark:bg-primary-500/10"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                activeId={activeId}
                pathname={pathname}
              />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button
              asChild
              size="lg"
              className={cn(
                "hidden rounded-full px-5 font-semibold md:inline-flex"
              )}
            >
              <Link href={isMenuPage ? "/" : "/menu"} prefetch={true}>
                {isMenuPage ? "Back to Home" : "Explore Our Menu"}
              </Link>
            </Button>
            <ThemeToggle />
            <MobileMenu activeId={activeId} pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}
