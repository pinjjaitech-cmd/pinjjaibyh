'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X, Loader2 } from 'lucide-react'
import StoreProductCard from './StoreProductCard'

export default function ProductSearchClient() {
  const [q, setQ] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  async function searchProducts() {
    setLoading(true)
    const params = new URLSearchParams({ q: q })
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)

    const res = await fetch(`/api/products/search?${params.toString()}`)
    const json = await res.json()
    console.log(json)
    setProducts(json.data || [])
    setLoading(false)
  }

  useEffect(() => {
    searchProducts()
  }, [])

  useEffect(() => {
    // Add debouncing to avoid too many requests
    const timer = setTimeout(() => {
      searchProducts()
    }, 500)
    return () => clearTimeout(timer)
  }, [q])

  const loadMoreProducts = async (nextPage: number) => {
    setLoading(true)
    const params = new URLSearchParams({ q: q })
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    params.set('page', nextPage.toString())
    setCurrentPage(nextPage)

    const res = await fetch(`/api/products/search?${params.toString()}`)
    const json = await res.json()
    console.log(json)
    setProducts(prev => [...prev, ...(json.data || [])])
    setLoading(false)
  }

  return (
    <div className='space-y-6'>
      <div className='rounded-xl border border-(--brand-dark)/10 p-4 bg-white/70 space-y-4'>
        <div className='w'>
          <Input className='w-full' placeholder='Search by product, SKU, attribute...' value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className='grid md:grid-cols-6 gap-3'>
          <Input placeholder='Min Price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <Input placeholder='Max Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
        <Button onClick={searchProducts} className='w-full'>Apply filters</Button>
      </div>
      {loading ? <p>Searching...</p> : (
        <div className='w-full flex items-center justify-center gap-5 flex-col'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map((p: any) => <StoreProductCard key={p._id} product={p} />)}
          </div>
          <Button onClick={() => loadMoreProducts(currentPage + 1)} className='bg-(--brand-primary) mx-auto flex items-center justify-center'>Load More</Button>
        </div>
      )}
    </div>
  )
}
