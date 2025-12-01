"use client";

import SectionConnect from "@/components/section-connect";
import SectionGallery from "@/components/section-gallery";
import SectionHero from "@/components/section-hero";
import SectionPhilosophy from "@/components/section-philosophy";
import SectionSpace from "@/components/section-space";
import SectionStory from "@/components/section-story";

export default function Home() {
  return (
    <>
      <SectionHero />
      <SectionStory />
      <SectionSpace />
      <SectionPhilosophy />
      <SectionGallery />
      <SectionConnect />
    </>
  );
}
