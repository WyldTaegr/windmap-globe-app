import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ time: string }> }) {
  const { time } = await params
  const timeInt = parseInt(time)
  const delay = String(timeInt).padStart(2, '0')

  const windborneURL = `https://a.windbornesystems.com/treasure/${delay}.json`
  try {
    // Make a request to the Windborne API
    const response = await fetch(
      `${windborneURL}`
    )
    if (!response.ok) {
      throw new Error(`Windborne API request failed: ${response.statusText}`)
    }

    // Parse the response
    const data = await response.json()

    // Send the response data to the client
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json({ error: 'Failed to fetch data from Windborne' }, { status: 500 })
  }
}
