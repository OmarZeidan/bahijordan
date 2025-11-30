"use client";

import { motion } from "framer-motion";
import { Map } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Divider } from "./subtle-divider";
import { Button } from "./ui/button";

import ImageSecond from "../public/images/image-chair-plant-p.jpg";
import ImageFirst from "../public/images/image-counter-p.jpg";
import { SITE_INFO } from "@/lib/constants";

export default function SectionStory() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative isolate bg-background py-20 text-foreground md:py-28 dark:bg-[#0f0b09]"
    >
      <div className="container-inner relative">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          {/* LEFT: main story card */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-primary-100/80 bg-white/80 p-8 backdrop-blur-sm md:p-10 dark:border-white/10 dark:bg-white/5"
          >
            {/* small shadow under the corner */}
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 h-24 w-24 [clip-path:polygon(100%_0,100%_100%,0_0)]  bg-linear-to-br from-primary/40 to-transparent opacity-40 pointer-events-none"
            />

            {/* subtle vertical accent bar */}
            <div
              aria-hidden="true"
              className="absolute inset-y-6 left-0 w-[3px] rounded-full bg-linear-to-b from-primary-700 via-primary-500 to-amber-400 dark:from-primary-300 dark:via-primary-200 dark:to-amber-300"
            />

            <div className="pl-6 md:pl-7 lg:pl-8 space-y-6">
              <p className="eyebrow">Our story</p>

              <div className="space-y-4">
                <h2 id="story-heading" className="section-heading">
                  A café shaped by memory,
                  <br className="hidden md:block" />
                  designed for the present.
                </h2>

                <p className="max-w-2xl text-[15px] leading-relaxed text-primary-900/85 dark:text-primary-50/85">
                  Bahi Café was created as a tribute to Amman’s golden era — the
                  warmth, elegance, and understated charm of the 1970s and
                  1980s. Those decades left behind a memory of a city rich with
                  character: terrazzo foyers, aged copper details, quiet
                  hospitality, and a rhythm of life that moved slower, more
                  intentionally. Bahi grew from that memory, grounded firmly in
                  the present, yet shaped by what the city once felt like.
                </p>

                <p className="max-w-2xl text-[15px] leading-relaxed text-primary-900/85 dark:text-primary-50/80">
                  When we opened in 2024, the goal wasn’t to replicate the past
                  — but to honor its atmosphere. We designed a space where light
                  falls softly across custom pieces, where textures feel
                  familiar, and where the pace encourages you to settle in
                  rather than hurry through. Whether you’re here to read, to
                  meet someone quietly, or simply to pause between the day’s
                  moments, Bahi is meant to feel lived-in, comforting, and
                  unmistakably Ammani.
                </p>

                <p className="max-w-2xl text-[15px] leading-relaxed text-primary-900/85 dark:text-primary-50/80">
                  The heartbeat of the café is Khader tea — brewed slow, poured
                  with care, and meant to anchor the table the way it once
                  anchored homes across the city. Playlists drift between old
                  recordings and contemporary sounds, echoing the blend of
                  nostalgia and modernity that defines Bahi. Here, time
                  stretches a little, conversations last longer, and afternoons
                  often slip gently into evening.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary-100/80 bg-white/70 px-4 py-3.5 text-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                  <p className="eyebrow-small">Ritual</p>
                  <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-primary-900 dark:text-primary-50">
                    Khader tea poured unhurried, tables treated as a second
                    living room.
                  </p>
                </div>
                <div className="rounded-2xl border border-primary-100/80 bg-white/70 px-4 py-3.5 text-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                  <p className="eyebrow-small">Atmosphere</p>
                  <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-primary-900 dark:text-primary-50">
                    Golden–era playlists, sunlit corners, and evenings that
                    settle into a warm glow.
                  </p>
                </div>
              </div>
            </div>
          </motion.article>

          {/* RIGHT: compact info + images */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
            className="flex flex-col gap-6"
          >
            {/* Info card */}
            <div className="rounded-3xl border border-white/20 bg-white/60 p-5 text-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary-900/70 dark:text-primary-50/80">
                    Bahi Café · Since 2024
                  </p>
                  <p className="text-sm font-semibold text-primary-900 dark:text-primary-50">
                    Shmeisani, Amman
                  </p>
                  <p className="text-xs leading-relaxed text-primary-900/75 dark:text-primary-50/75">
                    A Levantine café inspired by Amman&apos;s golden era —
                    khader tea, house-baked breads, and unhurried hospitality
                    from morning to late evening.
                  </p>
                </div>
              </div>

              <Divider />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <ul className="space-y-1.5 text-xs text-primary-900/80 dark:text-primary-50/80">
                  <li>• Khader tea ritual & seasonal brews</li>
                  <li>• Levantine comfort plates & sandwiches</li>
                  <li>• Quiet corners for reading & work</li>
                </ul>

                <Button variant={"outline"}>
                  <Map />
                  <Link
                    href={SITE_INFO.mapLocation}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View map
                    <span className="sr-only"> (opens in Google Maps)</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* NEW: staggered portrait images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-primary-100/70 bg-white/10 shadow-[0_16px_60px_-40px_rgba(0,0,0,0.5)] backdrop-blur dark:border-white/10">
                <Image
                  src={ImageFirst}
                  alt="Bahi Café - interio first image with counter"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-primary-100/70 bg-white/10 shadow-[0_16px_60px_-40px_rgba(0,0,0,0.5)] backdrop-blur  dark:border-white/10">
                <Image
                  src={ImageSecond}
                  alt="Bahi Café - image corridor"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
