"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SectionSpace() {
  const details = [
    {
      title: "Morning light",
      text: "Quiet tables, notebooks, first coffees, and soft playlists that stay in the background.",
    },
    {
      title: "Afternoon rhythm",
      text: "A gentle hum of conversation, working lunches, and long, steady pours of tea and coffee.",
    },
    {
      title: "Evening glow",
      text: "Dimmed lights, warmer tones, and a slower cadence for desserts, last sips, and unhurried talk.",
    },
    {
      title: "At the counter",
      text: "Espresso pulled to order, tea brewed with care, and a front-row seat to the daily flow.",
    },
  ];

  return (
    <section
      id="space"
      aria-labelledby="space-heading"
      className="relative border-y border-primary-100/60 bg-white/60 py-16 text-foreground md:py-24 dark:border-white/5 dark:bg-[#090806]"
    >
      <div className="container-inner relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* LEFT: copy & details */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <p className="eyebrow">The Space</p>

          <h2 id="space-heading" className="section-heading">
            A calm interior shaped by light and texture.
          </h2>

          <p className="section-description">
            From the gentle brightness of morning to the warm tones of evening,
            Bahi shifts throughout the day, a steady, lived-in room with corners
            to think, read, meet, or simply settle into the quiet.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {details.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col gap-2 rounded-xl border border-primary-100 bg-white px-4 py-3 text-left transition-transform duration-150 hover:-translate-y-px dark:border-white/10 dark:bg-black"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-800 dark:text-primary-50">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-primary-900/80 dark:text-primary-50/75">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: single large portrait image */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative h-full"
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary-100 bg-black/5 dark:border-white/10 dark:bg-black/40 aspect-3/4">
            <Image
              src="/images/image-rounded-chair-p.jpg"
              alt="A calm portrait corner inside Bahi Café with a chair and plant"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 460px, 90vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
