import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import ProjectsGallery from "@/components/ProjectsGallery";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/contentful";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <ParticleBackground />
      <Header />
      <main className="relative z-10 pt-28 md:pt-24">
        <HeroSection />
        <Timeline />
        <ProjectsGallery projects={projects} />
        <TechnicalArsenal />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
