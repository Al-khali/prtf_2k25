import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Expertise from "@/components/Expertise";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 md:px-16 lg:px-24 gap-y-8">
      <Hero />
      <Projects />
      <Expertise />
      <Contact />
    </main>
  );
}