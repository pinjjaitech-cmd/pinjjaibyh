"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const StitchEveryThread = () => {
    const [artisansData, setArtisansData] = useState([
        { quote: "I earn with dignity while doing what I love.", name: "Abhilasha", role: "Artisan", image: "/artisans-image/Abhilasha.jpg" },
        { quote: "This work gives me confidence, income, and pride.", name: "Rinkal", role: "Artisan", image: "/artisans-image/Rinkal.jpg" },
        { quote: "I support my family with every thread I crochet.", name: "Tannu", role: "Artisan", image: "/artisans-image/Tannu.jpg" },
        { quote: "Pinjjai turned my skill into a source of empowerment.", name: "Manpreet", role: "Artisan", image: "/artisans-image/Manpreet.jpg" },
        { quote: "With Pinjjai, my hands create not just products, but possibilities.", name: "Sonia", role: "Artisan", image: "/artisans-image/Sonia.jpg" },
    ])

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return

    setIsTransitioning(true)
    setCurrentIndex(index) // 👈 update immediately

    setTimeout(() => {
        setIsTransitioning(false)
    }, 300)
}

    useEffect(() => {
        const interval = setInterval(() => {
            goToSlide((currentIndex + 1) % artisansData.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [currentIndex, artisansData.length])

    return (
        <div>
            {/* Background texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/texture-crochet.jpg"
                    alt="texture-crochet"
                    className="w-full transform scale-x-[-1] rotate-180 h-full object-cover opacity-10"
                />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Empowering Women</p>
                        <h2 className="heading-display text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                            Every Stitch,<br />A Step Forward
                        </h2>
                        <div className="section-divider mx-0! mb-6" />
                        <p className="text-body text-muted-foreground mb-4">
                            In the quiet villages of Punjab, women gather—not just to create, but to reclaim.
                            Each bag carries the weight of their ambition and the lightness of their laughter.
                        </p>

                        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                            <blockquote className="border-l-2 border-primary/30 pl-6 my-8">
                                <p className="heading-editorial text-xl text-foreground/80 leading-relaxed">
                                    "{artisansData[currentIndex].quote}"
                                </p>
                                <cite className="text-xs tracking-[0.15em] uppercase text-muted-foreground mt-2 block not-italic">
                                    — {artisansData[currentIndex].name}, {artisansData[currentIndex].role}
                                </cite>
                            </blockquote>
                        </div>
                        <Link
                            href="/about"
                            className="inline-block text-xs tracking-[0.25em] uppercase text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors duration-300"
                        >
                            Meet Our Artisans
                        </Link>
                    </div>
                    <div className="overflow-hidden">
                        <img
                            src={artisansData[currentIndex].image}
                            alt="Women artisans crocheting together in golden hour light"
                            className={`w-full aspect-4/5 object-cover transition-all duration-1000 ${
                                isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                            }`}
                        />
                    </div>
                </div>
                
                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {artisansData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? 'bg-primary w-8'
                                    : 'bg-primary/30 hover:bg-primary/50'
                            }`}
                            aria-label={`Go to artisan ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StitchEveryThread