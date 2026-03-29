import Link from 'next/link'
import connectDB from '@/lib/db'
import Category from '@/models/Category'

export default async function CategoriesPage() {
  await connectDB()
  const categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 }).lean() as any[]

  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-14'>
      <h1 className='font-serif text-5xl text-(--brand-dark) mb-3'>Shop by Category</h1>
      <p className='text-(--brand-dark)/70 mb-8'>Explore curated collections and discover products crafted by our artisans.</p>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {categories.map((category) => (
          <Link key={category._id.toString()} href={`/category/${category.slug}`} className='rounded-xl border border-(--brand-dark)/10 p-6 bg-white/70 hover:bg-white'>
            <h2 className='font-serif text-3xl text-(--brand-dark)'>{category.name}</h2>
            <p className='text-sm text-(--brand-dark)/65 mt-1'>{category.description || 'Browse products in this category'}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
