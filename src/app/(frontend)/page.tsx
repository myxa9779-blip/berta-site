import { ContactSection } from "@/components/sections/ContactSection";
import { HomeHero } from "@/components/sections/HomeHero";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { SystemsShowcase } from "@/components/sections/SystemsShowcase";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SystemsShowcase />
      <SolutionsSection />
      <ContactSection />
    </>
  );
}
