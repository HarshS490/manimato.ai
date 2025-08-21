import WidthWrapper from "@/components/layout/width-wrapper";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24">
      <WidthWrapper>
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 lg:p-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Ready to bring your math to life?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of educators, researchers, and content creators who
              trust Manimato for their mathematical visualization needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Start creating for free
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
        </div>
      </WidthWrapper>
    </section>
  );
}
