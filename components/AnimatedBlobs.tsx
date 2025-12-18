'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Blob configuration
    const blobs = [
      {
        x: 20,
        y: 20,
        radius: 300,
        vx: 0.3,
        vy: 0.2,
        color: 'rgba(232, 220, 200, 0.08)',
      },
      {
        x: 80,
        y: 50,
        radius: 250,
        vx: -0.2,
        vy: 0.3,
        color: 'rgba(189, 147, 99, 0.06)',
      },
      {
        x: 50,
        y: 80,
        radius: 280,
        vx: 0.25,
        vy: -0.25,
        color: 'rgba(232, 220, 200, 0.05)',
      },
    ]

    let time = 0

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.005

      blobs.forEach((blob, index) => {
        // Update position
        blob.x += blob.vx * 0.1
        blob.y += blob.vy * 0.1

        // Bounce off edges
        if (blob.x <= 0 || blob.x >= 100) blob.vx *= -1
        if (blob.y <= 0 || blob.y >= 100) blob.vy *= -1

        // Calculate actual position with sine wave
        const actualX = (blob.x / 100) * canvas.width + Math.sin(time + index) * 50
        const actualY = (blob.y / 100) * canvas.height + Math.cos(time + index) * 50

        // Create gradient
        const gradient = ctx.createRadialGradient(
          actualX,
          actualY,
          0,
          actualX,
          actualY,
          blob.radius
        )

        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        // Draw blob
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(actualX, actualY, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
