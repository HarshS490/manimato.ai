"use client"

import { useEffect, useRef } from "react"

interface ExampleVisualProps {
  type: "fourier" | "surface" | "parametric" | "matrix" | "differential" | "complex"
  className?: string
}

export function ExampleVisual({ type, className = "" }: ExampleVisualProps) {
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
        case "fourier":
          drawFourierTransform(ctx, rect.width, rect.height, time)
          break
        case "surface":
          draw3DSurface(ctx, rect.width, rect.height, time)
          break
        case "parametric":
          drawParametricEquations(ctx, rect.width, rect.height, time)
          break
        case "matrix":
          drawMatrixTransformation(ctx, rect.width, rect.height, time)
          break
        case "differential":
          drawDifferentialEquation(ctx, rect.width, rect.height, time)
          break
        case "complex":
          drawComplexAnalysis(ctx, rect.width, rect.height, time)
          break
      }

      time += 0.03 // Faster animation
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [type])

  const drawFourierTransform = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerY = height / 2

    // Draw original signal (square wave)
    ctx.strokeStyle = "rgba(10, 243, 149, 0.6)"
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let x = 0; x < width; x += 2) {
      const t = (x / width) * 4 * Math.PI + time
      let y = centerY

      // Fourier series approximation of square wave
      for (let n = 1; n <= 7; n += 2) {
        y += (40 / n) * Math.sin(n * t)
      }

      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Draw frequency components
    ctx.strokeStyle = "rgba(10, 243, 149, 0.3)"
    ctx.lineWidth = 1

    for (let harmonic = 1; harmonic <= 5; harmonic += 2) {
      ctx.beginPath()
      for (let x = 0; x < width; x += 2) {
        const t = (x / width) * 4 * Math.PI + time
        const y = centerY + (20 / harmonic) * Math.sin(harmonic * t)

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    // Draw axis
    ctx.strokeStyle = "rgba(10, 243, 149, 0.2)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()
  }

  const draw3DSurface = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerX = width / 2
    const centerY = height / 2

    // Create 3D surface points
    const points: Array<{ x: number; y: number; z: number; screenX: number; screenY: number }> = []

    for (let x = -2; x <= 2; x += 0.4) {
      for (let y = -2; y <= 2; y += 0.4) {
        const z = Math.sin(Math.sqrt(x * x + y * y) + time) * 0.8

        // 3D to 2D projection
        const screenX = centerX + x * 40 + y * 20
        const screenY = centerY + y * 25 - z * 30

        points.push({ x, y, z, screenX, screenY })
      }
    }

    // Draw surface mesh
    ctx.strokeStyle = "rgba(10, 243, 149, 0.4)"
    ctx.lineWidth = 1

    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i]
      const nextPoint = points[i + 1]

      if (Math.abs(point.x - nextPoint.x) < 0.5 || Math.abs(point.y - nextPoint.y) < 0.5) {
        ctx.beginPath()
        ctx.moveTo(point.screenX, point.screenY)
        ctx.lineTo(nextPoint.screenX, nextPoint.screenY)
        ctx.stroke()
      }
    }

    // Draw surface points
    ctx.fillStyle = "rgba(10, 243, 149, 0.7)"
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.screenX, point.screenY, 1.5, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const drawParametricEquations = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerX = width / 2
    const centerY = height / 2

    // Draw parametric curve (rose curve)
    ctx.strokeStyle = "rgba(10, 243, 149, 0.6)"
    ctx.lineWidth = 2
    ctx.beginPath()

    const maxT = time * 2
    for (let t = 0; t <= maxT && t <= 8 * Math.PI; t += 0.1) {
      const r = 50 * Math.cos(3 * t)
      const x = centerX + r * Math.cos(t)
      const y = centerY + r * Math.sin(t)

      if (t === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Draw parameter point
    if (maxT > 0) {
      const t = maxT
      const r = 50 * Math.cos(3 * t)
      const x = centerX + r * Math.cos(t)
      const y = centerY + r * Math.sin(t)

      ctx.fillStyle = "rgba(10, 243, 149, 0.9)"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw coordinate axes
    ctx.strokeStyle = "rgba(10, 243, 149, 0.2)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()
  }

  const drawMatrixTransformation = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerX = width / 2
    const centerY = height / 2

    // Original grid
    ctx.strokeStyle = "rgba(10, 243, 149, 0.3)"
    ctx.lineWidth = 1

    // Transformation matrix
    const angle = time * 0.5
    const scale = 1 + 0.3 * Math.sin(time)
    const a = scale * Math.cos(angle)
    const b = scale * Math.sin(angle)
    const c = -scale * Math.sin(angle)
    const d = scale * Math.cos(angle)

    // Draw transformed grid
    for (let i = -3; i <= 3; i++) {
      // Vertical lines
      ctx.beginPath()
      for (let j = -3; j <= 3; j += 0.2) {
        const x = i * 30
        const y = j * 30

        // Apply transformation
        const transformedX = centerX + (a * x + b * y)
        const transformedY = centerY + (c * x + d * y)

        if (j === -3) ctx.moveTo(transformedX, transformedY)
        else ctx.lineTo(transformedX, transformedY)
      }
      ctx.stroke()

      // Horizontal lines
      ctx.beginPath()
      for (let j = -3; j <= 3; j += 0.2) {
        const x = j * 30
        const y = i * 30

        // Apply transformation
        const transformedX = centerX + (a * x + b * y)
        const transformedY = centerY + (c * x + d * y)

        if (j === -3) ctx.moveTo(transformedX, transformedY)
        else ctx.lineTo(transformedX, transformedY)
      }
      ctx.stroke()
    }

    // Draw basis vectors
    ctx.strokeStyle = "rgba(10, 243, 149, 0.8)"
    ctx.lineWidth = 2

    // i vector
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + a * 40, centerY + c * 40)
    ctx.stroke()

    // j vector
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + b * 40, centerY + d * 40)
    ctx.stroke()
  }

  const drawDifferentialEquation = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerY = height / 2

    // Draw solution curves for dy/dx = -y (exponential decay)
    ctx.strokeStyle = "rgba(10, 243, 149, 0.5)"
    ctx.lineWidth = 1

    for (let i = 0; i < 5; i++) {
      const initialValue = (i - 2) * 20
      ctx.beginPath()

      for (let x = 0; x < width; x += 2) {
        const t = (x / width) * 4
        const y = centerY + initialValue * Math.exp(-t)

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    // Draw current solution being traced
    ctx.strokeStyle = "rgba(10, 243, 149, 0.9)"
    ctx.lineWidth = 3

    const maxX = (time * width) % width
    ctx.beginPath()

    for (let x = 0; x <= maxX; x += 2) {
      const t = (x / width) * 4
      const y = centerY + 40 * Math.exp(-t)

      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Draw current point
    if (maxX > 0) {
      const t = (maxX / width) * 4
      const y = centerY + 40 * Math.exp(-t)

      ctx.fillStyle = "rgba(10, 243, 149, 1)"
      ctx.beginPath()
      ctx.arc(maxX, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw axes
    ctx.strokeStyle = "rgba(10, 243, 149, 0.2)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()
  }

  const drawComplexAnalysis = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerX = width / 2
    const centerY = height / 2

    // Draw complex plane grid
    ctx.strokeStyle = "rgba(10, 243, 149, 0.2)"
    ctx.lineWidth = 1

    // Real axis
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()

    // Imaginary axis
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    // Draw complex function visualization (z^2 transformation)
    ctx.strokeStyle = "rgba(10, 243, 149, 0.6)"
    ctx.lineWidth = 2

    // Original circle
    ctx.beginPath()
    const radius = 30
    for (let angle = 0; angle <= 2 * Math.PI; angle += 0.1) {
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      if (angle === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Transformed shape (z^2)
    ctx.strokeStyle = "rgba(10, 243, 149, 0.8)"
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let angle = 0; angle <= 2 * Math.PI + time; angle += 0.1) {
      // Original complex number
      const realPart = Math.cos(angle)
      const imagPart = Math.sin(angle)

      // Apply z^2 transformation
      const newReal = realPart * realPart - imagPart * imagPart
      const newImag = 2 * realPart * imagPart

      const x = centerX + newReal * 30
      const y = centerY + newImag * 30

      if (angle === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Draw current transformation point
    const currentAngle = time % (2 * Math.PI)
    const realPart = Math.cos(currentAngle)
    const imagPart = Math.sin(currentAngle)

    // Original point
    ctx.fillStyle = "rgba(10, 243, 149, 0.7)"
    ctx.beginPath()
    ctx.arc(centerX + realPart * 30, centerY + imagPart * 30, 3, 0, Math.PI * 2)
    ctx.fill()

    // Transformed point
    const newReal = realPart * realPart - imagPart * imagPart
    const newImag = 2 * realPart * imagPart

    ctx.fillStyle = "rgba(10, 243, 149, 1)"
    ctx.beginPath()
    ctx.arc(centerX + newReal * 30, centerY + newImag * 30, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}
