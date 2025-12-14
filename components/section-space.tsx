"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SectionSpace() {
  const details = [
    {
      title: "Morning",
      text: "Coffee orders stack up early, familiar faces settle into their tables, and the room fills gradually with conversation and movement.",
    },
    {
      title: "Midday",
      text: "Sunlight moves across the room as tables fill and clear. Comfort plates circulate, sandwiches are passed across the table, and meals stretch beyond their original plan.",
    },
    {
      title: "Afternoon",
      text: "The light softens and stretches, visits linger, desserts begin to appear, and tea becomes the anchor of the table.",
    },
    {
      title: "Evening",
      text: "Lower light, warmer tones, last coffees, sweets, and conversations that carry on without urgency.",
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
            A room that holds the day.
          </h2>

          <p className="section-description">
            Bahi is designed as a space that moves with the day. Mornings bring
            light and movement, afternoons gather energy around shared tables,
            and evenings settle into warmth without losing their pulse. It is a
            room made for people, conversation, and return visits.
          </p>
          <p className="section-description text-base">
            Terrazzo floors, copper details, and layered textures give the space
            weight and familiarity. The counter remains part of the room, with
            coffee pulled to order, tea brewed throughout the day, and the
            rhythm of the café always visible.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {details.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Card Container - Smaller and Calmer */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-primary-200/50 bg-white/40 p-5 dark:border-white/10 dark:bg-black/20 md:p-6">
                  {/* Title */}
                  <h3 className="mb-3 text-base font-semibold tracking-tight text-primary-900 dark:text-primary-50">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-primary-900/70 dark:text-primary-50/65">
                    {item.text}
                  </p>
                </div>
              </motion.article>
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
