'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

interface Props {
  name: string
  email: string
  image: string | null
}

export function AccountPanel({ name, email, image }: Props) {
  return (
    <div className="space-y-6">
      {/* Profile card */}
      <div className="bg-clipiq-card border border-clipiq-border rounded-xl p-6 flex items-center gap-4">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="w-14 h-14 rounded-full" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-clipiq-accent flex items-center justify-center text-white text-xl font-bold font-syne">
            {name?.[0]?.toUpperCase() ?? 'U'}
          </div>
        )}
        <div>
          <p className="font-syne font-bold text-clipiq-text text-base">{name || '—'}</p>
          <p className="text-clipiq-muted text-sm font-syne">{email}</p>
        </div>
      </div>

      {/* Plan info */}
      <div className="bg-clipiq-card border border-clipiq-border rounded-xl p-5">
        <p className="text-clipiq-muted text-xs font-syne font-semibold uppercase tracking-widest mb-3">Plan</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-syne font-bold text-clipiq-text text-sm">Free</p>
            <p className="text-clipiq-muted text-xs font-syne mt-0.5">1 brand profile · 10 posts/month</p>
          </div>
          <span className="text-[10px] font-syne px-2 py-1 rounded-full border border-clipiq-accent/40 text-clipiq-accent">
            Free tier
          </span>
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: '/clipiq/login' })}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-clipiq-red/30 text-clipiq-red hover:bg-clipiq-red/10 transition-colors text-sm font-syne font-semibold"
      >
        <LogOut size={14} /> Sign out
      </button>
    </div>
  )
}
