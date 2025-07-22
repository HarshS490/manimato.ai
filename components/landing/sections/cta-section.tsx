import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-5xl lg:text-7xl font-bold">
            Ready to transform your
            <br />
            <span className="text-accent">mathematical concepts?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join thousands of researchers and educators who trust Manimato for their mathematical visualization needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-10 py-4 font-medium">
              Start creating now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 text-lg px-10 py-4 bg-transparent group"
            >
              View documentation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
