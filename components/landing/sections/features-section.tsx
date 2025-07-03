"use client"

import { Brain, Code, Video, Zap, Palette, Share2, Settings, MessageSquare, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient = "from-emerald-500 to-teal-600",
}: FeatureCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-gray-800/50 border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
      <CardContent className="p-6">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  )
}


export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Generation",
      description:
        "Describe your mathematical concept in plain English and watch as our AI generates perfect Manim code automatically.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Code,
      title: "Live Code Editor",
      description:
        "Edit and customize the generated code with our built-in editor featuring syntax highlighting and real-time preview.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Video,
      title: "Instant Video Rendering",
      description:
        "Generate high-quality MP4 videos of your animations in seconds, ready for presentations or sharing.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "From concept to video in under 30 seconds. Our optimized rendering pipeline ensures quick turnaround times.",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      icon: Palette,
      title: "Beautiful Animations",
      description:
        "Create stunning visualizations with smooth transitions, vibrant colors, and professional-quality output.",
      gradient: "from-rose-500 to-red-600",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description:
        "Share your animations directly or export them in multiple formats for presentations and educational content.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: MessageSquare,
      title: "Chat Interface",
      description:
        "Intuitive chat-based interface makes it easy to iterate and refine your animations through natural conversation.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Settings,
      title: "Customizable Output",
      description:
        "Control resolution, frame rate, duration, and other parameters to match your specific requirements.",
      gradient: "from-slate-500 to-gray-600",
    },
    {
      icon: FileText,
      title: "Export Options",
      description: "Download your animations as MP4 videos, GIFs, or even the source code for further customization.",
      gradient: "from-violet-500 to-purple-600",
    },
  ]

  return (
    <section className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Mathematical Storytelling
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create professional mathematical animations, from AI-powered code generation to
            instant video rendering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
