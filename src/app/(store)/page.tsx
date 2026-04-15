import FeaturedBanner from '@/components/FeaturedBanner'
import FeaturedCategory from '@/components/FeaturedCategory'
import FeaturedProducts from '@/components/FeaturedProducts'
import { getHomepageData } from '@/lib/homepage'
import Link from 'next/link'
import { Metadata } from 'next'
import StitchEveryThread from '@/components/store/StitchEveryThread'

export const metadata: Metadata = {
  title: 'Home - Handcrafted Crochet Bags & Artisan Crafts',
  description: 'Welcome to Pinjjai by H. Discover our collection of handcrafted crochet bags made by women artisans in Punjab. Shop sustainable fashion that empowers communities and preserves traditional craftsmanship.',
  keywords: ['handcrafted bags', 'crochet bags', 'artisan crafts', 'sustainable fashion', 'women empowerment', 'traditional crafts', 'Punjab artisans'],
  openGraph: {
    title: 'Pinjjai by H - Handcrafted Crochet Bags | Empowering Women Artisans',
    description: 'Discover handcrafted crochet bags made by women artisans in Punjab. Each bag tells a story of tradition, empowerment, and sustainable craftsmanship.',
    url: '/',
    images: [
      {
        url: '/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Pinjjai by H - Handcrafted Crochet Bags Collection',
      },
    ],
  },
}

const Homepage = async () => {
  const homepageData = await getHomepageData()

  return (
    <div className='w-full font-sans h-full bg-(--brand-white) text-black'>
      <div className='px-2 '>

        <FeaturedBanner slides={homepageData.heroBanners} />
        <FeaturedCategory categories={homepageData.browseCategories} />
        <FeaturedProducts products={homepageData.featuredProducts as any[]} />

      </div>
      <section className="relative py-10 px-6 lg:px-12 max-w-7xl mx-auto">

        {/* Background texture */}
        <div className="absolute inset-0 z-0">
          <img
            src="/texture-crochet.jpg"
            alt="texture-crochet"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="overflow-hidden">
            <img
              src="/artisans-community.jpeg"
              alt="Artisan hands carefully crocheting natural yarn"
              className="w-full aspect-4/5 object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-(--brand-dark) mb-4">
              Behind Every Thread
            </p>

            <h2 className="heading-display text-4xl lg:text-5xl mb-6 leading-tight">
              Where Tradition<br />Meets Tomorrow
            </h2>

            <div className="section-divider mx-0! mb-6" />


            <p className='text-body text-muted-foreground mb-3'>The word Pinjjai finds its roots in Pinjana—a traditional term for the bow-shaped tool once used to clean cotton. It also refers to the process of carding, where raw cotton is gently separated into soft, workable fibers—the beginning of every thread.</p>


            <p className='text-body text-muted-foreground mb-3'>Pinjjai was born from a simple yet powerful idea—that the threads of tradition can shape the future. Rooted in Punjab, our story is inspired by generations of women who transformed everyday handcraft into a meaningful form of expression, where every loop and knot carries purpose.</p>

            <p className='text-body text-muted-foreground mb-3'>At Pinjjai, we work closely with skilled artisans from rural Punjab, preserving the beauty of hand crochet while reimagining it for today. Every bag is made slowly and thoughtfully, blending heritage techniques with modern design sensibilities.</p>
            <Link
              href="/story"
              className="inline-block text-xs tracking-[0.25em] uppercase text-[#5D4432] border-b border-[#5D4432]/30 pb-1 hover:border-[#5D4432] transition-colors duration-300"
            >
              Read Our Story
            </Link>
          </div>

        </div>
      </section>
      <section className="relative max-w-7xl mx-auto py-6">
        <StitchEveryThread />
      </section>
    </div>
  )
}

export default Homepage
