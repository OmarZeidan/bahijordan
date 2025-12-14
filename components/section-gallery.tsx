"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_INFO } from "@/lib/constants";

const images = [
  {
    src: "/images/image-gallery-1.jpg",
    alt: "Bahi counter with warm copper lighting",
    layout: "square",
  },
  {
    src: "/images/image-gallery-p-1.jpg",
    alt: "Cozy seating area with plants",
    layout: "portrait",
  },
  {
    src: "/images/image-hero-bahi.webp",
    alt: "Reception area details",
    layout: "square",
  },
  {
    src: "/images/image-gallery-p-2.jpg",
    alt: "Natural light and greenery",
    layout: "portrait",
  },
  {
    src: "/images/image-gallery-2.jpg",
    alt: "Interior design elements",
    layout: "square",
  },
  {
    src: "/images/image-gallery-3.jpg",
    alt: "Welcoming atmosphere",
    layout: "square",
  },
  {
    src: "/images/image-gallery-p-3.jpg",
    alt: "Relaxing corner with vintage art",
    layout: "portrait",
  },
  {
    src: "/images/image-counter.jpg",
    alt: "Warm ambience and terrazzo floors",
    layout: "square",
  },
];

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function SectionGallery() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Eyebrow & heading */}
        <div className="mb-10 space-y-3">
          <p className="eyebrow">The Gallery</p>
          <h2 className="section-heading">Inside Bahi</h2>
          <p className="section-description">
            Corners, counters, and in-between moments, a glimpse of how the room
            holds quiet work, slow mornings, and late conversations.
          </p>
        </div>

        {/* Masonry gallery with CSS columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="columns-2 gap-3 md:columns-3 md:gap-4 [column-fill:balance]"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.src + index}
              variants={itemVariants}
              className="mb-3 break-inside-avoid md:mb-4"
            >
              <figure className="group relative overflow-hidden rounded-lg">
                <div
                  className={
                    image.layout === "portrait" ? "aspect-3/4" : "aspect-square"
                  }
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />

                    {/* Elegant overlay on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              </figure>
            </motion.div>
          ))}

          {/* Instagram link box */}
          <motion.div
            variants={itemVariants}
            className="mb-3 break-inside-avoid md:mb-4"
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <Link
                href={SITE_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-linear-to-br from-primary-900 to-primary-950 transition-all duration-500 hover:from-primary-950 hover:to-black dark:from-primary-950 dark:to-black"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <InstagramIcon className="size-14 text-white/90" />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-medium text-white">See More</p>
                    <p className="text-sm text-white/60">@bahi.amman</p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-linear-to-tr from-primary-700/0 via-primary-600/0 to-primary-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
