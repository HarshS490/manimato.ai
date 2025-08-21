import WidthWrapper from "@/components/layout/width-wrapper";
import { Button } from "@/components/ui/button";
import { Hero3DVisual } from "@/components/visuals/hero-3d-visuals";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 lg:py-32">
      <WidthWrapper>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                The mathematical
                <br />
                <span className="text-primary">animation platform</span>
                <br />
                for developers
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Generate Python code for mathematical visualizations and
                animations with AI precision. Build and deploy GenAI in
                mission-critical applications.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Try for free
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground group"
              >
                Book a demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* 3D Visual */}
          <div className="relative h-96 lg:h-[500px]">
            <Hero3DVisual />
          </div>
        </div>
      </WidthWrapper>
    </section>
  );
}
