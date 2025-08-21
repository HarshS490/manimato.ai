import WidthWrapper from "@/components/layout/width-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Presentation } from "lucide-react";

const useCases = [
  {
    title: "Education",
    description:
      "Create engaging mathematical content for students and enhance learning experiences.",
    icon: GraduationCap,
    features: [
      "Interactive lessons",
      "Visual explanations",
      "Student engagement",
    ],
  },
  {
    title: "Research",
    description:
      "Visualize complex mathematical concepts and present research findings effectively.",
    icon: Users,
    features: [
      "Publication graphics",
      "Conference presentations",
      "Data visualization",
    ],
  },
  {
    title: "Content Creation",
    description:
      "Generate mathematical animations for educational videos and online courses.",
    icon: BookOpen,
    features: ["YouTube videos", "Online courses", "Educational content"],
  },
  {
    title: "Presentations",
    description:
      "Create professional mathematical presentations and demonstrations.",
    icon: Presentation,
    features: [
      "Business presentations",
      "Academic talks",
      "Client demonstrations",
    ],
  },
];

export function UseCasesSection() {
  return (
    <section className="py-24">
      <WidthWrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Built for every <span className="text-primary">use case</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From education to research, Manimato serves diverse mathematical
            visualization needs across industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase) => {
            const IconComponent = useCase.icon;
            return (
              <Card
                key={useCase.title}
                className="bg-card border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                    <ul className="space-y-1">
                      {useCase.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-muted-foreground flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
