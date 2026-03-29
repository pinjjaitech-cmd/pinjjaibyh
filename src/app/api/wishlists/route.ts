import { auth } from '@/lib/auth'
import connectDB from '@/lib/db'
import Product from '@/models/Product'
import WishlistModel from '@/models/Wishlist'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()

  const wishlists = await WishlistModel.find({ userId: session.user.id })
    .populate({
      path: 'productIds',
      model: Product,
      select: 'title slug variants status',
    })
    .sort({ updatedAt: -1 })
    .lean()

  return NextResponse.json({ success: true, data: wishlists })
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  if (!body?.name) {
    return NextResponse.json({ success: false, error: 'Wishlist name is required' }, { status: 400 })
  }

  await connectDB()

  const wishlist = await WishlistModel.create({
    userId: session.user.id,
    name: body.name,
    notes: body.notes || '',
    productIds: [],
  })

  return NextResponse.json({ success: true, data: wishlist }, { status: 201 })
}
