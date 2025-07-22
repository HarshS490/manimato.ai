import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import examplesData from "@/data/examples.json"
import { ExampleVisual } from "@/components/visuals/example-visuals"

export function ExamplesSection() {
  return (
    <section id="examples" className="py-32">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-5xl lg:text-7xl font-bold">
            Mathematical concepts
            <br />
            <span className="text-accent">brought to life</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            See how Manimato transforms complex mathematical ideas into beautiful, interactive visualizations with
            AI-generated Python code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examplesData.map((example) => (
            <Card
              key={example.id}
              className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-8 space-y-6">
                <div className="h-48 bg-gray-800 rounded-lg relative overflow-hidden">
                  <ExampleVisual type={example.visual as any} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-teal-400 transition-colors">{example.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{example.description}</p>
                </div>
                <div className="flex items-center text-teal-400 group-hover:text-teal-300 transition-colors">
                  <span className="font-medium">Generate code</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
