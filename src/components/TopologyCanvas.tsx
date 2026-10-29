import { useEffect, useRef, useState } from 'react'

type Mode = 'orchestration' | 'compliance' | 'ventures'
type NodePoint = { x: number; y: number; r: number; label: string }

const modeCopy: Record<Mode, { label: string; detail: string; nodes: number }> = {
  orchestration: { label: 'Blake Orchestrator', detail: 'Routes non-sensitive tasks, holds operational memory, and stages actions for operator approval.', nodes: 9 },
  compliance: { label: 'Genesis Evidence Lock', detail: 'Isolates regulated data and blocks claim promotion until required interval evidence is complete.', nodes: 12 },
  ventures: { label: 'Venture Routing Core', detail: 'Shares research, orchestration, and production capabilities across eleven specialized entities.', nodes: 11 },
}

export default function TopologyCanvas({ mode, pulse }: { mode: Mode; pulse: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<NodePoint[]>([])
  const [selected, setSelected] = useState(modeCopy[mode].label)

  useEffect(() => setSelected(modeCopy[mode].label), [mode])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let raf = 0
    let width = 0
    let height = 0
    let start = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    const draw = (time: number) => {
      const elapsed = reduced ? 0 : (time - start) / 1000
      ctx.clearRect(0, 0, width, height)
      const cx = width * .52
      const cy = height * .5
      const radius = Math.min(width, height) * .34
      const count = modeCopy[mode].nodes
      const nodes: NodePoint[] = []

      ctx.strokeStyle = 'rgba(212,175,55,.12)'
      ctx.lineWidth = 1
      for (let ring = 1; ring <= 3; ring++) {
        ctx.beginPath()
        ctx.arc(cx, cy, radius * ring / 3, 0, Math.PI * 2)
        ctx.stroke()
      }

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i / count) - Math.PI / 2 + elapsed * .055 * (i % 2 ? 1 : -1)
        const orbit = radius * (i % 3 === 0 ? .58 : 1)
        const x = cx + Math.cos(angle) * orbit * 1.25
        const y = cy + Math.sin(angle) * orbit * .76
        nodes.push({ x, y, r: i % 3 === 0 ? 5 : 4, label: `${modeCopy[mode].label} · Node ${String(i + 1).padStart(2, '0')}` })
      }
      nodesRef.current = nodes

      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(other => {
          const distance = Math.hypot(node.x - other.x, node.y - other.y)
          if (distance < radius * .82) {
            ctx.strokeStyle = `rgba(212,175,55,${Math.max(.035, .18 - distance / radius * .12)})`
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
        ctx.strokeStyle = 'rgba(251,247,240,.09)'
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
      })

      if (pulse > 0 && !reduced) {
        const phase = ((time - start) % 1500) / 1500
        ctx.strokeStyle = `rgba(255,191,0,${1 - phase})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(cx, cy, 12 + phase * radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 52)
      glow.addColorStop(0, 'rgba(255,191,0,.34)')
      glow.addColorStop(1, 'rgba(212,175,55,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, 52, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#D4AF37'
      ctx.beginPath()
      ctx.arc(cx, cy, 7, 0, Math.PI * 2)
      ctx.fill()

      nodes.forEach((node, i) => {
        ctx.fillStyle = i % 3 === 0 ? '#FFBF00' : '#D4AF37'
        ctx.shadowColor = '#D4AF37'
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      frame++
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      start = 0
      frame = 0
    }
  }, [mode, pulse])

  const inspect = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const node = nodesRef.current.find(item => Math.hypot(item.x - x, item.y - y) < 22)
    if (node) setSelected(node.label)
  }

  const inspectWithKeyboard = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nodes = nodesRef.current
    if (!nodes.length) return
    const current = nodes.findIndex(node => node.label === selected)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? nodes.length - 1 : event.key === 'ArrowRight' ? (current + 1 + nodes.length) % nodes.length : (current - 1 + nodes.length) % nodes.length
    setSelected(nodes[next].label)
  }

  return <div className="topology-wrap">
    <canvas ref={canvasRef} onClick={inspect} onKeyDown={inspectWithKeyboard} tabIndex={0} aria-label={`${modeCopy[mode].label} interactive topology. Select a node or use the arrow keys to inspect nodes.`} role="img"/>
    <div className="topology-readout" aria-live="polite"><span>NODE INSPECTOR</span><b>{selected}</b><p>{modeCopy[mode].detail}</p></div>
  </div>
}
