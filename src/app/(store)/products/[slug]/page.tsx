import connectDB from '@/lib/db'
import Product from '@/models/Product'
import WishlistCTA from '@/components/store/WishlistProductActions'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params

  const product = await Product.findOne({ slug, status: 'published' }).populate('category', 'name slug').lean() as any
  if (!product) return notFound()

  const variant = product.variants?.find((v: any) => v._id.toString() === product.defaultVariantId) || product.variants?.[0]
  const images = variant?.images?.length ? variant.images : ['/products/5.png']

  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-10'>
      <div className='grid lg:grid-cols-2 gap-10'>
        <div className='grid gap-4'>
          {images.map((img: string, index: number) => (
            <div key={index} className='relative aspect-square rounded-2xl overflow-hidden bg-(--brand-white) border border-(--brand-dark)/10'>
              <Image src={img} alt={`${product.title} image ${index + 1}`} fill className='object-cover' />
            </div>
          ))}
        </div>
        <div>
          <p className='text-xs uppercase tracking-[0.25em] text-(--brand-dark)/70'>{product.category?.name || 'Collection'}</p>
          <h1 className='font-serif text-5xl text-(--brand-dark) mt-2'>{product.title}</h1>
          <p className='text-2xl text-(--brand-primary) mt-4'>₹{(variant?.price || 0).toLocaleString('en-IN')}</p>
          <p className='mt-5 leading-relaxed text-(--brand-dark)/80'>{product.description}</p>
          <div className='mt-8'>
            <WishlistCTA productId={product._id.toString()} productTitle={product.title} />
          </div>
        </div>
      </div>
    </section>
  )
}
