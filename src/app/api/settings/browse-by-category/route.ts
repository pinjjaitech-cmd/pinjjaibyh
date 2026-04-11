import { NextRequest } from "next/server";
import { StoreSettings } from "@/models/StoreSettings";
import connectDB from "@/lib/db";
import CategoryModel from "@/models/Category";

export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const settings = await StoreSettings.findOne().lean()
        return Response.json(settings?.browseByCategory || [])
    } catch (error) {
        console.error('Error fetching browse by category:', error)
        return Response.json({ error: 'Failed to fetch browse by category' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { categoryIds } = await request.json()

        const categories = await CategoryModel.find({ _id: { $in: categoryIds } })

        const finalCategoriesData = categories.map((category) => {
            return {
                categoryName: category.name,
                categoryImage: category.image,
                categorySlug: category.slug
            }
        })

        const settings = await StoreSettings.findOneAndUpdate(
            {},
            { browseByCategory: finalCategoriesData },
            { new: true, upsert: true }
        )

        return Response.json(settings?.browseByCategory || [])
    } catch (error) {
        console.error('Error updating browse by category:', error)
        return Response.json({ error: 'Failed to update browse by category' }, { status: 500 })
    }
}