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
  const [inStock, setInStock] = useState(false)
  const [hasImages, setHasImages] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  async function searchProducts() {
    setLoading(true)
    const params = new URLSearchParams({ q: q })
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','))
    params.set('inStock', String(inStock))
    params.set('hasImages', String(hasImages))

    const res = await fetch(`/api/products/search?${params.toString()}`)
    const json = await res.json()
    console.log(json)
    setProducts(json.data || [])
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true)
      const response = await fetch('/api/collections?limit=100&isActive=true')
      const data = await response.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setCategoriesLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    searchProducts()
  }, [])

  const loadMoreProducts = async (nextPage: number) => {
    setLoading(true)
    const params = new URLSearchParams({ q: q })
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','))
    params.set('inStock', String(inStock))
    params.set('hasImages', String(hasImages))
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
        <div className='grid md:grid-cols-6 gap-3'>
          <Input className='md:col-span-2' placeholder='Search by product, SKU, attribute...' value={q} onChange={(e) => setQ(e.target.value)} />
          <Input placeholder='Min Price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <Input placeholder='Max Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          <label className='flex items-center gap-2 text-sm'><input type='checkbox' checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In stock</label>
          <label className='flex items-center gap-2 text-sm'><input type='checkbox' checked={hasImages} onChange={(e) => setHasImages(e.target.checked)} /> Has images</label>
        </div>
        
        <div className='space-y-2'>
          <Label>Categories</Label>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md'>
            {categoriesLoading ? (
              <div className='col-span-full flex items-center justify-center py-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
              </div>
            ) : categories.length === 0 ? (
              <p className='col-span-full text-sm text-muted-foreground'>No categories available</p>
            ) : (
              categories.map((category) => (
                <div key={category._id} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`category-${category._id}`}
                    checked={selectedCategories.includes(category._id)}
                    onCheckedChange={(checked) => {
                      setSelectedCategories(prev => checked
                        ? [...prev, category._id]
                        : prev.filter(c => c !== category._id)
                      )
                    }}
                  />
                  <Label htmlFor={`category-${category._id}`} className='text-xs'>
                    {category.name}
                  </Label>
                </div>
              ))
            )}
          </div>
          {selectedCategories.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {selectedCategories.map((categoryId) => {
                const category = categories.find(c => c._id === categoryId)
                return category ? (
                  <Badge key={categoryId} variant='secondary' className='text-xs'>
                    {category.name}
                    <button
                      type='button'
                      onClick={() => setSelectedCategories(prev => prev.filter(c => c !== categoryId))}
                      className='ml-1 hover:text-red-500'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </Badge>
                ) : null
              })}
            </div>
          )}
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
