import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useMotionScene'

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    let frame = 0
    const update = () => {
      frame = 0
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', request); window.removeEventListener('resize', request) }
  }, [reduced])
  return <div className="score-scroll-progress" ref={ref} aria-hidden="true"/>
}
