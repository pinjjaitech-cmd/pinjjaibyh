import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { StoreSettings } from '@/models/StoreSettings'

export async function GET() {
  try {

    await connectDB()

    // fetch the store settings first document to and sent the homepage data
    const storeSettings = await StoreSettings.findOne().sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: storeSettings
    })
  } catch (error: any) {
    console.error('Error fetching homepage data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch homepage data' },
      { status: 500 }
    )
  }
}

