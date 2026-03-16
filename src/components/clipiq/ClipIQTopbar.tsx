'use client'

import { useState } from 'react'
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { LanguageSwitcher } from './LanguageSwitcher'

interface Props {
  title: string
  subtitle?: string
  userImage?: string | null
  userName?: string | null
}

export function ClipIQTopbar({ title, subtitle, userImage, userName }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 h-[60px] bg-clipiq-bg/80 backdrop-blur border-b border-clipiq-border">
      {/* Title */}
      <div className="ml-10 md:ml-0">
        <h1 className="font-syne font-bold text-clipiq-text text-base leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-clipiq-muted text-xs font-syne">{subtitle}</p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <LanguageSwitcher />

        <button className="relative p-2 rounded-md text-clipiq-muted hover:text-clipiq-text hover:bg-clipiq-card transition-colors">
          <Bell size={16} />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-clipiq-card transition-colors"
          >
            {userImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userImage} alt={userName ?? 'User'} className="w-7 h-7 rounded-full" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-clipiq-accent flex items-center justify-center text-white text-xs font-bold font-syne">
                {userName?.[0]?.toUpperCase() ?? 'U'}
              </div>
            )}
            <ChevronDown size={13} className="text-clipiq-muted" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-10 w-44 bg-clipiq-card border border-clipiq-border rounded-lg shadow-xl py-1 z-50">
              <a
                href="/clipiq/account"
                className="flex items-center gap-2 px-3 py-2 text-sm text-clipiq-text hover:bg-clipiq-card2 font-syne"
              >
                <User size={13} /> My Account
              </a>
              <a
                href="/clipiq/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm text-clipiq-text hover:bg-clipiq-card2 font-syne"
              >
                <Settings size={13} /> Settings
              </a>
              <hr className="border-clipiq-border my-1" />
              <button
                onClick={() => signOut({ callbackUrl: '/clipiq/login' })}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-clipiq-red hover:bg-clipiq-card2 font-syne"
              >
                <LogOut size={13} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
