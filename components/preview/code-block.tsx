"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  code: string
  isStreaming?: boolean
}

export function CodeBlock({ code, isStreaming = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-[#0d1117] border border-[#404040] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#404040]">
        <span className="text-sm text-[#888888] font-mono">Python (Manim)</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="text-[#888888] hover:text-[#e5e5e5] p-1"
          disabled={!code || isStreaming}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </Button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-[#e5e5e5] font-mono leading-relaxed">
          <code className="language-python">
            {code}
            {isStreaming && <span className="inline-block w-2 h-4 bg-[#e5e5e5] ml-1 animate-pulse" />}
          </code>
        </pre>
      </div>
    </div>
  )
}
