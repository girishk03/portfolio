import { Footer } from "@/components/Footer";
import { SingingAboutArtist } from "@/components/singing/SingingAboutArtist";
import { SingingPolaroidCarousel } from "@/components/singing/SingingPolaroidCarousel";
import { SingingHeroSection } from "@/components/singing/SingingHeroSection";
import { SingingPerformanceGallery } from "@/components/singing/SingingPerformanceGallery";
import { SingingBookingForm } from "@/components/singing/SingingBookingForm";
import singerHero from "@/assets/singer-hero.png";

const Singing = () => {
  return (
    <div
      className="min-h-screen overflow-x-hidden singing-theme mic-cursor"
    >
      <div className="fixed inset-0 z-0">
        <img
          src={singerHero}
          alt="Singer performing"
          className="h-full w-full object-cover object-center"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <main className="bg-background">
        <div className="relative z-10">
          <SingingHeroSection />
          <SingingPerformanceGallery />
          <SingingAboutArtist />
          <SingingPolaroidCarousel />
          <SingingBookingForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Singing;
