import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GlobeProps {
  textureUrl: string
  radius?: number
}

const Globe: React.FC<GlobeProps> = ({ textureUrl, radius = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  // Add rotation animation
  useFrame(() => {
    if (meshRef.current) {
      //meshRef.current.rotation.y += 0.001 // Slowly rotate the globe
    }
  })

  // Texture loader to load Earth texture
  const texture = new THREE.TextureLoader().load(textureUrl)

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} /> {/* Create a sphere geometry */}
      <meshStandardMaterial map={texture} /> {/* Apply the texture to the sphere */}
    </mesh>
  )
}

export default Globe
