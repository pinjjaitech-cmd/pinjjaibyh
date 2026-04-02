import FeaturedBanner from '@/components/FeaturedBanner'
import FeaturedCategory from '@/components/FeaturedCategory'
import FeaturedProducts from '@/components/FeaturedProducts'
import { getHomepageData } from '@/lib/homepage'
import Link from 'next/link'

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
              src="/hands-crochet.jpg"
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

            <p className="text-body text-muted-foreground mb-4"> The word <em className="font-serif italic">Pinjjai</em> is born from <em className="font-serif italic">Pinjana</em>—the Punjabi art of carding cotton, a craft passed down through generations of women who transformed raw fibers into threads of possibility. </p> <p className="text-body text-muted-foreground mb-8"> Today, we carry that legacy forward. Each crochet bag is handmade by skilled artisans in rural Punjab, blending ancestral techniques with contemporary design. </p>
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
              <blockquote className="border-l-2 border-primary/30 pl-6 my-8">
                <p className="heading-editorial text-xl text-foreground/80 leading-relaxed">
                  "When I crochet, I am not just making a bag. I am weaving my daughter's future."
                </p>
                <cite className="text-xs tracking-[0.15em] uppercase text-muted-foreground mt-2 block not-italic">
                  — Gurpreet Kaur, Lead Artisan
                </cite>
              </blockquote>
              <Link
                href="/about"
                className="inline-block text-xs tracking-[0.25em] uppercase text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors duration-300"
              >
                Meet Our Artisans
              </Link>
            </div>
            <div className="overflow-hidden">
              <img
                src="/artisans-community.jpg"
                alt="Women artisans crocheting together in golden hour light"
                className="w-full aspect-4/5 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
