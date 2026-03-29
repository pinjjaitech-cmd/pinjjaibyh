import React from 'react'
import ProductCard from './ui/ProductCard'

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: "1",
      name: "Soothing Body Lotion",
      price: 17100,
      salePrice: 16600,
      discount: 3,
      mainImage: "/products/5.png",
      hoverImage: "/products/11.png",
      colors: ["#3b82f6", "#ffffff", "#eab308"],
      material: "Natural Botanicals",
      priority: true
    },
    {
      id: "2", 
      name: "Luxury Face Cream",
      price: 25000,
      salePrice: 22500,
      discount: 10,
      mainImage: "/products/11.png",
      hoverImage: "/products/15.png",
      colors: ["#ec4899", "#f8fafc", "#8b5cf6"],
      material: "Organic Extracts"
    },
    {
      id: "3",
      name: "Nourishing Hair Oil", 
      price: 12000,
      mainImage: "/products/17.png",
      hoverImage: "/products/19.png",
      colors: ["#10b981", "#fef3c7", "#6366f1"],
      material: "Herbal Blend"
    },
    {
      id: "4",
      name: "Revitalizing Serum",
      price: 32000,
      salePrice: 28800,
      discount: 10,
      mainImage: "/products/24.png",
      hoverImage: "/products/31.png",
      colors: ["#f59e0b", "#ffffff", "#ef4444"],
      material: "Vitamin C"
    },
    {
      id: "5",
      name: "Hydrating Night Cream",
      price: 18500,
      mainImage: "/products/34.png",
      hoverImage: "/products/42.png",
      colors: ["#a855f7", "#fef3c7", "#3b82f6"],
      material: "Retinol Complex"
    },
    {
      id: "6",
      name: "Brightening Eye Cream",
      price: 14500,
      salePrice: 13000,
      discount: 10,
      mainImage: "/products/42.png",
      hoverImage: "/products/11.png",
      colors: ["#10b981", "#ffffff", "#f59e0b"],
      material: "Peptide Formula"
    }
  ]

  return (
    <div className='w-full py-16 px-4 md:px-8 lg:px-16 bg-(--brand-white)'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div 
          className='text-center font-serif font-extrabold mb-12'
        >
          <h2 
            className='text-3xl md:text-4xl lg:text-5xl font-bold text-(--brand-dark) mb-4'
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Featured Products
          </h2>
          <p className='text-lg text-(--brand-dark)/60 max-w-2xl mx-auto'>
            Discover our handpicked selection of premium beauty essentials
          </p>
        </div>

        {/* Product Grid - Asymmetrical Lookbook Style */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuredProducts.map((product, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <div
                key={product.id}
                className={isLarge ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div 
          className='text-center mt-12'
        >
          <button className='inline-flex items-center border border-(--brand-dark)/30 px-8 py-3 rounded-lg font-serif font-bold hover:bg-(--brand-primary) hover:text-(--brand-white) transition-all duration-300 cursor-pointer'>
            View All
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts