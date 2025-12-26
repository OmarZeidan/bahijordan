import Footer from "@/components/site-footer";
import Header from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import {
  bahiArabicBold,
  bahiArabicRegular,
  futuraMedium,
  righteous,
} from "./fonts";
import "./globals.css";

const siteName = "Bahi Café";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
const defaultTitle = `${siteName} | Retro-inspired café in Shmeisani, Amman`;
const siteDescription =
  "Retro-inspired café in Shmeisani serving Levantine comfort plates, house-baked breads, and khader tea in warm terrazzo and copper interiors.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Bahi Café",
    "Bahi Cafe",
    "Shmeisani café",
    "Amman restaurants",
    "Jordan coffee shops",
    "Khader tea",
    "Levantine comfort food",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultTitle,
    description: siteDescription,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
  },
  category: "hospitality",
};

const footerNote =
  "Bahi is a Shmeisani love letter to Amman’s 70s and 80s golden era, retro interiors, Levantine comfort plates, house-baked breads, and slow khader tea made for lingering.";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${futuraMedium.variable} ${futuraMedium.className} ${righteous.variable} ${bahiArabicRegular.variable} ${bahiArabicBold.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main id="main-content">{children}</main>
          <Footer footerNote={footerNote} />
        </ThemeProvider>
      </body>
    </html>
  );
}
