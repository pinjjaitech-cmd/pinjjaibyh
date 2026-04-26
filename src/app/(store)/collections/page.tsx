import Link from 'next/link'
import connectDB from '@/lib/db'
import Category from '@/models/Category'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections - Shop Handcrafted Crochet Bags by Category',
  description: 'Explore our curated collections of handcrafted crochet bags. Each collection features unique designs created by women artisans in Punjab, blending traditional techniques with contemporary style.',
  keywords: ['crochet bag collections', 'handcrafted bags', 'artisan categories', 'women crafts', 'punjab handicrafts', 'sustainable fashion collections'],
  openGraph: {
    title: 'Collections - Handcrafted Crochet Bags by Pinjjai',
    description: 'Browse our curated collections of handcrafted crochet bags, each telling a unique story of traditional craftsmanship and modern design.',
    url: '/collections',
    images: [
      {
        url: '/og-collections.jpg',
        width: 1200,
        height: 630,
        alt: 'Handcrafted crochet bag collections by Pinjjai',
      },
    ],
  },
}

export default async function CategoriesPage() {
  await connectDB()
  let categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 }).lean() as any[]
  categories = categories.filter((category) => category.order >= 10)

  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-14'>
      <h1 className='font-serif text-5xl text-(--brand-dark) mb-3'>Shop by Collections</h1>
      <p className='text-(--brand-dark)/70 mb-8'>Explore curated collections and discover products crafted by our artisans.</p>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {categories.map((category) => (
          <Link key={category._id.toString()} href={`/collection/${category.slug}`} className='rounded-xl border border-(--brand-dark)/10 p-6 bg-white/70 hover:bg-white'>
            <img src={category.image} alt={category.name} width={400} height={500} className='w-full max-h-96 object-top-center mb-2 object-cover rounded-lg' />
            <h2 className='font-serif text-3xl text-(--brand-dark)'>{category.name}</h2>
            <p className='text-sm text-(--brand-dark)/65 mt-1'>{category.description || 'Browse products in this category'}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
