"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/data.nav";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { NavLink } from "./nav-item";

interface Props {
  activeId: string | null;
  pathname: string;
}
export default function MobileMenu({ activeId, pathname }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          id="openMenu"
          size={"icon"}
          variant="outline"
          className="md:hidden rounded-full border-primary-200/80 bg-background/80 text-primary-900/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-primary-100"
          aria-label="Open menu"
        >
          <MenuIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      {/* Content */}
      <SheetContent
        aria-describedby=""
        side="top"
        className={cn(
          "w-full border-b border-primary-200/50 dark:border-white/10",
          "bg-background/95 text-primary-900 dark:bg-[#0f0d0c]/95 dark:text-primary-50 backdrop-blur-xl",
          "rounded-b-3xl shadow-[0_18px_40px_-30px_rgba(0,0,0,0.45)]",
          "pt-[max(env(safe-area-inset-top),12px)] pb-6",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-top",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top"
        )}
      >
        {/* Header row inside the sheet */}
        <div className="container-inner flex h-12 items-center">
          <SheetTitle>
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center"
                aria-label="Bahi — Home"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-bahi-simple.svg"
                  alt="Bahi"
                  className="w-12 h-auto"
                />
              </Link>
            </SheetClose>
          </SheetTitle>
        </div>

        {/* Links */}
        <nav className="container-inner mt-2">
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            className="flex flex-col gap-1 divide-y divide-primary/10"
          >
            {navLinks.map((item) => (
              <motion.li
                key={item.href}
                variants={{
                  hidden: { y: 6, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
                className="block rounded-xl px-3 py-3 text-lg  text-center"
              >
                <SheetClose asChild>
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    activeId={activeId}
                    pathname={pathname}
                  />
                </SheetClose>
              </motion.li>
            ))}
          </motion.ul>

          {/* Primary action */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { y: -6, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { delay: 0.5 } },
            }}
            className="mt-4"
          >
            <SheetClose asChild>
              <Link href="/menu">
                <Button className="flex w-full items-center rounded-full">
                  Explore Our Menu
                </Button>
              </Link>
            </SheetClose>
          </motion.div>

          {/* Tiny footnote */}
          <p className="mt-3 text-xs text-primary-800/80 dark:text-primary-100/70">
            Khader tea ritual • House-baked breads • Shmeisani, Amman
          </p>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
