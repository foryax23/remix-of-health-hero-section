import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SocialProofBar from "@/components/SocialProofBar";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import PricingCTA from "@/components/PricingCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SocialProofBar />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <StatsSection />
      <PricingCTA />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
