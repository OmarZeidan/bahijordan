"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Timer, Waves } from "lucide-react";

const principles = [
  {
    icon: Heart,
    title: "Hospitality rooted in home",
    text: "Welcomes are warm and natural. Service is attentive, human, and unforced, leaving space for conversation, laughter, and shared moments around the table.",
  },
  {
    icon: Timer,
    title: "Food meant to be shared",
    text: "Plates arrive to be passed and revisited. Drinks and desserts draw from familiar local flavors, from khader tea to sweets meant to be shared at the table.",
  },
  {
    icon: Sparkles,
    title: "Craft you feel",
    text: "Materials and finishes are chosen for durability and use. Copper, wood, terrazzo, careful plating, and light come together with intention.",
  },
  {
    icon: Waves,
    title: "Ease in motion",
    text: "The room is arranged for movement, overlap, and gathering. Easy flow between tables, open seating, and music that stays present but never dominant, keeping the space active and connected.",
  },
];

export default function SectionPhilosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="relative bg-white py-24 text-foreground md:py-32 lg:py-40 dark:bg-[#090806]"
    >
      <div className="container-inner relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 xl:gap-20">
          {/* Header Section - Right Side on Desktop, Top on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center space-y-6 lg:order-2 lg:sticky lg:top-24 lg:self-start"
          >
            <p className="eyebrow">Philosophy</p>

            <h2 id="philosophy-heading" className="section-heading">
              Built around the table.
            </h2>

            <p className="section-description">
              Everything at Bahi is shaped around the table and the people it
              brings together. Shared food, familiar rituals, and the natural
              pull of good company guide how the café works, day after day.
            </p>
          </motion.div>

          {/* Principles Grid - Left Side on Desktop, Bottom on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:order-1"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
              {principles.map(({ icon: Icon, title, text }, index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group relative"
                >
                  {/* Card Container - Smaller and Calmer */}
                  <div className="relative h-full overflow-hidden rounded-2xl border border-primary-200/50 bg-white/40 p-5 dark:border-white/10 dark:bg-black/20 md:p-6">
                    {/* Icon - Smaller */}
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100/40 text-primary-700 transition-all duration-300 group-hover:bg-primary-200/50 dark:bg-white/[0.05] dark:text-primary-100 dark:group-hover:bg-white/[0.08]">
                      <Icon
                        className="h-5 w-5"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Title - Smaller */}
                    <h3 className="mb-3 text-base font-semibold tracking-tight text-primary-900 dark:text-primary-50">
                      {title}
                    </h3>

                    {/* Description - Smaller */}
                    <p className="text-sm leading-relaxed text-primary-900/70 dark:text-primary-50/65">
                      {text}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
