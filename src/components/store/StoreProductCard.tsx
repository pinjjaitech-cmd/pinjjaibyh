import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'

export default function StoreProductCard({ product }: { product: Product & { category?: any } }) {
  const defaultVariant = product.variants?.find((v) => v._id === product.defaultVariantId) || product.variants?.[0]
  const image = defaultVariant?.images?.[0] || '/products/5.png'

  return (
    <Link href={`/products/${product.slug}`} className="group block rounded-2xl overflow-hidden border border-(--brand-dark)/10 bg-white/70">
      <div className="relative aspect-[4/5] overflow-hidden bg-(--brand-white)">
        <Image src={image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-(--brand-dark)/60">{(product.category as any)?.name || 'Artisan Collection'}</p>
        <h3 className="font-serif text-2xl text-(--brand-dark) mt-2">{product.title}</h3>
        <p className="text-sm text-(--brand-dark)/70 line-clamp-2 mt-1">{product.description}</p>
        <p className="mt-3 text-lg text-(--brand-primary)">₹{(defaultVariant?.price || 0).toLocaleString('en-IN')}</p>
      </div>
    </Link>
  )
}
