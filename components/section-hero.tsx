"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      staggerChildren: 0.14,
      when: "beforeChildren",
      ease: [0.16, 0.84, 0.44, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 0.9, 0.4, 1],
    },
  },
};

export default function SectionHero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleDialogChange = (open: boolean) => {
    setVideoOpen(open);
    const player = heroVideoRef.current;
    if (!player) return;
    if (open) {
      player.pause();
    } else {
      player.play().catch(() => undefined);
    }
  };

  return (
    <section
      className="group relative isolate flex items-center overflow-hidden bg-linear-to-b from-background via-background/70 to-primary-100/30 text-primary-50 h-svh"
      aria-label="Bahi Café hero section"
    >
      {/* Media background */}
      <motion.div
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        {/* Mobile image */}
        <Image
          src="/images/image-hero-bahi.webp"
          alt="Inside Bahi Café in Amman"
          fill
          priority
          className="object-cover brightness-[0.9] contrast-[1.04] saturate-[1.12] hue-rotate-[2deg] md:hidden"
        />
        {/* Desktop video */}
        <video
          className="hidden h-full w-full object-cover brightness-[0.9] contrast-[1.04] saturate-[1.12] hue-rotate-[2deg] md:block"
          src="/videos/video-1-landscape-compressed.mp4"
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        {/* Soft vignette + gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/55 to-black/80 md:from-black/55 md:via-black/35 md:to-black/70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14)_0,transparent_55%)]" />

        {/* Retro glow orbs */}
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary-500/14 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-300/18 blur-3xl" />
      </motion.div>

      <div className="container-inner relative grid items-start gap-10 pt-[calc(var(--header-h)+26px)] pb-16 md:pt-[calc(var(--header-h)+34px)] md:pb-20 lg:pt-[calc(var(--header-h)+72px)] lg:pb-24">
        {/* Left: copy + CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="relative z-10 mx-auto flex max-w-7xl flex-col space-y-6 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            <p className="text-primary-50/90">
              Bahi Café · Shmeisani · Since 2024
            </p>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-[45px]/[52px] md:text-7xl/[75px] max-w-5xl font-black tracking-tight drop-shadow lg:text-7xl/[76px]"
          >
            Amman&apos;s golden era,&nbsp; <br className="hidden md:block" />
            <span className="text-amber-200">made for now.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base leading-relaxed text-primary-50/90 md:text-lg mx-auto"
          >
            A tribute to the 1970s and 1980s, built on memory and everyday
            rituals: Levantine comfort plates, house-baked breads and
            sandwiches, and tea that lingers longer than planned, anchored by
            khader tea (شاي مخدر). Terrazzo, copper, and soft light carry that
            rhythm into the space, shaping a calm, grounded atmosphere.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Button
              asChild
              size="2xl"
              className="rounded-full px-8 uppercase tracking-[0.18em] shadow-[0_18px_65px_-38px_rgba(0,0,0,0.95)]"
              variant="static"
            >
              <Link href="/menu">Explore our menu</Link>
            </Button>

            <Dialog open={videoOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button
                  size="2xl"
                  variant="static-outline"
                  className="group rounded-full border-white/60 bg-white/10 px-8 text-primary-50 hover:border-white hover:bg-white/16"
                >
                  <span className="flex items-center gap-3 uppercase tracking-[0.18em]">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-primary-900 shadow-sm transition duration-200 group-hover:scale-[1.06] group-hover:bg-white">
                      <Play className="h-3.5 w-3.5 fill-primary-900" />
                    </span>
                    Play the video
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[min(calc(100vw-48px),1280px)] max-w-none border-none bg-black/95 p-0 shadow-2xl sm:max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl">
                  <DialogTitle className="sr-only">
                    Bahi Café hero video
                  </DialogTitle>
                  <video
                    className="aspect-video h-full w-full"
                    controls
                    autoPlay
                    preload="metadata"
                    playsInline
                    poster="/images/image-hero-bahi.webp"
                  >
                    <source
                      src="/videos/video-1-landscape.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-50/75"
          >
            {[
              "Khader tea ritual",
              "House-baked breads",
              "Terrazzo & copper",
              "Slow mornings, late evenings",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/18 bg-black/25 px-3 py-1.5 backdrop-blur"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Only for the sake of active items on the header -- see site-header.tsx */}
      <section id="top-sentinel" aria-hidden="true" className="h-px" />
    </section>
  );
}
