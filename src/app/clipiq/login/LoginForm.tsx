'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleGoogle() {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/clipiq/dashboard' })
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await signIn('nodemailer', { email, callbackUrl: '/clipiq/dashboard', redirect: false })
    setLoading(false)
    setEmailSent(true)
  }

  if (emailSent) {
    return (
      <div className="text-center py-4">
        <p className="text-clipiq-green font-syne font-semibold text-sm">Magic link sent!</p>
        <p className="text-clipiq-muted text-xs mt-2 font-syne">Check your inbox at {email}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Google */}
      <button
        onClick={handleGoogle}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-gray-800 font-semibold font-syne text-sm hover:bg-gray-100 transition-colors disabled:opacity-60"
      >
        {googleLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )}
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-clipiq-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-clipiq-surface px-3 text-clipiq-muted font-syne">Or sign in with email</span>
        </div>
      </div>

      {/* Magic link */}
      <form onSubmit={handleMagicLink} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full px-4 py-3 rounded-lg bg-clipiq-card border border-clipiq-border text-clipiq-text placeholder:text-clipiq-muted text-sm font-syne focus:outline-none focus:border-clipiq-accent transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-clipiq-accent text-clipiq-accent font-semibold font-syne text-sm hover:bg-clipiq-accent hover:text-white transition-colors disabled:opacity-60"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Send magic link
        </button>
      </form>
    </div>
  )
}
