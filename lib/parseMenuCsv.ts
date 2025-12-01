// lib/parseMenuCsv.ts
import { MenuRow, MenuSection, MenuItem } from "@/types/menu";

function parseCsv(text: string): MenuRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];

  const headers = splitCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const cols = splitCsvLine(line);
    const row: any = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return row as MenuRow;
  });
}

// basic CSV line splitter with quotes support
function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map((v) => v.trim());
}

export function buildMenuSections(text: string): MenuSection[] {
  const rows = parseCsv(text);

  const bySection = new Map<string, MenuSection>();

  for (const row of rows) {
    const sectionId = row.section_id || row.section_en || "misc";

    if (!bySection.has(sectionId)) {
      const order = row.section_order ? Number(row.section_order) : 999;
      bySection.set(sectionId, {
        id: sectionId,
        titleEn: row.section_en || "",
        titleAr: row.section_ar || "",
        eyebrowEn: row.section_eyebrow_en || "",
        eyebrowAr: row.section_eyebrow_ar || "",
        order: isNaN(order) ? 999 : order,
        items: [],
      });
    }

    // If row has no item name, skip (some people like to keep section-only rows)
    if (!row.name_en?.trim()) continue;

    const itemOrder = row.item_order ? Number(row.item_order) : 999;

    const item: MenuItem = {
      nameEn: row.name_en,
      nameAr: row.name_ar,
      descEn: row.desc_en,
      descAr: row.desc_ar,
      price: row.price,
      badge: row.badge,
      isSmaller: String(row.isSmaller || "").toLowerCase() === "true",
      available:
        row.available === undefined || row.available === ""
          ? true
          : String(row.available).toLowerCase() === "true",
      itemOrder: isNaN(itemOrder) ? 999 : itemOrder,
    };

    bySection.get(sectionId)!.items.push(item);
  }

  return Array.from(bySection.values())
    .map((section) => ({
      ...section,
      items: section.items
        .slice()
        .sort(
          (a, b) =>
            a.itemOrder - b.itemOrder || a.nameEn.localeCompare(b.nameEn)
        ),
    }))
    .sort((a, b) => a.order - b.order || a.titleEn.localeCompare(b.titleEn));
}
