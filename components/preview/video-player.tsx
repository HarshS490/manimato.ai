"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Maximize, Download, Loader2 } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  isLoading?: boolean
}

export function VideoPlayer({ videoUrl, isLoading = false }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (isLoading) {
    return (
      <div className="bg-[#0d1117] border border-[#404040] rounded-lg p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
        <p className="text-[#888888]">Rendering animation...</p>
        <p className="text-sm text-[#666666] mt-1">This may take a few moments</p>
      </div>
    )
  }

  return (
    <div className="bg-[#0d1117] border border-[#404040] rounded-lg overflow-hidden">
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        <img src={videoUrl || "/placeholder.svg"} alt="Generated Animation" className="w-full h-full object-contain" />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
          <Button
            size="lg"
            variant="ghost"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-4"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-3 bg-[#161b22] border-t border-[#404040]">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[#888888] hover:text-[#e5e5e5]"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <span className="text-sm text-[#888888]">00:00 / 00:05</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" className="text-[#888888] hover:text-[#e5e5e5]">
            <Download size={16} />
          </Button>
          <Button size="sm" variant="ghost" className="text-[#888888] hover:text-[#e5e5e5]">
            <Maximize size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
