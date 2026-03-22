import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── Floating star field ───────────────────────────────────────────────────────
function StarField() {
  const ref = useRef()

  const positions = useMemo(() => {
    const count = 2200
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Spread in a sphere
      const r = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.018
      ref.current.rotation.y -= delta * 0.012
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

// ── Floating geometric mesh ───────────────────────────────────────────────────
function FloatingGeometry({ position, color, speed, rotAxis }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * (rotAxis[0] || 0)
    ref.current.rotation.y = t * (rotAxis[1] || 0)
    ref.current.rotation.z = t * (rotAxis[2] || 0)
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3
  })

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.18, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.18}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

// ── Torus ring ────────────────────────────────────────────────────────────────
function TorusRing({ position, color, speed }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.z = t * 0.3
    ref.current.position.y = position[1] + Math.sin(t * 0.4) * 0.25
  })

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.28, 0.04, 8, 40]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.2}
        emissive={color}
        emissiveIntensity={0.5}
        wireframe={false}
      />
    </mesh>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene() {
  const geometries = useMemo(() => [
    { position: [-3.5, 1.2, -2],   color: '#6366f1', speed: 0.35, rotAxis: [0.5, 1, 0.3] },
    { position: [3.2, -0.8, -3],   color: '#a855f7', speed: 0.28, rotAxis: [1, 0.4, 0.6] },
    { position: [-2.0, -1.8, -1.5],color: '#ec4899', speed: 0.42, rotAxis: [0.3, 0.8, 1] },
    { position: [2.5, 2.0, -2.5],  color: '#818cf8', speed: 0.22, rotAxis: [0.7, 0.5, 0.4] },
    { position: [0.5, -2.5, -2],   color: '#c084fc', speed: 0.38, rotAxis: [0.4, 1, 0.7] },
    { position: [-1.2, 2.8, -3],   color: '#f472b6', speed: 0.3,  rotAxis: [1, 0.3, 0.5] },
  ], [])

  const rings = useMemo(() => [
    { position: [3.8, 0.5, -3.5],  color: '#6366f1', speed: 0.25 },
    { position: [-3.0, -1.5, -2.5],color: '#a855f7', speed: 0.32 },
    { position: [1.0, 2.5, -4],    color: '#ec4899', speed: 0.2  },
  ], [])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-5, -5, 3]} intensity={0.6} color="#a855f7" />
      <StarField />
      {geometries.map((g, i) => (
        <FloatingGeometry key={i} {...g} />
      ))}
      {rings.map((r, i) => (
        <TorusRing key={i} {...r} />
      ))}
    </>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
