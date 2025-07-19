"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface RenderButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function RenderButton({ onClick, disabled = false }: RenderButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
    >
      <Play size={16} />
      <span>Render Animation</span>
    </Button>
  )
}
