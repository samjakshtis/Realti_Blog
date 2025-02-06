import React, { useEffect, useRef } from 'react'


export function GradientBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        let angle = 0
        const gradients = [
            { x: 0, y: 0, r: 300, speed: 0.001 },
            { x: canvas?.width, y: 0, r: 250, speed: 0.0015 },
            { x: canvas?.width / 2, y: canvas?.height, r: 350, speed: 0.002 },
        ]

        function drawGradients() {
            ctx?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0)

            const colors = ['#EC6227', '#E80458', '#5900B3']

            gradients.forEach((gradient, index) => {
                const centerX = gradient.x ?? 0
                const centerY = gradient.y ?? 0
                const radius = 100

                const x = centerX + Math.cos(angle * gradient.speed) * radius
                const y = centerY + Math.sin(angle * gradient.speed) * radius

                const grd = ctx?.createRadialGradient(
                    x,
                    y,
                    0,
                    x,
                    y,
                    gradient.r
                )

                const startColor = colors[index % colors.length]
                const endColor = colors[(index + 1) % colors.length]

                grd?.addColorStop(0, startColor + '80')  // 50% opacity
                grd?.addColorStop(1, endColor + '00')    // 0% opacity
                if (ctx) ctx.fillStyle = grd ?? ''
                ctx?.fillRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0)
            })

            angle += 1
            requestAnimationFrame(drawGradients)
        }

        drawGradients()

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            drawGradients() // Call drawGradients after resizing to update the canvas
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10"
            aria-hidden="true"
        />
    )
}
