import AuthPanel from '@/components/store/AuthPanel'

export default function AuthPage() {
  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-14'>
      <h1 className='font-serif text-5xl text-(--brand-dark) text-center mb-3'>Welcome Back</h1>
      <p className='text-center text-(--brand-dark)/70 mb-8'>Sign in or create your account to save multiple wishlists and book via WhatsApp.</p>
      <AuthPanel />
    </section>
  )
}
