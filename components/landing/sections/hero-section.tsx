"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight, Sparkles, Code, Video } from "lucide-react"

interface HeroSectionProps {
  onGetStarted: () => void
  onWatchDemo: () => void
}

export function HeroSection({ onGetStarted, onWatchDemo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Mathematical Animations
        </Badge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6 leading-tight">
          Create Stunning
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
            Math Animations
          </span>
          with AI
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform complex mathematical concepts into beautiful, engaging animations using the power of AI and Manim.
          No coding experience required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold shadow-xl shadow-emerald-500/25"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            onClick={onWatchDemo}
            variant="outline"
            size="lg"
            className="border-gray-600 text-gray-300 hover:bg-gray-700/50 px-8 py-4 text-lg bg-transparent"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <Code className="w-6 h-6 text-emerald-400" />
            <span className="text-gray-300 font-medium">AI Code Generation</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <Video className="w-6 h-6 text-blue-400" />
            <span className="text-gray-300 font-medium">Instant Video Rendering</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-gray-300 font-medium">No Coding Required</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
