'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    salePrice?: number
    discount?: number
    mainImage: string
    hoverImage: string
    colors: string[]
    material?: string
    priority?: boolean
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className='group relative w-full overflow-hidden'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Product Image Container */}
        <div className='relative overflow-hidden aspect-[3/4] bg-(--brand-white)'>
          {/* Discount Badge */}
          {product.discount && (
            <span className='absolute top-4 left-4 bg-(--brand-white) text-(--brand-dark) text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-sm'>
              -{product.discount}%
            </span>
          )}

          {/* Product Image */}
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={product.priority}
            style={{ objectFit: 'cover' }}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-(--brand-primary)/20'
            loading={product.priority ? "eager" : "lazy"}
          />

          {/* Hover overlay with Quick View */}
          <div className="absolute inset-0 bg-(--brand-primary)/0 group-hover:bg-(--brand-primary)/20 transition-all duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
          </div>

          {/* Action Buttons - Appear on Hover */}
          <div className='absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10'>
            <button className='p-2 bg-(--brand-white)/90 backdrop-blur rounded-full shadow-md hover:bg-(--brand-white) transition-all duration-300 hover:scale-110'>
              <Heart className='h-4 w-4 text-(--brand-dark) hover:text-red-500' />
            </button>
            <button className='p-2 bg-(--brand-white)/90 backdrop-blur rounded-full shadow-md hover:bg-(--brand-white) transition-all duration-300 hover:scale-110'>
              <Eye className='h-4 w-4 text-(--brand-dark)' />
            </button>
          </div>

          {/* Quick Add Button - Keep your favorite transition */}
          <button className='absolute bottom-0 left-0 right-0 bg-(--brand-primary) text-(--brand-white) font-bold py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out z-10 flex items-center justify-center space-x-2'>
            <ShoppingCart className='h-4 w-4' />
            <span className='text-sm font-medium'>Quick Add</span>
          </button>
        </div>

        {/* Product Info */}
        <div className='mt-4 flex items-start justify-between'>
          <div>
            <h3 className='font-serif text-xl text-(--brand-dark) group-hover:text-(--brand-primary) transition-colors duration-300'>
              {product.name}
            </h3>
            {product.material && (
              <p className='text-xs text-(--brand-dark)/60 mt-1'>{product.material}</p>
            )}
          </div>
          <div className='text-right'>
            {product.salePrice ? (
              <>
                <p className='text-sm text-(--brand-dark) font-serif'>
                  Rs. {product.salePrice.toLocaleString('en-IN')}
                </p>
                <p className='text-xs text-(--brand-dark)/50 line-through'>
                  Rs. {product.price.toLocaleString('en-IN')}
                </p>
              </>
            ) : (
              <p className='text-sm text-(--brand-dark) font-serif'>
                Rs. {product.price.toLocaleString('en-IN')}
              </p>
            )}
          </div>
        </div>

        {/* Color Variations */}
        <div className='flex space-x-2 mt-3'>
          {product.colors.slice(0, 3).map((color, index) => (
            <button
              key={index}
              className='w-5 h-5 rounded-full border-2 border-(--brand-white)/50 hover:border-(--brand-primary) transition-all duration-300 hover:scale-110'
              style={{ backgroundColor: color }}
              aria-label={`Color option ${index + 1}`}
            />
          ))}
          {product.colors.length > 3 && (
            <span className='text-xs text-(--brand-dark)/60 flex items-center'>
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}

export default ProductCard