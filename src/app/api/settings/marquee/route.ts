import connectDB from "@/lib/db";
import { StoreSettings } from "@/models/StoreSettings";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {

        await connectDB()

        const settings = await StoreSettings.findOne()
        const marqueeTexts = settings?.marqueeTexts || []

        return NextResponse.json({
            success: true,
            data: marqueeTexts
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to get marquee texts"
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const { marqueeTexts } = await request.json()

    if (!marqueeTexts || !Array.isArray(marqueeTexts)) {
        return Response.json(
            {
                success: false,
                message: "Marquee texts are required"
            },
            { status: 400 }
        )
    }

    const settings = await StoreSettings.findOne()
    if (settings) {
        settings.marqueeTexts.push(...marqueeTexts)
        await settings.save()
    }

    return Response.json({
        success: true,
        message: "Marquee texts added successfully"
    })
}


export async function PUT(request: NextRequest) {
    const { marqueeTexts } = await request.json()

    if (!marqueeTexts || !Array.isArray(marqueeTexts)) {
        return Response.json(
            {
                success: false,
                message: "Marquee texts are required"
            },
            { status: 400 }
        )
    }

    const settings = await StoreSettings.findOne()
    if (settings) {
        settings.marqueeTexts = marqueeTexts
        await settings.save()
    }

    return Response.json({
        success: true,
        message: "Marquee texts updated successfully"
    })
}