import localFont from "next/font/local";

export const futuraMedium = localFont({
  src: [
    { path: "./fonts/FuturaBT-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/FuturaBT-Medium.woff", weight: "500", style: "normal" },
  ],
  variable: "--font-futura-medium",
  display: "swap",
});

export const righteous = localFont({
  src: [
    { path: "./fonts/Righteous-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Righteous-Regular.woff", weight: "400", style: "normal" },
  ],
  variable: "--font-righteous",
  display: "swap",
});

// Arabic Fonts
export const bahiArabicRegular = localFont({
  src: [
    { path: "./fonts/bahi-ar-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/bahi-ar-regular.woff", weight: "400", style: "normal" },
  ],
  variable: "--font-bahi-arabic-regular",
  display: "swap",
});

export const bahiArabicBold = localFont({
  src: [
    { path: "./fonts/bahi-ar-bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/bahi-ar-bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-bahi-arabic-bold",
  display: "swap",
});
