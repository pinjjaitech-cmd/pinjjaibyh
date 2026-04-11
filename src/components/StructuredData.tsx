import { generateOrganizationJsonLd } from '@/lib/seo'

interface StructuredDataProps {
  type?: 'organization' | 'website'
  data?: any
}

export default function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  let jsonLd: any = {}

  switch (type) {
    case 'organization':
      jsonLd = generateOrganizationJsonLd()
      break
    case 'website':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Pinjjai by H',
        description: 'Handcrafted crochet bags empowering women artisans in Punjab through traditional craftsmanship and sustainable livelihoods',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        sameAs: [
          'https://www.instagram.com/pinjjai_by_h',
          'https://www.facebook.com/pinjjai_by_h',
        ],
      }
      break
    default:
      if (data) {
        jsonLd = data
      }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
