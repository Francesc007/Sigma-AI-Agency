import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ForWhoSection } from "@/components/home/ForWhoSection";
import { PartnersLogoMarquee } from "@/components/home/PartnersLogoMarquee";
import { ReadyToTalkSection } from "@/components/home/ReadyToTalkSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <ProjectsSection />
      <ForWhoSection />
      <PartnersLogoMarquee />
      <ReadyToTalkSection />
    </>
  );
}
