import WishlistManager from '@/components/store/WishlistManager'

export default function WishlistPage() {
  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-14'>
      <h1 className='font-serif text-5xl text-(--brand-dark) mb-3'>My Wishlists</h1>
      <p className='text-(--brand-dark)/70 mb-8'>Create multiple wishlists, add products, and send the wishlist ID on WhatsApp to place your booking.</p>
      <WishlistManager />
    </section>
  )
}
