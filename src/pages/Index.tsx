import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InsuranceSection from "@/components/InsuranceSection";
import PartnerCTASection from "@/components/PartnerCTASection";
import WaitTimeSection from "@/components/WaitTimeSection";
import ConcernsSection from "@/components/ConcernsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <InsuranceSection />
        <PartnerCTASection />
        <WaitTimeSection />
        <ConcernsSection />
        <WhyChooseSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
