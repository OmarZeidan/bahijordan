"use client";
import Link from "next/link";
import { SocialLinks } from "./social-links";
import { Border } from "./ui/border";
import { SVGLogo } from "./logo-svg";

export default function Footer({ footerNote }: { footerNote: string }) {
  return (
    <footer className="relative overflow-hidden w-full border-t backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 text-gray-800 dark:text-primary-50 before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary-50/30 before:to-transparent before:pointer-events-none dark:before:from-primary-900/20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/">
            <SVGLogo width={82} />
          </Link>
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed ">
          {footerNote}
        </p>
        <SocialLinks />
      </div>
      <Border className="dark:invert" />
      <div className="container-inner py-4 text-center text-sm  text-primary-500 dark:text-primary-50">
        <Link href="/">Bahi</Link> ©{new Date().getFullYear()}. All rights
        reserved.
      </div>
    </footer>
  );
}
