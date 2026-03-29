"use client"
import { CircleUser, Search, ShoppingBag, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const shopItems = [
    {
      heading: "Handbags", subItems: [
        { label: "Tote Bags", href: "/shop/tote-bags" },
        { label: "Clutch Bags", href: "/shop/clutch-bags" },
        { label: "Crossbody Bags", href: "/shop/crossbody-bags" }
      ]
    },
    {
      heading: "Accessories", subItems: [
        { label: "Scarves", href: "/shop/scarves" },
        { label: "Belts", href: "/shop/belts" },
        { label: "Jewelry", href: "/shop/jewelry" }
      ]
    }
  ]

  const aboutItems = [
    { label: "Our Story", href: "/our-story" },
    { label: "Women Empowerment", href: "/women-empowerment" },
    { label: "Our Team", href: "/our-team" },
    { label: "Mission & Vision", href: "/mission-vision" },
    { label: "Sustainability", href: "/sustainability" }
  ]

  const moreItems = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Size Guide", href: "/size-guide" }
  ]

  const featuredProducts = [
    {
      label: "Red Cotton Handbag",
      href: "/red-cotton-handbag",
      image: "https://www.rijac.com/cdn/shop/files/FQSY2194.jpg?v=1760505294&width=533",
      price: 4500
    },
    {
      label: "Yellow Cotton Handbag",
      href: "/yellow-cotton-handbag",
      image: "https://assets.ajio.com/medias/sys_master/root/20230623/ymVy/6494ca7a42f9e729d77e0f7a/-473Wx593H-464397315-yellow-MODEL.jpg",
      price: 4500
    }
  ]

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {/* Top Bar */}
      <div className='w-full md:px-6 px-4 py-1 flex items-center justify-between max-w-7xl'>
        <div className='flex-1 flex items-center '>
          <button
            className='md:hidden flex flex-col gap-1.5'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <>
                <span className="w-5 h-[2px] bg-black"></span>
                <span className="w-3 h-[2px] bg-black"></span>
                <span className="w-5 h-[2px] bg-black"></span>
              </>
            )}
          </button>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <Image src="/pinjjai.png" alt="Pinjjai" width={70} height={70} />
        </div>
        <div className='flex flex-1 justify-end gap-4 items-center'>
          <Search className='cursor-pointer w-5 h-5 md:w-6 md:h-6' />
          <ShoppingBag className='cursor-pointer w-5 h-5 md:w-6 md:h-6' />
          <CircleUser className='cursor-pointer w-5 h-5 md:w-6 md:h-6' />
        </div>
      </div>
      <div className='w-full h-px bg-gray-300' />

      {/* Desktop Navigation */}
      <div className='w-full max-w-7xl hidden md:flex items-center justify-center gap-10 py-4'>
        <Link href="/" className='text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200'>
          Home
        </Link>


        {/* Shop Dropdown */}
        <div className='relative group'>
          <button className='flex items-center gap-1 text-base cursor-pointer font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200'>
            Shop <ChevronDown size={14} />
          </button>
          <div className='absolute left-1/2 -translate-x-1/3 top-full mt-4 w-[80vw] max-w-[1200px] bg-[#f2f2f2] shadow-xl rounded-b-lg p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2 grid grid-cols-4 gap-8 z-50'>
            {shopItems.map((category, categoryIndex) => (
              <div key={categoryIndex} className='space-y-4'>
                <h3 className='font-bold text-gray-900 text-lg'>{category.heading}</h3>
                <div className='space-y-2'>
                  {category.subItems.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className='text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 block'
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className='col-span-1 border-l border-gray-200 pl-8'>
              <h3 className='font-bold text-gray-900 mb-4'>Featured Products</h3>
              <div className='space-y-4'>
                {featuredProducts.map((product, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <div className='w-16 h-16 bg-gray-100 rounded-b-lg overflow-hidden'>
                      <img
                        src={product.image}
                        alt={product.label}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>{product.label}</p>
                      <p className='text-sm text-gray-600'>₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About Dropdown */}
        <div className='relative group'>
          <button className='flex gap-1 items-center text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200'>
            About Us <ChevronDown size={14} />
          </button>
          <div className='absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 bg-[#f2f2f2] shadow-xl rounded-b-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50'>
            <div className='space-y-2'>
              {aboutItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className='text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 block py-1'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* More Dropdown */}
        <div className='relative group'>
          <button className='flex items-center gap-1 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200'>
            More <ChevronDown size={14} />
          </button>
          <div className='absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 bg-[#f2f2f2] shadow-xl rounded-b-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2 z-50'>
            <div className='space-y-2'>
              {moreItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className='text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 block py-1'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link href="/contact" className='text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200'>
          Contact Us
        </Link>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-40 transition-opacity duration-300'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-[70vw] bg-[#f2f2f2] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          <Image src="/pinjjai.png" alt="Logo" width={50} height={50} />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className='p-2 rounded-b-lg hover:bg-gray-100 transition-colors duration-200'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-4 space-y-6'>
          {/* Home */}
          <Link
            href="/"
            className='text-base font-medium text-gray-900 block pb-2 hover:text-gray-700 transition-colors duration-200'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* Shop Collapsible */}
          <Collapsible>
            <CollapsibleTrigger className='flex items-center justify-between w-full text-base font-medium text-gray-900 pb-2 hover:text-gray-700 transition-colors duration-200'>
              <span>Shop</span>
              <ChevronDown size={16} className='transition-transform duration-200' />
            </CollapsibleTrigger>
            <CollapsibleContent className='pl-4 space-y-4'>
              {shopItems.map((category, categoryIndex) => (
                <Collapsible key={categoryIndex}>
                  <CollapsibleTrigger className='flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-2 hover:text-gray-600 transition-colors duration-200'>
                    <span>{category.heading}</span>
                    <ChevronDown size={14} className='transition-transform duration-200' />
                  </CollapsibleTrigger>
                  <CollapsibleContent className='pl-4 space-y-2'>
                    {category.subItems.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className='text-sm text-gray-600 hover:text-gray-900 block py-1 transition-colors duration-200'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* About Collapsible */}
          <Collapsible>
            <CollapsibleTrigger className='flex items-center justify-between w-full text-base font-medium text-gray-900 pb-2 hover:text-gray-700 transition-colors duration-200'>
              <span>About</span>
              <ChevronDown size={16} className='transition-transform duration-200' />
            </CollapsibleTrigger>
            <CollapsibleContent className='pl-4 space-y-2'>
              {aboutItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className='text-sm text-gray-600 hover:text-gray-900 block py-1 transition-colors duration-200'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* More Collapsible */}
          <Collapsible>
            <CollapsibleTrigger className='flex items-center justify-between w-full text-base font-medium text-gray-900 pb-2 hover:text-gray-700 transition-colors duration-200'>
              <span>More</span>
              <ChevronDown size={16} className='transition-transform duration-200' />
            </CollapsibleTrigger>
            <CollapsibleContent className='pl-4 space-y-2'>
              {moreItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className='text-sm text-gray-600 hover:text-gray-900 block py-1 transition-colors duration-200'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Featured Products */}
          <div className='pt-6 border-t border-gray-200'>
            <h3 className='font-bold text-gray-900 mb-4'>Featured Products</h3>
            <div className='space-y-4'>
              {featuredProducts.map((product, index) => (
                <div key={index} className='flex items-center gap-3 p-3 bg-gray-50 rounded-b-lg'>
                  <div className='w-16 h-16 bg-gray-100 rounded-b-lg overflow-hidden'>
                    <img
                      src={product.image}
                      alt={product.label}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-900'>{product.label}</p>
                    <p className='text-sm text-gray-600'>₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar