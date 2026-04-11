import connectDB from '@/lib/db'
import Category from '@/models/Category'
import Product from '@/models/Product'
import StoreProductCard from '@/components/store/StoreProductCard'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { generateCategoryMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  await connectDB()
  const { slug } = await params
  
  const category = await Category.findOne({ slug, isActive: true }).lean()
  if (!category) {
    return {
      title: 'Collection Not Found | Pinjjai',
      description: 'The requested collection could not be found.',
    }
  }

  const products = await Product.find({ category: category._id, status: 'published' })
    .populate('category', 'name slug')
    .lean()

  return generateCategoryMetadata(category as any, products as any[])
}

export default async function CategoryDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params

  const category = await Category.findOne({ slug, isActive: true }).lean() as any
  if (!category) return notFound()

  const products = await Product.find({ category: category._id, status: 'published' })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 })
    .lean()

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Collections', url: '/collections' },
    { name: category.name, url: `/collection/${category.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className='w-full max-w-7xl mx-auto px-4 py-14'>
        <h1 className='font-serif text-5xl text-(--brand-dark) mb-3'>{category.name}</h1>
        <p className='text-(--brand-dark)/70 mb-8'>{category.description || 'Explore products in this category.'}</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {(products as any[]).map((product: any) => <StoreProductCard key={product._id.toString()} product={{ ...product, _id: product._id.toString() }} />)}
        </div>
      </section>
    </>
  )
}
