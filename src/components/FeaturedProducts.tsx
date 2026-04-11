import StoreProductCard from './store/StoreProductCard'
import Link from 'next/link'

const FeaturedProducts = async ({ products }: { products?: any[] }) => {
  let featuredProducts = products || []

  if (!featuredProducts.length) {
    return null
  }

  return (
    <div className='w-full py-16 px-4 md:px-8 lg:px-16 bg-(--brand-white)'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-(--brand-dark) mb-4 font-serif'>Best Sellers</h2>
          <p className='text-lg text-(--brand-dark)/60 max-w-2xl mx-auto'>Handcrafted pieces curated for your next wishlist.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {featuredProducts.map((product: any) => (
            <StoreProductCard 
              key={product.productId?.toString() || product._id?.toString()} 
              product={{ 
                ...product, 
                _id: product.productId?.toString() || product._id?.toString() 
              }} 
            />
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link href='/search' className='inline-flex items-center border border-(--brand-dark)/30 px-8 py-3 rounded-lg font-serif font-bold hover:bg-(--brand-primary) hover:text-(--brand-white) transition-all duration-300'>
            Explore all products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
