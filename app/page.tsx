"use client";

import SectionSpace from "@/components/section-space";
import SectionHero from "@/components/section-hero";
import SectionPhilosophy from "@/components/section-philosophy";
import SectionStory from "@/components/section-story";

export default function Home() {
  return (
    <>
      <SectionHero />
      <SectionStory />
      <SectionSpace />
      <SectionPhilosophy />
    </>
  );
}
