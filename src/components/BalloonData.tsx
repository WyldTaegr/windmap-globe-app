'use client'

import { useEffect, useState } from "react"
import Marker from "./Marker"

interface LocationData {
    lat: number
    lon: number
    height: number
}

interface BalloonDataProps {
    radius: number
}

const BalloonData: React.FC<BalloonDataProps> = ({radius}) => {
    const markerSize = 1

    const [locations, setLocations] = useState<LocationData[]>([])

    useEffect(() => {
        const fetchLocations = async () => {
            let data
            try {
                const response = await fetch("/api/locations")
                data = await response.json()
                console.log(data)
            } catch (error) {
                console.log(`Error caught: ${error}`)
                return
            }

            const locationsData: LocationData[] = data.map((location: any) => ({
                lat: location[0],
                lon: location[1],
                height: location[2]
            }))

            setLocations(locationsData)
        }

        fetchLocations()
    }, [])


    return (
        <>
        {
            locations.map((location, index) => (
                <Marker key={index} lat={location.lat} lon={location.lon} radius={radius} height={location.height} size={markerSize} color={"orange"} />
            ))
        }
        </>
    )
}

export default BalloonData