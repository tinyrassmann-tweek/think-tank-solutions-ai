import { useRef } from 'react'
import { useMotionScene, useReducedMotion } from '@/hooks/useMotionScene'

const starts = [0, .1, .2, .3, .4, .68]
const ends = [.36, .48, .6, .72, .84, 1]

export default function ArrangementScore() {
  const ref = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const reduce = useReducedMotion()
  useMotionScene(ref, progress => {
    if (!svg.current) return
    const paths = svg.current.querySelectorAll<SVGPathElement>('.score-paths path')
    paths.forEach((path, index) => {
      const value = progress === null ? 1 : Math.min(1, Math.max(0, ((progress - starts[index]) / (ends[index] - starts[index]))))
      path.style.strokeDasharray = `${value} 1`
    })
    const nodes = svg.current.querySelector<SVGGElement>('.score-nodes')
    if (nodes) nodes.style.opacity = String(progress === null ? 1 : .15 + Math.min(1, Math.max(0, (progress - .72) / .28)) * .85)
  }, reduce, 'draw')

  return <div className="arrangement-score" ref={ref}>
    <div className="score-heading"><span>THE RESOLUTION / LIVE SCORE</span><small>SCROLL TO CONDUCT</small></div>
    <svg ref={svg} viewBox="0 0 1200 420" role="img" aria-label="Five separate lines gradually resolve into one harmonious score">
      <g className="score-staff" aria-hidden="true">
        {[80, 145, 210, 275, 340].map(y => <line key={y} x1="28" x2="1172" y1={y} y2={y}/>) }
      </g>
      <g className="score-paths">
        <path pathLength="1" d="M35 80 C220 80 285 112 420 154 C570 201 780 210 1010 210"/>
        <path pathLength="1" d="M35 145 C190 145 300 158 430 180 C610 208 790 210 1010 210"/>
        <path pathLength="1" d="M35 210 C310 210 660 210 1010 210"/>
        <path pathLength="1" d="M35 275 C190 275 300 262 430 240 C610 212 790 210 1010 210"/>
        <path pathLength="1" d="M35 340 C220 340 285 308 420 266 C570 219 780 210 1010 210"/>
        <path pathLength="1" className="score-resolution" d="M1010 210 C1060 210 1090 182 1165 182"/>
      </g>
      <g className="score-nodes">
        {[80, 145, 210, 275, 340].map((y, i) => <circle key={y} cx="35" cy={y} r={i === 2 ? 6 : 4}/>)}
        <circle className="score-core" cx="1010" cy="210" r="10"/>
        <circle className="score-core-ring" cx="1010" cy="210" r="22"/>
        <circle cx="1165" cy="182" r="6"/>
      </g>
    </svg>
    <div className="score-legend" aria-hidden="true"><span>LEAD</span><span>TIME</span><span>FOLLOW-UP</span><span>SUPPORT</span><span>REPUTATION</span><b>HARMONY</b></div>
  </div>
}
