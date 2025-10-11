import { HeroSection, AboutSection, ProjectsSection, ContactSection } from "@/components/sections";
import { TerminalSection } from "@/components/TerminalSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <TerminalSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}