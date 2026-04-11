import { Metadata } from 'next'
import connectDB from '@/lib/db'
import Product from '@/models/Product'
import { generateProductMetadata, generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'
import ProductDetailClient from './ProductDetailClient'

interface PageProps {
  params: Promise< { slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    await connectDB()
    
    const { slug } = await params
    
    const product = await Product.findOne({ 
      slug, 
      status: 'published' 
    }).populate('category').lean()
    
    if (!product) {
      return {
        title: 'Product Not Found | Pinjjai',
        description: 'The requested product could not be found.',
      }
    }

    return generateProductMetadata(product as any)
  } catch (error) {
    console.error('Error generating product metadata:', error)
    return {
      title: 'Product | Pinjjai',
      description: 'Handcrafted crochet bags by women artisans in Punjab.',
    }
  }
}

export default async function ProductPageWrapper({ params }: PageProps) {
  try {
    await connectDB()

    const { slug } = await params
    
    const product = await Product.findOne({ 
      slug, 
      status: 'published' 
    }).populate('category').lean()
    
    if (!product) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <a href="/products" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md">
              Browse Products
            </a>
          </div>
        </div>
      )
    }

    const productJsonLd = generateProductJsonLd(product as any)
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: product.title, url: `/products/${product.slug}` },
    ])

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <ProductDetailClient productSlug={slug} />
      </>
    )
  } catch (error) {
    console.error('Error loading product:', error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Product</h1>
          <p className="text-muted-foreground mb-6">Please try again later.</p>
          <a href="/products" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Browse Products
          </a>
        </div>
      </div>
    )
  }
}
