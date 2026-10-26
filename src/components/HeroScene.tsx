import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const mount = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = mount.current
    if (!host) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }) } catch { host.classList.add('webgl-fallback'); return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setClearColor(0x050810, 0)
    host.appendChild(renderer.domElement)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 10)
    const group = new THREE.Group()
    group.rotation.x = -0.18
    scene.add(group)
    const nodeCount = 68
    const positions = new Float32Array(nodeCount * 3)
    const points: THREE.Vector3[] = []
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 2.55 + Math.sin(i * 7.13) * 0.12
      const p = new THREE.Vector3(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi))
      points.push(p); positions.set([p.x, p.y, p.z], i * 3)
    }
    const pointGeo = new THREE.BufferGeometry(); pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pointMat = new THREE.PointsMaterial({ color: 0x67e8f9, size: 0.075, transparent: true, opacity: 0.95, sizeAttenuation: true })
    group.add(new THREE.Points(pointGeo, pointMat))
    const linePositions: number[] = []
    points.forEach((p, i) => points.slice(i + 1).forEach((q) => { if (p.distanceTo(q) < 1.45) linePositions.push(p.x,p.y,p.z,q.x,q.y,q.z) }))
    const lineGeo = new THREE.BufferGeometry(); lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.16 })
    group.add(new THREE.LineSegments(lineGeo, lineMat))
    const ringGeo = new THREE.TorusGeometry(3.15, 0.006, 4, 160)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.25 })
    const ring = new THREE.Mesh(ringGeo, ringMat); ring.rotation.x = 1.18; ring.rotation.y = 0.3; group.add(ring)
    const waveCount = 180
    const wavePositions = new Float32Array(waveCount * 3)
    const waveGeo = new THREE.BufferGeometry(); waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3))
    const waveMat = new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.9 })
    const wave = new THREE.Line(waveGeo, waveMat); wave.position.z = 2.8; scene.add(wave)
    let frame = 0, width = 0, height = 0, scroll = 0
    const resize = () => {
      width = host.clientWidth; height = host.clientHeight
      renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix()
      group.position.x = width > 850 ? 1.8 : 0
      wave.position.x = group.position.x
    }
    const onScroll = () => { scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1) }
    window.addEventListener('resize', resize); window.addEventListener('scroll', onScroll, { passive: true }); resize(); onScroll()
    const clock = new THREE.Clock()
    const render = () => {
      const t = reduced ? 0.8 : clock.getElapsedTime()
      const beat = Math.pow(Math.max(0, Math.sin(t * 2.15)), 10)
      group.rotation.y = t * 0.065 + scroll * 0.45
      group.rotation.z = Math.sin(t * 0.18) * 0.06
      group.scale.setScalar(1 + beat * 0.035 - scroll * 0.08)
      pointMat.size = 0.065 + beat * 0.045
      lineMat.opacity = 0.12 + beat * 0.14
      camera.position.z = 10 + scroll * 1.5
      for (let i = 0; i < waveCount; i++) {
        const x = (i / (waveCount - 1) - 0.5) * 9
        const env = Math.exp(-Math.pow(x * 0.62, 2))
        const y = Math.sin(x * 4.2 - t * 2.3) * 0.12 * env + Math.sin(x * 10 - t * 4) * beat * 0.16 * env
        wavePositions.set([x, y - 2.85, 0], i * 3)
      }
      waveGeo.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
      if (!reduced) frame = requestAnimationFrame(render)
    }
    render()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('scroll', onScroll); scene.traverse((obj) => { if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) { obj.geometry.dispose(); (obj.material as THREE.Material).dispose() } }); renderer.dispose(); renderer.domElement.remove() }
  }, [])
  return <div className="hero-scene" ref={mount} aria-hidden="true"><div className="scene-poster"/></div>
}
