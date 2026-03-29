import connectDB from '@/lib/db'
import WishlistModel from '@/models/Wishlist'
import UserModel from '@/models/User'

export default async function AdminWishlistPage() {
  await connectDB()

  const wishlists = await WishlistModel.find({})
    .populate({ path: 'userId', model: UserModel, select: 'fullName email phone' })
    .populate('productIds', 'title slug')
    .sort({ updatedAt: -1 })
    .lean()

  return (
    <section className='space-y-4'>
      <h1 className='text-3xl font-semibold'>Customer Wishlists</h1>
      <p className='text-muted-foreground'>Use wishlist IDs shared on WhatsApp to verify customer selections.</p>

      <div className='grid gap-4'>
        {(wishlists as any[]).map((wishlist: any) => (
          <article key={wishlist._id.toString()} className='rounded-lg border bg-card p-4'>
            <h2 className='text-xl font-semibold'>{wishlist.name}</h2>
            <p className='text-sm text-muted-foreground'>Wishlist ID: {wishlist._id.toString()}</p>
            <p className='text-sm text-muted-foreground'>Customer: {wishlist.userId?.fullName} ({wishlist.userId?.email})</p>
            <ul className='mt-3 list-disc pl-5'>
              {(wishlist.productIds || []).map((product: any) => (
                <li key={product._id.toString()}>{product.title}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
