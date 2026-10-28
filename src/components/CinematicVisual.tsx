import { useRef, useState } from 'react'
import { useMotionScene, useReducedMotion } from '@/hooks/useMotionScene'

type VisualVariant = 'overture' | 'atelier' | 'chamber'

const visuals = {
  overture: {
    src: '/visuals/symphony-sculpture.svg',
    alt: 'Five navy and gold sculptural ribbons converging into one luminous arrangement',
    eyebrow: 'FORM 01 / SOVEREIGN INTELLIGENCE',
    caption: 'Five disciplines. One resolved system.',
  },
  atelier: {
    src: '/visuals/arrangement-atelier.svg',
    alt: 'Five translucent geometric modules connected by precise gold pathways',
    eyebrow: 'THE ARRANGEMENT ATELIER',
    caption: 'Specialized agents. Precisely composed.',
  },
  chamber: {
    src: '/visuals/conductor-chamber.svg',
    alt: 'An ivory sphere held within concentric gold rings in a navy stone chamber',
    eyebrow: 'THE CONDUCTOR’S CHAMBER',
    caption: 'Human judgment at the center.',
  },
}

export default function CinematicVisual({ variant, className = '' }: { variant: VisualVariant; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const reduce = useReducedMotion()
  const visual = visuals[variant]
  useMotionScene(ref, progress => {
    if (!media.current) return
    const value = progress ?? 0
    const y = progress === null ? 0 : -34 + value * 68
    const scale = progress === null ? 1.04 : 1.13 - value * .09
    media.current.style.transform = `translate3d(0,${y}px,0) scale(${scale})`
  }, reduce, 'parallax')

  return <figure ref={ref} className={`cinematic-visual cinematic-${variant} ${className}`}>
    <div className="cinematic-media" ref={media}>
      <img
        className={loaded ? 'loaded' : ''}
        src={visual.src}
        alt={visual.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
    <div className="cinematic-light" aria-hidden="true"/>
    <figcaption><span>{visual.eyebrow}</span><b>{visual.caption}</b></figcaption>
  </figure>
}
