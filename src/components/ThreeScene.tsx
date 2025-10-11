'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface ThreeSceneProps {
  activeMode: 'cube' | 'sphere' | 'cone'
}

export default function ThreeScene({ activeMode }: ThreeSceneProps) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, 0]}>
        {activeMode === 'cube' && <boxGeometry args={[2, 2, 2]} />}
        {activeMode === 'sphere' && <sphereGeometry args={[1.5, 32, 32]} />}
        {activeMode === 'cone' && <coneGeometry args={[1, 2, 32]} />}
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}
