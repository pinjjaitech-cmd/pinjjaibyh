import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const FeaturedCategory = () => {
  const categories = [
    {
      title: "Best collection",
      image: "https://sanova-demo.myshopify.com/cdn/shop/files/banner-1.png?v=1734242399&width=550",
      bgColor: "bg-[#eef1d7]",
    },
    {
      title: "What's new?",
      image: "https://sanova-demo.myshopify.com/cdn/shop/files/banner-2.png?v=1734242399&width=550",
      bgColor: "bg-[#e3e7e3]",
    },
    {
      title: "Tips & trends",
      image: "https://sanova-demo.myshopify.com/cdn/shop/files/banner-3.png?v=1734242399&width=550",
      bgColor: "bg-[#f2e2da]",
    },
  ]

  return (
    <div className='w-full py-16 px-4 md:px-8 lg:px-16 bg-brand-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {categories.map((category, index) => (
            <Link
              href={`/category/${category.title.toLowerCase().replace(/ /g, '-')}`}
              key={category.title}
              className={`relative h-[400px] rounded-lg overflow-hidden group ${category.bgColor} transition-all duration-300 hover:shadow-xl `}
            >
              <div className='absolute inset-0 z-10 flex flex-col justify-between p-8'>
                <h3 className='text-2xl font-bold text-gray-800'>{category.title}</h3>
                <button className='flex items-center text-gray-800 group-hover:text-brand-primary transition-colors duration-300'>
                  Shop Now <span className='ml-2 group-hover:translate-x-2 transition-transform duration-300'>→</span>
                </button>
              </div>
              <div className='absolute inset-0'>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className='transition-transform duration-500 group-hover:scale-105'
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedCategory