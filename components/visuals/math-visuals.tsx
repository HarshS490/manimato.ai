"use client"

import { useEffect, useRef } from "react"

interface MathVisualProps {
  type: "hero" | "feature1" | "feature2" | "feature3"
  className?: string
}

export function MathVisual({ type, className = "" }: MathVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      switch (type) {
        case "hero":
          drawHeroVisual(ctx, rect.width, rect.height, time)
          break
        case "feature1":
          drawFeature1(ctx, rect.width, rect.height, time)
          break
        case "feature2":
          drawFeature2(ctx, rect.width, rect.height, time)
          break
        case "feature3":
          drawFeature3(ctx, rect.width, rect.height, time)
          break
      }

      time += 0.01
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [type])

  const drawHeroVisual = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerX = width / 2
    const centerY = height / 2

    // Draw mathematical curves
    ctx.strokeStyle = "rgba(10, 243, 149, 0.3)"
    ctx.lineWidth = 1

    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      for (let t = 0; t < Math.PI * 4; t += 0.1) {
        const r = 50 + i * 20
        const x = centerX + r * Math.cos(t + time + i * 0.5) * Math.cos(time * 0.5)
        const y = centerY + r * Math.sin(t + time + i * 0.5) * Math.sin(time * 0.3)

        if (t === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    // Draw dots
    ctx.fillStyle = "rgba(10, 243, 149, 0.6)"
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time
      const x = centerX + Math.cos(angle) * (80 + Math.sin(time * 2) * 20)
      const y = centerY + Math.sin(angle) * (80 + Math.cos(time * 2) * 20)

      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawFeature1 = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.strokeStyle = "rgba(10, 243, 149, 0.4)"
    ctx.lineWidth = 1

    // Draw sine wave
    ctx.beginPath()
    for (let x = 0; x < width; x += 2) {
      const y = height / 2 + Math.sin((x + time * 50) * 0.02) * 30
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Draw grid points
    ctx.fillStyle = "rgba(10, 243, 149, 0.2)"
    for (let x = 0; x < width; x += 40) {
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const drawFeature2 = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerX = width / 2
    const centerY = height / 2

    ctx.strokeStyle = "rgba(10, 243, 149, 0.3)"
    ctx.lineWidth = 1

    // Draw geometric shapes
    for (let i = 0; i < 3; i++) {
      const radius = 30 + i * 25
      const rotation = time + (i * Math.PI) / 3

      ctx.beginPath()
      for (let j = 0; j < 6; j++) {
        const angle = (j / 6) * Math.PI * 2 + rotation
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (j === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()
    }
  }

  const drawFeature3 = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.strokeStyle = "rgba(10, 243, 149, 0.4)"
    ctx.lineWidth = 1

    // Draw mathematical graph
    const points = []
    for (let x = 0; x < width; x += 5) {
      const y = height / 2 + Math.sin(x * 0.02 + time) * 40 * Math.exp(-x * 0.005)
      points.push({ x, y })
    }

    ctx.beginPath()
    points.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y)
      else ctx.lineTo(point.x, point.y)
    })
    ctx.stroke()

    // Draw axis
    ctx.strokeStyle = "rgba(10, 243, 149, 0.2)"
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()
  }

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}
