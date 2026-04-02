import { NextResponse } from 'next/server'
import { getHomepageData } from '@/lib/homepage'

// GET /api/homepage - Fetch all homepage data
export async function GET() {
  try {
    const homepageData = await getHomepageData()

    return NextResponse.json({
      success: true,
      data: homepageData
    })
  } catch (error: any) {
    console.error('Error fetching homepage data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch homepage data' },
      { status: 500 }
    )
  }
}
