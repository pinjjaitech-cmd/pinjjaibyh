"use client";

import React, { useState, useEffect } from 'react'

interface OfferMarqueeProps {
  marqueeTexts: string[]
}

const OfferMarquee: React.FC<OfferMarqueeProps> = ({ marqueeTexts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!marqueeTexts || marqueeTexts.length === 0) return

    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % marqueeTexts.length)
        setIsVisible(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [marqueeTexts])

  if (!marqueeTexts || marqueeTexts.length === 0) {
    return null
  }

  return (
    <div className='bg-(--brand-primary) w-full text-(--brand-white) py-2 text-sm text-center font-sans font-light overflow-hidden relative h-7 flex items-center justify-center'>
      <span 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {marqueeTexts[currentIndex]}
      </span>
    </div>
  )
}

export default OfferMarquee