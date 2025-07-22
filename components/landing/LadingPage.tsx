"use client";

import { BestInClassSection } from "./sections/bestinclass-section";
import { CompanyLogos } from "./sections/company-logos";
import { CTASection } from "./sections/cta-section";
import { ExamplesSection } from "./sections/examples-section";
import { FAQSection } from "./sections/faq-sectiont";
import { FeaturesSection } from "./sections/features-section";
import { Footer } from "./sections/footer-section";
import { Header } from "./sections/header";
import { HeroSection } from "./sections/hero-section";
import { Navigation } from "./sections/navigation";

export default function LandingPage() {
  const handleGetStarted = () => {
    // Navigate to the main app
    window.location.href = "/";
  };

  const handleSignIn = () => {
    // Navigate to sign in
    console.log("Navigate to sign in");
  };

  const handleWatchDemo = () => {
    // Open demo video
    console.log("Open demo video");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 text-gray-100">
      <Header />
      <HeroSection />
      <CompanyLogos />
      <ExamplesSection />
      <BestInClassSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
