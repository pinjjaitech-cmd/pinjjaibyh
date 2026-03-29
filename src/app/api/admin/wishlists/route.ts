import { requireAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/db'
import UserModel from '@/models/User'
import WishlistModel from '@/models/Wishlist'
import { NextResponse } from 'next/server'

export async function GET() {
  const adminError = await requireAdmin()
  if (adminError) {
    return adminError
  }

  await connectDB()

  const data = await WishlistModel.find({})
    .populate({ path: 'userId', model: UserModel, select: 'fullName email phone' })
    .populate('productIds', 'title slug variants')
    .sort({ updatedAt: -1 })
    .lean()

  return NextResponse.json({ success: true, data })
}
