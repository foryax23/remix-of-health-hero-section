import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturesSection />
    </main>
  );
};

export default Index;
