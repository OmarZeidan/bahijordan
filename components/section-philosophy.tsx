"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Timer, Waves } from "lucide-react";

const principles = [
  {
    icon: Heart,
    title: "Hospitality rooted in home",
    text: "Warmth that feels like gathering around the table — friendly welcomes, quiet smiles, and the comfort of shared stories over food.",
  },
  {
    icon: Timer,
    title: "Time for savoring",
    text: "Meals, moments, conversations — unhurried, slow-brewed khader tea, un-rushed lingering, and plates meant to be shared over good company.",
  },
  {
    icon: Sparkles,
    title: "Craft you sense, not just see",
    text: "Soft copper tones, hand-finished wood, careful plating, subtle lighting — gentle touches that bring the room to life without shouting for attention.",
  },
  {
    icon: Waves,
    title: "Rhythm & ease",
    text: "Clear paths, open seating, calm corners and soft background music — a space where movement, conversation and comfort flow effortlessly.",
  },
];

export default function SectionPhilosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="relative border-y border-primary-100/60 bg-white py-16 text-foreground md:py-24 dark:border-white/5 dark:bg-[#090806]"
    >
      <div className="container-inner relative grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-5"
        >
          <p className="eyebrow">Philosophy</p>

          <h2 id="philosophy-heading" className="section-heading">
            A slower rhythm for everyday life.
          </h2>

          <p className="section-description">
            Bahi is designed to feel quietly familiar: a place where the pace
            softens, conversations stretch a little longer, and the details fade
            into the background so you can simply be present at the table.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {principles.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex h-full flex-col gap-3 rounded-xl border border-primary-100 bg-white p-4 text-left transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-black"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-100 text-primary-700 dark:border-white/15 dark:text-primary-100">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-800 dark:text-primary-50">
                  {title}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-primary-900/80 dark:text-primary-50/75">
                {text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
