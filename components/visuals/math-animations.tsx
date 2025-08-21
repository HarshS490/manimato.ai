"use client"

import { useEffect, useRef } from "react"

interface AnimationCanvasProps {
  type: "sine" | "spiral" | "fourier" | "surface"
  className?: string
}

export function AnimationCanvas({ type, className = "" }: AnimationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 300
    canvas.height = 200

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#1f2937"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      switch (type) {
        case "sine":
          drawSineWave(ctx, time)
          break
        case "spiral":
          drawSpiral(ctx, time)
          break
        case "fourier":
          drawFourier(ctx, time)
          break
        case "surface":
          drawSurface(ctx, time)
          break
      }

      time += 0.05
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [type])

  const drawSineWave = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let x = 0; x < 300; x += 2) {
      const y = 100 + Math.sin((x + time * 50) * 0.02) * 50
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  const drawSpiral = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.strokeStyle = "#a855f7"
    ctx.lineWidth = 2
    ctx.beginPath()

    const centerX = 150
    const centerY = 100

    for (let t = 0; t < 10; t += 0.1) {
      const r = t * 5
      const x = centerX + r * Math.cos(t + time)
      const y = centerY + r * Math.sin(t + time)

      if (t === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  const drawFourier = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let x = 0; x < 300; x += 2) {
      let y = 100
      for (let n = 1; n <= 5; n++) {
        y += (20 / n) * Math.sin(n * (x + time * 30) * 0.02)
      }

      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  const drawSurface = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 1

    for (let i = 0; i < 10; i++) {
      ctx.beginPath()
      for (let j = 0; j < 300; j += 10) {
        const x = j
        const y = 100 + Math.sin((j + i * 30 + time * 50) * 0.02) * (20 - i * 2)

        if (j === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  }

  return <canvas ref={canvasRef} className={`rounded-lg ${className}`} />
}

export function MathAnimations() {
  const animations = [
    { type: "sine" as const, title: "Sine Wave", description: "Oscillating trigonometric functions" },
    { type: "spiral" as const, title: "Parametric Spiral", description: "Complex mathematical curves" },
    { type: "fourier" as const, title: "Fourier Series", description: "Harmonic function decomposition" },
    { type: "surface" as const, title: "3D Surface", description: "Multi-dimensional visualizations" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {animations.map((anim, index) => (
        <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <AnimationCanvas type={anim.type} className="w-full mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{anim.title}</h3>
          <p className="text-gray-400">{anim.description}</p>
        </div>
      ))}
    </div>
  )
}
