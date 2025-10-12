import React from 'react'
import { Line } from '@react-three/drei'

interface MarkerProps {
  lat: number  // Latitude in degrees
  lon: number  // Longitude in degrees
  radius: number  // Radius of the globe (sphere)
  height: number // Height above the globe
  size: number // Radius of the marker (sphere)
  color: string
}

const Marker: React.FC<MarkerProps> = ({ lat, lon, radius, height, size, color }) => {
  // Convert latitude and longitude to radians
  const latRad = lat * Math.PI / 180
  const lonRad = -lon * Math.PI / 180

  const dist = radius + height

  // Calculate the 3D position based on latitude and longitude
  const x = dist * Math.cos(latRad) * Math.cos(lonRad)
  const y = dist * Math.sin(latRad)
  const z = dist * Math.cos(latRad) * Math.sin(lonRad)

  return (
    <>
        <Line 
            points={[[0, 0, 0], [x, y, z]]}
            color="yellow" 
        />
        <mesh position={[x, y, z]}>
          <sphereGeometry args={[size, 16, 16]} />  {/* Small marker sphere */}
          <meshStandardMaterial color={color} />      {/* Marker color */}
        </mesh>
    </>
  )
}

export default Marker
