// app/menu/page.tsx
import { buildMenuSections } from "@/lib/parseMenuCsv";
import { MenuSection } from "@/types/menu";
import { MenuClient } from "./menu-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getMenuSections(): Promise<MenuSection[]> {
  const url = process.env.SHEET_CSV_URL;
  if (!url) {
    throw new Error("SHEET_CSV_URL is not set");
  }

  const res = await fetch(url, {
    // For published Google Sheet CSV, this is fine:
    // if you lock it down, you may need API auth here
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch menu: ${res.status}`);
  }

  const text = await res.text();
  return buildMenuSections(text);
}

export default async function MenuPage() {
  const sections = await getMenuSections();

  return <MenuClient sections={sections} />;
}
