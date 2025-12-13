// app/menu/page.tsx
import { buildMenuSections } from "@/lib/parseMenuCsv";
import { MenuSection } from "@/types/menu";
import { MenuClient } from "./menu-client";
import { Metadata } from "next";

// Revalidate every 5 minutes instead of on every request
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Menu | Bahi Café",
  description: "Explore our menu featuring fresh salads, soups, sandwiches, omelettes, desserts, specialty teas, coffee, and refreshing drinks. Carefully curated with authentic flavors.",
};

async function getMenuSections(): Promise<MenuSection[]> {
  const url = process.env.SHEET_CSV_URL;
  if (!url) {
    throw new Error("SHEET_CSV_URL is not set");
  }

  const res = await fetch(url, {
    // Cache for 5 minutes, then revalidate in the background
    next: { revalidate: 300 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch menu: ${res.status}`);
  }

  const text = await res.text();
  return buildMenuSections(text);
}

export default async function MenuPage() {
  const sections = await getMenuSections();

  return (
    <div className="relative min-h-screen bg-linear-to-br from-primary/5 via-accent/8 to-primary/10 dark:from-primary/10 dark:via-accent/5 dark:to-primary/8">
      {/* Layered gradient overlays for depth */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.12),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.08),transparent_50%)]" />

      {/* Premium subtle texture */}
      <div className="pointer-events-none fixed inset-0 opacity-30 mix-blend-soft-light dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.05) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <MenuClient sections={sections} />
    </div>
  );
}
