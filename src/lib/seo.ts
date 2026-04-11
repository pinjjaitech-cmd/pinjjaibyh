import { Metadata } from 'next'

interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  defaultVariantId?: string;
  variants: {
    _id: string;
    skuCode: string;
    attributes: { name: string; value: string }[];
    images: string[];
    price: number;
    cuttedPrice?: number;
    trackQuantity: boolean;
    stockQuantity: number;
    isActive: boolean;
  }[];
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export function generateProductMetadata(product: Product): Metadata {
  const defaultVariant = product.variants.find(v => v._id === product.defaultVariantId) || product.variants[0];
  const price = defaultVariant?.price || 0;
  const originalPrice = defaultVariant?.cuttedPrice;
  const hasDiscount = originalPrice && originalPrice > price;
  const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  const title = product.title;
  const description = product.description || 
    `Handcrafted ${product.category?.name || 'crochet bag'} by women artisans in Punjab. ${product.title} - traditional craftsmanship meets contemporary design.`;
  
  const keywords = [
    product.title.toLowerCase(),
    'handcrafted bag',
    'crochet bag',
    'women artisans',
    'punjab crafts',
    'sustainable fashion',
    product.category?.name?.toLowerCase() || '',
    'traditional crafts',
    'ethical fashion',
    'fair trade'
  ].filter(Boolean);

  return {
    title: `${title} | Handcrafted Crochet Bag | Pinjjai`,
    description,
    keywords,
    openGraph: {
      title: `${title} | Handcrafted by Women Artisans | Pinjjai`,
      description,
      url: `/products/${product.slug}`,
      images: defaultVariant?.images?.[0] ? [
        {
          url: defaultVariant.images[0],
          width: 1200,
          height: 1200,
          alt: `${title} - Handcrafted Crochet Bag`,
        },
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Handcrafted Crochet Bag`,
      description,
      images: defaultVariant?.images?.[0] ? [defaultVariant.images[0]] : [],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export function generateCategoryMetadata(category: Category, products?: any[]): Metadata {
  const title = `${category.name} Collection | Handcrafted Crochet Bags | Pinjjai`;
  const description = category.description || 
    `Discover our ${category.name} collection of handcrafted crochet bags. Each piece is carefully crafted by women artisans in Punjab, blending traditional techniques with modern design.`;
  
  const keywords = [
    category.name.toLowerCase(),
    'handcrafted bags',
    'crochet bags',
    'women artisans',
    'punjab crafts',
    'sustainable fashion',
    'traditional crafts',
    'ethical fashion'
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `/collection/${category.slug}`,
      images: category.image ? [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: `${category.name} Collection - Handcrafted Crochet Bags`,
        },
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: category.image ? [category.image] : [],
    },
    alternates: {
      canonical: `/collection/${category.slug}`,
    },
  };
}

export function generateProductJsonLd(product: Product) {
  const defaultVariant = product.variants.find(v => v._id === product.defaultVariantId) || product.variants[0];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: defaultVariant?.images || [],
    brand: {
      '@type': 'Brand',
      name: 'Pinjjai by H',
      description: 'Handcrafted crochet bags by women artisans in Punjab',
    },
    category: product.category?.name || 'Handcrafted Bags',
    offers: {
      '@type': 'Offer',
      price: defaultVariant?.price || 0,
      priceCurrency: 'INR',
      availability: defaultVariant?.trackQuantity && defaultVariant.stockQuantity > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Pinjjai by H',
        url: process.env.NEXT_PUBLIC_SITE_URL,
      },
    },
    additionalProperty: defaultVariant?.attributes?.map(attr => ({
      '@type': 'PropertyValue',
      name: attr.name,
      value: attr.value,
    })) || [],
    manufacture: {
      '@type': 'Organization',
      name: 'Pinjjai by H',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: 'Punjab',
      },
    },
  };
}

export function generateBreadcrumbJsonLd(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pinjjai by H',
    description: 'Handcrafted crochet bags empowering women artisans in Punjab through traditional craftsmanship and sustainable livelihoods',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Punjab',
    },
    sameAs: [
      'https://www.instagram.com/pinjjai_by_h',
      'https://www.facebook.com/pinjjai_by_h',
    ],
  };
}
