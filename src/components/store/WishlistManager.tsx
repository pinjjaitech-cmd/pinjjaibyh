'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface WishlistItem {
  _id: string
  name: string
  notes?: string
  productIds: any[]
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919899187882'

export default function WishlistManager() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [wishlists, setWishlists] = useState<WishlistItem[]>([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadWishlists() {
    const res = await fetch('/api/wishlists')
    if (!res.ok) return
    const json = await res.json()
    setWishlists(json.data || [])
  }

  useEffect(() => {
    if (status === 'authenticated') loadWishlists()
  }, [status])

  const whatsappLinks = useMemo(
    () =>
      wishlists.map((wishlist) => ({
        id: wishlist._id,
        link: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Pinjjai team, I want to book wishlist ${wishlist._id} (${wishlist.name}).`)}`,
      })),
    [wishlists]
  )

  if (status === 'loading') return <p className='py-12'>Loading...</p>

  if (!session?.user) {
    return (
      <div className='py-16 text-center'>
        <p className='mb-4 text-lg'>Please sign in to create and manage wishlists.</p>
        <Button onClick={() => router.push('/auth')}>Sign in / Sign up</Button>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <div className='flex gap-2'>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='New wishlist name (e.g. Wedding Picks)' />
        <Button
          onClick={async () => {
            if (!name.trim()) return
            setLoading(true)
            await fetch('/api/wishlists', { method: 'POST', body: JSON.stringify({ name }) })
            setName('')
            await loadWishlists()
            setLoading(false)
          }}
          disabled={loading}
        >
          Create
        </Button>
      </div>

      <div className='grid gap-4'>
        {wishlists.map((wishlist) => {
          const wa = whatsappLinks.find((w) => w.id === wishlist._id)
          return (
            <div key={wishlist._id} className='rounded-xl border border-(--brand-dark)/15 bg-white/70 p-4'>
              <div className='flex items-center justify-between gap-4'>
                <div>
                  <h3 className='font-serif text-2xl text-(--brand-dark)'>{wishlist.name}</h3>
                  <p className='text-sm text-(--brand-dark)/70'>{wishlist.productIds?.length || 0} products</p>
                  <p className='text-xs text-(--brand-dark)/50 mt-1'>Wishlist ID: {wishlist._id}</p>
                </div>
                <div className='flex gap-2'>
                  <Button asChild className='bg-[#25D366] text-white hover:bg-[#1eb85b]'>
                    <a href={wa?.link} target='_blank' rel='noreferrer'>Book via WhatsApp</a>
                  </Button>
                  <Button
                    variant='outline'
                    onClick={async () => {
                      await fetch(`/api/wishlists/${wishlist._id}`, { method: 'DELETE' })
                      await loadWishlists()
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className='mt-3 grid gap-2'>
                {wishlist.productIds?.map((product: any) => (
                  <div key={product._id} className='flex items-center justify-between rounded-md bg-(--brand-white) px-3 py-2'>
                    <span>{product.title}</span>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={async () => {
                        await fetch(`/api/wishlists/${wishlist._id}`, {
                          method: 'PATCH',
                          body: JSON.stringify({ removeProductId: product._id }),
                        })
                        await loadWishlists()
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
