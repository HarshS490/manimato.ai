"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface InputBoxProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function InputBox({ onSend, disabled = false, placeholder = "Type a message..." }: InputBoxProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      const scrollHeight = textarea.scrollHeight
      const maxHeight = 8 * 24 // 8 lines * 24px line height
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
  }, [message])

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-input border border-border rounded-xl shadow-sm focus-within:shadow-md focus-within:ring-1 focus-within:ring-ring transition-all">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-transparent text-foreground placeholder-muted-foreground resize-none border-0 outline-none p-4 pr-12 min-h-[56px] max-h-[192px] leading-6"
            rows={1}
          />

          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || disabled}
            className="absolute right-2 bottom-2 w-8 h-8 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground rounded-lg transition-colors"
          >
            <Send size={16} />
          </Button>
        </div>
      </form>
    </div>
  )
}
