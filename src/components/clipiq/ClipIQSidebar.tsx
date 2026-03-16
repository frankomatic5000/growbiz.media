'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Zap,
  ListOrdered,
  CalendarDays,
  Layers,
  BarChart2,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/clipiq/generate', label: 'Generate', icon: Zap, group: 'Workflow' },
  { href: '/clipiq/queue', label: 'Queue', icon: ListOrdered, group: 'Workflow' },
  { href: '/clipiq/calendar', label: 'Calendar', icon: CalendarDays, group: 'Workflow' },
  { href: '/clipiq/brands', label: 'Brand Profiles', icon: Layers, group: 'Management' },
  { href: '/clipiq/analytics', label: 'Analytics', icon: BarChart2, group: 'Management' },
]

interface Props {
  queueBadge?: number
  brandName?: string
}

export function ClipIQSidebar({ queueBadge = 0, brandName }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebar = (
    <aside className="flex flex-col h-full w-[220px] bg-clipiq-surface border-r border-clipiq-border">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-clipiq-border shrink-0">
        <Link href="/clipiq/dashboard" className="block">
          <span className="font-syne font-bold text-xl tracking-tight text-clipiq-text">
            Clip<span className="text-clipiq-accent">IQ</span>
          </span>
          <p className="text-clipiq-muted text-[10px] font-syne mt-0.5">by GrowBiz Media</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {(['Workflow', 'Management'] as const).map((group) => (
          <div key={group}>
            <p className="text-clipiq-muted text-[10px] font-syne font-semibold uppercase tracking-widest px-2 mb-1">
              {group}
            </p>
            <ul className="space-y-0.5">
              {NAV_ITEMS.filter((i) => i.group === group).map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-syne transition-all ${
                        active
                          ? 'text-clipiq-text bg-clipiq-card2 border-l-2 border-clipiq-accent shadow-[0_0_12px_rgba(108,99,255,0.15)]'
                          : 'text-clipiq-muted hover:text-clipiq-text hover:bg-clipiq-card'
                      }`}
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                      {href === '/clipiq/queue' && queueBadge > 0 && (
                        <span className="ml-auto text-[10px] bg-clipiq-accent text-white rounded-full px-1.5 py-0.5 font-bold">
                          {queueBadge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Brand switcher */}
      <div className="px-3 py-4 border-t border-clipiq-border shrink-0">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-clipiq-muted hover:text-clipiq-text hover:bg-clipiq-card transition-colors">
          <Layers size={14} />
          <span className="truncate font-syne">{brandName ?? 'Select brand'}</span>
          <ChevronDown size={13} className="ml-auto shrink-0" />
        </button>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex fixed inset-y-0 left-0 z-40">{sidebar}</div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-clipiq-surface border border-clipiq-border text-clipiq-text"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex">{sidebar}</div>
          <button
            className="flex-1 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <span className="sr-only">Close</span>
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md bg-clipiq-surface border border-clipiq-border text-clipiq-text"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </>
  )
}
