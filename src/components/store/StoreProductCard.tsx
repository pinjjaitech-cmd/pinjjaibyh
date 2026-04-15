import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'

export default function StoreProductCard({ product }: { product: Product & { categories?: { _id: string; name: string; slug: string }[] } }) {
  console.log("product coming",product)
  // Handle defaultVariantId - it could be an index (number as string) or skuCode
  let defaultVariant = null
  
  if ((product as any).defaultVariantId) {
    // Try to find variant by skuCode first
    defaultVariant = product.variants.find(v => v._id === (product as any).defaultVariantId)

    // If not found, try to use it as an index
    if (!defaultVariant && !isNaN(Number((product as any).defaultVariantId))) {
      const index = Number((product as any).defaultVariantId)
      if (index >= 0 && index < product.variants.length) {
        defaultVariant = product.variants[index]
      }
    }
  }
  
  // Fallback to first variant if no default is found
  if (!defaultVariant && product.variants.length > 0) {
    defaultVariant = product.variants[0]
  }
  
  const image = defaultVariant?.images?.[0] || '/products/5.png'

  return (
    <Link href={`/products/${product.slug}`} className="group block rounded-2xl overflow-hidden border border-(--brand-dark)/10 bg-white/70">
      <div className="relative aspect-[4/5] overflow-hidden bg-(--brand-white)">
        <Image src={image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-(--brand-dark)/60">
          {product.categories && product.categories.length > 0
            ? product.categories.map((cat:any) => cat.name).join(', ')
            : 'Artisan Collection'
          }
        </p>
        <h3 className="font-serif text-2xl text-(--brand-dark) mt-2">{product.title}</h3>
        <p className="text-sm text-(--brand-dark)/70 line-clamp-2 mt-1">{product.description}</p>
        <p className="mt-3 text-lg text-(--brand-primary)">₹{(defaultVariant?.price || 0).toLocaleString('en-IN')}</p>
      </div>
    </Link>
  )
}
