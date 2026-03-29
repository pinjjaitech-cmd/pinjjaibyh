import { auth } from '@/lib/auth'
import connectDB from '@/lib/db'
import WishlistModel from '@/models/Wishlist'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  await connectDB()

  const wishlist = await WishlistModel.findOne({ _id: id, userId: session.user.id })
  if (!wishlist) {
    return NextResponse.json({ success: false, error: 'Wishlist not found' }, { status: 404 })
  }

  if (body.name !== undefined) wishlist.name = body.name
  if (body.notes !== undefined) wishlist.notes = body.notes

  if (body.addProductId) {
    wishlist.addProduct(body.addProductId)
  }

  if (body.removeProductId) {
    wishlist.removeProduct(body.removeProductId)
  }

  await wishlist.save()

  return NextResponse.json({ success: true, data: wishlist })
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  await connectDB()

  const deleted = await WishlistModel.findOneAndDelete({ _id: id, userId: session.user.id })
  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Wishlist not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: 'Wishlist deleted' })
}
