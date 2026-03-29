import ProductSearchClient from '@/components/store/ProductSearchClient'

export default function SearchPage() {
  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-14'>
      <h1 className='font-serif text-5xl text-(--brand-dark) mb-3'>Search Products</h1>
      <p className='text-(--brand-dark)/70 mb-8'>Find handcrafted products by keyword, price, services, and stock availability.</p>
      <ProductSearchClient />
    </section>
  )
}
