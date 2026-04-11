import ProductSearchClient from '@/components/store/ProductSearchClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Products - Find Handcrafted Crochet Bags | Pinjjai',
  description: 'Search our collection of handcrafted crochet bags by keyword, price, services, and stock availability. Find the perfect artisan-crafted bag for your style.',
  keywords: ['search handcrafted bags', 'find crochet bags', 'artisan product search', 'punjab crafts', 'sustainable fashion search'],
  openGraph: {
    title: 'Search Handcrafted Crochet Bags | Pinjjai',
    description: 'Search our collection of handcrafted crochet bags and find the perfect artisan-crafted accessory.',
    url: '/search',
    images: [
      {
        url: '/og-search.jpg',
        width: 1200,
        height: 630,
        alt: 'Search handcrafted crochet bags at Pinjjai',
      },
    ],
  },
}

export default function SearchPage() {
  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-14'>
      <h1 className='font-serif text-5xl text-(--brand-dark) mb-3'>Search Products</h1>
      <p className='text-(--brand-dark)/70 mb-8'>Find handcrafted products by keyword, price, services, and stock availability.</p>
      <ProductSearchClient />
    </section>
  )
}
