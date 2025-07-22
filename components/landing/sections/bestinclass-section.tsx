import { Check } from "lucide-react"
import contentData from "@/data/content.json"
import { MathVisual } from "@/components/visuals/math-visuals"

export function BestInClassSection() {
  const { bestInClass } = contentData

  return (
    <section className="py-32">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold">
                Best-in-class mathematical
                <br />
                <span className="text-accent">code generation</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Powered by advanced AI models, Manimato generates clean, optimized Python code for complex mathematical
                visualizations. From simple equations to advanced 3D surfaces.
              </p>
            </div>

            <div className="space-y-4">
              {bestInClass.capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-gray-900 border border-gray-800"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-gray-300 font-medium text-lg">{capability.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <MathVisual type="feature1" />
          </div>
        </div>
      </div>
    </section>
  )
}
