import Navbar from '@/components/Navbar'
import OfferMarquee from '@/components/OfferMarquee'
import Footer from '@/components/ui/Footer'
import React from 'react'

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='overflow-hidden flex flex-col items-center justify-center w-full bg-(--brand-white)'>
            <OfferMarquee />
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default StoreLayout