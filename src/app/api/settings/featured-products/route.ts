import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { StoreSettings } from '@/models/StoreSettings'
import Product from '@/models/Product'

// GET /api/settings/featured-products - Fetch all featured products data
export async function GET(){
    try {
        await connectDB()
        const settings = await StoreSettings.findOne()
        return NextResponse.json({
            success: true,
            data: settings?.featuredProducts || []
        })
    } catch (error) {
        console.error('Error fetching featured products:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch featured products' },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request) {
  try {
    const { productIds } = await request.json()
    await connectDB()

    if(!productIds || productIds.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "Product IDs are required"
      })
    }

    // Fetch full product data
    const products = await Product.find({ 
      _id: { $in: productIds },
      status: 'published' 
    })
    .select('title slug description categories defaultVariantId variants')
    .populate('categories', 'name slug')
    .lean()

    // Transform products to required format
    const featuredProductsData = products.map(product => ({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      description: product.description,
      categories: product.categories,
      defaultVariantId: product.defaultVariantId,
      variants: product.variants,
      status: product.status
    }))

    const settings = await StoreSettings.findOneAndUpdate(
      {},
      { featuredProducts: featuredProductsData },
      { new: true, upsert: true }
    )

    return NextResponse.json({
      success: true,
      data: featuredProductsData
    })
  } catch (error: any) {
    console.error('Error updating featured products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update featured products' },
      { status: 500 }
    )
  }
}
