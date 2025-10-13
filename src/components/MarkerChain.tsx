import { Line } from "@react-three/drei"
import { Vector3 } from "@react-three/fiber"
import React from "react"

interface Location {
    lat: number
    lon: number
    height: number
}

interface MarkerChainProps {
    locations: Location[]
    radius: number
}

const MarkerChain: React.FC<MarkerChainProps> = ({locations, radius}) => {

    function coordinatesToPosition(location: Location): Vector3 {
        const latRad = location.lat * Math.PI / 180
        const lonRad = -location.lon * Math.PI / 180
      
        const dist = radius + location.height
      
        // Calculate the 3D position based on latitude and longitude
        const x = dist * Math.cos(latRad) * Math.cos(lonRad)
        const y = dist * Math.sin(latRad)
        const z = dist * Math.cos(latRad) * Math.sin(lonRad)

        return [x, y, z]
    }

    const points: Vector3[] = locations.map(coordinatesToPosition)
    const origin: Vector3 = [0, 0, 0]

    return (
        <>
            <Line
                points={[origin, points[0]]}
                color="yellow"
            />
            <mesh position={points[0]}>
              <sphereGeometry args={[1, 16, 16]} />  {/* Small marker sphere */}
              <meshStandardMaterial color={"orange"} />      {/* Marker color */}
            </mesh>
            {points.map((point, index) => (
                index > 0 &&
                <React.Fragment key={`fragment-${index}`}>
                    <Line
                        points={[points[index - 1], point]}
                        color="blue"
                    />
                    <mesh position={point}>
                        <sphereGeometry args={[0.5, 16, 16]} />
                        <meshStandardMaterial color={"gray"} />
                    </mesh>
                </React.Fragment>
            ))}
        </>
    )
}

export default MarkerChain