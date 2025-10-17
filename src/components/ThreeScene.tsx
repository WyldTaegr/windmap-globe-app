'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Globe from './Globe'
import Marker from './Marker'
import BalloonData from './BalloonData'
import AlertData from './AlertData'

interface ThreeSceneProps {
  activeMode: 'globe'
}

export default function ThreeScene({ activeMode }: ThreeSceneProps) {
  const globeRadius = 100
  const markerSize = 1

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

      <Globe textureUrl='/textures/8081_earthmap10k.jpg' radius={globeRadius}/>

      
      <Marker lat={37.7749} lon={-122.4194} radius={globeRadius} height={10} size={markerSize} color={"red"}/> {/* San Francisco */}
      <Marker lat={51.5074} lon={-0.1278} radius={globeRadius} height={10} size={markerSize} color={"blue"}/>  {/* London */}
      <Marker lat={48.8566} lon={2.3522} radius={globeRadius} height={10} size={markerSize} color={"green"}/>   {/* Paris */}
      <Marker lat={39.9042} lon={116.4074} radius={globeRadius} height={10} size={markerSize} color={"yellow"}/>   {/* Beijing */}

      <BalloonData radius={globeRadius}/>

      <AlertData globeRadius={globeRadius} />
      
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
