'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Video,
  Mic,
  BookOpen,
  Globe,
  Sparkles,
  Users,
  Star,
  Building2,
  type LucideProps,
} from 'lucide-react'

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Video,
  Mic,
  BookOpen,
  Globe,
  Sparkles,
  Users,
  Star,
  Building2,
}

const ACCENT_CLASSES: Record<string, string> = {
  mustard: 'text-mustard',
  navy: 'text-navy',
  gold: 'text-gold',
}

const ACCENT_BORDER_CLASSES: Record<string, string> = {
  mustard: 'hover:border-mustard',
  navy: 'hover:border-navy',
  gold: 'hover:border-gold',
}

interface BrandCardProps {
  name: string
  tagline: string
  description?: string
  url: string
  accent: 'mustard' | 'navy' | 'gold'
  icon: string
  expanded?: boolean
}

export function BrandCard({ name, tagline, description, url, accent, icon, expanded = false }: BrandCardProps) {
  const Icon = ICONS[icon] ?? Star
  const isExternal = url.startsWith('http')

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group bg-cream border border-navy/10 rounded-sm p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:border-mustard transition-all duration-200 ${ACCENT_BORDER_CLASSES[accent]}`}
    >
      <div className={`${ACCENT_CLASSES[accent]} w-fit`}>
        <Icon size={28} strokeWidth={1.5} />
      </div>

      <div>
        <h3 className="font-display font-bold text-navy text-base md:text-lg leading-tight">
          {name}
        </h3>
        <p className="font-body text-sm text-navy/60 mt-1 leading-relaxed">
          {tagline}
        </p>
        {expanded && description && (
          <p className="font-body text-sm text-ink/70 mt-3 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <Link
        href={url}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="font-body text-sm font-semibold text-mustard hover:text-mustard-dark transition-colors mt-auto uppercase tracking-wide"
      >
        {isExternal ? 'Visit →' : 'Explore →'}
      </Link>
    </motion.div>
  )
}
