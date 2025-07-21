import { BlogSection } from "@/components/pages/home/blog-section";
import { FeatureSection } from "@/components/pages/home/feature-section";
import { HeroSection } from "@/components/pages/home/hero-section";
import { WhatSection } from "@/components/pages/home/what-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <WhatSection />
      <FeatureSection />
      <BlogSection />
    </div>
  );
}
