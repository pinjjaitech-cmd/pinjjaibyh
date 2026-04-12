import connectDB from '@/lib/db'
import Category from '@/models/Category'
import Product from '@/models/Product'
import CollectionProductsClient from '@/components/store/CollectionProductsClient'
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

  const products = await Product.find({ categories: { $in: [category._id] }, status: 'published' })
    .populate('categories', 'name slug')
    .limit(12) // Load first 12 products for initial display
    .sort({ createdAt: -1 })
    .lean()

  return generateCategoryMetadata(category as any, products as any[])
}

export default async function CategoryDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params

  const category = await Category.findOne({ slug, isActive: true }).lean() as any
  if (!category) return notFound()

  // Load initial products (first 12)
  const initialProducts = await Product.find({ categories: { $in: [category._id] }, status: 'published' })
    .populate('categories', 'name slug')
    .limit(12) // Load first 12 products for initial display
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
        <CollectionProductsClient 
          initialProducts={initialProducts as any[]}
          categoryId={category._id.toString()}
          categoryName={category.name}
        />
      </section>
    </>
  )
}
