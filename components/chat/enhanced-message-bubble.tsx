"use client"

import { Message } from "@/context/ChatProvider"
import { RenderButton } from "@/components/chat/render-button"
import { Button } from "@/components/ui/button"
import { User, Bot, Play, AlertCircle, CheckCircle, Loader2, Code } from "lucide-react"

interface EnhancedMessageBubbleProps {
  message: Message,
  aiState: string,
  isUser?: boolean,
  onRender: () => void
  onPreview: (content: { code?: string; videoUrl?: string; title: string }, tab: "code" | "video") => void
}

export function EnhancedMessageBubble({ message,isUser,aiState,onRender, onPreview }: EnhancedMessageBubbleProps) {

  const openCodePreview = () => {
    onPreview(
      {
        code: message.code,
        videoUrl: message.videoUrl !== "rendering" ? message.videoUrl : undefined,
        title: "Manim Code Preview",
      },
      "code",
    )
  }

  const openVideoPreview = () => {
    onPreview(
      {
        code: message.code,
        videoUrl: message.videoUrl !== "rendering" ? message.videoUrl : undefined,
        title: "Animation Preview",
      },
      "video",
    )
  }

  const getAIStateIcon = () => {
    switch (aiState) {
      case "generating_code":
        return <Loader2 size={14} className="animate-spin text-primary" />
      case "code_complete":
        return <CheckCircle size={14} className="text-primary" />
      case "generating_video":
        return <Loader2 size={14} className="animate-spin text-primary" />
      case "video_complete":
        return <CheckCircle size={14} className="text-primary" />
      case "error":
        return <AlertCircle size={14} className="text-destructive" />
      default:
        return null
    }
  }

  const getAIStateText = () => {
    switch (aiState) {
      case "generating_code":
        return "Generating code..."
      case "code_complete":
        return "Code ready"
      case "generating_video":
        return "Rendering video..."
      case "video_complete":
        return "Video ready"
      case "error":
        return message.error || "Error occurred"
      default:
        return null
    }
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      
      <div className={`flex max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? "ml-3" : "mr-3"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
        </div>

        {/* Message Content */}
        <div
          className={`rounded-lg p-4 ${isUser ? "bg-secondary text-secondary-foreground" : "bg-card text-card-foreground"}`}
        >
          {/* Text Content */}
          {message.prompt && (
            <div className="whitespace-pre-wrap mb-3">
              {message.prompt}
              {message.isStreaming && <span className="inline-block w-2 h-5 bg-foreground ml-1 animate-pulse" />}
            </div>
          )}

          {/* AI State Indicator */}
          {!isUser && aiState && (
            <div className="flex items-center space-x-2 mb-3 text-sm">
              {getAIStateIcon()}
              <span className="text-muted-foreground">{getAIStateText()}</span>
            </div>
          )}

          {/* Code Block with Preview Button */}
          {message.code && (
            <div className="mb-3">
              <div className="relative bg-muted border border-border rounded-lg overflow-hidden">
                {/* Code Header with Preview Button */}
                <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                  <span className="text-sm text-muted-foreground font-mono">Python (Manim)</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={openCodePreview}
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-1 transition-colors"
                    >
                      <Code size={14} className="mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Code Content (truncated) */}
                <div className="p-4 overflow-x-auto max-h-32 overflow-y-hidden">
                  <pre className="text-sm text-foreground font-mono leading-relaxed">
                    <code className="language-python">
                      {message.code.split("\n").slice(0, 6).join("\n")}
                      {message.code.split("\n").length > 6 && "\n..."}
                      {message.isStreaming && (
                        <span className="inline-block w-2 h-4 bg-foreground ml-1 animate-pulse" />
                      )}
                    </code>
                  </pre>
                </div>

                {/* Show full code hint */}
                {message.code.split("\n").length > 6 && (
                  <div className="px-4 pb-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={openCodePreview}
                      className="text-xs text-muted-foreground hover:text-primary p-0 h-auto"
                    >
                      Click Preview to see full code ({message.code.split("\n").length} lines)
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Render Button */}
          {message.code && !message.isStreaming && !message.videoUrl && aiState === "code_complete" && (
            <div className="mb-3">
              <RenderButton onClick={onRender} />
            </div>
          )}

          {/* Video Preview */}
          {message.videoUrl && (
            <div className="mb-3">
              {message.videoUrl === "rendering" ? (
                <div className="bg-muted border border-border rounded-lg p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Rendering animation...</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">This may take a few moments</p>
                </div>
              ) : (
                <div className="relative bg-muted border border-border rounded-lg overflow-hidden">
                  {/* Video Header with Preview Button */}
                  <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                    <span className="text-sm text-muted-foreground">Generated Animation</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={openVideoPreview}
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-1 transition-colors"
                    >
                      <Play size={14} className="mr-1" />
                      Preview
                    </Button>
                  </div>

                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-muted cursor-pointer" onClick={openVideoPreview}>
                    <img
                      src={message.videoUrl || "/placeholder.svg"}
                      alt="Generated Animation"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <Play size={24} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {message.error && (
            <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle size={16} />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-sm text-destructive/80 mt-1">{message.error}</p>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-muted-foreground mt-2">{message.timestamp.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  )
}
