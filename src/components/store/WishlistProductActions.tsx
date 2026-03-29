'use client'

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'

export default function WishlistCTA({ productId, productTitle }: { productId: string; productTitle: string }) {
  const { data: session } = useSession()
  const [wishlists, setWishlists] = useState<any[]>([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (!session?.user) return
    fetch('/api/wishlists').then((r) => r.json()).then((json) => {
      setWishlists(json.data || [])
      if (json.data?.length) setSelected(json.data[0]._id)
    })
  }, [session])

  if (!session?.user) {
    return (
      <div className='flex gap-3'>
        <Button asChild><Link href='/auth'>Sign in to save wishlist</Link></Button>
        <Button asChild className='bg-[#25D366] text-white hover:bg-[#1eb85b]'>
          <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I want to book ${productTitle}.`)}`} target='_blank' rel='noreferrer'>Book via WhatsApp</a>
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <div className='flex gap-3'>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className='h-10 rounded-md border px-3 min-w-56'>
          {wishlists.map((w) => (
            <option key={w._id} value={w._id}>{w.name}</option>
          ))}
        </select>
        <Button
          onClick={async () => {
            if (!selected) return
            await fetch(`/api/wishlists/${selected}`, {
              method: 'PATCH',
              body: JSON.stringify({ addProductId: productId }),
            })
          }}
        >
          Add to wishlist
        </Button>
      </div>
      <Button asChild className='bg-[#25D366] text-white hover:bg-[#1eb85b]'>
        <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Pinjjai team, I want to book this product: ${productTitle}.`)}`} target='_blank' rel='noreferrer'>Book via WhatsApp</a>
      </Button>
    </div>
  )
}
