import WidthWrapper from "@/components/layout/width-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Edit3, Cpu, Download } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Write Your Math",
    description:
      "Input your mathematical equations, formulas, or concepts using natural language or LaTeX notation.",
    icon: Edit3,
  },
  {
    id: 2,
    title: "AI Processing",
    description:
      "Our advanced AI analyzes your input and generates optimized Python code with Manim animations.",
    icon: Cpu,
  },
  {
    id: 3,
    title: "Export & Use",
    description:
      "Download your generated code, preview animations, and integrate into your projects seamlessly.",
    icon: Download,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-secondary">
      <WidthWrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">How it works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your mathematical concepts into beautiful animations in
            three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative">
                <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-primary">
                        STEP {step.id}
                      </div>
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </WidthWrapper>
    </section>
  );
}
