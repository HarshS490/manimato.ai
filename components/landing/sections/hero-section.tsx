import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import contentData from "@/data/content.json"
import { Hero3DVisual } from "@/components/visuals/hero-3d-visuals"

export function HeroSection() {
  const { hero } = contentData

  return (
    <section className="py-16 lg:py-20 min-h-[85vh] flex items-center">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                The AI-powered
                <br />
                <span className="text-accent">mathematical</span>
                <br />
                animation platform
              </h1>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
                Generate Python code for mathematical visualizations, formulas, and animations with AI precision.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-base px-6 py-3 font-medium">
                Get started
              </Button>
              <Button size="lg" variant="ghost" className="text-gray-300 hover:text-white text-base px-6 py-3 group">
                View examples
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* 3D Visual */}
          <div className="relative h-80 lg:h-96">
            <Hero3DVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
