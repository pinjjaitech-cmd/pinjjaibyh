'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import StoreProductCard from './StoreProductCard'

export default function ProductSearchClient() {
  const [q, setQ] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [inStock, setInStock] = useState(false)
  const [hasImages, setHasImages] = useState(true)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function searchProducts() {
    setLoading(true)
    const params = new URLSearchParams({ q: q || 'bag' })
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    params.set('inStock', String(inStock))
    params.set('hasImages', String(hasImages))

    const res = await fetch(`/api/products/search?${params.toString()}`)
    const json = await res.json()
    setProducts(json.data || [])
    setLoading(false)
  }

  useEffect(() => {
    searchProducts()
  }, [])

  return (
    <div className='space-y-6'>
      <div className='rounded-xl border border-(--brand-dark)/10 p-4 bg-white/70 grid md:grid-cols-6 gap-3'>
        <Input className='md:col-span-2' placeholder='Search by product, SKU, attribute...' value={q} onChange={(e) => setQ(e.target.value)} />
        <Input placeholder='Min Price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <Input placeholder='Max Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <label className='flex items-center gap-2 text-sm'><input type='checkbox' checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In stock</label>
        <label className='flex items-center gap-2 text-sm'><input type='checkbox' checked={hasImages} onChange={(e) => setHasImages(e.target.checked)} /> Has images</label>
        <Button onClick={searchProducts} className='md:col-span-6'>Apply filters</Button>
      </div>
      {loading ? <p>Searching...</p> : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((p: any) => <StoreProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  )
}
