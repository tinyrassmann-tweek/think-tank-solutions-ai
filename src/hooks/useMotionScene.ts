import { useEffect, useRef, useState, type RefObject } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

type SceneMode = 'parallax' | 'draw'

export function useMotionScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onFrame: (progress: number | null) => void,
  reduced: boolean,
  mode: SceneMode,
) {
  const callback = useRef(onFrame)
  callback.current = onFrame
  useEffect(() => {
    if (reduced) { callback.current(null); return }
    let frame = 0
    const update = () => {
      frame = 0
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const viewport = window.innerHeight
      const progress = mode === 'parallax'
        ? (viewport - rect.top) / (viewport + rect.height)
        : (viewport * .92 - rect.top) / (viewport * .34 + rect.height)
      callback.current(Math.min(1, Math.max(0, progress)))
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [ref, reduced, mode])
}
