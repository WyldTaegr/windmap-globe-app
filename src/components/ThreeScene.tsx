'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Globe from './Globe'

interface ThreeSceneProps {
  activeMode: 'cube' | 'sphere' | 'cone' | 'globe'
}

export default function ThreeScene({ activeMode }: ThreeSceneProps) {
  const globeRadius = 100

  return (
    <Canvas
      camera={{
        position: [0, 0, globeRadius * 3]
      }}
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
        {activeMode === 'globe' && <Globe textureUrl='/textures/8081_earthmap10k.jpg' radius={globeRadius}/>}
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls 
        enablePan={false}
        minDistance={globeRadius+0.1}
        maxDistance={globeRadius * 10}
        zoomSpeed={globeRadius / 100}
        enableDamping={true}  // Enable smooth camera movement
        dampingFactor={0.01}  // Set the damping factor (smaller values = smoother)
      />
    </Canvas>
  )
}
