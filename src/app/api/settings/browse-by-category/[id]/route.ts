import connectDB from "@/lib/db"
import { StoreSettings } from "@/models/StoreSettings"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        await connectDB()
        const { id } = await params
        
        if(!id){
            return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        }

        const settings = await StoreSettings.findOneAndUpdate(
            {},
            { $pull: { browseByCategory: { _id: id } } },
            { new: true }
        )

        return NextResponse.json(settings?.browseByCategory || [])

    } catch (error) {
        console.error('Error deleting browse by category:', error)
        return NextResponse.json({ error: 'Failed to delete browse by category' }, { status: 500 })
    }
}