"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-700/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-gray-800/30 hover:bg-gray-700/30 transition-colors flex items-center justify-between"
      >
        <span className="font-medium text-gray-100">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-800/20">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}


export function FAQSection() {
  const faqs = [
    {
      question: "What is Manim AI Generator?",
      answer:
        "Manim AI Generator is an AI-powered tool that creates mathematical animations using natural language descriptions. Simply describe what you want to visualize, and our AI generates the Manim code and renders a high-quality video automatically.",
    },
    {
      question: "Do I need coding experience to use this tool?",
      answer:
        "No coding experience is required! Our AI understands natural language descriptions and generates all the necessary code for you. However, if you want to customize the generated code, our built-in editor makes it easy to make adjustments.",
    },
    {
      question: "What types of mathematical concepts can I animate?",
      answer:
        "You can animate virtually any mathematical concept including calculus, linear algebra, geometry, statistics, physics simulations, and more. Our AI is trained on a vast range of mathematical topics and can handle everything from basic arithmetic to advanced research-level mathematics.",
    },
    {
      question: "How long does it take to generate an animation?",
      answer:
        "Most animations are generated and rendered within 30 seconds. Complex animations with multiple scenes may take up to 2 minutes. The AI code generation is nearly instantaneous, with most time spent on video rendering.",
    },
    {
      question: "What video formats and qualities are supported?",
      answer:
        "We support MP4 video export in multiple resolutions: 720p (free plan), 1080p and 4K (Pro plan). You can also export as GIF for web use or download the source code for further customization.",
    },
    {
      question: "Can I edit the generated code?",
      answer:
        "Our built-in code editor allows you to modify the generated Manim code with syntax highlighting, auto-completion, and real-time preview. You can also download the code to use in your own development environment.",
    },
    {
      question: "Is there a limit to how many animations I can create?",
      answer:
        "Free users can create up to 5 animations per month. Pro users have unlimited animation generation. All plans include unlimited code generation and editing.",
    },
    {
      question: "Can I use the animations commercially?",
      answer:
        "Yes! Pro and Team plan users have full commercial rights to their generated animations. Free plan animations include a small watermark but can still be used for educational purposes.",
    },
  ]

  return (
    <section className="py-24 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400">Everything you need to know about Manim AI Generator</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a href="#contact" className="text-emerald-400 hover:text-emerald-300 font-medium">
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  )
}
