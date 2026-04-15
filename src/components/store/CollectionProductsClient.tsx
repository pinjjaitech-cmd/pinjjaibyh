'use client'

import { useState, useEffect } from 'react'
import StoreProductCard from './StoreProductCard'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface CollectionProductsClientProps {
  initialProducts: any[]
  categoryId: string
  categoryName: string
}

export default function CollectionProductsClient({ initialProducts, categoryId, categoryName }: CollectionProductsClientProps) {
  const [products, setProducts] = useState<any[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreProducts = async (nextPage: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        categories: categoryId,
        page: nextPage.toString(),
        limit: '12',
        status: 'published'
      })

      const res = await fetch(`/api/products/search?${params.toString()}`)
      const json = await res.json()
      
      if (json.success) {
        const newProducts = json.data || []
        
        // Check if we got more products
        if (newProducts.length === 0) {
          setHasMore(false)
        } else {
          setProducts(prev => [...prev, ...newProducts])
          setCurrentPage(nextPage)
          
          // If we got fewer products than the limit, we've reached the end
          if (newProducts.length < 12) {
            setHasMore(false)
          }
        }
      }
    } catch (error) {
      console.error('Error loading more products:', error)
    } finally {
      setLoading(false)
    }
  }

  if(!initialProducts || initialProducts.length === 0 ){
    return (
      <div className='text-center py-12'>
        <h2 className='text-2xl font-semibold text-(--brand-dark) mb-4'>Coming Soon</h2>
        <p className='text-(--brand-dark)/70'>We&apos;re working on bringing you the best products from {categoryName}. Stay tuned!</p>
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {products.map((product: any) => (
          <StoreProductCard 
            key={product._id.toString()} 
            product={{ ...product, _id: product._id.toString() }} 
          />
        ))}
      </div>
      
      {hasMore && (
        <div className='flex justify-center'>
          <Button 
            onClick={() => loadMoreProducts(currentPage + 1)} 
            disabled={loading}
            className='bg-(--brand-primary) mx-auto flex items-center justify-center'
          >
            {loading ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </>
  )
}
