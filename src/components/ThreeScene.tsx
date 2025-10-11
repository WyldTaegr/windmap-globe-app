'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'

const ThreeScene = () => {
  const boxRef = useRef<Mesh>(null)

  return (
    <Canvas
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0
        }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={boxRef} position={[-1.2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="royalblue" />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}

export default ThreeScene