import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Play, Code2, Zap } from "lucide-react";
import { ExampleVisual } from "@/components/visuals/example-visuals";
import WidthWrapper from "@/components/layout/width-wrapper";

const models = [
  {
    id: "equation-solver",
    title: "Equation Solver",
    description: "Transform algebraic equations into visual representations",
    icon: Code2,
    visual: "fourier" as const,
  },
  {
    id: "3d-plotter",
    title: "3D Surface Plotter",
    description: "Generate complex 3D mathematical surfaces and plots",
    icon: Zap,
    visual: "surface" as const,
  },
  {
    id: "animation-engine",
    title: "Animation Engine",
    description: "Create dynamic mathematical animations and transitions",
    icon: Play,
    visual: "parametric" as const,
  },
];

export function TryModelsSection() {
  return (
    <section className="py-24">
      <WidthWrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Try models + APIs
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Play around with mathematical visualizations or generate sample
            code. Explore how our mathematical understanding models work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {models.map((model) => {
            const IconComponent = model.icon;
            return (
              <Card
                key={model.id}
                className="bg-card border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {model.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {model.description}
                  </p>
                  <div className="h-32 bg-muted rounded-lg overflow-hidden">
                    <ExampleVisual type={model.visual} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  Try Your Math
                </Button>
                <Button size="sm" variant="outline">
                  Calculus
                </Button>
                <Button size="sm" variant="outline">
                  Algebra
                </Button>
                <Button size="sm" variant="outline">
                  Geometry
                </Button>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-muted-foreground">
                  EQUATION
                </label>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <p>
                    Type your mathematical equation here, and Manimato will turn
                    it into a realistic visual animation.
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    AI matches what is written with how it should be visualized
                    so your output looks natural and high-quality.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">180 / 2,000</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Show Animation Preview
                </span>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Generate Animation
                </Button>
              </div>
              <div className="h-64 bg-muted rounded-lg overflow-hidden">
                <ExampleVisual type="matrix" />
              </div>
              <Button
                variant="ghost"
                className="w-full text-primary hover:text-primary/80"
              >
                Explore More Examples →
              </Button>
            </div>
          </div>
        </div>
      </WidthWrapper>
    </section>
  );
}
