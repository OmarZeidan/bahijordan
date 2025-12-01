"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Divider } from "@/components/subtle-divider";
import Link from "next/link";
import { SITE_INFO } from "@/lib/constants";

const contacts = [
  {
    icon: Mail,
    title: "Say hello",
    text: "We’ll answer your message as soon as we can.",
    value: SITE_INFO.emailAddress,
    href: `mailto:${SITE_INFO.emailAddress}`,
  },
  {
    icon: Phone,
    title: "Call us directly",
    text: "For quick questions during opening hours.",
    value: SITE_INFO.phoneNumber,
    href: `tel:${SITE_INFO.phoneNumber}`,
  },
  {
    icon: MapPin,
    title: "Visit Bahi",
    text: "Find us in Shmeisani, Amman.",
    value: "Al-Shariaah College St. 14",
    href: SITE_INFO.mapLocation,
  },
  {
    icon: Clock,
    title: "Opening hours",
    text: "Drop by whenever it feels right.",
    value: [
      "Saturday – Thursday: 7:00 AM – 11:30 PM",
      "Friday: 7:00 AM – prayer time",
      "Friday: after Friday’s prayer – 11:30 PM",
      "Sunday: 7:00 AM – 12:30 AM",
    ],
  },
];

export default function SectionConnect() {
  return (
    <section
      id="connect"
      className="relative isolate overflow-hidden bg-white py-16 text-foreground md:py-24 dark:bg-[#0d0b09]"
      aria-labelledby="connect-heading"
    >
      <div className="container-inner relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-4"
        >
          <p className="eyebrow">Connect with us</p>
          <h2 id="connect-heading" className="section-heading">
            We’re happy to hear from you.
          </h2>
          <p className="section-description">
            Questions, feedback, or a kind word—reach us anytime. Use the
            details below or drop by to say hello.
          </p>

          <div className="grid gap-3 rounded-3xl border border-primary-200/60 bg-white/80 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map(({ icon: Icon, title, text, value, href }) => {
                const valueIsArray = Array.isArray(value);
                return (
                  <div
                    key={title}
                    className="flex h-full flex-col gap-1 rounded-2xl p-2.5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:text-primary-100">
                      {title}
                    </p>
                    <p className="text-sm text-primary-900/70 dark:text-primary-50/70">
                      {text}
                    </p>
                    <div className="mt-2 flex items-start gap-2">
                      <Icon
                        className="mt-0.5 h-4 w-4 text-primary-600 dark:text-primary-100"
                        aria-hidden
                      />
                      {href ? (
                        <Link
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http") ? "noreferrer" : undefined
                          }
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary-800 transition hover:text-primary-700 dark:text-primary-50 dark:hover:text-primary-50"
                        >
                          {value}
                          {href.startsWith("http") && (
                            <span className="sr-only"> (opens in maps)</span>
                          )}
                        </Link>
                      ) : valueIsArray ? (
                        <div className="space-y-1 text-xs font-medium text-primary-800/80 dark:text-primary-50/70">
                          {(value as string[]).map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-primary-900/90 dark:text-primary-50/80">
                          {value as string}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex justify-center lg:justify-end lg:justify-self-end"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-[420px] overflow-hidden rounded-[28px] border border-primary-200/70 bg-white/90 px-6 pb-8 pt-10 backdrop-blur dark:border-white/10 dark:bg-[#15100d]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-0.5 rounded-[30px] bg-[conic-gradient(from_120deg,#f6c453_0deg,#f1d6c2_90deg,#b23535_210deg,#f6c453_360deg)] opacity-35 blur-[1px] animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
            />
            <div className="relative z-10">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white/80 p-6 shadow-[0_10px_32px_-26px_rgba(0,0,0,0.35)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-bahi-simple.svg"
                  alt="Bahi Café logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-5 space-y-2 text-center">
                <p className="text-sm uppercase tracking-[0.18em] text-primary-800/80 dark:text-primary-50/70">
                  Bahi Café
                </p>
                <p className="text-lg font-semibold text-primary-900 dark:text-primary-50">
                  Amman
                </p>
                <p className="text-sm text-primary-900/70 dark:text-primary-50/70">
                  Drop by for tea, stay for the stories.
                </p>
              </div>
              <Divider />
              <div className="mt-4 space-y-3 text-center">
                <p className="text-sm text-primary-900/75 dark:text-primary-50/75">
                  Planning a visit or need a hand with details?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 dark:bg-amber-300 dark:text-primary-900 dark:hover:bg-amber-200 dark:focus-visible:outline-amber-200"
                >
                  Contact us
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
