"use client"

import { useEffect, useRef } from "react"

export function MathematicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw mathematical grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw floating mathematical symbols
      const symbols = ["∑", "∫", "∂", "π", "∞", "√", "θ", "λ"]
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
      ctx.font = "24px serif"

      symbols.forEach((symbol, i) => {
        const x = (canvas.width / symbols.length) * i + Math.sin(time * 0.01 + i) * 20
        const y = canvas.height / 2 + Math.cos(time * 0.008 + i) * 100
        ctx.fillText(symbol, x, y)
      })

      // Draw sine wave
      ctx.strokeStyle = "rgba(168, 85, 247, 0.4)"
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin((x + time) * 0.01) * 50
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      time += 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }} />
}
