import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, Play, Code2 } from "lucide-react";
import featuresData from "@/data/features.json";
import WidthWrapper from "@/components/layout/width-wrapper";

const iconMap = {
  Zap,
  Play,
  Code2,
};

export function FeaturesSection() {
  return (
    <section className="py-32 bg-secondary">
      <WidthWrapper>
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-5xl lg:text-7xl font-bold">
            Built for <span className="text-primary">precision</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our advanced AI system generates clean, optimized Python code for
            complex mathematical visualizations and animations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <Card
                key={feature.id}
                className="bg-card border-border hover:border-muted transition-all duration-300 group"
              >
                <CardContent className="p-10 space-y-8">
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                    <IconComponent className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    <button className="flex items-center text-primary hover:text-primary/80 group-hover:translate-x-1 transform transition-transform">
                      <span className="font-medium text-lg">
                        {feature.link}
                      </span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </WidthWrapper>
    </section>
  );
}
