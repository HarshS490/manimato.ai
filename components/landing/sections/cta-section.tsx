"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

interface CTASectionProps {
  onGetStarted: () => void
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-24 bg-gradient-to-r from-emerald-900/50 via-teal-900/50 to-blue-900/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_50%)]" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <Sparkles className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-gray-100 mb-6">
            Ready to Transform
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Mathematical Education?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of educators who are already creating stunning mathematical animations with AI. Start your
            free trial today and see the difference.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold shadow-xl shadow-emerald-500/25"
          >
            Start Creating Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-gray-400">No credit card required • 14-day free trial</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span>No setup required</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
