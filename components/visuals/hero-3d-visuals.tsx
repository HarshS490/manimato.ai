"use client"

import { useEffect, useRef } from "react"

export function Hero3DVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Draw 3D coordinate system
      drawCoordinateSystem(ctx, centerX, centerY, time, rect.width, rect.height)

      // Draw 3D mathematical surface
      draw3DSurface(ctx, centerX, centerY, time, rect.width, rect.height)

      // Draw floating mathematical equations
      drawFloatingEquations(ctx, time, rect.width, rect.height)

      time += 0.008
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const drawCoordinateSystem = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    time: number,
    width: number,
    height: number,
  ) => {
    ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
    ctx.lineWidth = 1

    // 3D grid lines
    for (let i = -5; i <= 5; i++) {
      // X-axis lines
      ctx.beginPath()
      const x1 = centerX + i * 40
      const y1 = centerY - 100 + Math.sin(time + i * 0.5) * 10
      const x2 = centerX + i * 40 + Math.cos(time) * 20
      const y2 = centerY + 100 + Math.sin(time + i * 0.5) * 10

      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Y-axis lines
      ctx.beginPath()
      const x3 = centerX - 200 + Math.cos(time + i * 0.3) * 15
      const y3 = centerY + i * 30
      const x4 = centerX + 200 + Math.cos(time + i * 0.3) * 15
      const y4 = centerY + i * 30

      ctx.moveTo(x3, y3)
      ctx.lineTo(x4, y4)
      ctx.stroke()
    }
  }

  const draw3DSurface = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    time: number,
    width: number,
    height: number,
  ) => {
    // Create 3D mathematical surface (like z = sin(x) * cos(y))
    const points: Array<{ x: number; y: number; z: number; screenX: number; screenY: number }> = []

    for (let x = -3; x <= 3; x += 0.3) {
      for (let y = -3; y <= 3; y += 0.3) {
        const z = Math.sin(x + time * 2) * Math.cos(y + time * 1.5) * 0.5

        // 3D to 2D projection
        const screenX = centerX + x * 50 + y * 25
        const screenY = centerY + y * 30 - z * 80

        points.push({ x, y, z, screenX, screenY })
      }
    }

    // Draw surface with gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200)
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)")
    gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.3)")
    gradient.addColorStop(1, "rgba(6, 182, 212, 0.1)")

    ctx.fillStyle = gradient
    ctx.strokeStyle = "rgba(59, 130, 246, 0.4)"
    ctx.lineWidth = 0.5

    // Draw surface mesh
    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i]
      const nextPoint = points[i + 1]

      if (Math.abs(point.x - nextPoint.x) < 0.4 || Math.abs(point.y - nextPoint.y) < 0.4) {
        ctx.beginPath()
        ctx.moveTo(point.screenX, point.screenY)
        ctx.lineTo(nextPoint.screenX, nextPoint.screenY)
        ctx.stroke()
      }
    }

    // Draw surface points
    ctx.fillStyle = "rgba(10, 243, 149, 0.6)"
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.screenX, point.screenY, 1.5, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const drawFloatingEquations = (ctx: CanvasRenderingContext2D, time: number, width: number, height: number) => {
    const equations = ["∂f/∂x", "∫₀^∞", "∇²φ", "∑ᵢ₌₁ⁿ", "∮ F·dr"]
    ctx.fillStyle = "rgba(59, 130, 246, 0.3)"
    ctx.font = "18px serif"

    equations.forEach((eq, i) => {
      const x = (width / equations.length) * i + Math.sin(time * 0.5 + i) * 30 + 50
      const y = height / 2 + Math.cos(time * 0.3 + i) * 80 + Math.sin(time + i) * 20
      ctx.fillText(eq, x, y)
    })
  }

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
}
