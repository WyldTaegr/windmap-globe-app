'use client'

import { useEffect, useState } from "react"
import MarkerChain from "./MarkerChain"
import { Html } from "@react-three/drei"

interface LocationData {
    lat: number
    lon: number
    height: number
}

interface BalloonDataProps {
    radius: number
}

const zip = (arrays: LocationData[][]) => 
  Array.from({ length: Math.max(...arrays.map(arr => arr.length)) }, (_, i) =>
    arrays.map(arr => arr[i])
  );


async function getBallonDataAtHour(hour: number): Promise<LocationData[]> {
    const response = await fetch(`/api/locations/${hour}`)
    const data = await response.json()
    return data.map((location: number[]) => ({
        lat: location[0],
        lon: location[1],
        height: location[2]
    }))
}

const BalloonData: React.FC<BalloonDataProps> = ({radius}) => {
    const [locations, setLocations] = useState<LocationData[][]>([])
    const [failedHours, setFailedHours] = useState<number[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const promises = Array.from({ length: 3 }, (_, i) => getBallonDataAtHour(i))
            const results = await Promise.allSettled(promises)
            
            const successful: LocationData[][] = [];
            const failed: number[] = [];
      
            results.forEach((result, index) => {
              if (result.status === "fulfilled") {
                successful.push(result.value);
              } else {
                failed.push(index);
              }
            });
            
            const balloonLocations = zip(successful)

            setLocations(balloonLocations)
            setFailedHours(failed)
        }

        fetchLocations()
    }, [])


    return (
        <>
            {
                failedHours.length > 0 && (
                    <Html
                      position={[0, 0, 0]} // doesn't affect screen position when `fullscreen` is true
                      fullscreen
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        color: "orange",
                        fontSize: "14px",
                        fontFamily: "monospace",
                        pointerEvents: "none",
                      }}
                    >
                      ⚠️ Some balloon location data failed to load (hours: {failedHours.join(", ")})
                    </Html>
                )
            }
            {
                locations.map((location, index) => (
                    <MarkerChain key={index} locations={location} radius={radius} />
                ))
            }
        </>
    )
}

export default BalloonData