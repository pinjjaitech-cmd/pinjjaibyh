'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AuthPanel() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'verify'>('signin')
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', password: '', otp: '' })
  const [emailForOtp, setEmailForOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignin() {
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })
    setLoading(false)

    if (result?.error) {
      setError('Invalid credentials or unverified email.')
      return
    }

    router.push('/wishlist')
  }

  async function handleSignup() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        password: form.password,
      }),
    })
    const json = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(json.error || 'Unable to sign up')
      return
    }

    setEmailForOtp(form.email)
    setMode('verify')
  }

  async function handleVerify() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/sign-up', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailForOtp, otp: form.otp }),
    })
    const json = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(json.error || 'Unable to verify OTP')
      return
    }

    setMode('signin')
  }

  return (
    <div className='max-w-md mx-auto rounded-2xl border border-(--brand-dark)/15 bg-white p-6 space-y-4'>
      <div className='flex gap-2'>
        <Button variant={mode === 'signin' ? 'default' : 'outline'} onClick={() => setMode('signin')} className='flex-1'>Sign in</Button>
        <Button variant={mode === 'signup' ? 'default' : 'outline'} onClick={() => setMode('signup')} className='flex-1'>Sign up</Button>
      </div>

      {mode === 'signup' && (
        <>
          <Input placeholder='Full name' value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} />
          <Input placeholder='Phone' value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
        </>
      )}

      {mode === 'verify' ? (
        <>
          <p className='text-sm text-(--brand-dark)/70'>Enter OTP sent to {emailForOtp}</p>
          <Input placeholder='6-digit OTP' value={form.otp} onChange={(e) => setForm((p) => ({ ...p, otp: e.target.value }))} />
          <Button onClick={handleVerify} className='w-full' disabled={loading}>Verify</Button>
        </>
      ) : (
        <>
          <Input type='email' placeholder='Email' value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          <Input type='password' placeholder='Password' value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
          <Button onClick={mode === 'signin' ? handleSignin : handleSignup} className='w-full' disabled={loading}>
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </Button>
        </>
      )}

      {error && <p className='text-sm text-red-600'>{error}</p>}
    </div>
  )
}
