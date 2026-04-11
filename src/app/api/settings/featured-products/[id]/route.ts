import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { StoreSettings } from '@/models/StoreSettings'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    if (!id) {
        return NextResponse.json(
            {
                success: false,
                message: "Product ID is required"
            },
            { status: 400 }
        )
    }

    await connectDB()

    const settings = await StoreSettings.findOne()
    if (settings) {
        settings.featuredProducts = settings.featuredProducts.filter((productId: string) => productId !== id)
        await settings.save()
    }

    return NextResponse.json(
        {
            success: true,
            message: "Product removed from featured products"
        },
        { status: 200 }
    )
}
