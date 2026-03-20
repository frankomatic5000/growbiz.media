import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Sign in — ClipIQ',
  description: 'Sign in to ClipIQ, content intelligence for media studios.',
  alternates: { canonical: 'https://growbiz.media/clipiq/login' },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-clipiq-bg flex flex-col items-center justify-center px-4">
      {/* Language switcher top-right */}
      <div className="absolute top-5 right-5 flex gap-1 text-xs font-syne">
        {['EN', 'PT', 'ES'].map((lang) => (
          <button
            key={lang}
            className="px-2 py-1 text-clipiq-muted hover:text-clipiq-text rounded transition-colors"
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-syne font-bold text-3xl text-clipiq-text tracking-tight">
            Clip<span className="text-clipiq-accent">IQ</span>
          </p>
          <p className="text-clipiq-muted text-sm font-syne mt-2">
            Content Intelligence for Media Studios
          </p>
        </div>

        <div className="bg-clipiq-surface border border-clipiq-border rounded-xl p-7 shadow-2xl">
          <h1 className="font-syne font-bold text-clipiq-text text-lg mb-6 text-center">
            Sign in to ClipIQ
          </h1>
          <LoginForm />
        </div>

        <p className="text-center text-clipiq-muted text-xs font-syne mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-clipiq-accent hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-clipiq-accent hover:underline">Privacy Policy</a>.
        </p>

        <div className="text-center mt-4">
          <Link href="/" className="text-clipiq-muted text-xs font-syne hover:text-clipiq-text transition-colors">
            ← Back to growbiz.media
          </Link>
        </div>
      </div>
    </div>
  )
}
