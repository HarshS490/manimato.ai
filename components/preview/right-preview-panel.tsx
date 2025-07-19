"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/preview/code-block"
import { VideoPlayer } from "@/components/preview/video-player"
import { X, Code, Play, ChevronLeft, ChevronRight } from "lucide-react"

interface RightPreviewPanelProps {
  isOpen: boolean
  onClose: () => void
  code?: string
  videoUrl?: string
  defaultTab?: "code" | "video"
  title?: string
}

export function RightPreviewPanel({
  isOpen,
  onClose,
  code,
  videoUrl,
  defaultTab = "code",
  title = "Preview",
}: RightPreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<"code" | "video">(defaultTab)
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!isOpen) return null

  const hasCode = code && code.trim().length > 0
  const hasVideo = videoUrl && videoUrl !== "rendering"

  return (
    <div
      className={`flex-shrink-0 bg-card border-l border-border transition-all duration-300 ${
        isCollapsed ? "w-12" : "w-96"
      } flex flex-col h-full`}
    >
      {/* Collapse/Expand Button */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-accent rounded-full"
        >
          {isCollapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </Button>
      </div>

      {!isCollapsed && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground hover:bg-accent w-6 h-6"
            >
              <X size={14} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border bg-muted/30">
            {hasCode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("code")}
                className={`flex-1 rounded-none border-b-2 transition-colors ${
                  activeTab === "code"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Code size={14} className="mr-2" />
                Code
              </Button>
            )}
            {hasVideo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("video")}
                className={`flex-1 rounded-none border-b-2 transition-colors ${
                  activeTab === "video"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Play size={14} className="mr-2" />
                Video
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === "code" && hasCode && (
              <div className="h-full overflow-y-auto p-4">
                <CodeBlock code={code} />
              </div>
            )}

            {activeTab === "video" && hasVideo && (
              <div className="h-full overflow-y-auto p-4">
                <VideoPlayer videoUrl={videoUrl} />
              </div>
            )}

            {!hasCode && !hasVideo && (
              <div className="h-full flex items-center justify-center text-muted-foreground p-4">
                <div className="text-center">
                  <p className="text-sm">No content available</p>
                  <p className="text-xs mt-1">Generate code or video to preview</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Collapsed State */}
      {isCollapsed && (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-2">
          <div className="writing-mode-vertical text-xs text-muted-foreground transform rotate-180">Preview</div>
        </div>
      )}
    </div>
  )
}
