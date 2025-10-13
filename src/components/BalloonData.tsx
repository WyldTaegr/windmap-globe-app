'use client'

import { useEffect, useState } from "react"
import MarkerChain from "./MarkerChain"

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
    return data.map((location: any) => ({
        lat: location[0],
        lon: location[1],
        height: location[2]
    }))
}

const BalloonData: React.FC<BalloonDataProps> = ({radius}) => {
    const [locations, setLocations] = useState<LocationData[][]>([])

    useEffect(() => {
        const fetchLocations = async () => {
            const promises = Array.from({ length: 3 }, (_, i) => getBallonDataAtHour(i).then(data => data))
            const hourlyLocations = await Promise.all(promises)
            const balloonLocations = zip(hourlyLocations)

            setLocations(balloonLocations)
        }

        fetchLocations()
    }, [])


    return (
        <>
        {
            locations.map((location, index) => (
                <MarkerChain key={index} locations={location} radius={radius} />
            ))
        }
        </>
    )
}

export default BalloonData