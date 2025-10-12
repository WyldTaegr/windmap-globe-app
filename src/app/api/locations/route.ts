// src/app/api/locations/route.ts

import { NextResponse } from 'next/server'

const WINDBORNE_URL = 'https://a.windbornesystems.com/treasure/00.json'

export async function GET() {
  try {
    // Make a request to the GeoNames API
    const response = await fetch(
      `${WINDBORNE_URL}`
    )
    if (!response.ok) {
      throw new Error('GeoNames API request failed')
    }

    // Parse the response
    const data = await response.json()

    // Send the response data to the client
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json({ error: 'Failed to fetch data from GeoNames' }, { status: 500 })
  }
}
