"use client"

import { CircleUser, Search, Heart, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Search', href: '/search' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Story', href: '/story' },
  { label: 'About', href: '/about' },
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div className='w-full flex flex-col items-center justify-center bg-(--brand-white) sticky top-0 z-40'>
      <div className='w-full md:px-6 px-4 py-2 flex items-center justify-between max-w-7xl'>
        <div className='flex-1 flex items-center '>
          <button className='md:hidden flex' onClick={() => setIsMobileMenuOpen((p) => !p)}>
            {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
        <Link href='/' className='flex-1 flex items-center justify-center'>
          <Image src='/pinjjai.png' alt='Pinjjai' width={70} height={70} />
        </Link>
        <div className='flex flex-1 justify-end gap-4 items-center'>
          <Link href='/search'><Search className='w-5 h-5 md:w-6 md:h-6' /></Link>
          <Link href='/wishlist'><Heart className='w-5 h-5 md:w-6 md:h-6' /></Link>
          {session?.user ? (
            <button onClick={() => signOut({ callbackUrl: '/' })} className='text-xs uppercase tracking-[0.2em]'>Logout</button>
          ) : (
            <Link href='/auth'><CircleUser className='w-5 h-5 md:w-6 md:h-6' /></Link>
          )}
        </div>
      </div>
      <div className='w-full h-px bg-gray-300' />

      <div className='w-full max-w-7xl hidden md:flex items-center justify-center gap-10 py-3'>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className='text-sm tracking-[0.15em] uppercase text-gray-700 hover:text-gray-900 transition-colors'>
            {link.label}
          </Link>
        ))}
      </div>

      {isMobileMenuOpen && (
        <div className='md:hidden fixed inset-0 z-50 bg-black/25' onClick={() => setIsMobileMenuOpen(false)}>
          <div className='w-[75vw] h-full bg-(--brand-white) p-4 space-y-4' onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className='block py-2 border-b text-(--brand-dark)' onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
