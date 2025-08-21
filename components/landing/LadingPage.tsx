import { CompanyLogos } from "./sections/company-logos";
import { CTASection } from "./sections/cta-section";
import { ExamplesSection } from "./sections/examples-section";
import { FeaturesSection } from "./sections/features-section";
import { Footer } from "./sections/footer-section";
import { Header } from "./sections/header";
import { HeroSection } from "./sections/hero-section";
import { HowItWorksSection } from "./sections/how-it-works-section";
import { TryModelsSection } from "./sections/try-models-section";
import { UseCasesSection } from "./sections/use-cases-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <CompanyLogos />
      <TryModelsSection />
      <HowItWorksSection />
      <ExamplesSection />
      <UseCasesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
