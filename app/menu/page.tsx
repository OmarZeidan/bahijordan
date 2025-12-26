// app/menu/page.tsx
import { buildMenuSections } from "@/lib/parseMenuCsv";
import { MenuSection } from "@/types/menu";
import { MenuClient } from "./menu-client";
import { Metadata } from "next";

// Revalidate every 5 minutes instead of on every request
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Menu | Bahi Café",
  description:
    "Explore our menu featuring fresh salads, soups, sandwiches, omelettes, desserts, specialty teas, coffee, and refreshing drinks. Carefully curated with authentic flavors.",
};

async function getMenuSections(): Promise<MenuSection[]> {
  const url = process.env.SHEET_CSV_URL;
  if (!url) {
    throw new Error("SHEET_CSV_URL is not set");
  }

  const res = await fetch(url, {
    // Cache for 5 minutes, then revalidate in the background
    next: { revalidate: 300 },
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
    <div className="relative min-h-screen">
      <MenuClient sections={sections} />
    </div>
  );
}
