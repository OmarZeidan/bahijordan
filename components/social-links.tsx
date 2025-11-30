"use client";
import { SITE_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

type Item = {
  href: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const items: Item[] = [
  {
    href: SITE_INFO.socialLinks.facebook,
    label: "Facebook",
    Icon: (props) => (
      <svg
        viewBox="0 0 256 256"
        aria-hidden="true"
        fill="currentColor"
        {...props}
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
      </svg>
    ),
  },
  {
    href: SITE_INFO.socialLinks.instagram,
    label: "Instagram",
    Icon: (props) => (
      <svg
        viewBox="0 0 256 256"
        aria-hidden="true"
        fill="currentColor"
        {...props}
      >
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
      </svg>
    ),
  },
  {
    href: SITE_INFO.mapLocation,
    label: "Find us on Google Maps",
    Icon: (props) => (
      <svg
        viewBox="0 0 256 256"
        aria-hidden="true"
        fill="currentColor"
        {...props}
      >
        <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
      </svg>
    ),
  },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 mt-4", className)}>
      {items.map(({ href, label, Icon }, index) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
          className={cn(
            // large tap target + subtle chrome
            "group inline-flex h-11 w-11 items-center justify-center rounded-full dark:text-white",
            // motion & hover
            "transition will-change-transform hover:scale-105",
            "active:scale-95",
            // respect reduced motion
            "motion-reduce:transition-none motion-reduce:hover:scale-100"
          )}
        >
          <motion.div
            key={label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }} // start a bit before it fully enters
            custom={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2 + i * 0.12,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              }),
            }}
          >
            <Icon className="size-8 shrink-0 opacity-90 transition group-hover:opacity-100" />
          </motion.div>

          <span className="sr-only">{label}</span>
        </Link>
      ))}
    </div>
  );
}
