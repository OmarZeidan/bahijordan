interface NavProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
  label: string;
  activeId: string | null;
  pathname: string;
}
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

export const NavLink = forwardRef<HTMLAnchorElement, NavProps>(
  ({ href, label, activeId, pathname, className, ...props }, ref) => {
    const isHome = pathname === "/";
    const isAnchor = href.startsWith("/#");
    const anchorId = isAnchor ? href.slice(2) : null;

    // active if: exact route match OR (we're on home and anchor id matches observed section)
    const isActive =
      pathname === href || (isHome && isAnchor && anchorId === activeId);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full px-3.5 py-2 text-sm font-semibold tracking-[0.06em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60",
          isActive
            ? "bg-primary-600 text-primary-50 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.65)] dark:bg-primary-500/85"
            : "text-primary-900/80 hover:text-primary-900 hover:bg-primary-50/80 dark:text-primary-100/80 dark:hover:text-primary-50 dark:hover:bg-primary-500/10",
          className,
        )}
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        {label}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";
