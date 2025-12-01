// types/menu.ts
export type MenuRow = {
  section_en: string;
  section_ar: string;
  section_id: string;
  section_eyebrow_en?: string;
  section_eyebrow_ar?: string;
  section_order?: string;
  item_order?: string;
  name_en: string;
  name_ar?: string;
  desc_en?: string;
  desc_ar?: string;
  price?: string;
  badge?: string;
  isSmaller?: string;
  available?: string;
};

export type MenuItem = {
  nameEn: string;
  nameAr?: string;
  descEn?: string;
  descAr?: string;
  price?: string;
  badge?: string;
  isSmaller: boolean;
  available: boolean;
  itemOrder: number;
};

export type MenuSection = {
  id: string;
  titleEn: string;
  titleAr?: string;
  eyebrowEn?: string;
  eyebrowAr?: string;
  order: number;
  items: MenuItem[];
};
